//
 // This is the Commander class
 //

 // React native and others libraries imports
 import React, { Component } from 'react';
 import { View, ScrollView, Image, StyleSheet, TouchableWithoutFeedback, Dimensions } from 'react-native';
 import { Text, Button, Icon } from 'react-native-elements';
 import Toast from 'react-native-simple-toast';

 // Our custom files and classes import
 import Language from "../Language";
 import Cart from '../model/Cart';
 import Input from './common/Input';
 import Error from './common/Error';

 export default class Commander extends Component {
   state = {
      note: "",
      qte: 1,
      montant: this.props.navigation.state.params.consommable.prix,
      loading: false,
      hasError: false,
      errorMsg: ""
   }

  consommable = this.props.navigation.state.params.consommable;
 	render() {
 		return(
      <ScrollView containerStyle={styles.container}>
        <TouchableWithoutFeedback onPress={this.openGallery.bind(this)} >
          <Image style={styles.image} source={{uri: consommable.image}}/>
        </TouchableWithoutFeedback>

        <View style={styles.content}>
          <View style={styles.header}>
            <Text style={styles.nom}>{consommable.libelle}</Text>
            <Text style={styles.prix}>{consommable.prix}</Text>
          </View>
          <Text style={styles.description} multiline={true}>{consommable.description}</Text>
          <View style={styles.section}>
            <Text style={styles.heading}>{Language.Order.specialNote}</Text>
            <Input
              placeholder="Notes..."
              icon="pencil"
              style={styles.input}
              onChange={(text) => this.setState({note: text})}
              onSubmit={(text) => this.setState({note: text})}
            />
          </View>
          <View style={styles.section}>
            <Text style={styles.heading}>{Language.Order.quantity}</Text>
            <View style={styles.qteContainer}>
              <Icon style={styles.qteBtn} name='minus' type='feather' color='#7f8c8d' onPress={() => this.modifierQte(this.state.qte-1)}/>
              <Text style={styles.qteValue}>{this.state.qte}</Text>
              <Icon style={styles.qteBtn} name='plus' type='feather' color='#7f8c8d' onPress={() => this.modifierQte(this.state.qte+1)} />
            </View>
          </View>
          <View style={styles.sectionMontant}>
            <Text style={styles.heading2}>{Language.Order.total}</Text>
            <Text style={styles.prix}>{this.state.montant}{Language.Currency}</Text>
          </View>
        </View>

        <Button
          title={Language.Order.addToCart}
          raised
          onPress={this.ajouter.bind(this)}
          containerViewStyle={styles.btnContainer}
          buttonStyle={styles.btn}
          loading={this.state.loading}
         />
         <Error hasError={this.state.hasError} errorMsg={this.state.errorMsg} />
      </ScrollView>
 		);
 	}

  openGallery() {
    this.props.navigation.navigate('Gallerie',{images: [{url: consommable.image}], position: 0});
  }

  modifierQte(qte) {
    if(qte >= 1)
      this.setState({
        qte: parseInt(qte),
        montant: consommable.prix * parseInt(qte)
      });
  }

  ajouter() {
    this.setState({loading: true});
    var panier = new Cart();
    panier.add(consommable, this.state.qte, this.state.note, this.state.montant, this.props.navigation.state.params.resto, (error) => {
      this.setState({loading: false});
      if(error)
        this.setState({hasError: true, errorMsg: Language.Error});
      else
        Toast.show(Language.Order.addedToCart);
    });
  }

 }
 const styles = StyleSheet.create({
   container: {},
   image: {
     width: Dimensions.get('window').width,
     height: 250
   },
   content: {
     paddingLeft: 7,
     paddingRight: 7
   },
   header: {
     flex: 1,
     flexDirection: 'row',
     marginTop: 7
   },
   nom: {
     flex: 3,
     fontSize: 22
   },
   prix: {
     flex: 1,
     textAlign: 'right',
     fontSize: 22
   },
   heading: {
     fontSize: 20
   },
   input: {
     marginTop: 15,
     marginBottom: 5
   },
   section: {
     marginBottom: 10
   },
   sectionMontant: {
     flex: 1,
     flexDirection: 'row',
     marginTop: 5,
     marginBottom: 10
   },
   heading2: {
     flex: 3,
     fontSize: 22,
     fontWeight: "bold"
   },
   btnContainer: {
     flex: 1,
     backgroundColor: 'green',
     marginTop: 10,
     marginBottom: 5
   },
   btn: {
     backgroundColor: '#e74c3c'
   },
   qteContainer: {
     flex: 1,
     flexDirection: 'row',
     alignItems: 'center',
     paddingTop: 5,
     paddingBottom: 5,
     paddingLeft: 7,
     paddingRight: 7,
     backgroundColor: '#fff',
     borderWidth: 1,
     borderRadius: 2,
     borderColor: '#ddd',
     borderBottomWidth: 0,
     shadowColor: '#000',
     shadowOffset: { width: 0, height: 1 },
     shadowOpacity: 0.2,
     shadowRadius: 2,
     elevation: 1,
     marginLeft: 5,
     marginRight: 5,
     marginTop: 10,
   },
   qteBtn: {
     flex: 1
   },
   qteValue: {
     flex: 3,
     textAlign: 'center',
     fontSize: 20
   }
});
