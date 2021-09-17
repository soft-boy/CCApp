import React from 'react'
import moment from 'moment'

const fetchTx = async (accessToken) => {
  const options = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ accessToken})
  }

  let response = await fetch("https://plaid-service-nihao-eric.herokuapp.com/api/transactions", options)
  response = await response.json()

  return response.transactions
}

const flattenArrays = (arrays) => [].concat.apply([], arrays)

export default (plaidItems) => {
  const [tx, setTx] = React.useState([])

  React.useEffect(() => {
    const fetchAllTx = async () => {
      let allTx = await Promise.all(plaidItems.map((item) => fetchTx(item.accessToken)))
      console.log(allTx)
      allTx = flattenArrays(allTx)
      allTx.sort((tx1, tx2) => moment(tx2.date).diff(moment(tx1.date)))
      allTx = allTx.filter((tx) => tx.amount > 0)

      setTx(allTx)
    }

    fetchAllTx()
  }, [JSON.stringify(plaidItems)])

  return tx
}