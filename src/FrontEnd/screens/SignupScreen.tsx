import React, { useState } from 'react';
import { View, Image } from 'react-native';
import { TextInput, Button, Text } from 'react-native-paper';
import { NavigationProp } from '@react-navigation/native';
import SignupScreenStyles from '../styles/SignupScreenStyles';


interface LoginScreenProps {
  navigation: NavigationProp<any, any>;
}

const SignupScreen: React.FC<LoginScreenProps> = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSignup = () => {
    
  };

  return (
    <View style={SignupScreenStyles.container}>
      <Image source={require('../imgs/Airbnb-Logo-White.png')} style={SignupScreenStyles.logo} />
      <View style={SignupScreenStyles.inputContainer}>
        <TextInput
          label="Email"
          value={email}
          onChangeText={setEmail}
          style={SignupScreenStyles.input}
          mode="flat"
          outlineColor="#EBEBEB"
          activeOutlineColor="#FF5A5F"
          selectionColor="#FF5A5F"
          theme={{ colors: { primary: '#FF5A5F' } }}
        />
      </View>
      <View style={SignupScreenStyles.inputContainer}>
        <TextInput
          label="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          style={SignupScreenStyles.input}
          mode="flat"
          outlineColor="#EBEBEB"
          activeOutlineColor="#FF5A5F"
          selectionColor="#FF5A5F"
          theme={{ colors: { primary: '#FF5A5F' } }}
        />
      </View>
      {error ? <Text style={SignupScreenStyles.error}>{error}</Text> : null}
      <Button mode="contained" onPress={handleSignup} style={SignupScreenStyles.button}>
        <Text style={SignupScreenStyles.buttonText}>SIGNUP</Text>
      </Button>
      <View style={SignupScreenStyles.footer}>
        <Text style={SignupScreenStyles.footerText}>Welcome to this Amazing Experience!</Text>
      </View>
    </View>
  );
};

export default SignupScreen;
