import {FlatList, Text, TouchableOpacity, View} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {image_url} from 'constants/url';
//constants
import {calcHeight, calcWidth, deviceWidth} from 'constants/deviceConfig';

//components
import Card from 'components/reusable/Card';

//zoom lihtbox - image viewer
import {SingleImage} from 'react-native-zoom-lightbox';

//context
import {UserContext} from 'context/UserContext';

//icon
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {getFreeProducts} from '../myLibrary.actions';
import {showChase} from 'constants/loading';
import styles from './freebies.styles';
import {isLoggedIn, manageErrors} from 'constants/handleErrors';
import Colors from 'constants/colors';
import Spinner from 'react-native-loading-spinner-overlay';
import {scale} from 'react-native-size-matters';

const Freebies = ({navigation}) => {
  const [freeProducts, setFreeProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const {storedUserData, setStoredUserData} = useContext(UserContext);
  let accessToken = isLoggedIn(storedUserData);

  useEffect(() => {
    getFreeProducts({
      setFreeProducts,
      setIsLoading,
      accessToken,
      navigation,
      setStoredUserData,
    });
    navigation.addListener('focus', () => {
      getFreeProducts({
        setFreeProducts,
        setIsLoading,
        accessToken,
        navigation,
        setStoredUserData,
      });
    });
  }, [storedUserData]);

  return (
    <View style={styles.screen}>
      {isLoading ? (
        // <Spinner
        //   visible={isLoading}
        //   textContent={'Please wait ...'}
        //   color={Colors.btnGreen}
        //   textStyle={{color: 'black'}}
        // />
        showChase(scale(30))
      ) : !accessToken ? (
        <View style={styles.heading}>
          <Text style={styles.text}>
            Login to View Free Books, NewsPaper, etc
          </Text>
        </View>
      ) : freeProducts.length ? (
        <FlatList
          contentContainerStyle={styles.flatList}
          data={freeProducts}
          renderItem={({item}) => (
            <Card style={styles.card}>
              <View style={styles.cardHeadingContainer}>
                <Text
                  style={styles.cardTitle}
                  // numberOfLines={2}
                >
                  {item.name}
                </Text>
              </View>
              <View style={styles.line} />

              <TouchableOpacity>
                <View style={styles.cardImageContainer}>
                  <SingleImage
                    uri={`${image_url}/${item.sample}`}
                    style={styles.cardImage}
                  />
                </View>
              </TouchableOpacity>

              <View style={styles.cardDetailsContainer}>
                <Text
                  style={styles.cardDetails}
                  // numberOfLines={2}
                >
                  {item.description}
                </Text>
              </View>
              <TouchableOpacity
                activeOpacity={0.5}
                style={styles.btnContainer}
                onPress={() =>
                  navigation.navigate('View Book', {
                    name: item.name,
                    url: `${image_url}/${item.book}`,
                  })
                }>
                <View style={styles.customButton}>
                  <Text style={styles.customButtonText}>READ</Text>
                  <FontAwesome5
                    name="book-reader"
                    color="white"
                    size={calcWidth(4)}
                    style={styles.btnIcon}
                  />
                </View>
              </TouchableOpacity>
            </Card>
          )}
          numColumns={2}
          keyExtractor={item => item.id.toString()}
        />
      ) : (
        <Text style={styles.noProducts}>No freebies available</Text>
      )}
    </View>
  );
};

export default Freebies;
