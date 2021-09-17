import React, { useEffect, useState, useContext } from 'react'
import PlaidLink from './PlaidLink';
import { FirebaseContext } from '../auth/FirebaseProvider'

export default ({ navigation }) => {
  const [linkToken, setLinkToken] = useState()
  const { savePlaidItem, user } = useContext(FirebaseContext)

  useEffect(() => {
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId: user.uid })
    };

    const fetchLinkToken = async () => {
      let response = await fetch("https://plaid-service-nihao-eric.herokuapp.com/api/create_link_token", options)
      response = await response.json()

      setLinkToken(response?.link_token)
    }

    fetchLinkToken()
  }, [])

  const handleSuccess = async (success) => {
    const publicToken = success.publicToken

    const response = await fetch('https://plaid-service-nihao-eric.herokuapp.com/api/exchange_access_token', {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
      },
      body: `public_token=${publicToken}`,
    })

    const data = await response.json()
    const itemId = data.item_id
    const accessToken = data.access_token

    await savePlaidItem(itemId, accessToken)
    navigation.goBack()
  }

  if (!linkToken) return null

  return (
    <PlaidLink
      linkToken={linkToken}
      onExit={(exit) => { navigation.goBack() }}
      onSuccess={handleSuccess}
    />
  );
}