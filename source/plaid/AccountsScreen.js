import React, { useContext, useEffect, useState } from 'react'
import { View, Text, Button } from 'react-native';
import { FirebaseContext } from '../auth/FirebaseProvider';

export default ({ navigation }) => {
  const [plaidItems, setPlaidItems] = useState([])
  const { getPlaidItems } = useContext(FirebaseContext)

  useEffect(() => {
    const fetchPlaidItems = async () => {
      const items = await getPlaidItems()
      setPlaidItems(items)
    }

    fetchPlaidItems()
  }, [])

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Accounts</Text>
      {plaidItems.map((item, i) => (
        <Text key={i}>{JSON.stringify(item)}</Text>
      ))}
      <Button title="Link Account" onPress={() => navigation.navigate('Link Account')} />
    </View>
  );
}