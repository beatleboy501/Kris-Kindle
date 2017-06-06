import React, { Component } from 'react';
import { Navigator, AppRegistry, View, StyleSheet, Text, TouchableHighlight} from 'react-native';
import FamilyMembersScreen from '../screens/FamilyMembersScreen.js';
import Button from './Button.js';

export default class Family extends Component {
  constructor(props){
    super(props);
    this.configureScene = this.configureScene.bind(this);
  }

  configureScene(route, routeStack){
    if(route.type === 'Modal') {
      return Navigator.SceneConfigs.FloatFromBottom
    }
    return Navigator.SceneConfigs.HorizontalSwipeJump
  }

  renderScene(route, navigator) {
    return React.createElement(route.component, { ...this.props, ...route.passProps, route, navigator } )
  }

  render() {

    let NavigationBarRouteMapper = {
      LeftButton(route, navigator, index, navState) {
        if (index > 0) {
          return (
              <Button
                  label="Back"
                  style={{
                    backgroundColor: 'white',
                    verticalAlign: 'bottom',
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center'
                  }}
                  onPress={() => {
                    if (index > 0) {
                      navigator.pop()
                    }
                  }}>
              </Button>
          )
        }
        else {
          return null
        }
      },
      RightButton(route, navigator, index, navState) {
        if (route.onPress) return (
            <Button
                label={ route.rightText || 'Right Button' }
                onPress={ () => route.onPress() }>
            </Button>
        )
      },
      Title(route, navigator, index, navState) {
        return <Text style={styles.title}></Text>
      }
    };

    return (
        <Navigator
            configureScene={ this.configureScene }
            style={styles.navigator}
            initialRoute={{ component: FamilyMembersScreen, name: 'FamilyMembersScreen' }}
            navigationBar={
              <Navigator.NavigationBar
                style={ styles.nav }
                routeMapper={ NavigationBarRouteMapper } />
            }
            renderScene={ this.renderScene }/>
    );
  }

}

const styles = StyleSheet.create({
  title:{},
  navigator:{
    flex: 1,
    backgroundColor: 'white'
  }
});

AppRegistry.registerComponent('Home', () => Family);
