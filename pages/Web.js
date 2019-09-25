import React, {Component} from 'react';
import { WebView } from 'react-native-webview';

export default class IWeb extends Component {
  render() {
    return (
	<WebView
        source={{uri: 'https://www.youtube.com/watch?v=S9bCLPwzSC0&list=RDS9bCLPwzSC0&start_radio=1'}}
        style={{marginTop: 20}}
      />
    );
  }
}
