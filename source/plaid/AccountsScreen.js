import React from 'react'
import { View, Text, Button } from 'react-native';

export default ({ navigation }) => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Accounts</Text>
      <Button title="Link Account" onPress={() => navigation.navigate('Link Account')} />
    </View>
  );
}