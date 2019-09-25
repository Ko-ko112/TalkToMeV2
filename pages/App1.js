/*Home Screen With buttons to navigate to diffrent options*/
import React from 'react';
import { View, Platform, StyleSheet, Text, Image, ScrollView, Alert, ImageBackground } from 'react-native';
import Mybutton from './components/Mybutton';




const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#7FCCFF'
  },
  appname: {
    fontSize: 75,
    textAlign: 'center',
    margin: 10,
    marginTop: 50,
    color: '#E346FF',
  }
});

export default class App extends React.Component {
  constructor(props) {
    super()
    this.state = {
      showME: true
    }

  }

  componentWillMount() {
    setTimeout(() => {
      this.setState({
        showME: false
      })
    }, 3000)
  }

  render() {

    let pic = {
      uri: 'https://www.img.in.th/images/f8e5ebe9cded5c57c7de4cc8b4bacc86.png'
    };

    return (
      <View style={styles.container}>
        {
          this.state.showME ?
            <Image source={pic} style={{ width: 300, height: 300 }} />
            :

            <View>

              <View style={styles.container}>



                <Text style={styles.appname}>Talk To Me</Text>
                <Image source={pic} style={{ marginTop: 30, width: 300, height: 300, marginBottom: 50 }} />


                <View style={{ flex: 1, alignContent: 'center' }}>


                  <Mybutton
                    title="      เข้าใช้งาน      "
                    customClick={() => this.props.navigation.navigate('Menu')}
                  />


                </View>



              </View>

            </View>
        }
      </View>



    );
  }
}




