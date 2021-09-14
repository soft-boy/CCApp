import React, { useContext, useState } from 'react'
import { View, TextInput, Button } from 'react-native';
import { FirebaseContext } from './FirebaseProvider'

export default () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { signIn } = useContext(FirebaseContext);

  return (
    <View>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Sign in" onPress={() => signIn(email, password)} />
    </View>
  );
}