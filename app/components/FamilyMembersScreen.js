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
      {label: 'See Current List', index: 0, key:'getMemberList', onPress: () => this._navigate(MemberListScreen, 'MemberList')},
      {label: 'Add', index: 1, key:'Add', onPress: () => this._navigate(AddMemberScreen, 'AddMember')},
      {label: 'Remove', index: 2, key:'Remove', onPress:() => this._navigate(RemoveMemberScreen, 'RemoveMember')}
    ];
    let buttonList = [];
    for (var btn of btns) {
      buttonList.push(<Button label={btn.label} key={btn.key} onPress={btn.onPress}></Button>);
    }
    return(
        <View style={styles.container}>
          <Text>Family Members Screen</Text>
          {buttonList}
        </View>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  }
});

AppRegistry.registerComponent('FamilyMembersScreen', () => FamilyMembersScreen);
