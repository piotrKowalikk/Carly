import React, { Component } from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { ListItem, Left, Right } from 'native-base';
import { FlatList } from 'react-native-gesture-handler';

class CarDetails extends Component<any, any> {
   static navigationOptions = ({ navigation }) => ({
      title: navigation.state.params.title,
   });

   constructor(props) {
      super(props);

      const car = this.props.navigation.getParam('car', null);
      this.props.navigation.setParams({ title: car.name });

      this.state = {
         data: [
            { name: 'Name', value: car.name },
            { name: 'Location', value: car.location },
            { name: 'Seats', value: car.seats.toString() }
         ]
      }
   }

   render() {
      const data = this.state.data;
      
      return (
         <View style={styles.container}>
            <FlatList
               data={data}
               keyExtractor={(item: any) => item.name}
               renderItem={({item}) => (
                  <ListItem style={styles.listItem}>
                     <Left style={styles.flexHalf}>
                        <Text style={styles.leftText}>{item.name}</Text>
                     </Left>
                     <Right style={styles.flexHalf}>
                        <Text numberOfLines={1} style={styles.rightText}>{item.value}</Text>
                     </Right>
                  </ListItem>
               )}
            />
         </View>
      );
   }
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: 'white'
   },
   listItem: {
      height: 60
   },
   leftText: {
      fontSize: 16
   },
   rightText: {
      fontSize: 16,
      color: 'grey'
   },
   flexHalf: {
      flex: 0.5
   }
});

export default CarDetails;