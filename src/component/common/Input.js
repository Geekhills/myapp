//
 // This is the Input class
 // Usage: <Sae placehodler="Search..." icon="pencil" isPassword={false} />
 //

 // React native and others libraries imports
 import React, { Component } from 'react';
 import { StyleSheet, View } from 'react-native';
 import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
 import { Hideo } from 'react-native-textinput-effects';

 // Our custom files and classes import

 export default class Input extends Component {

 	render() {
 		return(
 			<View style={[styles.container, this.props.style ? this.props.style : {}]}>
        <Hideo
          placeholder={this.props.placeholder}
          iconClass={FontAwesomeIcon}
          iconName={this.props.icon}
          iconColor={'#7f8c8d'}
          iconSize={20}
          iconBackgroundColor={'#fff'}
          inputStyle={styles.input}
          style={styles.inputContainer}
          labelStyle={styles.label}
          onChangeText={this.props.onChange}
          onSubmitEditing={this.props.onSubmit ? this.props.onSubmit : null}
          onFocus={this.props.onFocus ? this.props.onFocus : null}
          secureTextEntry={this.props.isPassword ? true : false}
          keyboardType={this.props.isEmail ? "email-address" : "default"}
        />
      </View>
 		);
 	}
 }

 const styles = StyleSheet.create({
   container: {
     height: 50,

   },
   input: {
     fontSize: 16,
     color: '#575A5A'
   },
   inputContainer: {
     flex: 1,
     overflow: 'hidden',
      backgroundColor: 'rgba(70, 73, 73, 0)',
      padding: 1,
      alignContent: 'flex-start',
      alignItems: 'flex-start',
      alignSelf:  'flex-start'
   },
   label: {
     fontSize: 12
   }
 });
