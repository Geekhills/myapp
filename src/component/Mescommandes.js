//
 // This is the Mescommandes class
 //

 // React native and others libraries imports
 import React, { Component } from 'react';
 import { ScrollView, Text, StyleSheet, View } from 'react-native';

 // Our custom files and classes import
 import Language from '../Language';
 import CommandeModel from '../model/CommandeModel';
 import Mescommandeitem from './common/Mescommandeitem';
 import Error from './common/Error';
 import Loading from './common/Loading';

 export default class Mescommandes extends Component {
   state = {
     commandes: [],
     hasError: false,
     errorMsg: ""
   }

   componentDidMount() {
     this.loadCommandes();
     setInterval(() => this.loadCommandes(), 10000);
   }

 	render() {
 		return(
      <ScrollView contentContainerStyle={styles.container}>
        <Error hasError={this.state.hasError} errorMsg={this.state.errorMsg} />
        {
            this.state.commandes.map((item, i) => <Mescommandeitem key={i} commande={item} {...this.props} />)
        }
        {
          (this.state.loading == false && this.state.commandes.length <= 0) ? <View style={styles.vide}><Text>{Language.MyOrders.empty}</Text></View> : null
        }
        <Loading loading={this.state.loading} />
      </ScrollView>
 		);
 	}

  loadCommandes() {
    this.setState({loading: true});
    var mescommandesModel = new CommandeModel();
    mescommandesModel.getAll((value, error) => {
      this.setState({loading: false});
      if(error)
       this.setState({hasError: true, errorMsg: Language.Error});
      else {
        this.setState({commandes: value});
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
