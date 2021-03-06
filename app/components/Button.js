import React from 'react';
import { StyleSheet, Text, View, TouchableHighlight } from 'react-native';
import {
    margin,
    green,
    paddingVertical,
    paddingHorizontal,
    borderRadius,
} from '../styles/index';

const stylesheet = StyleSheet.create({
  view: {
    backgroundColor: green,
    paddingVertical,
    paddingHorizontal,
    borderRadius,
    marginTop: 5
  },
  text: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center'
  }
});

const Button = React.createClass({

  propTypes: {
    label: React.PropTypes.string,
    onPress: React.PropTypes.func,
    style: React.PropTypes.object
  },

  getDefaultProps() {
    return {
      label: '',
      onPress: () => {},
      style: {}
    };
  },

  render() {
    const { label, onPress, style, children } = this.props;
    const { touchable, view, text} = style;
    const content = children ? children : label;
    return (
        <TouchableHighlight onPress={onPress} style={[stylesheet.touchable, touchable]}>
          <View style={[stylesheet.view, view]}>
            <Text style={[stylesheet.text, text]}>{content}</Text>
          </View>
        </TouchableHighlight>
    );
  }
});

export default Button;
