import React, { Component } from 'react';
import { AppRegistry, View, StyleSheet, Text } from 'react-native';
import Button from './Button'
import MemberListScreen from './MemberListScreen'
import AddMemberScreen from './AddMemberScreen'
import RemoveMemberScreen from './RemoveMemberScreen'


export default class FamilyMembersScreen extends Component {
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

  render(){
    const btns = [
      {label: 'See the Entire Hickey List', index: 0, key:'getMemberList', onPress: () => this._navigate(MemberListScreen, 'MemberList')},
      {label: 'Add a New Member of the Family', index: 1, key:'Add', onPress: () => this._navigate(AddMemberScreen, 'AddMember')},
      {label: 'Remove Someone...', index: 2, key:'Remove', onPress:() => this._navigate(RemoveMemberScreen, 'RemoveMember')}
    ];
    let buttonList = [];
    for (var btn of btns) {
      buttonList.push(<Button label={btn.label} key={btn.key} onPress={btn.onPress}></Button>);
    }
    return(
        <View style={styles.container}>
          {buttonList}
        </View>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    marginTop: 100,
    alignItems: 'center',
    backgroundColor: 'white'
  }
});

AppRegistry.registerComponent('FamilyMembersScreen', () => FamilyMembersScreen);
