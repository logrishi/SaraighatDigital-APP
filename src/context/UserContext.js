import React, {createContext, useEffect, useState} from 'react';

// import {useNavigation} from '@react-navigation/native';
import {getData} from 'constants/asyncStorage';

//context
export const UserContext = createContext();
const UserContextProvider = props => {
  const [storedUserData, setStoredUserData] = useState();
  const [showLogin, setShowLogin] = useState();
  // const [isAuthenticating, setIsAuthenticating] = useState(false);
  // const navigation = useNavigation();

  // useEffect(() => {
  //   if (showLogin) {
  //     navigation.navigate('Accounts', {
  //       screen: 'Login',
  //     });
  //   }
  // }, [showLogin]);

  useEffect(() => {
    getData(
      'userDetails',
      userDetails => {
        if (userDetails !== null) {
          userDetails = JSON.parse(userDetails);
          setStoredUserData(userDetails);
        } else {
          setStoredUserData();
        }
      },
      e => {},
    );
    // return () => source.cancel('Operation canceled by the user.');
  }, []);

  return (
    <UserContext.Provider
      value={{
        setStoredUserData,
        storedUserData,
        setShowLogin,
        showLogin,
        // setIsAuthenticating,
        // isAuthenticating,
      }}>
      {props.children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
