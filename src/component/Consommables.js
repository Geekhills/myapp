//
 // This is the Consommables class
 //

 // React native and others libraries imports
 import React, { Component } from 'react';
 import { ScrollView, Text, StyleSheet, Keyboard, View, Picker } from 'react-native';

 // Our custom files and classes import
 import Consommableitem from './common/Consommableitem';
 import Error from './common/Error';
 import Loading from './common/Loading';


 export default class Consommables extends Component {
   state = {
      hasError: false,
      errorMsg: "",
      consommables: [],
      loading: false
   };

   componentWillMount() {
     this.setState({consommables: this.props.navigation.state.params.consommables});
   }

 	render() {
 		return(
 			<ScrollView contentContainerStyle={styles.container}>
        <Error hasError={this.state.hasError} errorMsg={this.state.errorMsg} />
        {
            this.state.consommables.map((item, i) => <Consommableitem key={i} resto={this.props.navigation.state.params.resto} consommable={item} {...this.props} />)
        }
        {
          (this.state.loading == false && this.state.consommables.length <= 0) ? <View style={styles.vide}><Text>{Language.NoResult}</Text></View> : null
        }
        <Loading loading={this.state.loading} />
      </ScrollView>
 		);
 	}

 }

 const styles = StyleSheet.create({
   container: {
     paddingLeft: 7,
     paddingRight: 7
   },
   vide: {
     flex: 1,
     justifyContent: 'center',
     alignItems: 'center',
     marginTop: 30
   }
 });
