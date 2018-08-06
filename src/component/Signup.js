//
 // This is the Login class
 //

 // React native and others libraries imports
 import React, { Component } from 'react';
 import { ScrollView, StyleSheet, ImageBackground, Image } from 'react-native';
 import { Text, Button, Icon } from 'react-native-elements';

 // Our custom files and classes import
 import Config from '../Config';
 import Language from '../Language';
 import Input from './common/Input';
 import Error from './common/Error';
 import Client from '../model/Client';

 export default class Signup extends Component {
   state = {
     email: "",
     password: "",
     nom: "",
     prenom: "",
     telephone: "",
     adresse: "",
     hasError: false,
     errorMsg: "",
     loading: false
   }

 	render() {
 		return(
      <ImageBackground source={require('./img/homeBg.png')} style={styles.background}>
   			<ScrollView contentContainerStyle={styles.container}>
            <Image source={require('./img/logo.png')} style={styles.logo} />
            <Text style={styles.title}>{Config.appTitle}</Text>
            <Input
                placeholder={Language.Signup.lastName}
                icon="user-circle"
                onSubmit={this.signup.bind(this)}
                onChange={(text) => this.setState({nom: text})}
                style={styles.marginBottom}
             />
             <Input
                 placeholder={Language.Signup.firstName}
                 icon="user-circle"
                 onSubmit={this.signup.bind(this)}
                 onChange={(text) => this.setState({prenom: text})}
                 style={styles.marginBottom}
              />
              <Input
                  placeholder={Language.Signup.telephone}
                  icon="phone"
                  onSubmit={this.signup.bind(this)}
                  onChange={(text) => this.setState({telephone: text})}
                  style={styles.marginBottom}
               />
               <Input
                   placeholder={Language.Signup.address}
                   icon="map-pin"
                   onSubmit={this.signup.bind(this)}
                   onChange={(text) => this.setState({adresse: text})}
                   style={styles.marginBottom}
                />
            <Input
                placeholder={Language.Signup.email}
                isEmail={true}
                icon="user"
                onSubmit={this.signup.bind(this)}
                onChange={(text) => this.setState({email: text})}
                style={styles.marginBottom}
             />
             <Input
                 placeholder={Language.Signup.password}
                 isPassword={true}
                 icon="lock"
                 onSubmit={this.signup.bind(this)}
                 onChange={(text) => this.setState({password: text})}
              />
              <Button
                title={Language.Signup.signupBtn}
                raised
                onPress={this.signup.bind(this)}
                containerViewStyle={styles.btnContainer}
                buttonStyle={styles.btn}
                loading={this.state.loading}
              />
        </ScrollView>
        <Error hasError={this.state.hasError} errorMsg={this.state.errorMsg} />
        <Icon
          name='close'
          type='evilicon'
          color='#fff'
          size={46}
          containerStyle={styles.icon}
          underlayColor="rgba(0,0,0,0.1)"
          onPress={() => this.props.navigation.goBack()} />
      </ImageBackground>
 		);
 	}

  signup() {
    if(this.state.loading) return
    if(this.state.email.length <= 2 || this.state.password.length <= 3 || this.state.nom.length <= 0 || this.state.prenom.length <=0 || this.state.telephone.length <=0 || this.state.adresse.length <=0) {
      this.setState({hasError: true, errorMsg: Language.Signup.emptyFields});
    }
    else if(this.state.password.length < 6) {
      this.setState({hasError: true, errorMsg: Language.Signup.weakPassword});
    }
    else {
      this.setState({hasError: false, loading: true});
      var c = new Client();
      c.signup(this.state.nom, this.state.prenom, this.state.telephone, this.state.adresse, this.state.email, this.state.password, (error, errorMsg) => {
        this.setState({loading: false});
        if(error)
          this.setState({hasError: true, errorMsg: Language.Error});
        else {
          this.props.navigation.goBack();
        }
      });
    }
  }
 }
 const styles = StyleSheet.create({
   background: {
     flex: 1
   },
	container: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: '5%',
    paddingLeft: 7,
    paddingRight: 7
  },
  logo: {
    width: 75,
    height: 75
  },
  title: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 10
  },
  btnContainer: {
    width: '100%',
    marginTop: 10
  },
  btn: {
    backgroundColor: '#e74c3c'
  },
  marginBottom: {
    marginBottom: 5
  },
  icon: {
   position: 'absolute',
   top: 15,
   right: 15,
   width: 40,
   height: 40
 }
});
