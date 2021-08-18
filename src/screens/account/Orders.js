import React, {useContext, useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
  Linking,
} from 'react-native';

//constants
import {
  edviceHeight,
  deviceWidth,
  calcHeight,
  calcWidth,
} from 'constants/deviceConfig';
import {base_url} from 'constants/url';
import Colors from 'constants/colors';

//spinner overlay
import Spinner from 'react-native-loading-spinner-overlay';

//icons
import Feather from 'react-native-vector-icons/Feather';

//db
import axios from 'axios';

//react-native-elements
import {Divider} from 'react-native-elements';
import {getOrders, handleData} from './orders.actions';
import {isLoggedIn} from 'constants/handleErrors';
import {scale} from 'react-native-size-matters';
import {showChase} from 'constants/loading';

const Orders = ({navigation, storedUserData}) => {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  // const [count, setOrders] = useState([]);
  let accessToken = isLoggedIn(storedUserData);

  useEffect(() => {
    // setIsLoading(true);
    getOrders({setIsLoading, setOrders, accessToken, navigation});
    navigation.addListener('focus', () => {
      getOrders({setIsLoading, setOrders, accessToken, navigation});
    });
  }, []);

  // const organiseData = data => {
  //   handleData(data, {setOrders});
  // };

  // const getOrders = () => {
  //   const accessToken = storedUserData.auth.access_token;
  //   const config = {
  //     headers: {Authorization: `Bearer ${accessToken}`},
  //   };
  //   axios
  //     .get(`${base_url}/orders`, config)
  //     .then(res => {
  //       // console.log(res.data);
  //       organiseData(res.data);
  //       setIsLoading(false);
  //     })
  //     .catch(error => {
  //       // console.log(error);
  //       setIsLoading(false);
  //     });
  // };

  // const organiseData = data => {
  //   let orderArr = [];
  //   let count = 1;
  //   data.map(item => {
  //     item.order_items.map(orderItem => {
  //       let exists = orderArr.find(e => e.orderId == item.id);
  //       if (!exists) {
  //         orderArr.push({
  //           orderId: item.id,
  //           totalPrice: item.total_price,
  //           orderDate: item.created_at,
  //           receipt: item.receipt,
  //           products: [
  //             {
  //               name: orderItem.product_name,
  //               price: orderItem.price,
  //               count: 1,
  //             },
  //           ],
  //         });
  //       } else {
  //         var currIndex = orderArr.indexOf(exists);
  //         count++;
  //         orderArr[currIndex].products.push({
  //           name: orderItem.product_name,
  //           price: orderItem.price,
  //           count: count,
  //         });
  //       }
  //     });
  //   });
  //   setOrders(orderArr);
  // };

  return (
    <View style={{flex: 1}}>
      <View style={styles.pageHeadingContainer}>
        <Text style={styles.pageTitle}>
          Hi {storedUserData.user.name} Your Orders
        </Text>
        <View style={styles.msg}>
          <Text style={styles.msgText}>For payment disputes -</Text>
          <TouchableOpacity
            onPress={() =>
              Linking.openURL('mailto:dr.dilip_sarmah@saraighatdigital.com')
            }>
            <Text style={styles.emailText}>
              {/* dr.dilip_sarmah@saraighatdigital.com */}
              Touch Here
            </Text>
          </TouchableOpacity>
        </View>
        {/* {orders.length > 0 ? (
          <View style={styles.msg}>
            <Text style={styles.msgText}>For payment disputes -</Text>
            <TouchableOpacity
              onPress={() =>
                Linking.openURL('mailto:dr.dilip_sarmah@saraighatdigital.com')
              }>
              <Text style={styles.emailText}>
                Touch Here
              </Text>
            </TouchableOpacity>
          </View>
        ) : null} */}
      </View>
      {isLoading ? (
        // <Spinner
        //   visible={isLoading}
        //   textContent={'Please wait ...'}
        //   color={Colors.btnGreen}
        //   textStyle={{color: 'black'}}
        // />
        showChase(scale(30))
      ) : orders.length == 0 ? (
        <View>
          <Text style={styles.pageTitle}>You Have No Orders</Text>
        </View>
      ) : (
        <View style={{flex: 1}}>
          <FlatList
            data={orders}
            renderItem={({item}) => (
              <View>
                <View style={styles.card}>
                  <View style={styles.cardItems}>
                    <View style={styles.iconContainer}>
                      <Feather
                        name="check-circle"
                        color={Colors.richDarkCyan}
                        size={calcWidth(6)}
                        style={styles.btnIcon}
                      />
                    </View>
                    <View style={styles.details}>
                      <Text style={styles.text}>
                        Ordered on: {item.created_at}
                      </Text>
                      {/* <Text>You Purchased {item.products.length} Books</Text> */}
                      {/* {item.products.map(e => ( */}
                      <View style={styles.serial}>
                        {/* <Text style={styles.text}>{e.count}. </Text> */}
                        <Text style={styles.text}>{item.name}</Text>
                      </View>
                      {/* ))} */}
                    </View>
                  </View>
                  <View style={styles.price}>
                    <Text style={styles.text}>Order Total: </Text>
                    <Text style={styles.text}>₹ {item.price}</Text>
                    <Text style={styles.text}>
                      Expires on: {item.expires_on}
                    </Text>
                  </View>
                  {/* <View style={styles.nextIcon}>
                    <TouchableOpacity>
                      <MaterialIcons
                        name="navigate-next"
                        color={Colors.richDarkCyan}
                        size={calcWidth(8)}
                        onPress={() =>
                          navigation.navigate('OrderDetails', {
                            orderId: item.orderId,
                            products: item.products,
                          })
                        }
                      />
                    </TouchableOpacity>
                  </View> */}
                </View>
                <View style={styles.dividerContainer}>
                  <Divider style={styles.divider} />
                </View>
              </View>
            )}
            keyExtractor={item => item.id.toString()}
            // ItemSeparatorComponent={showSeparator}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  // screen: {
  //   flex: 1,
  // },
  pageHeadingContainer: {
    backgroundColor: Colors.inputHolder,
    // height: calcHeight(8),
    alignItems: 'center',
    justifyContent: 'center',
  },
  pageTitle: {
    fontFamily: 'sans-serif-medium',
    fontSize: calcWidth(4),
    alignSelf: 'center',
  },
  msg: {
    alignItems: 'center',
  },
  msgText: {
    fontFamily: 'sans-serif-medium',
    fontSize: calcWidth(3),
  },
  emailText: {
    fontFamily: 'sans-serif-medium',
    fontSize: calcWidth(3.5),
    color: Colors.btnBlue,
  },
  card: {
    justifyContent: 'center',
    marginHorizontal: calcHeight(2),
    flexDirection: 'row',
    marginTop: calcHeight(2),
    width: calcWidth(92),
  },
  cardItems: {
    flexDirection: 'row',
    alignItems: 'center',
    width: calcWidth(70),
    // backgroundColor: 'red',
  },
  iconContainer: {
    marginHorizontal: calcWidth(4),
  },
  serial: {
    flexDirection: 'row',
  },
  details: {
    width: calcWidth(40),
  },
  price: {
    width: calcWidth(30),
    justifyContent: 'center',
    alignSelf: 'center',
    // backgroundColor: 'green',
  },
  divider: {
    // height: 1,
    backgroundColor: Colors.divider,
    marginTop: calcHeight(1),
  },
  text: {
    fontFamily: 'sans-serif-medium',
    // fontSize: deviceWidth < 350 ? calcWidth(3.5) : calcWidth(3.5),
    fontSize: calcWidth(3.5),
  },
  // nextIcon: {
  //   justifyContent: 'center',
  //   alignSelf: 'center',
  //   width: calcWidth(8),
  //   // backgroundColor: 'yellow',
  //   marginHorizontal: calcWidth(2),
  // },
});

export default Orders;
