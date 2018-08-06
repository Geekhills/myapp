//
 // This is the Loading class
 // Usage: <Loading loading={true} />
 //

 // React native and others libraries imports
 import React, { Component } from 'react';
 import { View, ActivityIndicator, StyleSheet } from 'react-native';

 // Our custom files and classes import

 export default class Loading extends Component {
 	render() {
    if(this.props.loading)
   		return(
   			<View style={styles.container}>
          <ActivityIndicator size="large" />
        </View>
   		);
    else return null;
 	}
 }

 const styles = StyleSheet.create({
   container: {
     flex: 1,
     justifyContent: 'center',
     alignItems: 'center'
   }
 });
