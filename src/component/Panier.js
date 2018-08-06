//
 // This is the Panier class
 //

 // React native and others libraries imports
 import React, { Component } from 'react';
 import { ScrollView, Text, StyleSheet, View } from 'react-native';

 // Our custom files and classes import
 import Language from "../Language";
 import Cart from '../model/Cart';
 import Panieritem from './common/Panieritem';
 import Error from './common/Error';
 import Loading from './common/Loading';

 export default class Panier extends Component {
   state = {
     panier: [],
     hasError: false,
     errorMsg: ""
   }

   componentWillMount() {
     this.setState({loading: true});
     var panier = new Cart();
     panier.get((value, error) => {
       this.setState({loading: false});
       if(!error)
         this.setState({panier: value});
     });
     this.props.navigation.setParams({
      reload: this.reload.bind(this)
    });
   }

 	render() {
 		return(
      <ScrollView contentContainerStyle={styles.container}>
        <Error hasError={this.state.hasError} errorMsg={this.state.errorMsg} />
        {
            this.state.panier.map((item, i) => <Panieritem key={i} resto={item.resto} commande={item.commande} reload={this.reload} {...this.props} />)
        }
        {
          (this.state.loading == false && this.state.panier.length <= 0) ? <View style={styles.vide}><Text>{Language.Cart.empty}</Text></View> : null
        }
        <Loading loading={this.state.loading} />
      </ScrollView>
 		);
 	}

  reload() {
    this.setState({loading: true});
    var panier = new Cart();
    panier.get((value, error) => {
      this.setState({loading: false});
      if(error)
       this.setState({hasError: true, errorMsg: Language.Error});
      else {
        this.setState({panier: value});
      }
    });
  }
 }
 const styles = StyleSheet.create({
   container: {
     paddingLeft: 7,
     paddingRight: 7,
   },
   vide: {
     flex: 1,
     justifyContent: 'center',
     alignItems: 'center',
     marginTop: 30
   }
});
