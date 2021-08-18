import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

//constants
import Colors from 'constants/colors';
import {calcWidth, calcHeight} from 'constants/deviceConfig';

//react-native-elements
import {Input} from 'react-native-elements';

const CustomInput = ({formikProps, value, name, ...props}) => {
  return (
    <View style={{...props.styles}}>
      <View style={styles.input}>
        <Input
          {...props}
          onChangeText={formikProps.handleChange(name)}
          onBlur={formikProps.handleBlur(name)}
          style={{...props.style}}
          errorStyle={styles.clientErrorText}
          errorMessage={formikProps.touched[name] && formikProps.errors[name]}
        />
      </View>
      {/* client val error */}
      {/* <View style={{...styles.clientErrorContainer, ...props.style}}>
        <Text style={{...styles.clientErrorText, ...props.style}}>
          {formikProps.touched[name] && formikProps.errors[name]}
        </Text>
      </View> */}
      {/* server val error - do manually where customInput used */}
    </View>
  );
};

const styles = StyleSheet.create({
  clientErrorContainer: {
    alignSelf: 'center',
  },
  clientErrorText: {
    color: Colors.primary,
    alignSelf: 'center',
  },
});

export default CustomInput;
