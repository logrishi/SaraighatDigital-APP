import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';

//constants
import {deviceWidth, calcHeight, calcWidth} from 'constants/deviceConfig';
import Colors from 'constants/colors';
import {base_url, image_url} from 'constants/url';

//components
import Card from 'components/reusable/Card';

// context
// import {ProductContext} from 'context/ProductContext';
import {UserContext} from '/context/UserContext';

//zoom lightbox - image viewer
import {SingleImage} from 'react-native-zoom-lightbox';

//spinner overlay
import Spinner from 'react-native-loading-spinner-overlay';

//db
import axios from 'axios';
import {isLoggedIn} from 'constants/handleErrors';
import {scale} from 'react-native-size-matters';

import {getAllProducts} from './manageAdmin.actions';
import {showChase} from 'constants/loading';

const ManageProducts = ({navigation}) => {
  // const {setIsLoadingProduct} = useContext(ProductContext);
  const {storedUserData} = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(true);
  const [allProducts, setAllProducts] = useState([]);

  let accessToken = isLoggedIn(storedUserData);

  // const accessToken = storedUserData.auth.access_token;
  // const config = {
  //   headers: {Authorization: `Bearer ${accessToken}`},
  // };

  useEffect(() => {
    getAllProducts({setIsLoading, setAllProducts, accessToken});
    navigation.addListener('focus', () => {
      getAllProducts({setIsLoading, setAllProducts, accessToken});
    });
  }, []);

  const callback = () => {
    // console.log('callback');
    getAllProducts({setIsLoading, setAllProducts, accessToken});
  };

  // const getAllProducts = () => {
  //   setIsLoading(true);
  //   axios
  //     .get(`${base_url}/getAllProducts`, config)
  //     .then(res => {
  //       // console.log('all', res.data);
  //       setAllProducts(res.data);
  //       setIsLoading(false);
  //     })
  //     .catch(err => {
  //       // setProducts(err);
  //       setIsLoading(false);
  //     });
  // };

  return (
    <SafeAreaView style={styles.screen}>
      {isLoading ? (
        // <Spinner
        //   visible={isLoading}
        //   textContent={'Please wait ...'}
        //   color={Colors.btnGreen}
        //   textStyle={{color: 'black'}}
        // />
        showChase(scale(30))
      ) : allProducts.length ? (
        <FlatList
          contentContainerStyle={styles.flatList}
          data={allProducts}
          renderItem={({item}) => (
            <Card style={styles.card}>
              <View style={styles.cardHeadingContainer}>
                <Text style={styles.cardTitle}>{item.name}</Text>
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
                <Text style={styles.cardDetails}>{item.description}</Text>
              </View>
              <Text style={styles.forSale}>For Sale : {item.for_sale}</Text>
              <View style={styles.isFree}>
                <Text style={styles.forSale}>
                  {item.is_free == 'True' ? 'Free' : 'Paid'}
                </Text>
              </View>
              <View style={styles.btnContainer}>
                <TouchableOpacity
                  style={styles.buttonEdit}
                  onPress={() =>
                    navigation.navigate('Product Edit', {
                      id: item.id,
                      name: item.name,
                      description: item.description,
                      price: item.price,
                      sample: item.sample,
                      book: item.book,
                      for_sale: item.for_sale,
                      is_free: item.is_free,
                      callback: callback,
                    })
                  }>
                  <Text style={styles.textStyle}>EDIT</Text>
                </TouchableOpacity>
              </View>
            </Card>
          )}
          numColumns={2}
          keyExtractor={item => item.id.toString()}
        />
      ) : (
        <Text style={styles.noProducts}>Add Products to View</Text>
      )}
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: 'white',
  },
  card: {
    alignItems: 'center',
    width: calcWidth(46),
    marginHorizontal: calcWidth(2),
    marginVertical: calcHeight(2),
  },
  cardHeadingContainer: {
    flexDirection: 'row',
    width: '70%',
    height: calcHeight(11),
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: calcHeight(2),
  },
  cardTitle: {
    height: '80%',
    alignSelf: 'center',
    fontFamily: 'sans-serif-medium',
    // fontSize: calcWidth(4.5),
    fontSize: scale(12),
  },
  line: {
    // borderBottomColor: '#447604',
    borderBottomColor: Colors.btnGreen,
    borderBottomWidth: calcWidth(1),
    borderRadius: deviceWidth / 2,
    width: '90%',
    overlayColor: 'hidden',
    paddingBottom: calcHeight(1),
  },
  cardImageContainer: {
    width: calcHeight(20),
    height: calcHeight(20),
    borderRadius: calcHeight(20) / 2,
    marginVertical: calcHeight(2),
    overflow: 'hidden',
    // resizeMode: 'cover',
    // borderWidth: 1,
    // borderColor: Colors.accent,
    // backgroundColor: 'red',
  },
  cardImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  cardDetailsContainer: {
    width: '90%',
    marginBottom: calcHeight(2),
  },
  cardDetails: {
    fontSize: calcWidth(4),
    fontFamily: 'serif',
    height: calcHeight(6),
  },
  btnContainer: {
    width: '90%',
    height: calcHeight(10),
    alignContent: 'center',
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  NA: {
    textAlign: 'center',
    fontFamily: 'sans-serif-medium',
    color: Colors.primary,
    fontSize: calcWidth(4),
  },
  noProducts: {
    textAlign: 'center',
    fontFamily: 'sans-serif-medium',
    color: Colors.primary,
    fontSize: calcWidth(4),
  },
  forSale: {
    textAlign: 'center',
    fontFamily: 'sans-serif-medium',
    fontSize: calcWidth(4),
  },
  isFree: {
    // backgroundColor: Colors.inputHolder,
    padding: calcWidth(2),
    borderBottomWidth: 2,
    borderBottomColor: Colors.richDarkCyan,
  },
  buttonEdit: {
    backgroundColor: Colors.signOut,
    alignSelf: 'center',
    justifyContent: 'center',
    width: calcWidth(20),
    borderRadius: deviceWidth / 20,
    padding: calcWidth(3),
    elevation: 2,
    height: calcHeight(5),
  },
  textStyle: {
    color: 'white',
    textAlign: 'center',
    fontSize: calcWidth(4),
  },
});
export default ManageProducts;
