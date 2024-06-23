import React, {useEffect, useState} from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  FlatList,
  Text,
  TextInput,
} from 'react-native';
import {Card, IconButton} from 'react-native-paper';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {NavigationProp} from '@react-navigation/native';
import HomeScreenStyles from '../styles/HomeScreenStyles';

interface Listing {
  id: string;
  title: string;
  description: string;
  image: string;
  rating: number;
  price: string;
  location: string;
  host: string;
  dateRange: string;
}

interface HomeScreenProps {
  navigation: NavigationProp<any, any>;
}

const HomeScreen: React.FC<HomeScreenProps> = ({navigation}) => {
  const [listings, setListings] = useState<Listing[]>([]);
  const [search, setSearch] = useState('');
  const [selectedNavItem, setSelectedNavItem] = useState<number | null>(null);

  useEffect(() => {
   
  }, []);

  const handleNavItemPress = (index: number) => {
    setSelectedNavItem(index);
  };

  const handleNavItemHover = (index: number) => {
    setSelectedNavItem(index);
  };

  const clearNavItemHover = () => {
    setSelectedNavItem(null);
  };

  const filteredListings = listings.filter(listing =>
    listing.title.toLowerCase().includes(search.toLowerCase()),
  );

  const renderItem = ({item}: {item: Listing}) => (
    <TouchableOpacity onPress={() => navigation.navigate('Details', {item})}>
      <Card style={HomeScreenStyles.card}>
        <Image source={{uri: item.image}} style={HomeScreenStyles.image} />
        <Card.Content>
          <View style={HomeScreenStyles.textContainer}>
            <View style={HomeScreenStyles.header}>
              <Text style={HomeScreenStyles.location}>{item.location}</Text>
              <View style={HomeScreenStyles.ratingContainer}>
                <MaterialIcons name="star" size={20} color="gold" />
                <Text style={HomeScreenStyles.rating}>{item.rating}</Text>
              </View>
            </View>
            <Text style={HomeScreenStyles.host}>
              Stay with {item.host} · {item.dateRange}
            </Text>
            <Text style={HomeScreenStyles.price}>{item.price} total</Text>
          </View>
        </Card.Content>
      </Card>
    </TouchableOpacity>
  );

  return (
    <View style={HomeScreenStyles.container}>
      <View style={HomeScreenStyles.searchContainer}>
        <TextInput
          style={HomeScreenStyles.searchInput}
          placeholder="Where to?"
          value={search}
          onChangeText={setSearch}
        />
        <MaterialIcons
          name="tune"
          size={24}
          color="#000"
          style={HomeScreenStyles.filterIcon}
        />
      </View>
      <View style={HomeScreenStyles.navbarTop}>
        {['hotel', 'beach-access', 'terrain', 'trending-up', 'whatshot'].map(
          (iconName, index) => (
            <TouchableOpacity
              key={iconName}
              style={[
                HomeScreenStyles.navItem,
                selectedNavItem === index
                  ? HomeScreenStyles.navItemSelected
                  : null,
              ]}
              onPress={() => handleNavItemPress(index)}
              onPressIn={() => handleNavItemHover(index)}
              onPressOut={clearNavItemHover}>
              <IconButton icon={iconName} size={30} />
              <Text
                style={[
                  HomeScreenStyles.navText,
                  selectedNavItem === index
                    ? HomeScreenStyles.navTextBold
                    : null,
                ]}>
                {iconName === 'hotel'
                  ? 'Rooms'
                  : iconName === 'beach-access'
                  ? 'Beachfront'
                  : iconName === 'terrain'
                  ? 'Camping'
                  : iconName === 'trending-up'
                  ? 'Trending'
                  : 'OMG!'}
              </Text>
            </TouchableOpacity>
          ),
        )}
      </View>
      <FlatList
        data={
          filteredListings.length > 0 ? filteredListings : listings.slice(0, 4)
        }
        keyExtractor={item => item.id}
        renderItem={renderItem}
        ListFooterComponent={() => (
          <View style={HomeScreenStyles.footer}>
            <Text style={HomeScreenStyles.footerText}>
              More listings available...
            </Text>
          </View>
        )}
      />
      <View style={HomeScreenStyles.navbarBottom}>
        {['home', 'favorite', 'flight-takeoff', 'mail', 'person'].map(
          (iconName, index) => (
            <TouchableOpacity
              key={iconName}
              style={[
                HomeScreenStyles.navItem,
                selectedNavItem === index + 5
                  ? HomeScreenStyles.navItemSelected
                  : null,
              ]}
              onPress={() => handleNavItemPress(index + 5)}
              onPressIn={() => handleNavItemHover(index + 5)}
              onPressOut={clearNavItemHover}>
              <IconButton
                icon={() => <MaterialIcons name={iconName} size={24} />}
                onPress={() => {}}
              />
              <Text
                style={[
                  HomeScreenStyles.navText,
                  selectedNavItem === index + 5
                    ? HomeScreenStyles.navTextBold
                    : null,
                ]}>
                {iconName === 'home'
                  ? 'Explore'
                  : iconName === 'favorite'
                  ? 'Wishlist'
                  : iconName === 'flight-takeoff'
                  ? 'Trips'
                  : iconName === 'mail'
                  ? 'Inbox'
                  : 'Profile'}
              </Text>
            </TouchableOpacity>
          ),
        )}
      </View>
    </View>
  );
};

export default HomeScreen;