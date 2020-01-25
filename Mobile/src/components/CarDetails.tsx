import React, { Component } from 'react';
import { connect } from 'react-redux'

import { Text, StyleSheet, View } from 'react-native';
import { ListItem as ListElement } from 'react-native-elements';
import { ListItem, Left, Right } from 'native-base';
import { FlatList } from 'react-native-gesture-handler';

class CarDetails extends Component<any, any> {
   static navigationOptions = ({ navigation }) => ({
      title: navigation.state.params.title,
   });

   constructor(props) {
      super(props);

      const car = this.props.navigation.getParam('car', null);
      this.props.navigation.setParams({ title: car.make + ' ' + car.model });

      this.state = {
         car,
         data: [
            { name: 'Make', value: car.make },
            { name: 'Model', value: car.model },
            { name: 'Year', value: car.year.toString() },
            { name: 'Number of seats', value: car.seats.toString() },
            { name: 'Licence plate', value: car.licence },
            { name: 'Location', value: car.location }
         ]
      }
   }

   render() {
      const { car, data } = this.state;

      return (
         <View style={styles.container}>
            <FlatList
               data={data}
               keyExtractor={(item: any) => item.name}
               renderItem={({item}) => (
                  <ListItem style={styles.listItem}>
                     <Left style={styles.flexLeft}>
                        <Text style={styles.leftText}>{item.name}</Text>
                     </Left>
                     <Right style={styles.flexRight}>
                        <Text numberOfLines={1} style={styles.rightText}>{item.value}</Text>
                     </Right>
                  </ListItem>)}
               ListFooterComponent={
                  <ListElement
                     style={{height: 50}}
                     leftIcon={{ type: 'material-community', color: '#0E4D92', name: 'calendar-multiple-check' }}
                     title='Reservations'
                     titleStyle={{ fontSize: 16, marginLeft: 0, paddingLeft: 0 }}
                     onPress={() => this.props.navigation.navigate('Reservations', { car: car })}
                     bottomDivider
                     chevron
                  />
               }
            />
         </View>
      );
   }
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: '#f2f2f7'
   },
   listItem: {
      height: 50,
      backgroundColor: 'white',
      marginLeft: 0,
      paddingHorizontal: 17
   },
   leftText: {
      fontSize: 16
   },
   rightText: {
      fontSize: 16,
      color: 'grey'
   },
   flexLeft: {
      flex: 0.4
   },
   flexRight: {
      flex: 0.6
   }
});

const mapStateToProps = (state) => ({
   token: state.token
})

export default connect(mapStateToProps, null)(CarDetails);