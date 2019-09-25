import React, { Component } from 'react';
import { TextInput, StyleSheet, Text, View, TouchableOpacity, Image, FlatList, AsyncStorage, Dimensions, ScrollView, Alert } from 'react-native';
import ImagePicker from 'react-native-image-picker';
import firebase from 'firebase';
import uuid from 'uuid/v4'; // Import UUID to generate UUID

import User from '../User'
import AwesomeButton from "react-native-really-awesome-button/src/themes/cartman";
import { Avatar } from 'react-native-elements';
import Mybutton from '../pages/components/Mybutton';

const options = {
  title: 'Select Image',
  storageOptions: {
    skipBackup: true,
    path: 'images'
  }
};

export default class App extends Component {
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

  //
  state = {
    imgSource: '',
    uploading: false,
    progress: 0,
    images: []
  };
  componentDidMount() {
    let images;
    AsyncStorage.getItem('images')
      .then(data => {
        images = JSON.parse(data) || [];
        this.setState({
          images: images
        });
      })
      .catch(error => {
        console.log(error);
      });
  }
  /**
   * Select image method
   */
  pickImage = () => {
    ImagePicker.showImagePicker(options, response => {
      if (response.didCancel) {
        console.log('You cancelled image picker 😟');
      } else if (response.error) {
        alert('And error occured: ', response.error);
      } else {
        const source = { uri: response.uri };
        this.setState({
          imgSource: source,
          imageUri: response.uri
        });
      }
    });
  };
  /**
   * Upload image method
   */
  uploadImage = () => {
    const ext = this.state.imageUri.split('.').pop(); // Extract image extension
    const filename = `${uuid()}.${ext}`; // Generate unique name
    this.setState({ uploading: true });
    firebase
      .storage()
      .ref(`tutorials/images/${filename}`)
      .putFile(this.state.imageUri)
      .on(
        firebase.storage.TaskEvent.STATE_CHANGED,
        snapshot => {
          let state = {};
          state = {
            ...state,
            progress: (snapshot.bytesTransferred / snapshot.totalBytes) * 100 // Calculate progress percentage
          };
          if (snapshot.state === firebase.storage.TaskState.SUCCESS) {
            const allImages = this.state.images;
            allImages.push(snapshot.downloadURL);
            state = {
              ...state,
              uploading: false,
              imgSource: '',
              imageUri: '',
              progress: 0,
              images: allImages
            };
            AsyncStorage.setItem('images', JSON.stringify(allImages));
          }
          this.setState(state);
        },
        error => {
          unsubscribe();
          alert('Sorry, Try again.');
        }
      );
  };
  /**
   * Remove image from the state and persistance storage
   */
  removeImage = imageIndex => {
    let images = this.state.images;
    images.pop(imageIndex);
    this.setState({ images });
    AsyncStorage.setItem('images', JSON.stringify(images));
  };
  render() {
    const { uploading, imgSource, progress, images } = this.state;
    const windowWidth = Dimensions.get('window').width;
    const disabledStyle = uploading ? styles.disabledBtn : {};
    const actionBtnStyles = [styles.btn, disabledStyle];
    return (
      <View style={styles.container}>
        <ScrollView>
          <View >
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
            <TouchableOpacity
              style={actionBtnStyles}
              onPress={this.pickImage}
              disabled={uploading}
            >
              <View>
                <Text style={styles.btnTxt}>Pick image</Text>
              </View>
            </TouchableOpacity>
            {/** Display selected image */}
            {imgSource !== '' && (
              <View>
                <Image source={imgSource} style={styles.image} />
                {uploading && (
                  <View
                    style={[styles.progressBar, { width: `${progress}%` }]}
                  />
                )}
                <TouchableOpacity
                  style={actionBtnStyles}
                  onPress={this.uploadImage}
                  disabled={uploading}
                >
                  <View>
                    {uploading ? (
                      <Text style={styles.btnTxt}>Uploading ...</Text>
                    ) : (
                        <Text style={styles.btnTxt}>Upload image</Text>
                      )}
                  </View>
                </TouchableOpacity>
              </View>
            )}

            <View>
              <Text
                style={{
                  fontWeight: '600',
                  paddingTop: 20,
                  alignSelf: 'center'
                }}
              >
                {images.length > 0
                  ? 'Your uploaded images'
                  : 'There is no image you uploaded'}
              </Text>
            </View>

          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#D2EFFF'
  },
  btn: {
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 20,
    backgroundColor: 'rgb(3, 154, 229)',
    marginTop: 20,
    alignItems: 'center'
  },
  disabledBtn: {
    backgroundColor: 'rgba(3,155,229,0.5)'
  },
  btnTxt: {
    color: '#fff'
  },
  image: {
    marginTop: 20,
    minWidth: 200,
    height: 200,
    resizeMode: 'contain',
    backgroundColor: '#ccc',
  },
  img: {
    flex: 1,
    height: 100,
    margin: 5,
    resizeMode: 'contain',
    borderWidth: 1,
    borderColor: '#eee',
    backgroundColor: '#ccc'
  },
  progressBar: {
    backgroundColor: 'rgb(3, 154, 229)',
    height: 3,
    shadowColor: '#000',
  }
});