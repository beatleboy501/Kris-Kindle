import React, { Component } from 'react';
import { View, ListView, StyleSheet, Text } from 'react-native';
import Row from './Row';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
  },
  separator: {
    flex: 1,
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#8E8E8E',
  },
});

export default class ListViewComponent extends Component {
  constructor(props) {
    super(props);

    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows([
        {
          picture: {
            large: 'http://beatleboy501.com/img/me.jpg'
          },
          name: {
            first: "Andrew",
            last: "Allison"
          }
        },
        {
          picture: {
            large: 'http://beatleboy501.com/img/me.jpg'
          },
          name: {
            first: "Nanny",
            last: "Hickey"
          }
        }
      ]),
    };
  }
  render() {
    return (
        <ListView
            style={styles.container}
            dataSource={this.state.dataSource}
            renderRow={(data) => <Row {...data} />}
            renderSeparator={(sectionId, rowId) => <View key={rowId} style={styles.separator} />}
        />
    );
  }
}
