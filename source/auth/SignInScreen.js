import React, { useContext, useState } from 'react'
import { View, TextInput, Button } from 'react-native';
import { FirebaseContext } from './FirebaseProvider'

const InputStyle = {
  height: 40,
  margin: 12,
  borderWidth: 1,
  padding: 10,
}

export default () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { signIn } = useContext(FirebaseContext);

  return (
    <View>
      <TextInput
        style={InputStyle}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={InputStyle}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Sign in" onPress={() => signIn(email, password)} />
    </View>
  );
}