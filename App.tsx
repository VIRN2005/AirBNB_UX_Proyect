import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from './src/FrontEnd/screens/HomeScreen';
import DetailsScreen from './src/FrontEnd/screens/DetailsScreen';
import LoginScreen from './src/FrontEnd/screens/LoginScreen';
import SignupScreen from './src/FrontEnd/screens/SignupScreen';

const Stack = createStackNavigator();

const AppNavigator: React.FC = () => (
  <NavigationContainer>
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen}/>
      <Stack.Screen name="Home" component={HomeScreen} />
      {/*<Stack.Screen name="Details" component={DetailsScreen} />*/}
    </Stack.Navigator>
  </NavigationContainer>
);

export default AppNavigator;
