import React, {useContext, useEffect, useState} from 'react';
import {View, StyleSheet, Text, Modal, TouchableOpacity} from 'react-native';

//constants
import {deviceWidth, calcHeight, calcWidth} from 'constants/deviceConfig';
import Colors from 'constants/colors';
import {base_url} from 'constants/url';

// fonts
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

//context
import {UserContext} from 'context/UserContext';
// import {CartContext} from 'context/CartContext';

//spinner overlay
import Spinner from 'react-native-loading-spinner-overlay';

//usenavigation
import {useNavigation} from '@react-navigation/native';

//push notification
import PushNotification from 'react-native-push-notification';
import {isLoggedIn} from 'constants/handleErrors';
import {callSignOut} from './auth.actions';
import {scale} from 'react-native-size-matters';
import {showChase, showChaseModal} from 'constants/loading';

const Logout = () => {
  const navigation = useNavigation();
  const {storedUserData, setStoredUserData} = useContext(UserContext);
  // const {cartQty, cartItems, emptyCart} = useContext(CartContext);
  // const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [token, setToken] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  let accessToken = isLoggedIn(storedUserData);

  useEffect(() => {
    getToken();
    return getToken();
  }, []);

  const getToken = () => {
    PushNotification.configure({
      onRegister: function (token) {
        setToken(token.token);
      },
    });
  };

  const signOutUser = () => {
    callSignOut(token, {
      accessToken,
      setIsLoading,
      setStoredUserData,
      navigation,
      setModalVisible,
    });

    // axios
    //   .post(
    //     `${base_url}/logout`,
    //     {
    //       token: token,
    //     },
    //     config,
    //   )
    //   .then(res => {
    //     // setUserData({});
    //     removeLocalStorage({});
    //     // console.log('res', res.data);
    //     navigation.navigate('Products', {
    //       screen: 'Books',
    //     });
    //     // navigation.navigate('Account');
    //     setIsLoading(false);
    //   })
    //   .catch(function (error) {
    //     // console.log('logout', error);
    //     setIsLoading(false);
    //   });
  };

  // const saveCartToDB = () => {
  //   setIsLoading(true);
  //   setModalVisible(!modalVisible);
  //   axios
  //     .post(
  //       `${base_url}/cart`,
  //       {
  //         userId: storedUserData.user.id,
  //         cart: cartItems,
  //         cartQty: cartQty,
  //       },
  //       config,
  //     )
  //     .then(res => {
  //       // console.log('res', res.data);
  //       emptyCart();
  //       signOutUser();
  //     })
  //     .catch(function (error) {
  //       // console.log('cart', error);
  //       setIsLoading(false);
  //     });
  // };

  return (
    <View>
      {isLoading ? (
        // <Spinner
        //   visible={isLoading}
        //   textContent={'Please wait ...'}
        //   color={Colors.btnGreen}
        //   textStyle={{color: 'black'}}
        //   overlayColor="rgb(153, 153, 153)"
        // />
        showChaseModal(scale(30))
      ) : (
        <View style={styles.centeredView}>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}>
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <TouchableOpacity
                  style={{...styles.cancel}}
                  onPress={() => {
                    setModalVisible(!modalVisible);
                  }}>
                  <Text style={styles.textStyle}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{...styles.signout}}
                  onPress={signOutUser}>
                  <Text style={styles.textStyle}>SignOut</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>

          <TouchableOpacity
            onPress={() => {
              setModalVisible(true);
            }}>
            <FontAwesome5
              name="power-off"
              color={Colors.accent}
              size={
                deviceWidth > 800
                  ? calcWidth(4)
                  : deviceWidth > 500
                  ? calcWidth(6.5)
                  : calcWidth(7)
              }
              style={{paddingRight: 20}}
            />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    flexDirection: 'row',
    width: calcWidth(60),
    alignSelf: 'center',
    justifyContent: 'space-around',
    backgroundColor: '#ead7d7',
    backgroundColor: Colors.inputHolder,
    borderRadius: deviceWidth / 20,
    padding: calcWidth(8),
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 8,
  },
  cancel: {
    backgroundColor: 'white',
    width: calcWidth(22),
    borderRadius: deviceWidth / 20,
    padding: calcWidth(3),
    elevation: 2,
    marginRight: calcWidth(2),
  },
  signout: {
    backgroundColor: Colors.signOut,
    width: calcWidth(22),
    borderRadius: deviceWidth / 20,
    padding: calcWidth(3),
    elevation: 2,
    marginLeft: calcWidth(2),
  },
  textStyle: {
    color: 'black',
    textAlign: 'center',
    fontSize: calcWidth(4),
  },
});
export default Logout;
