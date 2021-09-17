import React from "react"
import { Text } from "react-native"

export default ({ route }) => {
  const { tx } = route.params;

  return <Text>{JSON.stringify(tx)}</Text>
}