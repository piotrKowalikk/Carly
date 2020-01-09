import React, { Component } from 'react';
import { StyleSheet, View, ActivityIndicator, FlatList } from 'react-native';
import { ListItem } from 'react-native-elements';

class CarsList extends Component<any,any> {
   constructor(props) {
      super(props);

      this.renderItem = this.renderItem.bind(this);
      this.fetchData = this.fetchData.bind(this);

      this.state = {
         isFetching: true,
         cars: []
      }
   }

   componentDidMount() {
      this.fetchData();
   }

   fetchData() {
      this.setState({ isFetching: true });
      fetch('http://pages.mini.pw.edu.pl/~wenkam/db.json')
         .then(
            response => {
               //if (response.status == 200) {
                  setTimeout(() => {
                     const cars = [
                        { name: "Renault Megane III", location: "Konstancin-Jeziorna", seats: 5 },
                        { name: "Alfa Romeo", location: "Konstancin-Jeziorna", seats: 5 },
                        { name: "Mercedes AMG", location: "Konstancin-Jeziorna", seats: 2 },
                        { name: "Opel Astra", location: "Konstancin-Jeziorna", seats: 5 },
                        { name: "Aston Martin DB9", location: "Konstancin-Jeziorna", seats: 2 },
                        { name: "Porsche Panamera", location: "Konstancin-Jeziorna", seats: 4 },
                        { name: "Volkswagen Transporter", location: "Konstancin-Jeziorna", seats: 7 },
                        { name: "Renault Megane III", location: "Konstancin-Jeziorna", seats: 5 },
                        { name: "Alfa Romeo", location: "Konstancin-Jeziorna", seats: 5 },
                        { name: "Mercedes AMG", location: "Konstancin-Jeziorna", seats: 2 },
                        { name: "Opel Astra", location: "Konstancin-Jeziorna", seats: 5 },
                        { name: "Aston Martin DB9", location: "Konstancin-Jeziorna", seats: 2 },
                        { name: "Porsche Panamera", location: "Konstancin-Jeziorna", seats: 4 },
                        { name: "Volkswagen Transporter", location: "Konstancin-Jeziorna", seats: 7 }
                     ]
                     this.setState({ cars,  isFetching: false }); // todo fetch
                  }, 1000);
               //} else {
               //   throw Error(response.status.toString());
               //}
            }
         )
         .catch((error) => {
           console.error('Error:', error);
         });
   }
   
   keyExtractor = (_item: any, index: number) => index.toString();

   renderItem = ({item}) => (
      <ListItem
         leftIcon={{ type: 'material-community', color: '#0E4D92', name: item.seats < 4 ? 'car-sports' : item.seats > 5 ? 'car-estate' : 'car-side' }}
         title={item.name}
         subtitle={item.location}
         titleStyle={{ fontSize: 16 }}
         subtitleStyle={{ fontSize: 12, color: 'grey' }}
         onPress={() => this.props.navigation.navigate('CarDetails', {car: item})}
         bottomDivider
         chevron
      />
   );

   render() {
      const { cars, isFetching } = this.state;

      return (
         <View style={styles.container}>
            {
               <FlatList
                  keyExtractor={this.keyExtractor} //{item => item.id} // todo index z bazy
                  data={cars}
                  renderItem={this.renderItem}
                  onRefresh={this.fetchData}
                  refreshing={isFetching}
               />
            }
         </View>
      );
   }
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
   }
});

export default CarsList;