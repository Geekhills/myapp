//
 // This is the Consommableitem class
 // Usage: <Consommableitem resto={resto} consommable={consommable} />
 //

 // React native and others libraries imports
 import React, { Component } from 'react';
 import { Image, View, StyleSheet } from 'react-native';
 import { Button, Text, Icon } from 'react-native-elements';

 // Our custom files and classes import
 import Language from '../../Language';
 import Client from '../../model/Client';

 export default class Consommableitem extends Component {
   state = {
      loading: false
   }

 	render() {
    consommable = this.props.consommable;
 		return(
 			<View>
        <View style={styles.container}>
          <View style={styles.row}>
            <Image style={styles.image} source={{uri: consommable.image}} />
            <View style={styles.info}>
              <Text h4 style={styles.nom}>{consommable.libelle}</Text>
              <Text>{consommable.description}</Text>
              <View style={styles.infos}>
                <View style={styles.preparation}>
                  <Icon containerStyle={styles.clock} size={20} name="clock" type="evilicon" color="#000" />
                  <Text style={{fontWeight: "bold"}}> {consommable.tempsPreparation} min</Text>
                </View>
                <Text style={styles.prix}>{consommable.prix}{Language.Currency}</Text>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.row}>
            <Button
              title={Language.Order.addToCart}
              raised
              onPress={this.ajouter.bind(this)}
              containerViewStyle={styles.btnContainer}
              buttonStyle={styles.carteBtn}
              loading={this.state.loading}
            />
        </View>
      </View>
 		);
 	}

  ajouter() {
    this.setState({loading: true});
    var client = new Client();
    client.isLoggedIn((logged) => {
      this.setState({loading: false});
      if(logged) {
        this.props.navigation.navigate('Commander', {title: "Commander", resto: this.props.resto, consommable: this.props.consommable});
      }
      else {
        this.props.navigation.navigate("Login");
      }
    });
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
     height: 150
   },
   info: {
     marginLeft: 15,
     paddingRight: 15,
     flex: 1
   },
   nom: {
     fontSize: 24,
     fontWeight: '400',
   },
   infos: {
     flex: 1,
     flexDirection: 'row',
     alignItems: 'flex-end',
     paddingBottom: 7
   },
   preparation: {
     flex: 3,
     flexDirection: 'row',
     alignItems: 'center'
   },
   clock: {
     width: 20,
     height: 20
   },
   prix: {
     fontWeight: "bold",
     flex: 1,
     textAlign: 'right',
     fontSize: 18
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
