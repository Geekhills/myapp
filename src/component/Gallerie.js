//
 // This is the Gallerie class
 //

 // React native and others libraries imports
 import React, { Component } from 'react';
 import { View, StyleSheet, Text } from 'react-native';
 import { Icon } from 'react-native-elements';
 import Gallery from 'react-native-image-gallery';

 // Our custom files and classes import

 export default class Gallerie extends Component {
   state = {
      images: []
    }

    componentWillMount() {
      let imgs = [];
      this.props.navigation.state.params.images.map((img) => {
        imgs.push({source: {uri: img.url}})
      });
      this.setState({images: imgs});
    }

 	render() {
 		return(
      <View style={styles.container}>
        <Gallery
          initialPage={this.props.navigation.state.params.position ? this.props.navigation.state.params.position : 0}
          style={{flex: 1, backgroundColor: 'black'}}
          images={this.state.images}
        />
        <Icon
          name='close'
          type='evilicon'
          color='#fff'
          size={46}
          containerStyle={styles.icon}
          underlayColor="#000"
          onPress={() => this.props.navigation.goBack()} />
      </View>
 		);
 	}
 }

 const styles = StyleSheet.create({
   container: {
     flex: 1,
     backgroundColor: '#000'
   },
   icon: {
    position: 'absolute',
    top: 15,
    right: 15,
    width: 40,
    height: 40
  }
 });
