import React, {useState, useContext, useEffect} from 'react';
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
} from 'react-native';

//constants
import {calcHeight, calcWidth} from 'constants/deviceConfig';
import Colors from 'constants/colors';
import {base_url} from 'constants/url';

//context
import {UserContext} from '/context/UserContext';

//spinner overlay
import Spinner from 'react-native-loading-spinner-overlay';

//rn picker
import {Picker} from '@react-native-picker/picker';

//usenavigation
import {useNavigation, StackActions} from '@react-navigation/native';

//db & forms & validation
import axios from 'axios';
import {Formik} from 'formik';
import * as yup from 'yup';

//rn image crop picker
import ImagePicker from 'react-native-image-crop-picker';

//rn document picker
import DocumentPicker from 'react-native-document-picker';

// react-native-elements
import {Input, Text, Button} from 'react-native-elements';

// fonts
import Entypo from 'react-native-vector-icons/Entypo';
import {updateProducts} from './manageAdmin.actions';
import {isLoggedIn} from 'constants/handleErrors';
import {scale} from 'react-native-size-matters';
import {showChase} from 'constants/loading';

const ProductEdit = ({route}) => {
  const {storedUserData} = useContext(UserContext);
  const [imagePath, setImagePath] = useState({path: route.params.sample});
  const [docPath, setDocPath] = useState({name: route.params.book});
  const [isLoading, setIsLoading] = useState(false);
  let accessToken = isLoggedIn(storedUserData);

  // const [msgSuccess, setMsgSuccess] = useState('');
  // const [msgError, setMsgError] = useState('');
  const navigation = useNavigation();

  // useEffect(() => {
  //   const timeOut = setTimeout(() => {
  //     setMsgSuccess('');
  //   }, 5000);
  //   return () => clearTimeout(timeOut);
  // }, [msgSuccess]);

  const validation = yup.object({
    name: yup.string().required('Enter Book Name'),
    // description: yup.string().required('Enter Book Description'),
    description: yup.string(),
    price: yup.string().required('Enter Price'),
    // sample: yup.string().notRequired(),
    // book: yup.string().notRequired(),
    for_sale: yup.string().notRequired(),
    is_free: yup.string().required('Select Free or Paid'),
  });

  // const options = {
  //   mediaType: 'photo',
  //   quality: 0.5,
  // };

  //rn community image picker
  const imgPicker = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      compressImageQuality: 0.8,
      // cropping: true,
    }).then(image => {
      // console.log(image);
      setImagePath(image);
    });
  };

  //rn file picker
  const docPicker = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.pdf],
      });
      // console.log(
      //   res.uri,
      //   res.type, // mime type
      //   res.name,
      //   res.size,
      // );
      setDocPath(res);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // User cancelled the picker, exit any dialogs or menus and move on
      } else {
        throw err;
      }
    }
  };

  // save to db
  const submitInput = values => {
    var photo = {
      uri: imagePath.path,
      type: imagePath.mime,
      name: imagePath.path,
    };
    var pdf = {
      uri: docPath.uri,
      type: docPath.type,
      name: docPath.name,
    };
    const formData = new FormData();
    formData.append('id', route.params.id);
    formData.append('name', values.name);
    formData.append('description', values.description);
    formData.append('price', values.price);

    // values.for_sale == 'False'
    //   ? formData.append('for_sale', 0)
    //   : formData.append('for_sale', 1);
    formData.append('for_sale', values.for_sale);
    formData.append('is_free', values.is_free);

    imagePath.path != route.params.sample
      ? formData.append('sample', photo)
      : formData.append('sample', null);
    docPath.name != route.params.book
      ? formData.append('book', pdf)
      : formData.append('book', null);

    // const accessToken = storedUserData.auth.access_token;
    // const config = {
    //   headers: {Authorization: `Bearer ${accessToken}`},
    // };
    // setIsLoading(true);
    // console.log(route.params);

    updateProducts(formData, {
      setImagePath,
      setDocPath,
      setIsLoading,
      navigation,
      accessToken,
      callback: route.params.callback,
    });

    // axios
    //   .post(`${base_url}/updateProducts`, formData, config)
    //   .then(res => {
    //     // console.log('d', res.data);
    //     // setMsgSuccess(res.data);
    //     setMsgError('');
    //     setImagePath('');
    //     setDocPath('');
    //     setIsLoading(false);
    //     navigation.goBack();
    //   })
    //   .catch(err => {
    //     // console.log('e', err);
    //     setMsgError('Error! Please try again!');
    //     setIsLoading(false);
    //   });
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
      ) : (
        <ScrollView>
          <View style={styles.allInputsContainer}>
            {/* {msgError ? <Text style={styles.msgError}>{msgError}</Text> : null} */}
            <Formik
              initialValues={{
                name: route.params.name,
                description: route.params.description,
                price: String(route.params.price),
                for_sale: route.params.for_sale,
                sample: imagePath,
                book: docPath,
                is_free: route.params.is_free,
              }}
              validationSchema={validation}
              onSubmit={values => {
                submitInput(values);
              }}>
              {formikProps => (
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                  <View>
                    <View>
                      <Input
                        label="Enter Book Name"
                        placeholder="Book Name"
                        onChangeText={formikProps.handleChange('name')}
                        value={formikProps.values.name}
                        onBlur={formikProps.handleBlur('name')}
                        errorStyle={styles.error}
                        errorMessage={
                          formikProps.touched.name && formikProps.errors.name
                        }
                      />

                      <Input
                        label="Enter Book Description"
                        placeholder="Book Description"
                        onChangeText={formikProps.handleChange('description')}
                        value={formikProps.values.description}
                        onBlur={formikProps.handleBlur('description')}
                        errorStyle={styles.error}
                        errorMessage={
                          formikProps.touched.description &&
                          formikProps.errors.description
                        }
                      />

                      <Input
                        label="Enter Price"
                        placeholder="Product Price"
                        onChangeText={formikProps.handleChange('price')}
                        value={formikProps.values.price}
                        onBlur={formikProps.handleBlur('price')}
                        keyboardType="numeric"
                        errorStyle={styles.error}
                        errorMessage={
                          formikProps.touched.price && formikProps.errors.price
                        }
                      />

                      <Text style={styles.picker}>
                        Select whether available for sale
                      </Text>
                      <Picker
                        mode="dropdown"
                        selectedValue={formikProps.values.for_sale}
                        onValueChange={itemValue =>
                          formikProps.setFieldValue('for_sale', itemValue)
                        }
                        name="for_sale">
                        <Picker.Item
                          label={route.params.for_sale}
                          value={route.params.for_sale == 'True' ? 1 : 0}
                        />
                        <Picker.Item
                          label={
                            route.params.for_sale == 'True' ? 'False' : 'True'
                          }
                          value={route.params.for_sale == 'True' ? 0 : 1}
                        />
                      </Picker>

                      <Text style={styles.picker}>
                        Select whether free or paid
                      </Text>
                      <Picker
                        mode="dropdown"
                        selectedValue={formikProps.values.is_free}
                        onValueChange={itemValue =>
                          formikProps.setFieldValue('is_free', itemValue)
                        }
                        name="is_free">
                        <Picker.Item
                          label={
                            route.params.is_free == 'True' ? 'Free' : 'Paid'
                          }
                          value={route.params.is_free == 'True' ? 1 : 0}
                        />
                        <Picker.Item
                          label={
                            route.params.is_free == 'True' ? 'Paid' : 'Free'
                          }
                          value={route.params.is_free == 'True' ? 0 : 1}
                        />
                      </Picker>

                      <View style={styles.imageInput}>
                        <Input
                          label="Enter Book Image"
                          placeholder="Book Image"
                          onChangeText={formikProps.handleChange('sample')}
                          value={imagePath.path}
                          onBlur={formikProps.handleBlur('sample')}
                          disabled
                          errorStyle={styles.error}
                          errorMessage={
                            formikProps.touched.sample &&
                            formikProps.errors.sample
                          }
                        />
                        <Entypo
                          name="upload"
                          color="black"
                          size={calcHeight(4)}
                          onPress={imgPicker}
                        />
                      </View>

                      <View style={styles.imageInput}>
                        <Input
                          label="Enter Book PDF"
                          placeholder="Book PDF"
                          onChangeText={formikProps.handleChange('book')}
                          // value={docPath[2]}
                          value={docPath.name}
                          onBlur={formikProps.handleBlur('book')}
                          disabled
                          errorStyle={styles.error}
                          errorMessage={
                            formikProps.touched.book && formikProps.errors.book
                          }
                        />
                        <Entypo
                          name="upload"
                          color="black"
                          size={calcHeight(4)}
                          onPress={docPicker}
                        />
                      </View>
                    </View>
                    <Button
                      title="Update"
                      raised
                      onPress={formikProps.handleSubmit}
                    />
                  </View>
                </TouchableWithoutFeedback>
              )}
            </Formik>
          </View>
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    backgroundColor: 'white',
    flex: 1,
  },
  allInputsContainer: {
    alignSelf: 'center',
    backgroundColor: Colors.inputHolder,
    width: calcWidth(80),
    marginTop: calcHeight(5),
  },
  imageInput: {
    flexDirection: 'row',
    alignItems: 'center',
    width: calcWidth(70),
  },
  error: {
    color: 'red',
    alignSelf: 'center',
    // marginBottom: calcHeight(2),
  },
  btnContainer: {
    width: calcWidth(30),
    alignSelf: 'center',
    paddingBottom: calcHeight(5),
  },
  button: {
    backgroundColor: Colors.accent,
    color: 'white',
  },
  msgSuccess: {
    textAlign: 'center',
    color: 'green',
  },
  msgError: {
    textAlign: 'center',
    color: 'red',
  },
  picker: {
    fontFamily: 'sans-serif-medium',
    fontSize: calcWidth(4),
    color: '#878484',
  },
});
export default ProductEdit;
