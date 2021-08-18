import React, {useEffect, useState, useContext} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableWithoutFeedback,
  ActivityIndicator,
  SafeAreaView,
} from 'react-native';

//constants
import {calcHeight, calcWidth} from 'constants/deviceConfig';
import Colors from 'constants/colors';
import {base_url} from 'constants/url';

//spinner overlay
import Spinner from 'react-native-loading-spinner-overlay';

//react-native-elements
import {Divider} from 'react-native-elements';

//fonts
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';

//context
import {UserContext} from 'context/UserContext';

//db
import axios from 'axios';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {scale} from 'react-native-size-matters';
import {showChase} from 'constants/loading';

const ManageSubscriptions = ({navigation}) => {
  const {storedUserData} = useContext(UserContext);
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // setIsLoading(true);
    getOrders();
    navigation.addListener('focus', () => {
      getOrders();
    });
  }, []);

  const getOrders = () => {
    setIsLoading(true);
    const accessToken = storedUserData.auth.access_token;
    const config = {
      headers: {Authorization: `Bearer ${accessToken}`},
    };
    axios
      .get(`${base_url}/subscriptionOrders`, config)
      .then(res => {
        // console.log(res.data);
        organiseData(res.data);
        setIsLoading(false);
      })
      .catch(error => {
        // console.log(error);
        setIsLoading(false);
      });
  };
  const organiseData = data => {
    let orderArr = [];
    data.map(item => {
      orderArr.push({
        id: item.id,
        price: item.price,
        orderDate: item.created_at,
        receipt: item.receipt,
        expires_on: item.expires_on,
        razorpayOrderId: item.payment.razorpay_order_id,
        razorpayPaymentId: item.payment.razorpay_payment_id,
        customer: item.user.name,
        phoneNo: item.user.phone_no,
        email: item.user.email,
        orderId: item.id,
      });
    });
    setOrders(orderArr);
  };

  return (
    <View style={styles.screen}>
      <View style={styles.pageHeadingContainer}>
        <Text style={styles.pageTitle}>
          Hi {storedUserData.user.name} Your Orders
        </Text>
      </View>
      {isLoading ? (
        // <Spinner
        //   visible={isLoading}
        //   textContent={'Please wait ...'}
        //   color={Colors.btnGreen}
        //   textStyle={{color: 'black'}}
        // />
        showChase(scale(30))
      ) : !orders.length > 0 ? (
        <View>
          <Text style={styles.pageTitle}>You have no orders!</Text>
        </View>
      ) : (
        <View style={styles.screen}>
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
                      <Text style={styles.text}>Order: {item.orderId}</Text>
                      {/* {item.products.map(e => (
                        <View style={styles.serial} key={e.count}>
                          <Text>{e.name}</Text>
                        </View>
                      ))} */}
                    </View>
                  </View>
                  <View style={styles.price}>
                    <Text style={styles.text}>{item.customer}</Text>
                    {/* <Text style={styles.text}>Order Total:</Text>
                    <Text>₹ {item.price}</Text> */}
                    <Text style={styles.text}>Order Date: </Text>
                    <Text>{item.orderDate}</Text>
                    <Text style={styles.text}>Expires On: </Text>
                    <Text>{item.expires_on}</Text>
                  </View>
                  <View style={styles.nextIcon}>
                    <TouchableOpacity>
                      <MaterialIcons
                        name="navigate-next"
                        color={Colors.richDarkCyan}
                        size={calcWidth(8)}
                        onPress={() =>
                          navigation.navigate('Manage Order Details', {
                            orderId: item.orderId,
                            orderDate: item.orderDate,
                            receipt: item.receipt,
                            rrazorpayOrderId: item.razorpayOrderId,
                            razorpayPaymentId: item.razorpayPaymentId,
                            customer: item.customer,
                          })
                        }
                      />
                    </TouchableOpacity>
                  </View>
                </View>
                <View style={styles.dividerContainer}>
                  <Divider style={styles.divider} />
                </View>
              </View>
            )}
            keyExtractor={item => item.orderId.toString()}
            // ItemSeparatorComponent={showSeparator}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: 'white',
  },
  pageHeadingContainer: {
    backgroundColor: Colors.inputHolder,
    height: calcHeight(5),
    alignItems: 'center',
    justifyContent: 'center',
  },
  pageTitle: {
    fontFamily: 'sans-serif-medium',
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
    width: calcWidth(60),
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
    justifyContent: 'center',
    alignSelf: 'center',
    width: calcHeight(15),
  },
  nextIcon: {
    justifyContent: 'center',
    alignSelf: 'center',
    marginHorizontal: calcWidth(2),
  },
  divider: {
    // height: 1,
    backgroundColor: Colors.divider,
    marginTop: calcHeight(2),
  },
  text: {
    fontFamily: 'sans-serif-medium',
  },
});
export default ManageSubscriptions;
