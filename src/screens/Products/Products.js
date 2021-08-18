import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  Linking,
} from 'react-native';

//constants
import {image_url} from 'constants/url';

//components
import Card from 'components/reusable/Card';

// context
import {UserContext} from 'context/UserContext';

//zoom lihtbox - image viewer
import {SingleImage} from 'react-native-zoom-lightbox';

//splash screen
import SplashScreen from 'react-native-splash-screen';

import Subscriptions from './Subscriptions/Subscriptions';

import {getProducts} from './products.actions';
import {showChase} from 'constants/loading';
import styles from './products.styles';
import Colors from 'constants/colors';
import Spinner from 'react-native-loading-spinner-overlay';
import {scale} from 'react-native-size-matters';
import {apiCall} from 'constants/axiosCalls';

const Product = ({navigation}) => {
  const [products, setProducts] = useState([]);
  const [updatedProducts, setUpdatedProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [currentPage, setCurrentPage] = useState();
  const [totalPages, setTotalPages] = useState();

  const {storedUserData} = useContext(UserContext);
  let isMounted;

  useEffect(() => {
    checkVersion();
    navigation.addListener('focus', () => {
      checkVersion();
    });
  }, []);

  const checkVersion = async () => {
    const version = 2;
    const url =
      'https://play.google.com/store/apps/details?id=com.saraighatdigital';

    apiCall(
      {
        method: 'GET',
        url: `getVersion`,
        data: null,
      },
      (res, err) => {
        if (!err) {
          if (version !== res.data) {
            Alert.alert('New Update', 'Update app to continue..', [
              {text: 'Update Now', onPress: () => Linking.openURL(url)},
            ]);
          }
        }
      },
    );
  };

  useEffect(() => {
    // console.log('eff1');
    isMounted = true;
    // setIsLoading(true);
    getProducts(
      {
        setProducts,
        setIsLoading,
        setCurrentPage,
        setTotalPages,
      },
      handleProducts,
    );
    navigation.addListener('focus', () => {
      getProducts(
        {
          setProducts,
          setIsLoading,
          setCurrentPage,
          setTotalPages,
        },
        handleProducts,
      );
    });
    SplashScreen.hide();
  }, [storedUserData]);

  // useEffect(() => {
  //   console.log('eff2');
  //   setProducts(updatedProducts);
  //   setIsRefreshing(false);
  // }, [updatedProducts]);

  const handleProducts = res => {
    // console.log('handleProd');
    // setUpdatedProducts([]);
    // // console.log(res);
    // if (res.length) {
    //   products.push(...res);
    //   setUpdatedProducts(products);
    // }
    if (res.length) {
      // if (isMounted) {
      setProducts(res);
      // }
    }
  };

  const refreshProducts = res => {
    // console.log('refershProd');
    // setUpdatedProducts([]);
    if (res.length) {
      // products.length = 0;
      // products.push(res);
      setProducts(res);
      // setUpdatedProducts(products);
      setIsRefreshing(false);
    }
  };

  const loadMoreProducts = res => {
    // console.log('loadmore', res);
    if (res.length) {
      products.push(...res);
      // setUpdatedProducts(products);
    }
  };

  const handleRefresh = () => {
    // console.log('handelRefre');
    setIsRefreshing(true);
    getProducts(
      {
        setCurrentPage,
        setTotalPages,
      },
      refreshProducts,
    );
  };

  const handlePagination = () => {
    let nextPage = currentPage + 1;
    // console.log('pagination');
    // console.log('currentPage', currentPage);
    // console.log('nextPage', nextPage);
    if (!isLoadingMore) {
      if (nextPage < totalPages) {
        // console.log('if');
        getProducts(
          {
            setIsLoadingMore,
            nextPage,
            setCurrentPage,
            setTotalPages,
          },
          loadMoreProducts,
        );
      }
    }
  };

  const listFooterComponent = () => {
    return isLoadingMore ? (
      <View>
        <ActivityIndicator size="large" color={Colors.richDarkCyan} />
      </View>
    ) : null;
  };

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
      ) : products.length ? (
        <>
          <Subscriptions
            storedUserData={storedUserData}
            navigation={navigation}
            setIsLoading={setIsLoading}
          />
          <FlatList
            contentContainerStyle={styles.flatList}
            data={products}
            onRefresh={handleRefresh}
            refreshing={isRefreshing}
            onEndReached={handlePagination}
            onEndReachedThreshold={0.5}
            ListFooterComponent={listFooterComponent}
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
                {/* <View style={styles.btnContainer}>
                  {item.for_sale == 'False' ? (
                    <Text style={styles.NA}>Currently Unavailable</Text>
                  ) : (
                    <ProductButtonCounter
                      product={item}
                      navigation={navigation}
                    />
                  )}
                </View> */}
              </Card>
            )}
            numColumns={2}
            keyExtractor={item => item.id.toString()}
          />
        </>
      ) : (
        <Text style={styles.noProducts}>Add Products to View</Text>
      )}
    </View>
  );
};

export default Product;
