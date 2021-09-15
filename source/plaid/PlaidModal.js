import React, { useEffect, useState } from 'react'
import PlaidLink from './PlaidLink';

export default ({ navigation }) => {
  const [linkToken, setLinkToken] = useState()

  useEffect(() => {
    const uri = 'https://plaid-service-nihao-eric.herokuapp.com/api/create_link_token'
    const options = { method: 'POST' }

    const fetchLinkToken = async () => {
      let response = await fetch(uri, options)
      response = await response.json()

      setLinkToken(response?.link_token)
    }

    fetchLinkToken()
  }, [])

  if (!linkToken) return null

  return (
    <PlaidLink
      linkToken={linkToken}
      onEvent={(event) => console.log(event)}
      onExit={(exit) => { console.log(exit); navigation.goBack() }}
      onSuccess={(success) => console.log(success)}
    />
  );
}