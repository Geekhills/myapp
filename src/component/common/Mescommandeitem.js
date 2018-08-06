//
 // This is the Mescommandeitem class
 //

 // React native and others libraries imports
 import React, { Component } from 'react';
 import { Image, View, StyleSheet, Alert } from 'react-native';
 import { Button, Text } from 'react-native-elements';

 // Our custom files and classes import
 import Language from '../../Language';

 export default class Mescommandeitem extends Component {
 	render() {
 		return(
 			<View>
        <View style={styles.container}>
          <View style={styles.row}>
            <Image style={styles.image} source={{uri: this.props.commande.restaurant.logo[0].url}} />
            <View style={styles.info}>
              <Text style={styles.num}>
                {Language.MyOrders.order} {this.props.commande.numero}
              </Text>

                {
                  this.props.commande.composant.map((item, i) => {
                      return <Text key={i} numberOfLines={1} style={styles.nom}>{item.consommable.libelle + (i < this.props.commande.composant.length-1 ? ",\n" : "")}</Text>
                  })
                }


                {
                  this.props.commande.statut == "Retourne" ?
                    <Text style={styles.statut}>{Language.MyOrders.pending}</Text>
                      :
                    null
                }
            </View>
          </View>
        </View>
        <View style={[styles.row, styles.buttons]}>
          <Button
            title={Language.MyOrders.follow}
            raised
            onPress={this.afficher.bind(this)}
            containerViewStyle={styles.btnContainer}
            buttonStyle={styles.btn}
           />
        </View>
      </View>
 		);
 	}

  afficher() {
    if(this.props.commande.statut == "Annulée") {
      Alert.alert(
        '',
        Language.MyOrders.canceled,
        [
          {text: 'OK', onPress: () => null},
        ],
        { cancelable: false }
      )
    }
    else if(this.props.commande.statut !=  "En cours de livraison") {
      Alert.alert(
        '',
        Language.MyOrders.noFollow,
        [
          {text: 'OK', onPress: () => null},
        ],
        { cancelable: false }
      )
    }
    else {
      this.props.navigation.navigate("Suivre", {title: Language.Follow.title, commande: this.props.commande});
    }
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
   buttons: {
     flexDirection: 'row',
     marginBottom: 10
   },
   image: {
     width: '35%',
     height: 110
   },
   info: {
     marginLeft: 15,
   },
   num: {
     fontSize: 18
   },
   nom: {
     width: "70%"
   },
   statut: {
     position: 'absolute',
     bottom: 10
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
