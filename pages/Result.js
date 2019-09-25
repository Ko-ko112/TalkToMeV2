import React from 'react';
import { View, Button, Text, DatePickerAndroid, Image} from 'react-native';
import Mybutton from './components/Mybutton';
import { ScrollView } from 'react-native-gesture-handler';


export default class Result extends React.Component {

   constructor() {
      super();
      this.state = { iyear : '', imonth : '', iday : ''}
   }

   render() {
      let pic = {
         uri: 'https://www.img.in.th/images/ae13fd37f20073b62567ca44e6fa6d10.png'
        };
      return(   
            <ScrollView style={{ backgroundColor: '#D2EFFF' }}> 
         <View style={{ marginTop : 10, flex : 1, alignItems : "center"}}>

            <Text style={{fontSize:25}}>เลือกวันที่ต้องการดูประวัติย้อนหลัง</Text>

            <Button title="เปิดปฏิทิน"
             onPress={ async () => {
              const { action, year, month, day } = await DatePickerAndroid.open(
                 {date : new Date() ,
                  minDate:new Date(2019,0,1),
                  maxDate:new Date()});
              if (action === DatePickerAndroid.dateSetAction) 
              { this.setState({ iyear : year, imonth: month, iday: day }); }
              if (action === DatePickerAndroid.dismissedAction)                         
              { console.log("Dismissed"); }
             }}
            />
            <Text>{this.state.iday} {this.state.imonth} {this.state.iyear}</Text>

            <View  style={{ padding:10 ,alignItems: 'center'}}>
            <Image source={pic} style={{width: 300, height: 300}}/>  
            </View>

            <Text style={{padding:20, fontSize:25, color: '#FFD800'}}>คุณมีอาการของโณคซึมเศร้าระดับปานกลาง</Text>
             
            <Mybutton
             title="ฟังเพลง"
            customClick={() => this.props.navigation.navigate('Web')}
            />

         </View>
         </ScrollView>
      );
   }
}

