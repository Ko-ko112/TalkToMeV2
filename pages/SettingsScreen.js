import React from 'react';
import { Switch, Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import AwesomeButton from "react-native-really-awesome-button/src/themes/cartman";

import Mybutton from './components/Mybutton'


export default class SettingsScreen extends React.Component {
  state = { department: '' }
  updateDepartment = (department) => {
    this.setState({ department: department })
  }

  _logout = async () => {
    await AsyncStorage.clear();
    this.props.navigation.navigate('Auth');
  }

  toggleSwitch1 = (value) => {
    this.setState({ switch1Value: value })
  }
  constructor() {
    super();
    this.state = {
      switch1Value: false,
    }
  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: '#D2EFFF' }}>

        <View style={{ alignItems: 'flex-start' }}>
          <Text style={{ fontSize: 25 }}>การแจ้งเตือน</Text>
          <Switch onValueChange={this.toggleSwitch1} value={this.state.switch1Value} />
        </View>

        <View style={{ flex: 1, justifyContent: 'flex-end', paddingBottom: 25, alignItems: 'center' }}>
          <AwesomeButton onPress={this._logout}>
            <Text>ออกจากระบบ</Text>
          </AwesomeButton>

          
        </View>

      </View>
    );
  }
}



const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
    width: 300,
    marginTop: 16,
  },
});


/*
<Mybutton
            title="      ทดสอบอัพรูป     "
            customClick={() => this.props.navigation.navigate('ImgPick')}
          />

          */