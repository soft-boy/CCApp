import React from 'react';
import { Text } from 'react-native';

export default (props) => {
  return <Text style={{ fontFamily: "Noto Sans SC" } } {...props}>{props.children}</Text>
}