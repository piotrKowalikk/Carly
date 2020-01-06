import React, { Component } from 'react';
import { StyleSheet, View, ActivityIndicator } from 'react-native';
import { Header, ListItem } from 'react-native-elements';

class CarDetails extends Component {
   constructor(props) {
      super(props);

      this.state = {
         isLoading: true,
         cars: []
      }
   }

   componentDidMount() {
      // fetch('http://localhost:3004/cars')
      //    .then(data => data.json())
      //    .then(cars => {
      //       this.setState({ cars, isLoading: false });
      //    });
   }

   render() {
      const { cars, isLoading } = this.state;

      return (
         <View style={styles.container}>
            <Header
               containerStyle={{backgroundColor: '#0E90E1'}}
               //leftComponent={{ icon: 'menu', color: '#fff' }}
               centerComponent={{ text: 'CARS', style: { color: '#fff' } }}
               //rightComponent={{ icon: 'home', color: '#fff' }}
            />
            {isLoading ?
            <View style={{ flex: 1, justifyContent: 'center' }}>
               <ActivityIndicator size="large" color="#0E90E1" />
            </View>
            : cars.map((l, i: number) => (
            <ListItem
               key={i}
               leftAvatar={{ source: { uri: l.avatar_url } }}
               title={l.name}
               subtitle={l.subtitle}
               bottomDivider
            />
            ))}
            </View>
      );
   }
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
   },
});

export default CarDetails;