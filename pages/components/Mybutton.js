/*Custom Button*/
import React from 'react';
import AwesomeButton from "react-native-really-awesome-button/src/themes/cartman";
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
const Mybutton = props => {
  return (
    <AwesomeButton style={styles.button} onPress={props.customClick}>
      <Text style={styles.text}>{props.title}</Text>
    </AwesomeButton>
  );
};
 
const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent:'center',
    padding: 10,
   
  },
  text: {
    color: '#ffffff',
  },
});
export default Mybutton;