import React from 'react'
import { View, Text, Button } from 'react-native';
import usePlaidItems from './usePlaidItems';

export default ({ navigation }) => {
  const plaidItems = usePlaidItems()

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