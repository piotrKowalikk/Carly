import React, { Component } from 'react';
import { StyleSheet, View, Button } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input, Card } from 'react-native-elements';

class CarDetails extends Component<any, any> {
    constructor(props) {
       super(props);
 
        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);

       this.state = {
            username: '',
            password: ''
       }
    }

    handleUsernameChange(value) {
        this.setState({ username: value });
    }

    handlePasswordChange(value) {
        this.setState({ password: value });
    }
 
    render() {
        const { username, password } = this.state;

       return (
            <View style={styles.container}>
                <View style={{flex: 0.4}}></View>
                <Card>
                    <Input
                        autoCorrect={false}
                        keyboardType='email-address'
                        autoCapitalize='none'
                        value={username}
                        onChangeText={this.handleUsernameChange}
                        placeholder='email@address.com'
                        containerStyle={styles.input}
                        leftIconContainerStyle={styles.inputIcon}
                        leftIcon={
                            <Icon
                                name='user'
                                size={24}
                                color='darkgrey'
                            />
                        }
                        label='Your email address'
                    />
                    <Input
                        autoCorrect={false}
                        autoCapitalize='none'
                        secureTextEntry={true}
                        value={password}
                        onChangeText={this.handlePasswordChange}
                        placeholder='password'
                        containerStyle={styles.input}
                        leftIconContainerStyle={styles.inputIcon}
                        leftIcon={
                            <Icon
                                name='lock'
                                size={24}
                                color='darkgrey'
                            />
                        }
                        label='Password'
                    />
                    <Button 
                        color='#0E4D92'
                        title='Login'
                        onPress={()=>this.props.navigation.navigate('AppNavigation')}
                    />
                </Card>
            </View>
       );
    }
 }
 
 const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    input: {
        marginBottom: 15
    },
    inputIcon: {
        marginLeft:0,
        marginRight:10
    }
 });
 
 export default CarDetails;