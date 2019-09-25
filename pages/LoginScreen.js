import React from 'react';
import { View, Text, Alert, TextInput, StyleSheet, Image, TouchableOpacity } from 'react-native';
import AwesomeButton from "react-native-really-awesome-button/src/themes/cartman";import User from '../User'
import firebase from 'firebase';
import AsyncStorage from '@react-native-community/async-storage';


export default class LoginScreen extends React.Component {
  static navigationOption = {
    header: null
  }

  state = {
    phone: '',
    name: ''
  }

  handleChange = key => val => {
    this.setState({ [key]: val })
  }


  submitFrom = async () => {
    if (this.state.phone.length < 10) {
      Alert.alert('Error', 'Wrong phone number')
    } else if (this.state.name.length < 3) {
      Alert.alert('Error', 'Wrong name')
    } else {
      await AsyncStorage.setItem('userPhone', this.state.phone);
      User.phone = this.state.phone;
      firebase.database().ref('users/' + User.phone).set({ name: this.state.name });
      this.props.navigation.navigate('App');
    }
  }

  render() {
    return (
      <View style={styles.container}>

        <Text style={{ fontSize: 25, justifyContent: 'center', alignItems: 'center' }}>เข้าสู่ระบบ</Text>

        <TextInput
          placeholder="Phone number"
          keyboardType="number-pad"
          style={styles.input}
          value={this.state.phone}
          onChangeText={this.handleChange('phone')}
        />
        <TextInput
          placeholder="name"
          style={styles.input}
          value={this.state.name}
          onChangeText={this.handleChange('name')}
        />

        <AwesomeButton
          onPress={this.submitFrom}>
          <Text>        Login       </Text>
        </AwesomeButton>
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#7FCCFF'
  },
  input: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#000000',
    width: '90%',
    marginBottom: 10,
    borderRadius: 10
  }
})