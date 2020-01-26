import React, { Component } from 'react';
import { connect } from 'react-redux';

import { StyleSheet, View, FlatList } from 'react-native';
import { ListItem } from 'react-native-elements';

class CarsList extends Component<any,any> {
   constructor(props:any) {
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
      const headers = new Headers();
      headers.append("Authorization", this.props.token);
      fetch('http://carly.us-east-1.elasticbeanstalk.com/cars?getall=true', { headers: headers })
         .then(response => {
            if (response.status === 200) {
               response.json().then(data => {
                  this.setState({ cars: data.content,  isFetching: false });
               })
            }
            else {
               console.error(response.status);
            }
         })
         .catch((error) => console.error(error));
   }

   renderItem = ({item}) => (
      <ListItem
         leftIcon={{ type: 'material-community', color: '#0E4D92', name: item.seats < 4 ? 'car-sports' : item.seats > 5 ? 'car-estate' : 'car-side' }}
         title={item.make + ' ' + item.model}
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
                  keyExtractor={item => item.id.toString()}
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
      backgroundColor: '#f2f2f7'
   }
});


const mapStateToProps = (state) => ({
   token: state.token
})

export default connect(mapStateToProps, null)(CarsList);