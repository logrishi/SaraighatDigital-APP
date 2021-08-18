import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeData = async (key, value, callback) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
    // console.log('nkkj');
    callback(true);
  } catch (e) {
    callback(false);
    console.log('Error in saving data', e);
  }
};

export const getData = async (key, callback, failed) => {
  try {
    const value = await AsyncStorage.getItem(key);
    callback(value);
  } catch (e) {
    failed(e);
    console.log('Error in getting data');
  }
};

export const removeData = async (key, callback) => {
  try {
    const value = await AsyncStorage.removeItem(key);
    // if (value == null) {
    callback(value);
    //}
  } catch (e) {
    console.log('Error in removing data');
  }
};

export const removeAllData = async (keys, callback) => {
  try {
    const value = await AsyncStorage.multiRemove(keys);
    // if (value == null) {
    callback(value);
    //}
  } catch (e) {
    console.log('Error in removing data');
  }
};
