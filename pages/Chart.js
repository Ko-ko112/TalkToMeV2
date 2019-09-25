import 'babel-polyfill'
import React from 'react'
import {ScrollView, StatusBar, Dimensions, Text} from 'react-native'
import ScrollableTabView from 'react-native-scrollable-tab-view'
import FlashMessage, {showMessage} from 'react-native-flash-message'

import PieChart from '../src/pie-chart'


import { pieChartData } from '../data'

const chartConfigs = [
  
  {
    backgroundColor: '#C3E4FF',
    backgroundGradientFrom: '#ffffff',
    backgroundGradientTo: '#ffffff',
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`
  },
]

export default class App extends React.Component {
  renderTabBar() {
    return <StatusBar hidden />
  }

  render() {
    const {width} = Dimensions.get('window')
    const height = 220
    return (
      <ScrollableTabView renderTabBar={this.renderTabBar}>
        {chartConfigs.map(chartConfig => {
          const labelStyle = {
            color: chartConfig.color(),
            marginVertical: 10,
            textAlign: 'center',
            fontSize: 16
          }
          const graphStyle = {
            marginVertical: 8,
            ...chartConfig.style
          }
          return (

            <ScrollView
              key={Math.random()}
              style={{
                backgroundColor: chartConfig.backgroundColor
              }}
            >
              
              <FlashMessage duration={1000} />
           
              
              <Text style={labelStyle}>สถิติผู้ป่วยทั่วโลก</Text>
              <PieChart
                data={pieChartData}
                height={height}
                width={width}
                chartConfig={chartConfig}
                accessor="population"
                style={graphStyle}
                backgroundColor="transparent"
                paddingLeft="15"
              />
              
            
            
            </ScrollView>
          )
        })}
      </ScrollableTabView>
    )
  }
}
