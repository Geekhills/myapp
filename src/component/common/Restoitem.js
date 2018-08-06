//
 // This is the Restoitem class
 //

 // React native and others libraries imports
 import React, { Component } from 'react';
 import { Image, View, StyleSheet } from 'react-native';
 import { Button, Text } from 'react-native-elements';

 // Our custom files and classes import
 import Language from '../../Language';

 export default class Restoitem extends Component {
 	render() {
    resto = this.props.resto;
 		return(
 			<View>
        <View style={styles.container}>
          <View style={styles.row}>
            <Image style={styles.image} source={{uri: resto.logo[0].url}} />
            <View style={styles.info}>
              <Text h4 style={styles.nom}>{resto.nom}</Text>
              <Text style={styles.tags}>
                {
                  resto.specialite.map((tag, i) => {
                    return tag + (i < resto.specialite.length-1 ? ", " : "")
                  })
                }
              </Text>
              <Text style={styles.livraison}><Text style={{fontWeight: "bold"}}> {resto.coordonnees.adresse}</Text></Text>
            </View>
          </View>
        </View>
        <View style={[styles.row, styles.buttons]}>
          <Button
            title={Language.Restaurants.openBtn}
            raised
            onPress={this.informations.bind(this)}
            containerViewStyle={styles.btnContainer}
            textStyle={styles.informationsBtnText}
            buttonStyle={styles.informationsBtn} />
            <Button
              title={Language.Restaurants.menuBtn}
              raised
              onPress={this.carte.bind(this)}
              containerViewStyle={styles.btnContainer}
              buttonStyle={styles.carteBtn} />
        </View>
      </View>
 		);
 	}

  informations() {
    this.props.navigation.navigate('Informations', {title: this.props.resto.nom, resto: this.props.resto});
  }

  carte() {
    this.props.navigation.navigate('Carte', {title: this.props.resto.nom, resto: this.props.resto});
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
     width: '30%',
     height: 110
   },
   info: {
     marginLeft: 15,
   },
   nom: {
     fontSize: 24,
     fontWeight: '400',
   },
   tags: {

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
     width: '50%',
     marginLeft: 0,
     marginRight: 0
   },
   informationsBtn: {
     backgroundColor: '#fff'
   },
   informationsBtnText: {
     color: "#575A5A"
   },
   carteBtn: {
     backgroundColor: '#33332E'
   }
 });
