import React, { useRef } from 'react';
import { ScrollView } from 'react-native';
import SpendingSummary from './SpendingSummary';

const DATA = [
  {
    month: 'July 2021',
    totalSpending: 795.05,
    transactionCount: 21,
    data: {
      labels: ["28-3", "4-10", "11-17", "18-24", "25-31"],
      datasets: [
        {
          data: [60, 5, 88, 83, 43]
        }
      ]
    }
  },
  {
    month: 'August 2021',
    totalSpending: 1260.34,
    transactionCount: 33,
    data: {
      labels: ["1-7", "8-14", "15-21", "22-28", "29-4"],
      datasets: [
        {
          data: [99, 46, 43, 80, 20]
        }
      ]
    }
  },
  {
    month: 'September 2021',
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
  const scrollRef = useRef(null);

  return (
    <ScrollView
      snapToAlignment={'start'}
      snapToInterval={375}
      decelerationRate="fast"
      showsHorizontalScrollIndicator={false}
      ref={scrollRef}
      onContentSizeChange={() => scrollRef.current.scrollToEnd({ animated: false })}
      horizontal
    >
      {DATA.map(renderItem)}
    </ScrollView>
  )
}