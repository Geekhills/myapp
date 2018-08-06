//
 // This is the Home class
 //

 // React native and others libraries imports
 import React, { Component } from 'react';
 import { Keyboard, ImageBackground, View, StyleSheet, Image, Alert } from 'react-native';
 import { Text, Button, Icon } from 'react-native-elements';
 import { MenuContext, Menu, MenuOptions, MenuOption, MenuTrigger } from 'react-native-popup-menu';

 // Our custom files and classes import
 import Config from '../Config';
 import Language from '../Language';
 import Client from '../model/Client';
 import Input from './common/Input';
 import Error from './common/Error';

 export default class Home extends Component {
   state = {
      searchValue: "",
      hasError: false,
      errorMsg: ""
   };

 	render() {
 		return(
      <MenuContext>
   			<ImageBackground source={require('./img/homeBg.png')} style={styles.background}>
          <View style={styles.container}>
              <Image source={require('./img/logo.png')} style={styles.logo} />
              <Text style={styles.title}>{Config.appTitle}</Text>
              <Text style={styles.description}>{Config.appDescription}</Text>
              <Input
                placeholder={Language.Home.search}
                icon="search" style={styles.input}
                onFocus={() => this.setState({hasError: false})}
                onChange={(text) => this.setState({searchValue: text})}
                onSubmit={this.trouver.bind(this)}
                returnKeyType="search"
              />
              <Error hasError={this.state.hasError} errorMsg={this.state.errorMsg} />
              <Button
                title={Language.Home.findBtn}
                raised
                onPress={this.trouver.bind(this)}
                containerViewStyle={styles.btnContainer}
                buttonStyle={styles.trouverBtn} />
              <Button
                title={Language.Home.nearByBtn}
                raised
                onPress={this.trouverAProx.bind(this)}
                containerViewStyle={styles.btnContainer}
                buttonStyle={styles.trouverAProxBtn}/>
          </View>
          <View style={styles.user}>
            <Menu ref="menu">
              <Icon
                raised
                name='user-circle'
                type='font-awesome'
                color='#e74c3c'
                onPress={this.userClicked.bind(this)} />
                <MenuTrigger />
                <MenuOptions>
                  <MenuOption style={styles.menuItem} onSelect={() => this.props.navigation.navigate("Panier", {title: Language.Cart.title})} >
                    <Icon color="#7f8c8d" name="ios-cart-outline" type="ionicon" containerStyle={styles.menuIcon} />
                    <Text>{Language.Home.cart}</Text>
                  </MenuOption>
                  <MenuOption style={styles.menuItem} onSelect={() => this.props.navigation.navigate("Mescommandes", {title: Language.MyOrders.title})} >
                    <Icon color="#7f8c8d" name="ios-paper-outline" type="ionicon" containerStyle={styles.menuIcon} />
                    <Text>{Language.Home.orders}</Text>
                  </MenuOption>
                  <MenuOption style={styles.menuItem} onSelect={this.logoutClicked.bind(this)} >
                    <Icon color="#7f8c8d" name="ios-exit-outline" type="ionicon" containerStyle={styles.menuIcon} />
                    <Text>{Language.Home.logout}</Text>
                  </MenuOption>
                </MenuOptions>
            </Menu>
          </View>
        </ImageBackground>
      </MenuContext>
 		);
 	}

  // Vers la page de recherche
  trouver() {
    Keyboard.dismiss();
    if(this.state.searchValue == "")  {
      this.setState({hasError: true, errorMsg: Language.Home.emptySearchField});
      return;
    }
    this.setState({hasError: false});
    this.props.navigation.navigate('Restaurants', {title: Language.Restaurants.title, name: this.state.searchValue});
  }

  // Afficher les restos a proximité dans la carte
  trouverAProx() {
    navigator.geolocation.getCurrentPosition((position) => {
          this.props.navigation.navigate('Aproximite',{title: Language.Aproximity.title, position: position});
        },
        (error) => this.setState({hasError: true, errorMsg: Language.Home.geoLocationDesactivate}),
        {enableHighAccuracy: true, timeout: 7000, maximumAge: 1000}
      );
  }

  userClicked() {
    var client = new Client();
    client.isLoggedIn((loggedIn) => {
      if(loggedIn) {
        this.refs["menu"].open();
      }
      else {
        this.props.navigation.navigate("Login");
      }
    });
  }

  logoutClicked() {
    Alert.alert(
      Language.Home.logout+' !',
      '',
      [
        {text: Language.Home.no, onPress: () => null, style: 'cancel'},
        {text: Language.Home.yes, onPress: () => this.logout()},
      ],
      { cancelable: false }
    )
  }

  logout() {
    var client = new Client();
    client.logout();
  }

 }

var styles = StyleSheet.create({
  background: {
    flex: 1
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 12,
    paddingRight: 12
  },
  logo: {
    width: 75,
    height: 75
  },
  title: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold'
  },
  description: {
    marginTop: 15,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center'
  },
  input: {
    marginTop: 15,
    marginBottom: 5
  },
  btnContainer: {
    width: '100%',
    marginTop: 10
  },
  trouverBtn: {
    backgroundColor: '#e74c3c'
  },
  trouverAProxBtn: {
    backgroundColor: '#575A5A'
  },
  user: {
    position: 'absolute',
    right: 10,
    top: 10
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  menuIcon: {
    marginRight: 15
  }
});
