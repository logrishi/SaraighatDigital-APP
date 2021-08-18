import React, {useContext} from 'react';
import {StyleSheet, StatusBar, TouchableOpacity} from 'react-native';

//constants
import {deviceWidth, calcHeight, calcWidth} from 'constants/deviceConfig';
import Colors from 'constants/colors';

//components
// import Badge from 'components/reusable/Badge';

//context
// import {CartContext} from 'context/CartContext';
import {UserContext} from '/context/UserContext';

//fonts
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// import Ionicons from 'react-native-vector-icons/Ionicons';

// react-navigation
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

//screens
import Products from 'screens/Products';
// import Freebies from '../screens/products/Freebies';

// import Cart from 'screens/cart/Cart';
// import CheckOut from 'screens/cart/CheckOut';
// import Payment from 'screens/cart/Payment';

import Library from '../screens/MyLibrary';
// import MyBooks from 'screens/myBooks/MyBooks';
import ViewBook from 'screens/MyLibrary/ViewBooks';

import Account from 'screens/account/Account';
import OrderDetails from 'screens/account/OrderDetails';
import Registration from 'screens/account/Auth/Registration';
import Login from 'screens/account/Auth/Login';
import Logout from 'screens/account/Auth/Logout';
import ForgotPassword from 'screens/account/Auth/PasswordReset/ForgotPassword';
import EnterOtp from 'screens/account/Auth/PasswordReset/EnterOtp';
import EnterNewPassword from 'screens/account/Auth/PasswordReset/EnterNewPassword';

import {isAdmin, isLoggedIn} from 'constants/handleErrors';

//admin screens
import ProductEntry from 'screens/Admin/ProductEntry';
import ManageProducts from 'screens/Admin/ManageProducts';
import ProductEdit from 'screens/Admin/ProductEdit';
import ManageOrders from '/screens/Admin/ManageOrders';
import ManageOrderDetails from '../screens/Admin/ManageOrderDetails';
import ManageSubscriptions from '../screens/Admin/ManageSubscriptions';

import {getFocusedRouteNameFromRoute} from '@react-navigation/native';

//Product Stack
const ProductsStack = createStackNavigator();
const ProductsStackScreen = props => {
  // const {cartQty} = useContext(CartContext);
  const {storedUserData} = useContext(UserContext);
  let accessToken = isLoggedIn(storedUserData);
  let admin = isAdmin(storedUserData);

  //// hide tabs in cart screen
  const {navigation, route} = props;
  // if (route.state && route.state.index > 0) {
  //   navigation.setOptions({tabBarVisible: false});
  // } else {
  //   navigation.setOptions({tabBarVisible: true});
  // }

  return (
    <ProductsStack.Navigator
      screenOptions={{
        gestureEnabled: true,
        headerTintColor: Colors.black,
        headerTitleStyle: {
          fontSize:
            deviceWidth > 800
              ? calcWidth(4)
              : deviceWidth > 500
              ? calcWidth(4.5)
              : calcWidth(5.5),
        },
      }}>
      {accessToken && admin ? (
        <ProductsStack.Screen
          name="Products"
          component={Products}
          options={{
            title: 'Saraighat Digital',
            headerLeft: () => (
              <TouchableOpacity
                onPress={() => {
                  navigation.openDrawer();
                }}>
                <Entypo
                  name="menu"
                  color={Colors.black}
                  size={
                    deviceWidth > 800
                      ? calcWidth(4)
                      : deviceWidth > 500
                      ? calcWidth(6)
                      : calcWidth(7)
                  }
                  style={{paddingLeft: calcWidth(4)}}
                />
              </TouchableOpacity>
            ),
          }}
        />
      ) : (
        <ProductsStack.Screen
          name="Products"
          component={Products}
          options={{
            title: 'Saraighat Digital',
          }}
        />
      )}
    </ProductsStack.Navigator>
  );
};

//MyBooksStack Stack
const MyBooksStack = createStackNavigator();
const MyBooksStackScreen = props => {
  const {navigation, route} = props;

  const routeName = getFocusedRouteNameFromRoute(route);
  if (routeName == 'View Book') {
    navigation.setOptions({tabBarVisible: false});
  } else {
    navigation.setOptions({tabBarVisible: true});
  }
  return (
    <MyBooksStack.Navigator
      screenOptions={{
        gestureEnabled: true,
        headerTintColor: Colors.black,
        headerTitleStyle: {
          fontSize:
            deviceWidth > 800
              ? calcWidth(4)
              : deviceWidth > 500
              ? calcWidth(4.5)
              : calcWidth(5.5),
        },
      }}>
      <MyBooksStack.Screen
        name="Library"
        component={Library}
        options={{
          title: 'Library',
        }}
        // backgroundColor={Colors.black}
      />
      {/* <MyBooksStack.Screen
        name="MyBooks"
        component={MyBooks}
        // options={{
        //   title: 'My Library',
        // }}
        // backgroundColor={Colors.black}
      /> */}
      <MyBooksStack.Screen
        name="View Book"
        component={ViewBook}
        options={({route}) => ({
          title: route.params.name,
        })}
      />
    </MyBooksStack.Navigator>
  );
};

//AccountStack
const AccountStack = createStackNavigator();
const AccountStackScreen = () => {
  const {storedUserData} = useContext(UserContext);
  let accessToken = isLoggedIn(storedUserData);

  return (
    <AccountStack.Navigator
      screenOptions={{
        gestureEnabled: true,
        headerTintColor: Colors.black,
        headerTitleStyle: {
          fontSize:
            deviceWidth > 800
              ? calcWidth(4)
              : deviceWidth > 500
              ? calcWidth(4.5)
              : calcWidth(5.5),
        },
      }}>
      <AccountStack.Screen
        name="Account"
        component={Account}
        options={{
          headerRight: () => (accessToken ? <Logout /> : null),
        }}
      />
      <AccountStack.Screen
        name="OrderDetails"
        component={OrderDetails}
        options={({route}) => ({
          title: `Order No - ${route.params.orderId}`,
        })}
      />
      <AccountStack.Screen name="Login" component={Login} />
      <AccountStack.Screen name="Registration" component={Registration} />
      <AccountStack.Screen name="Logout" component={Logout} />
      <AccountStack.Screen name="Forgot Password" component={ForgotPassword} />
      <AccountStack.Screen name="Enter Otp" component={EnterOtp} />
      <AccountStack.Screen
        name="Enter New Password"
        component={EnterNewPassword}
      />
    </AccountStack.Navigator>
  );
};

// //ProductsEntry Stack
const ProductEntryStack = createStackNavigator();
const ProductEntryStackScreen = props => {
  const {navigation} = props;

  return (
    <ProductEntryStack.Navigator
      screenOptions={{
        gestureEnabled: true,
        headerTintColor: Colors.black,
        headerTitleStyle: {
          fontSize:
            deviceWidth > 800
              ? calcWidth(4)
              : deviceWidth > 500
              ? calcWidth(4.5)
              : calcWidth(5.5),
        },
      }}>
      <ProductEntryStack.Screen
        name="ProductEntry"
        component={ProductEntry}
        options={{
          title: 'Books Entry',
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => {
                navigation.openDrawer();
              }}>
              <Entypo
                name="menu"
                color={Colors.black}
                size={
                  deviceWidth > 800
                    ? calcWidth(4)
                    : deviceWidth > 500
                    ? calcWidth(6)
                    : calcWidth(8)
                }
                style={{paddingLeft: calcWidth(4)}}
              />
            </TouchableOpacity>
          ),
        }}
        backgroundColor={Colors.black}
      />
    </ProductEntryStack.Navigator>
  );
};

//Manage Products
const ManageProductsStack = createStackNavigator();
const ManageProductsStackScreen = props => {
  const {navigation} = props;

  return (
    <ManageProductsStack.Navigator
      screenOptions={{
        gestureEnabled: true,
        headerTintColor: Colors.black,
        headerTitleStyle: {
          fontSize:
            deviceWidth > 800
              ? calcWidth(4)
              : deviceWidth > 500
              ? calcWidth(4.5)
              : calcWidth(5.5),
        },
      }}>
      <ManageProductsStack.Screen
        name="Manage Products"
        component={ManageProducts}
        options={{
          title: 'Manage Products',
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => {
                navigation.openDrawer();
              }}>
              <Entypo
                name="menu"
                color={Colors.black}
                size={
                  deviceWidth > 800
                    ? calcWidth(4)
                    : deviceWidth > 500
                    ? calcWidth(6)
                    : calcWidth(8)
                }
                style={{paddingLeft: calcWidth(4)}}
              />
            </TouchableOpacity>
          ),
        }}
        backgroundColor={Colors.black}
      />
      <ManageProductsStack.Screen
        name="Product Edit"
        component={ProductEdit}
        options={({route}) => ({
          title: `Edit - ${route.params.name}`,
        })}
      />
    </ManageProductsStack.Navigator>
  );
};

//Manage Orders
const ManageOrdersStack = createStackNavigator();
const ManageOrdersStackScreen = props => {
  const {navigation} = props;

  return (
    <ManageOrdersStack.Navigator
      screenOptions={{
        gestureEnabled: true,
        headerTintColor: Colors.black,
        headerTitleStyle: {
          fontSize:
            deviceWidth > 800
              ? calcWidth(4)
              : deviceWidth > 500
              ? calcWidth(4.5)
              : calcWidth(5.5),
        },
      }}>
      <ManageOrdersStack.Screen
        name="Manage Orders"
        component={ManageOrders}
        options={{
          title: 'Manage Orders',
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => {
                navigation.openDrawer();
              }}>
              <Entypo
                name="menu"
                color={Colors.black}
                size={
                  deviceWidth > 800
                    ? calcWidth(4)
                    : deviceWidth > 500
                    ? calcWidth(6)
                    : calcWidth(8)
                }
                style={{paddingLeft: calcWidth(4)}}
              />
            </TouchableOpacity>
          ),
        }}
        backgroundColor={Colors.black}
      />
      <ManageOrdersStack.Screen
        name="Manage Order Details"
        component={ManageOrderDetails}
        options={({route}) => ({
          title: `Order No - ${route.params.orderId}`,
        })}
      />
    </ManageOrdersStack.Navigator>
  );
};

//Manage Subscriptions
const ManageSubscriptionsStack = createStackNavigator();
const ManageSubscriptionsStackScreen = props => {
  const {navigation} = props;

  return (
    <ManageSubscriptionsStack.Navigator
      screenOptions={{
        gestureEnabled: true,
        headerTintColor: Colors.black,
        headerTitleStyle: {
          fontSize:
            deviceWidth > 800
              ? calcWidth(4)
              : deviceWidth > 500
              ? calcWidth(4.5)
              : calcWidth(5.5),
        },
      }}>
      <ManageSubscriptionsStack.Screen
        name="Manage Subscriptions"
        component={ManageSubscriptions}
        options={{
          title: 'Manage Subscriptions',
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => {
                navigation.openDrawer();
              }}>
              <Entypo
                name="menu"
                color={Colors.black}
                size={
                  deviceWidth > 800
                    ? calcWidth(4)
                    : deviceWidth > 500
                    ? calcWidth(6)
                    : calcWidth(8)
                }
                style={{paddingLeft: calcWidth(4)}}
              />
            </TouchableOpacity>
          ),
        }}
        backgroundColor={Colors.black}
      />
      <ManageSubscriptionsStack.Screen
        name="Manage Order Details"
        component={ManageOrderDetails}
        options={({route}) => ({
          title: `Order No - ${route.params.orderId}`,
        })}
      />
    </ManageSubscriptionsStack.Navigator>
  );
};

//BottomTabs
const BottomTabs = createBottomTabNavigator();
const BottomTabsScreen = () => {
  return (
    <BottomTabs.Navigator
      tabBarOptions={{
        activeTintColor: Colors.black,
        keyboardHidesTabBar: true,
      }}>
      <BottomTabs.Screen
        name="Books"
        component={ProductsStackScreen}
        options={{
          tabBarIcon: ({color, size}) => (
            <Entypo
              name="book"
              color={color}
              size={deviceWidth > 800 ? calcWidth(4) : size}
            />
          ),
        }}
      />

      {/* <BottomTabs.Screen
        name="Freebies"
        component={FreebiesStackScreen}
        options={{
          tabBarIcon: ({color, size}) => (
            <Ionicons
              name="md-cloud-done"
              color={color}
              size={deviceWidth > 800 ? calcWidth(4) : size}
            />
          ),
        }}
      /> */}

      <BottomTabs.Screen
        name="My Library"
        component={MyBooksStackScreen}
        options={{
          tabBarIcon: ({color, size}) => (
            <Entypo
              name="open-book"
              color={color}
              size={deviceWidth > 800 ? calcWidth(4) : size}
            />
          ),
        }}
      />
      <BottomTabs.Screen
        name="Account"
        component={AccountStackScreen}
        options={{
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons
              name="account"
              color={color}
              size={deviceWidth > 800 ? calcWidth(4) : size}
            />
          ),
        }}
      />
    </BottomTabs.Navigator>
  );
};

//Drawer
const Drawer = createDrawerNavigator();
const Nav = () => {
  const {storedUserData} = useContext(UserContext);
  let accessToken = isLoggedIn(storedUserData);
  let admin = isAdmin(storedUserData);

  return (
    <NavigationContainer>
      {accessToken && admin ? (
        <Drawer.Navigator>
          <Drawer.Screen name="Products" component={BottomTabsScreen} />
          <Drawer.Screen
            name="Product Entry"
            component={ProductEntryStackScreen}
          />
          <Drawer.Screen
            name="Manage Products"
            component={ManageProductsStackScreen}
          />
          <Drawer.Screen
            name="Manage Orders"
            component={ManageOrdersStackScreen}
          />
          <Drawer.Screen
            name="Manage Subscriptions"
            component={ManageSubscriptionsStackScreen}
          />
        </Drawer.Navigator>
      ) : (
        BottomTabsScreen()
      )}
      <StatusBar
        // translucent
        // backgroundColor="transparent"
        barStyle="dark-content"
        // barStyle="light-content"
        backgroundColor="#ffffff"
      />
    </NavigationContainer>
  );
};
const styles = StyleSheet.create({
  badgeStyle: {
    position: 'absolute',
    top: -4,
    right: 5,
  },
  badgeContainer: {
    flexDirection: 'row',
  },
});
export default Nav;
