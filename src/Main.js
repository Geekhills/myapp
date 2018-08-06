//
 // This is the Main class
 //

 // React native and others libraries imports
 import React, { Component } from 'react';
 import { View, TouchableHighlight, StyleSheet } from 'react-native';
 import { Icon } from 'react-native-elements';
 import { StackNavigator, NavigationActions } from 'react-navigation';

 // Our custom files and classes import
 import Language from './Language';
 import Client from './model/Client';
 import Home from './component/Home';
 import Restaurants from './component/Restaurants';
 import Aproximite from './component/Aproximite';
 import Informations from './component/Informations';
 import Gallerie from './component/Gallerie';
 import Carte from './component/Carte';
 import Consommables from './component/Consommables';
 import Commander from './component/Commander';
 import Panier from './component/Panier';
 import Mescommandes from './component/Mescommandes';
 import Suivre from './component/Suivre';
 import Commandedetails from './component/Commandedetails';
 import Login from './component/Login';
 import Signup from './component/Signup';


 // Ignore the "Setting a timer for a long time" warning
 console.ignoredYellowBox = ['Setting a timer'];

 const styles = StyleSheet.create({
   header: {
     backgroundColor: '#e74c3c'
   },
   title: {
     color: '#fff'
   },
   rightButtonContainer: {
     paddingRight: 20,
     paddingLeft: 20,
     flex: 1,
     justifyContent: 'center'
   }
 });

 const right = (navigation) => (
   <View style={{flex: 1, flexDirection: 'row'}}>
     <TouchableHighlight style={styles.rightButtonContainer} underlayColor="rgba(180,59,47,0.7)" onPress={() => btnClicked(navigation)}>
       <View>
         <Icon
            name='cart'
            type='evilicon'
            color='#fff'
          />
       </View>
     </TouchableHighlight>
     <TouchableHighlight style={styles.rightButtonContainer} underlayColor="rgba(180,59,47,0.7)" onPress={() => reset(navigation)}>
       <View>
         <Icon
            name='ios-home'
            type='ionicon'
            color='#fff'
          />
       </View>
     </TouchableHighlight>
   </View>
 );

 const reload = (state) => (
   <TouchableHighlight style={styles.rightButtonContainer} underlayColor="rgba(180,59,47,0.7)" onPress={() => state.params.reload()}>
     <View>
       <Icon
          name='reload'
          type='material-community'
          color='#fff'
        />
     </View>
   </TouchableHighlight>
 );

var defaultOptions = ({navigation}) => ({
  title: navigation.state.params.title,
  headerStyle: styles.header,
  headerTitleStyle: styles.title,
  headerTintColor: "#fff",
  headerRight: right(navigation)
 });


 var panierOptions = ({navigation}) => ({
   title: navigation.state.params.title,
   headerStyle: styles.header,
   headerTitleStyle: styles.title,
   headerTintColor: "#fff",
   headerRight: reload(navigation.state)
  });

 const Router = StackNavigator({
    Home: { screen: Home, navigationOptions:{header: null} },
    Restaurants: { screen: Restaurants, navigationOptions: defaultOptions },
    Aproximite: { screen: Aproximite, navigationOptions: defaultOptions },
    Informations: { screen: Informations, navigationOptions: defaultOptions },
    Gallerie: { screen: Gallerie, navigationOptions: {header: null} },
    Carte: { screen: Carte, navigationOptions: defaultOptions },
    Consommables: { screen: Consommables, navigationOptions: defaultOptions },
    Commander: { screen: Commander, navigationOptions: defaultOptions },
    Panier: { screen: Panier, navigationOptions: panierOptions },
    Mescommandes: { screen: Mescommandes, navigationOptions: defaultOptions },
    Suivre: { screen: Suivre, navigationOptions: defaultOptions },
    Commandedetails: { screen: Commandedetails, navigationOptions: defaultOptions },
    Login: { screen: Login, navigationOptions:{header: null}},
    Signup: { screen: Signup, navigationOptions:{header: null}},
  });

function btnClicked(navigation) {
  var client = new Client();
  client.isLoggedIn((logged) => {
    if(!logged)
     navigation.navigate("Login");
   else
     navigation.navigate("Panier", {title: Language.Cart.title});
  });
}

function reset(navigation){
  navigation.dispatch(NavigationActions.reset(
     {
        index: 0,
        actions: [
          NavigationActions.navigate({ routeName: 'Home'})
        ]
      }));
  }

 export default class Main extends Component {


 	render() {
 		return(
 		   <Router />
 		);
 	}
 }
