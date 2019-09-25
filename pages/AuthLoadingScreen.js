import React,{Component} from 'react';
import {ActivityIndicator,StatusBar,View} from 'react-native';
import User from '../User';
import AsyncStorage from '@react-native-community/async-storage';

import firebase from 'firebase';

export default class AuthLoading extends React.Component{
    constructor(props){
        super(props);
        this._bootstrapAsync();
    }
    componentWillMount(){
        var firebaseConfig = {
            apiKey: "AIzaSyDfxVlMfphN-fMAbBF3alJTgqV2ghsvews",
            authDomain: "twmapp.firebaseapp.com",
            databaseURL: "https://twmapp.firebaseio.com",
            projectId: "twmapp",
            storageBucket: "twmapp.appspot.com",
            messagingSenderId: "1088146278004",
            appId: "1:1088146278004:web:f4cb5e070b113f38fd3321"
          };
          // Initialize Firebase
          firebase.initializeApp(firebaseConfig);
        }

    _bootstrapAsync = async () => {
        User.phone  = await AsyncStorage.getItem('userPhone');
        this.props.navigation.navigate(User.phone ? 'App': 'Auth');
    };

    render(){
        return(
            <View>
                <ActivityIndicator />
                <StatusBar barStyle="default" />
            </View>
        );
    }
}
