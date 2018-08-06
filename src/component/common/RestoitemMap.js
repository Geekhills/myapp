//
 // This is the Restoitem class
 //

 // React native and others libraries imports
 import React, { Component } from 'react';
 import { ImageBackground, View, StyleSheet } from 'react-native';
 import { Button, Text } from 'react-native-elements';

 // Our custom files and classes import
 import Language from '../../Language';

 export default class RestoitemMap extends Component {
 	render() {
    resto = this.props.resto;
 		return(
 			<View>
        <View style={styles.container}>
          <View style={styles.row}>
            <ImageBackground style={styles.image} source={{uri: resto.gallerie[0].url}}>
              <View style={styles.overlay} />
              <View style={styles.info}>
                <Text h4 style={styles.nom}>{resto.nom}</Text>
                <Text style={styles.tags}>
                  {
                    resto.specialite.map((tag, i) => {
                      return tag + (i < resto.specialite.length-1 ? ", " : "")
                    })
                  }
                </Text>
              </View>
            </ImageBackground>

          </View>
        </View>
        <View style={[styles.row, styles.buttons]}>
            <Button
              title={Language.Restaurants.openBtn}
              raised
              containerViewStyle={styles.btnContainer}
              buttonStyle={styles.carteBtn} />
        </View>
      </View>
 		);
 	}

 }

 const styles = StyleSheet.create({
   container: {
     backgroundColor: '#fff',
     marginTop: 5,
     marginBottom: 0,
   },
   row: {
     flexDirection: 'row'
   },
   image: {
     flex: 1,
     height: 100
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
   },
   tags: {
     color: '#fff',
     textAlign: 'center'
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
     marginRight: 0,
     marginTop: 5
   },
   carteBtn: {
     backgroundColor: '#33332E'
   },
   overlay: {
     ...StyleSheet.absoluteFillObject,
     backgroundColor: 'rgba(0,0,0,0.5)'
   }
 });
