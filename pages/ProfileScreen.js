import React from 'react';
import { TouchableOpacity, View, Image, SectionList, StyleSheet, Text, SafeAreaView, TextInput, Alert } from 'react-native';
import Mybutton from '../pages/components/Mybutton';
import User from '../User'
import AsyncStorage from '@react-native-community/async-storage';
import firebase from 'firebase';
import AwesomeButton from "react-native-really-awesome-button/src/themes/cartman";
import { Avatar } from 'react-native-elements';
import ImagePicker from 'react-native-image-picker';



export default class ProfileScreen extends React.Component {

  state = {
    name: User.name
  }
  handleChange = key => val => {
    this.setState({ [key]: val })
  }
  changeName = async () => {
    if (this.state.name.length < 3) {
      Alert.alert('Error', 'please enter');
    }
    if (User.name !== this.state.name) {
      firebase.database().ref('users').child(User.phone).set({ name: this.state.name });
      User.name = this.state.name;
      Alert.alert('Success', 'Name change successful')
    }
  }

  render() {
    return (
      <View style={styles.container}>

        <Avatar
          size="xlarge"
          rounded
          title="CR"
          onPress={() => Alert.alert('work')}
          activeOpacity={0.7}
          source={{
            uri:
              'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
          }}
          showEditButton
         
        />


        <Text style={{ fontSize: 20 }}>{User.phone}</Text>
        <Text style={{ fontSize: 20 }}>{User.name}</Text>

        <TextInput
          style={styles.input}
          placeholder=" เปลี่ยนชื่อ"
          value={this.state.name}
          onChangeText={this.handleChange('name')}
        />

        <AwesomeButton
          onPress={this.changeName}>
          <Text style={{ color: 'white', paddingBottom: 10 }}>        เปลี่ยนชื่อ       </Text>
        </AwesomeButton>

        <Mybutton
          title="ดูบัททึกผลสรุป"
          customClick={() => this.props.navigation.navigate('Result')}
        />


      </View>
    );
  }
}

const styles = StyleSheet.create({
  input: {
    padding: 10,
    paddingBottom: 10,
    borderWidth: 1,
    borderColor: '#000000',
    width: '85%',
    marginBottom: 10,
    borderRadius: 5,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#D2EFFF'

  },
});

const options = {
  title: 'Select Image',
  storageOptions: {
    skipBackup: true,
    path: 'images'
  }
};





/*
  render() {
    let pic = {
      uri: 'https://www.img.in.th/images/338e27ebbea6eea44c747e1437fa8bc7.png'
    };
    return (

      <View style={{ marginTop: 10, flex: 1, }}>


        <View style={{ padding: 10, alignItems: 'center' }}>
          <Image source={pic} style={{ width: 100, height: 100 }} />
        </View>

        <View style={styles.container}>
          <SectionList
            sections={[
              { title: 'บัญชี', data: ['ชื่อ Admin', 'เบอร์โทร 5513', 'เพศ Male'] },

            ]}
            renderItem={({ item }) => <Text style={styles.item}>{item}</Text>}
            renderSectionHeader={({ section }) => <Text style={styles.sectionHeader}>{section.title}</Text>}
            keyExtractor={(item, index) => index}
          />
          <Mybutton
            title="ดูบัททึกผลสรุป"
            customClick={() => this.props.navigation.navigate('Result')}
          />
          <Mybutton
            title="แก้ไขข้อมูล"
            customClick={() => this.props.navigation.navigate('Web')}
          />

        </View>

      </View>
    );
  }
}

*/