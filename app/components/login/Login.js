import React, { Component } from 'react';
import { AppRegistry, View, StyleSheet, Text, TextInput, Button, TouchableHighlight, ScrollView, Image } from 'react-native';
import {Form, InputField} from 'react-native-form-generator';
import Icon from '../../../node_modules/react-native-vector-icons/FontAwesome';
import LoginContainer from './LoginContainer.js'
import LoginButton from './LoginButton.js'
import LoginLabel from './LoginLabel.js'
import Main from '../Main.js'

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleRegister = this.handleRegister.bind(this);
    this.handleIsRegistering = this.handleIsRegistering.bind(this);
    this.state = {
      email: '',
      password: '',
      isRegistering: false,
      isLoggedIn: false
    }
  }

  handleLogin(e) {
    let email = this.state.email;
    let password = this.state.password;

    console.warn(email);
    console.warn(password);

    this.setState({
      isLoggedIn: true
    })
  }

  handleIsRegistering(e){
    console.warn('is registering');
    this.setState({
      isRegistering: true
    })
  }

  handleRegister(e) {
    console.warn('register');
  }

  press() {
    //execute any code here
  }

  renderRegister() {
    return(
        <ScrollView style={styles.scroll}>
          <Text style={styles.header}>Kris Kindle<Image style={{width: 29, height: 36}} source={require('./cane.png')}/></Text>
          <LoginContainer>
            <LoginLabel text="Email"/>
            <TextInput
                style={styles.textInput}
                ref={(el) => { this.email = el; }}
                onChangeText={(email) => this.setState({email})}
                value={this.state.email}
            />
          </LoginContainer>
          <LoginContainer>
            <LoginLabel text="Password"/>
            <TextInput
                secureTextEntry={true}
                style={styles.textInput}
                ref={(el) => { this.password = el; }}
                onChangeText={(password) => this.setState({password})}
                value={this.state.password}
            />
          </LoginContainer>
          <LoginContainer>
            <LoginButton
                label="Register"
                styles={{button: styles.primaryButton, label: styles.buttonWhiteText}}
                onPress={this.handleRegister}/>
          </LoginContainer>
        </ScrollView>
    );
  }

  renderLogin() {
    return (
        <ScrollView style={styles.scroll}>
          <Text style={styles.header}>Kris Kindle<Image style={{width: 29, height: 36}} source={require('./cane.png')}/></Text>
          <LoginContainer>
            <LoginLabel text="Email"/>
            <TextInput
                style={styles.textInput}
                ref={(el) => { this.email = el; }}
                onChangeText={(email) => this.setState({email})}
                value={this.state.email}
            />
          </LoginContainer>
          <LoginContainer>
            <LoginLabel text="Password"/>
            <TextInput
                secureTextEntry={true}
                style={styles.textInput}
                ref={(el) => { this.password = el; }}
                onChangeText={(password) => this.setState({password})}
                value={this.state.password}
            />
          </LoginContainer>
          <LoginContainer>
            <LoginButton
                styles={{button: styles.transparentButton}}
                onPress={this.press.bind(this)}>
              <View style={styles.inline}>
                <Icon name="facebook-official" size={30} color="#3B5699"/>
                <Text style={[styles.buttonBlueText, styles.buttonBigText]}> Connect </Text>
                <Text style={styles.buttonBlueText}>with Facebook</Text>
              </View>
            </LoginButton>
          </LoginContainer>
          <View style={styles.footer}>
            <LoginContainer>
              <LoginButton
                  label="Sign In"
                  styles={{button: styles.primaryButton, label: styles.buttonWhiteText}}
                  onPress={this.handleLogin}/>
            </LoginContainer>
            <LoginContainer>
              <LoginButton
                  label="Register Here"
                  styles={{label: styles.buttonBlackText}}
                  onPress={this.handleIsRegistering}/>
            </LoginContainer>
            <LoginContainer>
              <LoginButton
                  label="Forgot Login/Pass"
                  styles={{label: styles.label}}
                  onPress={this.press.bind(this)}/>
            </LoginContainer>
          </View>
        </ScrollView>
    )
  }

  render() {
    if(this.state.isLoggedIn){
      return <Main></Main>
    } else if(this.state.isRegistering){
      return this.renderRegister();
    } else {
      return this.renderLogin();
    }
  }
}

const styles = StyleSheet.create({
  scroll: {
    backgroundColor: '#EEEEEE',
    padding: 30,
    flexDirection: 'column'
  },
  header:{
    fontSize: 30,
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#34A853',
    textShadowOffset: {width: 0.5, height: 0.5},
    textShadowRadius: 0.5,
    textShadowColor: 'red'
  },
  label: {
    color: '#0d8898',
    fontSize: 15
  },
  alignRight: {
    alignSelf: 'flex-end'
  },
  container: {
    top: 100,
    backgroundColor: '#c1ffea',
    alignItems: 'center',
    borderColor: 'black'
  },
  textInput: {
    height: 40,
    fontSize: 15,
    backgroundColor: '#FFF'
  },
  transparentButton: {
    marginTop: 30,
    borderColor: '#3B5699',
    borderWidth: 2
  },
  buttonBlueText: {
    marginTop: 5,
    fontSize: 15,
    color: '#3B5699'
  },
  buttonBigText: {
    fontSize: 15,
    fontWeight: 'bold'
  },
  inline: {
    flexDirection: 'row'
  },
  loginButton: {
    borderColor: "black",
    marginTop: 20,
    marginBottom: 20
  },
  buttonWhiteText: {
    fontSize: 15,
    color: '#FFF'
  },
  buttonBlackText: {
    fontSize: 15,
    color: '#595856'
  },
  primaryButton: {
    backgroundColor: '#34A853'
  },
  footer: {
    marginTop: 90
  }
});

AppRegistry.registerComponent('Login', () => Login);
