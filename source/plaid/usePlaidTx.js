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
      allTx = flattenArrays(allTx)
      allTx.sort((tx1, tx2) => moment(tx2.date).diff(moment(tx1.date)))
      allTx = allTx.filter((tx) => tx.amount > 0)

      // TODO this is hacky way to solve duplicate tx, should find better soln
      const seenTx = []
      allTx = allTx.filter((tx) => {
        if (seenTx.includes(tx.transaction_id)) return false

        const aggInfo = {
          name: tx.name,
          date: tx.date,
          amount: tx.amount,
        }

        if (seenTx.includes(JSON.stringify(aggInfo))) return false

        seenTx.push(tx.transaction_id)
        seenTx.push(JSON.stringify(aggInfo))

        return true
      })

      setTx(allTx)
    }

    fetchAllTx()
  }, [JSON.stringify(plaidItems)])

  return tx
}