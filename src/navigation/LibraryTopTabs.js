import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import Colors from 'constants/colors';
import SubscribedBooks from 'screens/MyLibrary/SubscribedBooks';
import Freebies from 'screens/MyLibrary/Freebies';

//Material Top Tabs
const Tabs = createMaterialTopTabNavigator();
export const LibraryTopTabs = () => {
  return (
    <Tabs.Navigator
      tabBarOptions={{
        indicatorStyle: {backgroundColor: Colors.richDarkCyan},
        labelStyle: {
          textTransform: 'none',
        },
        activeTintColor: Colors.richDarkCyan,
        inactiveTintColor: Colors.black,
      }}
      backBehavior={'none'}
      // lazy={true}
    >
      <Tabs.Screen name="Free Books" component={Freebies} />
      <Tabs.Screen name="Subscription Books" component={SubscribedBooks} />
    </Tabs.Navigator>
  );
};
