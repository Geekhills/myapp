//
 // This is the Commandedetails class
 //

 // React native and others libraries imports
 import React, { Component } from 'react';
 import { ScrollView, View, StyleSheet, TouchableWithoutFeedback, Alert, WebView, ActivityIndicator } from 'react-native';
 import { Text, Divider, Button, Icon } from 'react-native-elements';
 import { Select, Option } from "react-native-chooser";
 import { NavigationActions } from 'react-navigation';
 import stripe from 'tipsi-stripe';
 import base64 from "base-64";

 // Our custom files and classes import
 import Config from '../Config';
 import Language from "../Language";
 import Client from '../model/Client';
 import Cart from '../model/Cart';
 import CommandeModel from '../model/CommandeModel';
 import Loading from './common/Loading';
 import Input from './common/Input';
 import RadioButton from './common/RadioButton';

 export default class Commandedetails extends Component {
   state = {
      loading: false,
      payerLoading: false,
      adressInputToggle: false,
      adressInput: '',
      total: 0.0,
      tva: 0.0,
      paypalSelected: false,
      cbSelected: true,
      client: {coordonnes: []},
      positionCourante: {adresse: "Position courante", latitude: -1, longitude: -1},
      selectedAdress: {},
      webViewEnabled: false
   };


   componentWillMount() {
     this.setState({loading: true});
     stripe.init({publishableKey: Config.stripe.publishableKey});
     var somme = 0;
     this.props.navigation.state.params.commande.map((item, i) => {
       somme += parseFloat(item.prix);
     });
     var tva = 0.3+(somme*0.019)
     this.setState({tva: tva});
     this.setState({total: somme+tva});
     var client = new Client();
     client.get((data, error) => {
       if(error) {
         this.props.navigation.goBack();
       }
       else {
         this.setState({client: data});
         this.setState({selectedAdress: data.coordonnes[0]});
       }
     });
     navigator.geolocation.getCurrentPosition((position) => {
         this.setState({positionCourante: {adresse: "Position courante", latitude: position.coords.latitude, longitude: position.coords.longitude}});
         var pos = this.state.positionCourante;
         this.setState({selectedAdress: pos});
         this.setState({loading: false});
       },
       (error) => this.setState({loading: false, hasError: true, errorMsg: Language.OrderDetails.geoLocationDesactivate, selectedAdress: this.state.client.coordonnes}),
       {enableHighAccuracy: true, timeout: 10000, maximumAge: 1000}
     );
   }

 	render() {

 		return(
      <View style={{backgroundColor: '#fdfdfd', flex: 1}}>
        {this.renderMain()}
      </View>
 		);
 	}

  renderMain() {
    var resto = this.props.navigation.state.params.resto;
    var commande = this.props.navigation.state.params.commande;
    if(this.state.webViewEnabled) {
      return(
        <WebView
          source={{uri: this.state.paypalUrl}}
          onNavigationStateChange={this.checkPaypalPayment.bind(this)}
          javaScriptEnabled = {true}
          domStorageEnabled={true}
          renderLoading={this.renderLoadingView}
          startInLoadingState={true}
        />
      );
    }
    else {
      return(
        <ScrollView contentContainerStyle={styles.container}>
          <View style={styles.content}>
            <View style={[styles.row, styles.resto]}>
              <Text style={[styles.column, styles.text]}>{Language.OrderDetails.restaurant}: </Text>
              <Text style={styles.column}>{resto.nom}</Text>
            </View>
            <View style={styles.row}>
              <Text style={[styles.firstColumn, styles.header]}>{Language.OrderDetails.item}</Text>
              <Text style={[styles.column, styles.header]}>{Language.OrderDetails.quantity}</Text>
              <Text style={[styles.column, styles.header]}>{Language.OrderDetails.price}</Text>
            </View>
            {
              commande.map((item, i) => (
                <View style={styles.row} key={i}>
                  <Text style={styles.firstColumn}>{item.consommable.libelle}</Text>
                  <Text style={[styles.column, styles.blue]}>x{item.quantite}</Text>
                  <Text style={[styles.column, styles.red]}>{item.consommable.prix}€</Text>
                </View>
              ))
            }
            <View style={styles.row}>
              <Text style={[styles.firstColumn, styles.header]}>{Language.OrderDetails.tax}</Text>
              <Text style={[styles.column, styles.red]}>{this.state.tva.toFixed(1)}€</Text>
            </View>
            <Divider style={styles.divider} />
            <View style={styles.row}>
              <Text style={[styles.firstColumn, styles.header, styles.total]}>{Language.OrderDetails.total}</Text>
              <Text style={[styles.firstColumn, styles.red, styles.total, styles.textRight]}>{this.state.total.toFixed(1)}{Language.currency}</Text>
            </View>
          </View>

          {
            this.state.loading ? null :
              <View style={[styles.select, styles.row]}>
                <Text style={[styles.column]}>{Language.OrderDetails.deliverTo} </Text>
                <View style={{flex: 3}}>
                  <Select
                    onSelect = {(value, label) => this.setState({selectedAdress: value})}
                    defaultText = {this.state.selectedAdress != undefined && this.state.selectedAdress.adresse != undefined  ? this.state.selectedAdress.adresse : "GPS"}
                    indicator="down"
                  >
                    { this.state.positionCourante != null && this.state.positionCourante != undefined && this.state.positionCourante.latitude != -1 ?
                      <Option value={this.state.positionCourante}>{Language.OrderDetails.currentPosition}</Option>
                      :
                      null
                    }
                    {
                      this.state.client.coordonnes.map((item, i) => (
                          <Option key={i} value={item}>{item.adresse}</Option>
                      ))
                    }
                  </Select>
                </View>
                <Icon style={styles.column} name="plus" type="evilicon" onPress={() => this.setState({adressInputToggle: !this.state.adressInputToggle})} />
              </View>
          }
          <View>
          {
            this.state.adressInputToggle ?
              <View style={styles.row}>
                  <Input
                    icon="plus"
                    style={{flex: 1, backgroundColor: '#fcfcfc'}}
                    onChange={(text) => this.setState({adressInput: text})}
                    value={this.state.adressInput}
                    onSubmit={this.ajouterAdresse.bind(this)}
                  />
                  <Button title={Language.OrderDetails.addAddress} backgroundColor="#575A5A" onPress={this.ajouterAdresse.bind(this)} />
              </View>
            : null
          }
          </View>
          {
            this.state.loading ? null :
          <View style={[styles.paiement, styles.row]}>
            <TouchableWithoutFeedback onPress={() => this.setState({cbSelected: true, paypalSelected: false})}>
              <View style={styles.option}>
                  <RadioButton
                    animation={'bounceIn'}
                    size={12}
                    innerColor="#e74c3c"
                    outerColor="#e74c3c"
                    isSelected={this.state.cbSelected}
                    onPress={() => this.setState({cbSelected: true, paypalSelected: false})}
                  />
                <Text style={styles.optionText}>{Language.OrderDetails.card}</Text>
              </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={() => this.setState({cbSelected: false, paypalSelected: true})}>
              <View style={styles.option}>
                  <RadioButton
                    animation={'bounceIn'}
                    size={12}
                    innerColor="#e74c3c"
                    outerColor="#e74c3c"
                    isSelected={this.state.paypalSelected}
                    onPress={() => this.setState({cbSelected: false, paypalSelected: true})}
                  />
                <Text style={styles.optionText}>{Language.OrderDetails.paypal}</Text>
              </View>
            </TouchableWithoutFeedback>
            </View>
          }
          <Loading loading={this.state.loading} />

          <Button
            title={Language.OrderDetails.pay}
            raised
            onPress={this.pay.bind(this)}
            containerViewStyle={styles.btnContainer}
            buttonStyle={styles.btn}
            loading={this.state.payerLoading}
            disabled={this.state.loading}
           />
          <Button
            title={Language.OrderDetails.deleteOrder}
            raised
            onPress={this.annuler.bind(this)}
            containerViewStyle={styles.btnContainer}
            buttonStyle={styles.annulerBtn}
            disabled={this.state.loading}
          />


        </ScrollView>
      );
    };
  }

  renderLoadingView() {
    return (
      <ActivityIndicator
        color='#d63031'
        size='large'
      />
    );
  }

  ajouterAdresse() {
    var coordonnes = this.state.client.coordonnes;
    coordonnes.push({adresse: this.state.adressInput, latitude: -1, longitude: -1});
    this.setState({client: {coordonnes: coordonnes}, adressInputToggle: !this.state.adressInputToggle});
  }

  pay() {
      this.setState({payerLoading: true});
      var total = this.state.total;
      var accountId = this.props.navigation.state.params.resto.stripeAccountId;
      var self = this;
      if(this.state.cbSelected) {
        stripe.paymentRequestWithCardForm({})
        .then((card) => {
          var token = card.tokenId;
          fetch(Config.paymentServer.link+"pay", {
            method: "POST",
            headers: {
              "Accept": "application/json",
              "Authorization": "Basic "+base64.encode(Config.paymentServer.username+":"+Config.paymentServer.password),
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              total: total.toFixed(1),
              token: token,
              accountId: accountId
            })
          })
          .then(response => response.json())
          .then(responseJson => {
            self.setState({payerLoading: false});
            if(!responseJson.error) {
              self.success(responseJson.chargeId);
            }
          })
          .catch(error => {
            self.setState({payerLoading: false});
          });
        })
        .catch((err) => this.setState({payerLoading: false}));
      }
      else {
        var total = this.state.total;
        var email = this.props.navigation.state.params.resto.paypal;
        var self = this;
        fetch(Config.paymentServer.link+"paypal", {
          method: "POST",
          headers: {
            "Accept": "application/json",
            "Authorization": "Basic "+base64.encode(Config.paymentServer.username+":"+Config.paymentServer.password),
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            total: total.toFixed(1),
            email: email
          })
        })
        .then(response => response.json())
        .then(responseJson => {
          if(!responseJson.error) {
            this.setState({webViewEnabled: true, paypalUrl: responseJson.link})
            //self.success(responseJson.chargeId);
          }
          else {
            self.setState({payerLoading: false});
          }
        })
        .catch(error => {
          self.setState({payerLoading: false});
        });
      }
  }

  checkPaypalPayment(webViewState) {
    var url = webViewState.url;
    if(url.indexOf(Config.paypal.successUrl) !== -1) {
      this.setState({webViewEnabled: false});
      var payid = this.getParameterByName("payid", url);
      this.success(payid);
    }
  }

  annuler() {
    Alert.alert(
      Language.OrderDetails.deleteOrderCheck,
      '',
      [
        {text: Language.OrderDetails.no, onPress: () => null, style: 'cancel'},
        {text: Language.OrderDetails.yes, onPress: () => this.annulerCommande()},
      ],
      { cancelable: false }
    )
  }

  annulerCommande() {
    this.setState({loading: true});
    var panier = new Cart();
    panier.delete(this.props.navigation.state.params.commande, this.props.navigation.state.params.resto, (error) => {
      this.setState({loading: false});
      if(!error) {
        // this.props.navigation.goBack();
        // this.props.navigation.state.params.reload(); // NOT WORKING
        this.props.navigation.dispatch(NavigationActions.reset(
           {
              index: 0,
              actions: [
                NavigationActions.navigate({ routeName: 'Home'})
              ]
            }));
      }
    } );
  }

  success(chargeId) {
    this.setState({payerLoading: true});
    if(this.state.selectedAdress == undefined) {
      var coord = this.state.client.coordonnes[0];
      this.setState({selectedAdress: coord});
    }
    var modePaiement = this.state.paypalSelected ? "PayPal" : "CB";
    var commandeModel = new CommandeModel();
    commandeModel.ajouter(
      this.props.navigation.state.params.commande,
      this.props.navigation.state.params.resto,
      this.state.selectedAdress,
      this.state.total.toFixed(1),
      modePaiement,
      chargeId,
    (error) => {
      if(!error) {
        this.props.navigation.dispatch(NavigationActions.reset(
           {
              index: 0,
              actions: [
                NavigationActions.navigate({ routeName: 'Home'})
              ]
            }));
      }
    });
  }

  /**
  * this method can extract url params from a link
  * It's used in the paypal payment method to get the PAYMENTID from the url and save it to be used later in case of refund
  **/
  getParameterByName(name, url) {
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

 }
 const styles = StyleSheet.create({
   container: {
     paddingLeft: 12,
     paddingRight: 12,
     backgroundColor: '#fdfdfd'
   },
   content: {
     paddingTop: 20,
     paddingBottom: 10
   },
   resto: {
     marginBottom: 20
   },
   row: {
     flexDirection: 'row',
     marginBottom: 12
   },
   firstColumn: {
     flex: 3,
     fontSize: 18
   },
   header: {
     fontWeight: 'bold'
   },
   column: {
     flex: 1,
     fontSize: 18
   },
   text: {
     fontSize: 18,
     fontWeight: 'bold'
   },
   red: {
     color: "#e74c3c"
   },
   blue: {
     color: "#34495e"
   },
   total: {
     fontSize: 24,
     fontWeight: 'bold'
   },
   divider: {
     marginTop: 20,
     marginBottom: 20,
     backgroundColor: "#cccccc"
   },
   btnContainer: {
     marginTop: 10
   },
   btn: {
     backgroundColor: '#e74c3c'
   },
   annulerBtn: {
     backgroundColor: '#575A5A'
   },
   option: {
     flex: 1,
     flexDirection: 'row',
   },
   optionText: {
     flex: 2,
     marginLeft: 10,
     fontSize: 18
   },
   textRight: {
     textAlign: 'right'
   },
   select: {

   },
   paiement: {
     paddingLeft: 10,
     paddingRight: 10
   }
});
