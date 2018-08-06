//
 // This is the Panieritem class
 //

 // React native and others libraries imports
 import React, { Component } from 'react';
 import { Image, View, StyleSheet } from 'react-native';
 import { Button, Text } from 'react-native-elements';

 // Our custom files and classes import
 import Language from '../../Language';

 export default class Panieritem extends Component {
 	render() {
 		return(
      <View>
        <View style={styles.container}>
          <View style={styles.row}>
            <Image style={styles.image} source={{uri: this.props.resto.logo[0].url}} />
            <View style={styles.info}>
              <Text h4 style={styles.nom}>{this.props.resto.nom}</Text>
              <View style={styles.livraison}><Text style={{fontWeight: "bold"}}> {this.props.resto.coordonnees.adresse}</Text></View>
            </View>
          </View>
        </View>
        <View style={[styles.row, styles.buttons]}>
            <Button
              title={Language.Cart.openBtn}
              raised
              onPress={this.afficher.bind(this)}
              containerViewStyle={styles.btnContainer}
              buttonStyle={styles.btn} />
        </View>
      </View>
 		);
 	}

  afficher() {
    this.props.navigation.navigate("Commandedetails", {title: Language.Order.title, resto: this.props.resto, commande: this.props.commande, reload: this.props.reload});
  }
 }
 const styles = StyleSheet.create({
   container: {
     backgroundColor: '#fff',
     marginTop: 5,
     marginBottom: 0,
     borderTopWidth: 1,
     borderLeftWidth: 1,
     borderRightWidth: 1,
     borderTopColor: 'rgba(73 ,71, 81, 0.2)',
     borderLeftColor: 'rgba(73 ,71, 81, 0.2)',
     borderRightColor: 'rgba(73 ,71, 81, 0.2)',
   },
   row: {
     flexDirection: 'row'
   },
   image: {
     width: '35%',
     height: 110
   },
   info: {
     marginLeft: 15,
   },
   nom: {
     fontSize: 24,
     fontWeight: '400',
   },
   livraison: {
     position: 'absolute',
     bottom: 10
   },
   buttons: {
     flexDirection: 'row',
     marginBottom: 10
   },
   btnContainer: {
     width: '100%',
     marginLeft: 0,
     marginRight: 0
   },
   btn: {
     backgroundColor: '#33332E'
   }
});
