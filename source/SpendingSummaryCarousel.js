import React, { useRef } from 'react';
import { ScrollView } from 'react-native';
import SpendingSummary from './SpendingSummary';
import moment from 'moment';

const flattenArrays = (arrays) => [].concat.apply([], arrays)

const renderItem = (item) => (
  <SpendingSummary
    item={item}
    data={item.data}
    key={item.month}
  />
)

export default (props) => {
  const scrollRef = useRef(null);
  const data = transformTxDate(props.tx)

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
      {data.map(renderItem)}
    </ScrollView>
  )
}

const bucketTxData = (txData) => {
  const buckets = {}

  txData.forEach((tx) => {
    const prevSunday = moment(tx.date).startOf('week').format('MM/DD/YY')

    if (Object.keys(buckets).includes(prevSunday)) {
      buckets[prevSunday].push(tx)
    }
    else {
      buckets[prevSunday] = [tx]
    }
  })

  return buckets
}

const getTxMonths = (txData) => {
  const today = moment()
  const firstTx = txData[txData.length - 1]

  const txMonths = []

  let currentMonth = moment(firstTx.date).startOf('month')

  while (currentMonth.diff(today) < 0) {
    txMonths.push(currentMonth)
    currentMonth = moment(currentMonth).add(1, 'month')
  }

  return txMonths
}

const getLabelFromBucket = (bucketMoment) => {
  const labelDateStart = bucketMoment.date()
  const labelDateEnd = moment(bucketMoment).add(6, 'd').date()

  return `${labelDateStart}-${labelDateEnd}`
}

const getMonthBuckets = (monthMoment) => {
  let buckets = []
  let currentBucket = moment(monthMoment).startOf('week')
  
  buckets.push(currentBucket)
  currentBucket = moment(currentBucket).add(1, 'week')

  while (currentBucket.month() === monthMoment.month()) {
    buckets.push(currentBucket)
    currentBucket = moment(currentBucket).add(1, 'week')
  }

  return buckets
}

const getTxSum = (tx) => {
  if (!tx) return 0

  return tx.reduce((current, tx1) => tx1.amount + current, 0)
}

const transformTxDate = (txData) => {
  if (!txData.length) return []

  const bucketedData = bucketTxData(txData)
  const months = getTxMonths(txData)

  const data = months.map((month) => {
    const monthBucketMoments = getMonthBuckets(month)
    const monthBucketStrings = monthBucketMoments.map((bucket) => bucket.format('MM/DD/YY'))

    let totalTx = flattenArrays(monthBucketStrings.map((bucketString) => bucketedData[bucketString] || []))
    // totalTx = totalTx.filter((tx) => moment(tx.date).month() === month.month())

    return {
      month: `${month.format('MMMM')} ${month.format('YYYY')}`,
      totalSpending: getTxSum(totalTx),
      transactionCount: totalTx.length,
      data: {
        labels: monthBucketMoments.map(getLabelFromBucket),
        datasets: [
          {
            data: monthBucketStrings.map((bucketString) => getTxSum(bucketedData[bucketString]))
          }
        ]
      }
    }
  })

  return data
}
