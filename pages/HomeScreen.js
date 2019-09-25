import React from 'react';
import { Text, View, StyleSheet, Image, ActivityIndicator, AsyncStorage } from 'react-native';
import User from '../User';
import Mybutton from './components/Mybutton'

export default class HomeScreen extends React.Component {
  constructor() {
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

  state = {
    users: []
  }

  render() {

    let pic = {
      uri: 'https://www.img.in.th/images/f8e5ebe9cded5c57c7de4cc8b4bacc86.png'
    };

    return (

      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#D2EFFF'}}>
        {
          this.state.showME ?
            <ActivityIndicator size="large" color="#ff0000" />

            :

            <View>
              <Text style={{ marginTop: 50, fontSize: 25, textAlign: 'center' }}>Talk To Me</Text>

              <Text style={{ fontSize: 20, textAlign: 'center', paddingBottom: 20 }}> 
                สวัสดีคุณ {User.phone}
              </Text>

              <Image source={pic} style={{ width: 250, height: 250, justifyContent: 'center' }} />

              <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <Mybutton
                  title="      แชท      "
                  customClick={() => this.props.navigation.navigate('Chat')}
                />
                <Mybutton
                  title="      กราฟ      "
                  customClick={() => this.props.navigation.navigate('Chart')}
                />
              </View>

            </View>
        }
      </View>

    );
  }
}





//<Image source={pic} style={{width: 300, height: 300}}/>