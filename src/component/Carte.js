//
 // This is the Carte class
 //

 // React native and others libraries imports
 import React, { Component } from 'react';
 import { ScrollView, StyleSheet } from 'react-native';

 // Our custom files and classes import
 import Carteitem from './common/Carteitem';

 export default class Carte extends Component {
 	render() {
    resto = this.props.navigation.state.params.resto;
 		return(
 			<ScrollView>
        {
          resto.carte.map((item, i) =>
            <Carteitem key={i} libelle={item.libelle} image={item.image} resto={resto} onPress={() => this.voirMenu(item.consommable)} />
          )
        }
      </ScrollView>
 		);
 	}

  voirMenu(consommable) {
    this.props.navigation.navigate("Consommables", {title: this.props.navigation.state.params.resto.nom, resto: this.props.navigation.state.params.resto, consommables: consommable});
  }
 }

 const styles = StyleSheet.create({

 });
