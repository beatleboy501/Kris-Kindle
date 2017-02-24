import React, { Component } from 'react';
import { Navigator, AppRegistry, View, StyleSheet, Text, TouchableHighlight} from 'react-native';
import HomeScreen from './HomeScreen.js';
import HelloWorld from './HelloWorld.js';
import Button from './Button.js';

export default class Home extends Component {
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

    var NavigationBarRouteMapper = {
      LeftButton(route, navigator, index, navState) {
        if(index > 0){
          return(
            <Button
                label="Back"
                onPress={() => { if (index > 0) { navigator.pop() } }}>
            </Button>
          )
        }
        else { return null }
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
        return <Text style={styles.title}>Kris Kindle</Text>
      }
    };

    return (
        <Navigator
            configureScene={ this.configureScene }
            style={{ flex:1 }}
            initialRoute={{ component: HomeScreen, name: 'HomeScreen' }}
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
  nav:{},
  leftNavButtonText:{},
  title:{}
});

AppRegistry.registerComponent('Home', () => Home);
