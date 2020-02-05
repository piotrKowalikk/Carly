import React, { Component } from 'react';
import { connect } from 'react-redux';

import { StyleSheet, View, FlatList, Text } from 'react-native';
import { ListItem } from 'react-native-elements';

class CarsList extends Component<any,any> {
   constructor(props:any) {
      super(props);

      this.renderItem = this.renderItem.bind(this);
      this.fetchData = this.fetchData.bind(this);

      this.state = {
         isFetching: true,
         cars: [],
         fetchedProperly: true
      }
   }

   componentDidMount() {
      this.fetchData();
   }

   fetchData() {
      this.setState({ isFetching: true });
      const headers = new Headers();
      headers.append("Authorization", this.props.token);
      fetch('http://carly.us-east-1.elasticbeanstalk.com/cars?getall=true&sort=make,model&onlyActive=false', { headers: headers })
         .then(response => {
            if (response.status === 200) {
               response.json().then(data => {
                  this.setState({ cars: data.content, isFetching: false, fetchedProperly: true });
               })
            }
            else {
               this.setState({ fetchedProperly: false, isFetching: false });
            }
         })
         .catch(() => {
            this.setState({ fetchedProperly: false, isFetching: false });
         });
   }

   renderItem = ({item}) => (
      <ListItem
         leftIcon={{ type: 'material-community', color: item.active ? '#0E4D92' : "#B22222", name: item.seats < 4 ? 'car-sports' : item.seats > 5 ? 'car-estate' : 'car-side' }}
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
      const { cars, isFetching, fetchedProperly } = this.state;

      return (
         <View style={styles.container}>
            {
               <FlatList
                  keyExtractor={item => item.id.toString()}
                  data={cars}
                  renderItem={this.renderItem}
                  onRefresh={this.fetchData}
                  refreshing={isFetching}
                  ListHeaderComponent={fetchedProperly ? null :
                     <ListItem
                        leftIcon={{ type: 'material-icons', color: "#B22222", name: 'error-outline' }}
                        title={"Unable to fetch data from the server!"}
                        titleStyle={{ fontSize: 16, color: "#B22222" }}
                        bottomDivider
                     />}
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