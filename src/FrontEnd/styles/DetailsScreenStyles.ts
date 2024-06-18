import { StyleSheet } from 'react-native';

const DetailsScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  
  card: {
    borderRadius: 16,
    elevation: 3,
  },
  
  image: {
    height: 300,
    width: '100%',
  },
 
  divider: {
    marginVertical: 10,
  },
  
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  
  rating: {
    marginRight: 4,
    fontWeight: 'bold',
  },
 
  button: {
    marginTop: 16,
    backgroundColor: '#f15454',
  },
});

export default DetailsScreenStyles;
