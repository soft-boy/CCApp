import React, { useState } from 'react';
import { View, Pressable } from 'react-native';
import styled from '@emotion/native';
import BarChart from './util/BarChart'
import colors from './util/colors'
import Text from './util/Text'

const Summary = styled.View`
  background-color: white;
  margin: 125px 20px 20px 20px;
  padding: 16px 12px;
  height: 315px;
  border-radius: 5px;
`

const Total = styled.View`
  background-color: ${colors.canaryYellow};
  margin: 6px 0;
  padding: 2px 7px;
  align-self: flex-start;
`

const totalStyle = {
  fontSize: 32,
  fontWeight: 'bold',
}

const titleStyle = {
  fontSize: 18,
  fontWeight: 'bold',
}

const RowSpaceBetween = styled.View`
  flex-direction: row;
  justify-content: space-between;
`

export default () => {
  return (
    <Summary>
      <RowSpaceBetween>
        <Text style={titleStyle}>Aug 2021</Text>
        <Text>expand</Text>
      </RowSpaceBetween>
      <Total>
        <Text style={totalStyle}>$1,090.58</Text>
      </Total>
      <RowSpaceBetween>
        <Text>Total Spending</Text>
        <Pressable
          style={({ pressed }) => ({
              opacity: pressed ? 0.3 : 1
            })
          }
        >
          <Text style={{color: '#2274A5'}}>28 Transactions</Text>
        </Pressable>
      </RowSpaceBetween>
      <SpendChart />
    </Summary>
  )
}

const data = {
  labels: ["29-4", "5-11", "12-18", "29-25", "26-2"],
  datasets: [
    {
      data: [20, 45, 28, 80, 99]
    }
  ]
}

const chartConfig = {
  backgroundGradientFrom: "#fff",
  backgroundGradientTo: "#fff",
  decimalPlaces: 0, // optional, defaults to 2dp
  color: (opacity) => `rgba(128, 128, 128, 1)`,
  barRadius: 3,
  fillShadowGradient: '#2274A5',
}

const SpendChart = (props) => {
  const [width, setWidth] = useState(null)
  const [height, setHeight] = useState(null)

  const handleOnLayout = (event) => {
    const { width: w, height: h } = event.nativeEvent.layout
    setWidth(w)
    setHeight(h)
  }

  return (
    <View style={{flex: 1}} onLayout={handleOnLayout}>
      <BarChart
        data={data}
        width={width}
        height={height}
        yAxisLabel="$"
        chartConfig={chartConfig}
        fromZero
      />
    </View>
  )
}