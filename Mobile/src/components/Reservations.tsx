import React, { Component } from 'react';
import { connect } from 'react-redux';

import { StyleSheet, View, FlatList } from 'react-native';
import { ListItem } from 'react-native-elements';

class Reservations extends Component<any,any> {
    static navigationOptions = ({ navigation }) => ({
       title: navigation.state.params.title,
    });

    constructor(props:any) {
        super(props);

        this.renderItem = this.renderItem.bind(this);
        this.fetchData = this.fetchData.bind(this);

        const car = this.props.navigation.getParam('car', null);
        this.props.navigation.setParams({ title: car.make + ' ' + car.model });

        this.state = {
            car: car,
            isFetching: true,
            reservations: []
        }
    }

    componentDidMount() {
        this.fetchData();
    }

    fetchData() {
        this.setState({ isFetching: true });
        var headers = new Headers();
        headers.append("Authorization", this.props.token);
        fetch('http://carly.us-east-1.elasticbeanstalk.com/statuses?carID=' + this.state.car.id, { headers: headers })
            .then(response => {
                if (response.status === 200) {
                    response.json().then(data => {
                        this.setState({ reservations: data.content, isFetching: false });
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
            leftIcon={{ type: 'material-community', color: '#0E4D92', name: 'calendar-multiple-check' }}
            title={this.beautifyDate(item.dateFrom) + ' - ' + this.beautifyDate(item.dateTo)}
            bottomDivider
        />
    );

    beautifyDate = (date: string) => {
        return (new Date(date.substring(0, date.indexOf('+')))).toDateString();
    }

    render() {
        const { reservations, isFetching } = this.state;

        return (
            <View style={styles.container}>
                {
                <FlatList
                    keyExtractor={item => item.dateFrom.toString()}
                    data={reservations}
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

export default connect(mapStateToProps, null)(Reservations);