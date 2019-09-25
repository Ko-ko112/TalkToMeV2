//This is an example code for Bottom Navigation//
import React from 'react';
import { Button, Text, View, TouchableOpacity, StyleSheet } from 'react-native';
//import all the basic component we have used
import Ionicons from 'react-native-vector-icons/Ionicons';

import {createAppContainer} from 'react-navigation';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {createStackNavigator} from 'react-navigation-stack';
 
import HomeScreen from './HomeScreen';
import Chat from './Chat'
import SettingsScreen from './SettingsScreen';
import ProfileScreen from './ProfileScreen';
import Result from './Result';
import Web from './Web';
import Chart from './Chart'
import ImgPick from './ImgPick'


const HomeStack = createStackNavigator(
  {
    //Defination of Navigaton from home screen
    Home: { screen: HomeScreen },
    Chart: { screen: Chart}
  },
  {
    defaultNavigationOptions: {
      //Header customization of the perticular Screen
      headerStyle: {
        backgroundColor: '#F8305F',
      },
      headerTintColor: '#FFFFFF',
      title: 'Home',
      //Header title
    },
  }
);

const ChatStack = createStackNavigator(
  {
    //Defination of Navigaton from home screen
    Chat: { screen: Chat },
  },
  {
    defaultNavigationOptions: {
      //Header customization of the perticular Screen
      headerStyle: {
        backgroundColor: '#F8305F',
      },
      headerTintColor: '#FFFFFF',
      title: 'Talk To Me',
      //Header title
    },
  }
);

const ProfileStack = createStackNavigator(
  {
    //Defination of Navigaton from home screen
    Profile: { screen: ProfileScreen },
    Result: { screen: Result },
    Web: { screen: Web },
  },
  {
    defaultNavigationOptions: {
      //Header customization of the perticular Screen
      headerStyle: {
        backgroundColor: '#F8305F',
      },
      headerTintColor: '#FFFFFF',
      title: 'Profile',
      //Header title
    },
  }
);

const SettingsStack = createStackNavigator(
  {
    //Defination of Navigaton from setting screen
    Settings: { screen: SettingsScreen },
    ImgPick:{ screen: ImgPick }
    
    
  
  },
  {
    defaultNavigationOptions: {
      //Header customization of the perticular Screen
      headerStyle: {
        backgroundColor: '#F8305F',
      },
      headerTintColor: '#FFFFFF',
      title: 'Settings',
      //Header title
    },
  }
);
const Menu = createBottomTabNavigator(
  {
    Home: { screen: HomeStack },
    Chat: { screen: ChatStack },
    Profile: { screen: ProfileStack },
    Settings:{ screen: SettingsStack }
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        let IconComponent = Ionicons;
        let iconName;
        if (routeName === 'Home') {
          iconName = `ios-information-circle`;
        }
        if (routeName === 'Settings') {
          iconName = `ios-checkmark-circle`;
        }
        if (routeName === 'Chat') {
          iconName = `ios-chatbubbles`;
        }
        if (routeName === 'Profile') {
          iconName = `ios-contact`;
        }
        return <IconComponent name={iconName} size={25} color={tintColor} />;
      },
    }),
    tabBarOptions: {
      activeTintColor: '#7FCCFF',
      inactiveTintColor: 'gray',
    },
  }
);

export default createAppContainer(Menu);