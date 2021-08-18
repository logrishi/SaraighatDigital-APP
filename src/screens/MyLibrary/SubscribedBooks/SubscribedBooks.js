import React, {useEffect, useContext, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';

//context
import {UserContext} from 'context/UserContext';

//constants
import {deviceWidth, calcHeight, calcWidth} from 'constants/deviceConfig';
import {base_url, image_url} from 'constants/url';
import Colors from 'constants/colors';

//components
import Card from 'components/reusable/Card';

//fonts
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

//zoom lihtbox - image viewer
import {SingleImage} from 'react-native-zoom-lightbox';

//db
import styles from './subscribedBooks.styles';
import {showChase} from 'constants/loading';
import {getSubscriptionBooks} from '../myLibrary.actions';
import {isLoggedIn} from 'constants/handleErrors';
import Spinner from 'react-native-loading-spinner-overlay';
import {scale} from 'react-native-size-matters';

const SubscribedBooks = ({navigation}) => {
  const {storedUserData, setStoredUserData} = useContext(UserContext);
  const [subscriptions, setSubscriptions] = useState([]);
  const [expiresOn, setExpiresOn] = useState();
  const [isLoading, setIsLoading] = useState(false);
  let accessToken = isLoggedIn(storedUserData);

  useEffect(() => {
    // setIsLoading(true);
    getSubscriptionBooks({
      setSubscriptions,
      setExpiresOn,
      setIsLoading,
      accessToken,
      navigation,
      setStoredUserData,
    });
    navigation.addListener('focus', () => {
      getSubscriptionBooks({
        setSubscriptions,
        setExpiresOn,
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
          <Text style={styles.text}>Login to View Your Books</Text>
        </View>
      ) : !subscriptions.length ? (
        <View style={styles.heading}>
          <Text style={styles.text}>You Have No Subscriptions</Text>
        </View>
      ) : subscriptions.length ? (
        <View style={{flex: 1}}>
          <View style={styles.heading}>
            <Text style={styles.text}>
              Your Subscription Expires on {expiresOn}
            </Text>
          </View>
          <FlatList
            data={subscriptions}
            renderItem={({item}) => (
              <View>
                <Card style={styles.card}>
                  {/* <View style={styles.cardImageContainer}>
                    <Image
                      source={{uri: `${image_url}/${item.sample}`}}
                      style={styles.cardImage}
                    />
                  </View> */}
                  <TouchableOpacity>
                    <View style={styles.cardImageContainer}>
                      <SingleImage
                        uri={`${image_url}/${item.sample}`}
                        style={styles.cardImage}
                      />
                    </View>
                  </TouchableOpacity>
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
              </View>
            )}
            numColumns={2}
            keyExtractor={item => item.id.toString()}
          />
        </View>
      ) : null}
    </View>
  );
};

export default SubscribedBooks;
