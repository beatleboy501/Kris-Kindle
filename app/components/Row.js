import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center'
  },
  text: {
    marginLeft: 12,
    fontSize: 16
  },
  photo: {
    width: 29,
    height: 36,
    borderRadius: 5
  }
});

const Row = (props) => (
    <View style={styles.container}>
      <Image source={require('./login/cane.png')} style={styles.photo} />
      <Text style={styles.text}>
        {`${props.name.first} ${props.name.last}`} is shopping for {props.recipient}
      </Text>
    </View>
);

export default Row;
