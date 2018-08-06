//
 // This is the Error class
 // Usage: <Error hasError={true} errorMsg="Error found !" />
 //

 // React native and others libraries imports
 import React, { Component } from 'react';
 import { View, Text, StyleSheet, Animated } from 'react-native';
 
 // Our custom files and classes import

 export default class Error extends Component {
   state = {
      bounceValue: new Animated.Value(100)
    };


  componentWillUpdate(nextProps, nextState) {
    if (nextProps.hasError) {
      Animated.spring(
        this.state.bounceValue,
        {
          toValue: 0,
          velocity: 8,
          tension: 1,
          friction: 5.5
        }
      ).start();
    }
    else {
      Animated.spring(
        this.state.bounceValue,
        {
          toValue: 100,
          velocity: 8,
          tension: 1,
          friction: 5.5
        }
      ).start();
    }
  }

 	render() {
    if (this.props.hasError) {
      return(
   			<Animated.View style={[styles.container, {transform: [{translateY: this.state.bounceValue}]}]}>
          <Text style={styles.error}>{this.props.errorMsg}</Text>
        </Animated.View>
   		);
    }
    else return null;
 	}
 }

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    zIndex: 1000,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "#e74c3c",
    paddingTop: 7,
    paddingBottom: 7
  },
  error: {
    color: "#fff",
    fontSize: 16,
    marginTop: 5,
    marginBottom: 5,
    textAlign: "center"
  }
});
