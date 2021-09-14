import React from 'react'
import { View, TextInput, Button } from 'react-native';
import { FirebaseContext } from './FirebaseProvider'

export default ({ navigation }) => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const { signUp } = React.useContext(FirebaseContext);

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
      <Button title="Sign Up" onPress={() => signUp(email, password)} />
      <Button title="Log in" onPress={() => navigation.navigate('SignIn')} />
    </View>
  );
}