import React from 'react';
import { ScrollView } from 'react-native';
import SpendingSummary from './SpendingSummary';

const DATA = [
  {
    month: 'June 2021',
    totalSpending: 795.05,
    transactionCount: 21,
    data: {
      labels: ["29-4", "5-11", "12-18", "29-25", "26-2"],
      datasets: [
        {
          data: [20, 45, 28, 80, 99]
        }
      ]
    }
  },
  {
    month: 'July 2021',
    totalSpending: 1260.34,
    transactionCount: 33,
    data: {
      labels: ["29-4", "5-11", "12-18", "29-25", "26-2"],
      datasets: [
        {
          data: [20, 45, 28, 80, 99]
        }
      ]
    }
  },
  {
    month: 'August 2021',
    totalSpending: 1090.58,
    transactionCount: 28,
    data: {
      labels: ["29-4", "5-11", "12-18", "29-25", "26-2"],
      datasets: [
        {
          data: [20, 45, 28, 80, 99]
        }
      ]
    }
  },
]

const renderItem = (item) => (
  <SpendingSummary
    item={item}
    data={item.data}
    key={item.month}
  />
)

export default () => {
  return (
    <ScrollView
      snapToAlignment={'start'}
      snapToInterval={375}
      decelerationRate="fast"
      showsHorizontalScrollIndicator={false}
      horizontal
    >
      {DATA.map(renderItem)}
    </ScrollView>
  )
}