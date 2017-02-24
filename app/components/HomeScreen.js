import React, { Component } from 'react';
import { AppRegistry, View, StyleSheet, Text } from 'react-native';
import Button from './Button.js';
import FamilyMembersScreen from './FamilyMembersScreen'
import SavedListsScreen from './SavedListsScreen'
import GenerateListScreen from './GenerateListScreen'

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
      {label: 'Start a New Draw', index: 0, key:'getList', onPress: () => this._navigate(GenerateListScreen, 'RandomList')},
      {label: 'See Saved Draws', index: 1, key:'seeLists', onPress: () => this._navigate(SavedListsScreen, 'SavedLists')},
      {label: 'See Family Members', index: 2, key:'seeFamily', onPress:() => this._navigate(FamilyMembersScreen, 'MemberList')}
    ];
    let buttonList = [];
    for (var btn of btns) {
      buttonList.push(<Button label={btn.label} key={btn.key} onPress={btn.onPress}></Button>);
    }
    return (
        <View style={styles.container}>
          <Text>Kris Kindle App</Text>
          <Text>Select an option below</Text>
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
