import React, {useState, useEffect, createContext} from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';
export const UserContext = createContext();

const UserContextProvider = props => {
  const [storedUserData, setStoredUserData] = useState({});
  const [newData, setNewData] = useState({});

  useEffect(() => {
    getUserData();
  }, [newData]);

  const getUserData = async () => {
    try {
      await AsyncStorage.getItem('userDetails').then(userDetails => {
        if (userDetails !== null) {
          const val = JSON.parse(userDetails);
          setStoredUserData(val);
        } else {
          // console.log('error');
        }
      });
    } catch (e) {
      // console.log(e);
    }
  };

  return (
    <UserContext.Provider
      value={{
        getUserData,
        storedUserData,
        setNewData,
        newData,
      }}>
      {props.children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
