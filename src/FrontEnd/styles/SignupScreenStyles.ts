import {StyleSheet} from 'react-native';

const SignupScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: 'lightgreen', 
    //backgroundColor: 'linear-gradient(to bottom right, orange, red)', // Gradient background
  },

  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    borderRadius: 20,
    paddingHorizontal: 10,
    marginBottom: 16,
  },

  input: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    flex: 1,
    paddingVertical: 5,
    color: 'white',
    fontSize: 19,
    borderRadius: 50,
    fontWeight: 'bold',
    borderColor:'rgba(255, 255, 255, 0.1)',
  },

  logo: {
    width: 200,
    height: 250,
    marginBottom: 50,
  },

  button: {
    marginTop: 17,
    backgroundColor: 'white',
    borderRadius: 25,
    paddingHorizontal: 150,
    paddingVertical: 10,
  },

  buttonText: {
    color: 'green',
    fontWeight: 'bold',
    fontSize: 18,
  },

  error: {
    color: 'red',
    marginTop: 8,
  },

  footer: {
    marginTop: 24,
    flexDirection: 'row',
    justifyContent: 'center',
  },

  footerText: {
    fontSize: 20,
    color: 'white',
  },

  footerLink: {
    fontSize: 20,
    color: 'white',
    marginLeft: 4,
    fontWeight: 'bold',
  },
});

export default SignupScreenStyles;
