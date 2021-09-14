import React from 'react'
import { View, TextInput, Button, Text } from 'react-native';
import { FirebaseContext } from './FirebaseProvider'

const InputStyle = {
  height: 40,
  margin: 12,
  borderWidth: 1,
  padding: 10,
}

export default ({ navigation }) => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const { signUp } = React.useContext(FirebaseContext);

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
      <Button title="Sign Up" onPress={() => signUp(email, password)} />
      <Text style={{ alignSelf: 'center' }}>Have an Account?</Text>
      <Button title="Log in" onPress={() => navigation.navigate('SignIn')} />
    </View>
  );
}