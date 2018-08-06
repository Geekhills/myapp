//
 // This is the Carteitem class
 //

 // React native and others libraries imports
 import React, { Component } from 'react';
 import { View, StyleSheet, ImageBackground, TouchableHighlight } from 'react-native';
 import { Text } from 'react-native-elements';

 // Our custom files and classes import

 export default class Carteitem extends Component {
 	render() {
 		return(
      <TouchableHighlight onPress={this.props.onPress} activeOpacity={0.7}>
   			<View style={styles.container}>
          <ImageBackground style={styles.image} source={{uri: this.props.image}}>
            <View style={styles.overlay} />
            <View style={styles.info}>
              <Text h4 style={styles.nom}>{this.props.libelle}</Text>
            </View>
          </ImageBackground>
        </View>
      </TouchableHighlight>
 		);
 	}
 }
 const styles = StyleSheet.create({
	container: {
    flex: 1,
    height: 250
  },
  image: {
    flex: 1
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.5)'
  },
  info: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  nom: {
    fontSize: 24,
    fontWeight: '400',
    color: '#fff',
    textAlign: 'center'
  }
});
