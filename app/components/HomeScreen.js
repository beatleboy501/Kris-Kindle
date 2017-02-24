import React, { Component } from 'react';
import { AppRegistry, View, StyleSheet, Text } from 'react-native';
import Button from './Button.js';
import HelloWorld from './HelloWorld'

export default class HomeScreen extends Component {

  constructor(props) {
    super(props);
    this._navigate = this._navigate.bind(this);
  }

  _navigate(routeComponent, routeName){
    this.props.navigator.push({
      component: routeComponent,
      passProps: {
        name: routeName
      }
    })
  }

  render() {
    const btns = [
      {label: 'Get a Randomly Sorted List', index: 0, key:'getList', onPress: () => this._navigate(HelloWorld, 'RandomList')},
      {label: 'See Saved Lists', index: 1, key:'seeLists', onPress: () => this._navigate(HelloWorld, 'SavedLists')},
      {label: 'See List of Family Members', index: 2, key:'seeFamily', onPress:() => this._navigate(HelloWorld, 'MemberList')},
      {label: 'Add a Family Member', index: 3, key:'addMember', onPress:() => this._navigate(HelloWorld, 'AddMember')},
      {label: 'Remove a Family Member', index: 4, key:'removeMember', onPress:() => this._navigate(HelloWorld, 'RemoveMember')}
    ];
    let buttonList = [];
    for (var btn of btns) {
      buttonList.push(<Button label={btn.label} key={btn.key} onPress={btn.onPress}></Button>);
    }
    return (
        <View style={styles.container}>
          <Text>Kris Kindle App</Text>
          <Text>Please select an option below</Text>
          {buttonList}
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  button: {
    fontSize: 14,
    textAlign: 'center',
    margin: 5,
    backgroundColor: 'black'
  }
});

AppRegistry.registerComponent('HomeScreen', () => HomeScreen);
