import React, { Component } from 'react';

import {
    StyleSheet,
    Text,
} from 'react-native';

const LoginLabel = (props) => {
  return (
      <Text
          style={props.styles && props.styles.textLabel ? props.styles.textLabel : styles.textLabel}
      >
        {props.text}
      </Text>
  );
};

const styles = StyleSheet.create({
  textLabel: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#34A853'
  }
});

export default LoginLabel;
