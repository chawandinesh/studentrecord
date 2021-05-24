import React, {useEffect, useState} from 'react';
import {View, Text} from 'react-native';
import firebaseAuth from '@react-native-firebase/auth';
import {Icon} from 'native-base';
import firebaseFireStore from '@react-native-firebase/firestore';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import Login from '../screens/Login';
import Signup from '../screens/SignUp';
import Home from '../screens/Home';
import ProfilePage from '../screens/Profile';
import Details from '../screens/Details';
import TeacherForm from '../screens/TeacherForm';
import StudentForm from '../screens/StudentForm'
import {CurrentUser} from '../controllers';
import ShowDetails from '../screens/ShowDetails';
import ShowReceived from '../screens/ShowReceived'
import Notifications from '../screens/Notifications';

const Stack = createStackNavigator();
const Tab = createMaterialBottomTabNavigator();
export default function Routes() {
  const [authState, setAuthState] = React.useState({
    isLoggedIn: false,
    loaded: false,
    loginUser: {},
  });

  React.useEffect(() => {
    firebaseAuth().onAuthStateChanged(user => {
      if (!user) {
        setAuthState({...authState, isLoggedIn: false, loaded: true});
      } else {
        setAuthState({...authState, isLoggedIn: true, loaded: true});
      }
    });
  }, []);

  

  const TabNav = () => {
    return (
      <Tab.Navigator
        barStyle={{backgroundColor: '#25383C'}}
        activeColor="#f0edf6"
        inactiveColor="#999">
        <Tab.Screen
          name="Dashboard"
          component={Details}
          options={{
            tabBarLabel: 'Users List',
            tabBarIcon: ({tintColor, focused}) => (
              <View>
                {focused ? (
                  <Icon
                    type="FontAwesome"
                    style={[{color: '#fff'}]}
                    size={25}
                    name={'file-text'}
                  />
                ) : (
                  <Icon
                    type="FontAwesome"
                    style={[{color: '#999'}]}
                    size={25}
                    name={'file-text-o'}
                  />
                )}
              </View>
            ),
          }}
        />

        <Tab.Screen
          name="Profile"
          component={ProfilePage}
          options={{
            tabBarLabel: 'Profile',
            tabBarIcon: ({tintColor, focused}) => (
              <View>
                {focused ? (
                  <Icon
                    type="FontAwesome"
                    style={[{color: '#fff'}]}
                    size={25}
                    name={'user'}
                  />
                ) : (
                  <Icon
                    type="FontAwesome"
                    style={[{color: '#999'}]}
                    size={25}
                    name={'user-o'}
                  />
                )}
              </View>
            ),
          }}
        />
         <Tab.Screen
          name="Notifications"
          component={Notifications}
          options={{
            tabBarLabel: 'Notifications',
            tabBarIcon: ({tintColor, focused}) => (
              <View>
                {focused ? (
                  <Icon
                    type="Ionicons"
                    style={[{color: '#fff'}]}
                    size={25}
                    name={'ios-notifications-sharp'}
                  />
                ) : (
                  <Icon
                    type="Ionicons"
                    style={[{color: '#999'}]}
                    size={25}
                    name={'ios-notifications-outline'}
                  />
                )}
              </View>
            ),
          }}
        />
      </Tab.Navigator>
    );
  };

  const StackNav = () => {
    return (
      <Stack.Navigator
        screenOptions={{headerShown: false}}
        initialRouteName={'Home'}>
        <Stack.Screen name="Home" component={TabNav} />
        <Stack.Screen name="ShowDetails" component={ShowDetails}/>
        <Stack.Screen name="ShowReceived" component={ShowReceived}/>
      </Stack.Navigator>
    );
  };

  if (!authState.loaded) {
    return (
      <View style={{flex: 1, justifyContent: 'center'}}>
        <Text>Loading...</Text>
      </View>
    );
  }
  if (!authState.isLoggedIn) {
    return (
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{headerShown: false}}
          initialRouteName="Login">
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Signup" component={Signup} />
          <Stack.Screen name="TeacherForm" component={TeacherForm} />
          <Stack.Screen name="StudentForm" component={StudentForm} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  } else {
    return (
      <NavigationContainer>
        {/* <TabNav /> */}
        <StackNav/>
      </NavigationContainer>
    );
  }
}
