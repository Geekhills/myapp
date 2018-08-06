//
 // This is the Login class
 //

 // React native and others libraries imports
 import React, { Component } from 'react';
 import { View, StyleSheet, ImageBackground, Image } from 'react-native';
 import { Text, Button, Icon } from 'react-native-elements';

 // Our custom files and classes import
 import Config from '../Config';
 import Language from '../Language';
 import Input from './common/Input';
 import Error from './common/Error';
 import Client from '../model/Client';

 export default class Login extends Component {
   state = {
     email: "",
     password: "",
     hasError: false,
     errorMsg: "",
     loading: false
   }


 	render() {
 		return(
      <ImageBackground source={require('./img/homeBg.png')} style={styles.background}>
   			<View style={styles.container}>
            <Image source={require('./img/logo.png')} style={styles.logo} />
            <Text style={styles.title}>{Config.appTitle}</Text>
            <Input
                placeholder={Language.Login.email}
                isEmail={true}
                icon="user"
                onSubmit={this.login.bind(this)}
                onChange={(text) => this.setState({email: text})}
                style={styles.marginBottom}
             />
             <Input
                 placeholder={Language.Login.password}
                 isPassword={true}
                 icon="lock"
                 onSubmit={this.login.bind(this)}
                 onChange={(text) => this.setState({password: text})}
              />
              <Button
                title={Language.Login.loginBtn}
                raised
                onPress={this.login.bind(this)}
                containerViewStyle={styles.btnContainer}
                buttonStyle={styles.loginBtn}
                loading={this.state.loading}
              />
              <Button
                title={Language.Login.signupBtn}
                raised
                onPress={this.signup.bind(this)}
                containerViewStyle={styles.btnContainer}
                buttonStyle={styles.signupBtn}/>
              <Error hasError={this.state.hasError} errorMsg={this.state.errorMsg} />
        </View>
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

  login() {
    if(this.state.loading) return
    if(this.state.email.length <= 2 || this.state.password.length <= 3) {
      this.setState({hasError: true, errorMsg: Language.Login.emptyFields});
    }
    else {
      this.setState({hasError: false, loading: true});
      var c = new Client();
      c.login(this.state.email, this.state.password, (error) => {
        this.setState({loading: false})
        if(error)
          this.setState({hasError: true, errorMsg: Language.Login.incorrect});
        else
          this.props.navigation.goBack();
      });
    }
  }

  signup() {
    this.props.navigation.navigate('Signup',{});
  }
 }
 const styles = StyleSheet.create({
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
    fontWeight: 'bold',
    marginBottom: 10
  },
  btnContainer: {
    width: '100%',
    marginTop: 10
  },
  loginBtn: {
    backgroundColor: '#e74c3c'
  },
  signupBtn: {
    backgroundColor: '#575A5A'
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
