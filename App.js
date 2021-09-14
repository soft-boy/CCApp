import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import HomeScreen from './source/HomeScreen'
import SignInScreen from './source/auth/SignInScreen'
import SignUpScreen from './source/auth/SignUpScreen'
import AppLoading from 'expo-app-loading';
import { useFonts } from 'expo-font';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import FirebaseProvider, { FirebaseContext } from './source/auth/FirebaseProvider';
import { View, Text, Button } from 'react-native'

const Stack = createNativeStackNavigator();

const App = () => {
  const { user } = React.useContext(FirebaseContext);
  const [fontsLoaded] = useFonts({
    'Noto Sans SC': require('./assets/fonts/NotoSansSC-Regular.otf'),
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {user ? renderSignedInScreens() : renderSignedOutScreens()}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const AccountsScreen = () => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Accounts Screen</Text>
    </View>
  );
}

const SettingsScreen = () => {
  const { signOut } = React.useContext(FirebaseContext);

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Settings Screen</Text>
      <Button title="Log Out" onPress={signOut} />
    </View>
  );
}

const renderSignedInScreens = () => (
  <>
    <Stack.Screen options={{headerShown: false}} name="Home" component={HomeScreen} />
    <Stack.Screen name="Details" component={AccountsScreen} />
    <Stack.Screen name="Settings" component={SettingsScreen} />
  </>
)

const renderSignedOutScreens = () => (
  <>
    <Stack.Screen name="SignUp" component={SignUpScreen} />
    <Stack.Screen name="SignIn" component={SignInScreen} />
  </>
)

export default () => (
  <FirebaseProvider>
    <App />
    <StatusBar style="auto" />
  </FirebaseProvider>
)
