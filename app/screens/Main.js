import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { TabViewAnimated, TabBar } from 'react-native-tab-view';
import Family from '../components/Family'
import SavedListsScreen from './SavedListsScreen'

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  page: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  tabIndicator:{
    backgroundColor: '#ff0000'
  },
  tabLabel:{
    backgroundColor: '#34A853'
  }
});

export default class Main extends Component {
  state = {
    index: 0,
    routes: this.get_routes()
  };

  get_routes() {
    var admin = false; // will have to get this from user login later
    var routes = [
      { key: '1', title: 'View Draw' },
      { key: '2', title: 'View Family' }
    ];
    if(admin){
      routes.push({
        key: '3', title: 'New Draw'
      });
    }
    return routes;
  }

  _handleChangeTab = (index) => {
    this.setState({ index });
  };

  _renderHeader = (props) => {
    return <TabBar indicatorStyle={styles.tabIndicator} tabStyle={styles.tabLabel} {...props} />;
  };

  _renderScene = ({ route }) => {
    switch (route.key) {
      case '1':
        return <SavedListsScreen />;
      case '2':
        return <Family />;
      default:
        return null;
    }
  };

  render() {
    return (
        <TabViewAnimated
            style={styles.container}
            navigationState={this.state}
            renderScene={this._renderScene}
            renderHeader={this._renderHeader}
            onRequestChangeTab={this._handleChangeTab}
        />
    );
  }
}
