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
            reservations: [],
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
        fetch('http://carly.us-east-1.elasticbeanstalk.com/statuses?getall=true&carID=' + this.state.car.id, { headers: headers })
            .then(response => {
                if (response.status === 200) {
                    response.json().then(data => {
                        this.setState({ reservations: data.content, isFetching: false, fetchedProperly: true });
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
            leftIcon={{ type: 'material-community', color: '#0E4D92', name: 'calendar-multiple-check' }}
            title={this.beautifyDate(item.dateFrom) + ' - ' + this.beautifyDate(item.dateTo)}
            subtitle={this.getSubtitle(item)}
            titleStyle={{ fontSize: 16 }}
            subtitleStyle={{ fontSize: 12, color: 'grey' }}
            bottomDivider
        />
    );

    beautifyDate = (date: string) => {
        return (new Date(date.substring(0, date.indexOf('+')))).toDateString();
    }

    getSubtitle = (item: any) => {
        switch (item.type)
        {
            case "UNAVAILABLE":
                return "Unavailable"
            case "BOOKINGCANCELED":
                return "Booking canceled";
            case "BOOKED":
                return "Booked by " + item.bookingUserInfo.name + " " + item.bookingUserInfo.surname;
            default:
                return null;
        }
    }

    render() {
        const { reservations, isFetching, fetchedProperly } = this.state;

        return (
            <View style={styles.container}>
                {
                <FlatList
                    keyExtractor={item => item.dateFrom.toString()}
                    data={reservations}
                    renderItem={this.renderItem}
                    onRefresh={this.fetchData}
                    refreshing={isFetching}
                    ListHeaderComponent={fetchedProperly ? ((reservations.length > 0 || isFetching) ? null :
                        <ListItem
                          leftIcon={{ type: 'material-icons', color: "#B22222", name: 'error-outline' }}
                          title={"No reservations for this car!"}
                          titleStyle={{ fontSize: 16, color: "#B22222" }}
                          bottomDivider
                        />)
                        :
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

export default connect(mapStateToProps, null)(Reservations);