import React, {useEffect, useState} from 'react';
import {View, Image, Alert} from 'react-native';
import {
  Card,
  Title,
  Paragraph,
  Button,
  Divider,
  Text,
} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';

//Style del DetailsScreen en STYLES
import DetailsScreenStyles from '../styles/DetailsScreenStyles';

interface DetailsScreenProps {
  route: {
    params: {
      item: {
        id: string;
        title: string;
        description: string;
        image: string;
        rating: number;
        price: number;
        category: string;
      };
    };
  };
}

const DetailsScreen: React.FC<DetailsScreenProps> = ({route}) => {
  const {item} = route.params;

  return (
    <View style={DetailsScreenStyles.container}>
      <Card style={DetailsScreenStyles.card}>
        <Image source={{uri: item.image}} style={DetailsScreenStyles.image} />
        <Card.Content>
          <Title>{item.title}</Title>
          <Paragraph>{item.description}</Paragraph>
          <Divider style={DetailsScreenStyles.divider} />
          <View style={DetailsScreenStyles.row}>
            <Text style={DetailsScreenStyles.rating}>{item.rating}</Text>
            <Icon name="star" size={20} color="gold" />
          </View>
          <Paragraph>Price: ${item.price}</Paragraph>
          <Paragraph>Category: {item.category}</Paragraph>
        </Card.Content>
        <Card.Actions>
          <Button
            mode="contained"
            onPress={() => Alert.alert('Reserved!')}
            style={DetailsScreenStyles.button}>
            Reserve
          </Button>
        </Card.Actions>
      </Card>
    </View>
  );
};

export default DetailsScreen;
