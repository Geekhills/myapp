//
 // This is the Suivre class
 //

 // React native and others libraries imports
 import React, { Component } from 'react';
 import { View, StyleSheet, Image, ScrollView, Dimensions } from 'react-native';
 import { Text, Button, Divider } from 'react-native-elements';
 import MapView from 'react-native-maps';

 // Our custom files and classes import
 import Loading from './common/Loading';
 import Config from '../Config';
 import Language from "../Language";
 import CommandeModel from '../model/CommandeModel';

 export default class Suivre extends Component {
   state = {
     commande: this.props.navigation.state.params.commande,
     left: "-",
     percent: 0,
     loading: false
   };

   commandeModel = new CommandeModel();

   componentWillMount() {
     this.calculerRestant();
     setInterval(() => this.update(), 10000);
   }

 	render() {
 		return(
 			<ScrollView style={styles.container}>
        <MapView
          region={{
            latitude: parseFloat(this.state.commande.positionActuelle.latitude),
            longitude: parseFloat(this.state.commande.positionActuelle.longitude),
            latitudeDelta: 0.0051,
            longitudeDelta: 0.0021
          }}
          loadingEnabled={true}
          style={styles.map}>
          <MapView.Marker
            coordinate={{latitude: this.state.commande.adresse.latitude, longitude: this.state.commande.adresse.longitude}}
            image={require('./img/currentMarker.png')}
            flat={true}
          />
          <MapView.Marker
            coordinate={{latitude: this.state.commande.positionActuelle.latitude, longitude: this.state.commande.positionActuelle.longitude}}
            image={require('./img/marker.png')}
            flat={true}
          />
        </MapView>
        <Divider style={styles.border} />
        <View style={styles.content}>
          <View style={styles.counter}>
              <Text style={styles.counterText}>{this.state.left.split(" ").join("\n")}</Text>
          </View>
          { /* <Image source={require('./img/logo.png')} style={styles.logo} /> */ }
          <Text style={styles.title}>{Language.Follow.beingDelivered}</Text>
          <Button
            title={Language.Follow.showAll}
            raised
            onPress={() => this.props.navigation.goBack()}
            containerViewStyle={styles.btnContainer}
            buttonStyle={styles.btn} />
        </View>
        <Loading loading={this.state.loading} />
      </ScrollView>
 		);
 	}

  calculerRestant() {
    this.commandeModel.duration(this.state.commande.positionActuelle, this.state.commande.adresse, (duration, error) => {
      if(!error) {
        this.setState({left: duration});
      }
    });
  }

  update() {
      this.commandeModel.suivre(this.state.commande, (commande, error) => {
        if(!error) {
          this.setState({commande: commande});
          this.calculerRestant();
        }
      });
  }
 }
 const styles = StyleSheet.create({
   container: {
     backgroundColor: '#fdfdfd',
   },
   map: {
     width: '100%',
     height: Dimensions.get('window').height * 0.5,
   },
   border: {
     backgroundColor: '#e74c3c',
     height: 2
   },
   content: {
     flex: 1,
     justifyContent: 'center',
     alignItems: 'center',
     paddingLeft: 7,
     paddingRight: 7
   },
   counter: {
     marginTop: -45,
     width: 90,
     height: 90,
     borderRadius: 45,
     borderColor: '#e74c3c',
     backgroundColor: '#fdfdfd',
     borderWidth: 3,
     alignItems: 'center',
     justifyContent: 'center'
   },
   counterText: {
     color: '#e74c3c',
     fontWeight: '100',
     fontSize: 16,
     fontWeight: '600',
     textAlign: 'center',
     marginTop: -3
  },
   logo: {
     width: 50,
     height: 50,
     marginTop: 15
   },
   title: {
     marginTop: 7,
     fontSize: 18,
     width: '50%',
     color: '#e74c3c',
     fontWeight: 'bold'
   },
   btnContainer: {
     marginTop: 7
   },
   btn: {
     backgroundColor: '#e74c3c'
   }
});
