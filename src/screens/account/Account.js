import React, {useContext, useState, useEffect} from 'react';
import {View, Text, Button, StyleSheet, Linking} from 'react-native';

//constants
import {calcHeight, calcWidth} from 'constants/deviceConfig';
import Colors from 'constants/colors';
import {base_url} from 'constants/url';

//components
import CustomButton from 'components/reusable/CustomButton';
import CustomButtonSquare from 'components/reusable/CustomButtonSquare';

//context
import {UserContext} from '/context/UserContext';

//spinner overlay
import Spinner from 'react-native-loading-spinner-overlay';

//screen
import Orders from 'screens/account/Orders';

//db
import axios from 'axios';
import {isLoggedIn} from 'constants/handleErrors';
import {scale} from 'react-native-size-matters';
import {showChase} from 'constants/loading';

const Account = ({navigation}) => {
  const {storedUserData} = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(false);
  let accessToken = isLoggedIn(storedUserData);

  // const [data, setData] = useState();

  // useEffect(() => {
  //   // setIsLoading(true);
  //   setTimeout(() => {
  //     setIsLoading(false);
  //   }, 2000);
  // }, [storedUserData]);

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
      ) : accessToken && !storedUserData.errors ? (
        <View style={{flex: 1}}>
          <Orders navigation={navigation} storedUserData={storedUserData} />
        </View>
      ) : (
        <View style={styles.btnHolder}>
          <CustomButtonSquare
            title="Login"
            onPress={() => navigation.navigate('Login')}
            style={styles.btn}
          />

          <CustomButtonSquare
            title="Sign Up"
            onPress={() => navigation.navigate('Registration')}
            style={styles.btn}
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
  btnHolder: {
    backgroundColor: Colors.inputHolder,
    marginVertical: calcHeight(12),
    alignItems: 'center',
  },
  btn: {
    width: calcWidth(40),
    marginVertical: calcHeight(2),
    backgroundColor: 'white',
    alignItems: 'center',
    alignSelf: 'center',
    color: 'black',
    fontFamily: 'sans-serif-medium',
    fontSize: calcHeight(2),
  },
});

export default Account;
