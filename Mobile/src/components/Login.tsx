import React, { Component } from 'react';

import { connect } from 'react-redux'
import { saveToken } from '../redux/actions'

import { StyleSheet, View, Button, AsyncStorage } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input, Card } from 'react-native-elements';

class Login extends Component<any, any> {
    constructor(props) {
        super(props);
 
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.login = this.login.bind(this);
        this.showPassword = this.showPassword.bind(this);

        this.state = {
            email: '',
            password: '',
            passwordHidden: true,
            errorMessage: null
        }
    }

    componentDidMount() {
        this.getToken().then(user => {
            if (user) {
                this.setState({ email: user.email, password: user.password });
            }
        });
    }

    handleEmailChange(value: string) {
        this.setState({ email: value });
    }

    handlePasswordChange(value: string) {
        this.setState({ password: value });
    }

    showPassword() {
        this.setState({ passwordHidden: !this.state.passwordHidden });
    }

    login() {
        const user = {
            email: this.state.email,
            password: this.state.password
        }

        const headers = new Headers();
        headers.append("Content-Type", "application/json");
        
        const requestOptions:any = {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(user),
            redirect: 'follow'
        };

        fetch("http://carly.us-east-1.elasticbeanstalk.com/login", requestOptions)
            .then(response => {
                if (response.status == 200) {
                    response.json().then(data => {
                        this.props.saveToken(data.Authorization);
                        this.setState({ errorMessage: null });
                        this.storeToken(user);
                        this.props.navigation.navigate('AppNavigation');
                    })
                }
                else if (response.status == 403) {
                    this.setState({ errorMessage: "Incorect email or password." })
                }
                else {
                    this.setState({ errorMessage: "Unexpected error." })
                }
            })
            .catch(error => {
                this.setState({ errorMessage: "Unexpected error. Check your Internet conncection." })
                console.log(error);
            });
    }

    async storeToken(user) {
        try {
            await AsyncStorage.setItem("userData", JSON.stringify(user));
        } catch (error) {
            console.log("Error storing credentials: " + error);
        }
    }

    async getToken() {
        try {
            let userData = await AsyncStorage.getItem("userData");
            return JSON.parse(userData);
        } catch (error) {
            console.log("Error retrieving credentials from storage: " + error);
            return null;
        }
    }
 
    render() {
        const { email, password, passwordHidden, errorMessage } = this.state;

       return (
            <View style={styles.container}>
                <View style={{flex: 0.4}}></View>
                <Card>
                    <Input // email
                        autoCorrect={false}
                        keyboardType='email-address'
                        autoCapitalize='none'
                        value={email}
                        onChangeText={this.handleEmailChange}
                        placeholder='email@address.com'
                        containerStyle={styles.input}
                        leftIconContainerStyle={styles.inputIcon}
                        leftIcon={
                            <Icon
                                name='user'
                                size={24}
                                color='darkgrey'
                            />}
                        label='Email address'
                    />
                    <Input // password
                        autoCorrect={false}
                        autoCapitalize='none'
                        secureTextEntry={passwordHidden}
                        value={password}
                        onChangeText={this.handlePasswordChange}
                        placeholder='password'
                        containerStyle={styles.input}
                        leftIconContainerStyle={styles.inputIcon}
                        errorMessage={errorMessage}
                        leftIcon={
                            <Icon
                                name='lock'
                                size={24}
                                color='darkgrey'
                            />}
                        rightIcon={
                            <Icon
                                name={passwordHidden ? 'eye' : 'eye-slash'}
                                size={24}
                                color='darkgrey'
                                onPress={() => this.showPassword()}
                            />}
                        label='Password'
                    />
                    <Button 
                        color='#0E4D92'
                        title='Login'
                        onPress={this.login}
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

 const mapDispatchToProps = (dispatch) => ({
    saveToken: (token: string) => dispatch(saveToken(token))
 })
 
 export default connect(null,  mapDispatchToProps)(Login);