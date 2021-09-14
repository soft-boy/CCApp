import React from 'react';
import { Pressable } from "react-native";

export default (props) => {
  return (
    <Pressable
      style={({ pressed }) => (
        {
          opacity: pressed ? 0.3 : 1
        }
      )}
    >
      {props.children}
    </Pressable>
  )
}