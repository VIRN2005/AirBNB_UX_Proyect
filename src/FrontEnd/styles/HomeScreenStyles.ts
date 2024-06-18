import { StyleSheet } from 'react-native';
//import TruenoBd from '../fonts/TruenoBd.otf';
//import Aptos from '../fonts/aptos-light.ttf';

const HomeScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  searchInput: {
    flex: 1,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 30,
    padding: 10,
    backgroundColor: '#f0f0f0',
    fontSize:20,
  },
  filterIcon: {
    marginLeft: 10,
  },
  navbarTop: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  navbarBottom: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    paddingVertical: 10,
  },
  card: {
    margin: 10,
    borderRadius: 10,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: 200,
  },
  textContainer: {
    fontSize: 17,
    padding: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  location: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    marginLeft: 5,
    fontSize: 16,
  },
  host: {
    fontSize: 14,
    color: '#888',
    marginTop: 5,
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 5,
  },
  footer: {
    alignItems: 'center',
    marginTop: 10,
  },
  footerText: {
    fontSize: 16,
    color: '#888',
  },
  navItem: {
    alignItems: 'center',
  },
  navItemSelected: {
    alignItems: 'center',
    fontWeight: 'bold',
  },
  navText: {
    fontSize: 17,
    textAlign: 'center',
    fontFamily: 'TruenoBd',
  },
  navTextBold: {
    fontSize: 17,
    textAlign: 'center',
    fontWeight: 'bold',
    color: 'salmon', 
    fontFamily: 'TruenoBd',
  },
});

export default HomeScreenStyles;
