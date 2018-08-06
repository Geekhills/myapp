/**
* Client Model
*/

import * as firebase from 'firebase';
import { AsyncStorage } from "react-native";
import DB from '../DB';
import Config from '../Config';

const KEY_NAME = "MyRestoUser"; // Key Name in the mobile storage
const GOOGLE_MAP_GEOCODE_API_KEY = Config.googleMapApiKey; // Google Geocode key to use in google api

export default class Client {

  /**
  * Check if logged in
  * callback(connected?)
  **/
  isLoggedIn(callback) {
    /* AsyncStorage.getItem(KEY_NAME, (error) => {
      if(error) callback(false);
      else callback(true);
    }); */
    AsyncStorage.getItem(KEY_NAME).then((value) => {
      if(!value) callback(false);
      else callback(true);
    });
  }

  /**
  * Return the user object from the local storage
  * callback(data, error?)
  **/
  get(callback) {
    AsyncStorage.getItem(KEY_NAME).then((value) => {
      if(!value) callback({}, true);
      else {
        var data;
        DB.child("client").once('value').then(function(snapshot) {
           snapshot.forEach(function(snapshotData) {
             client = snapshotData.val();
             if(JSON.parse(value).email == client.email) {
               data = client;
               data.id = snapshotData.key;
             }
           });
           callback(data, false);
       }, function(error) {
         callback({}, true);
       });
      }
    });
  }

  /**
  * Login in a user
  * callback(error?)
  **/
  login(email, password, callback) {
    firebase.auth().signInWithEmailAndPassword(email, password)
     .then(function(user) {
         AsyncStorage.removeItem(KEY_NAME);
         AsyncStorage.setItem(KEY_NAME, JSON.stringify(user));
         callback(false);
     })
    .catch(function(error) {
         callback(true);
    });
  }

  /**
  * Create an account
  * callback(error?, errorMsg)
  **/
  signup(nom, prenom, telephone, adresse, email, password, callback) {
    /* Convertir l'adresse a latitude et longitude */
    var adresseEncode = encodeURIComponent(adresse).replace(/%20/g,'+');
    fetch("https://maps.googleapis.com/maps/api/geocode/json?address="+adresseEncode+"&key="+GOOGLE_MAP_GEOCODE_API_KEY)
    .then((response) => response.json())
      .then((responseJson) => {
        var longitude = responseJson.results[0].geometry.location.lng ? responseJson.results[0].geometry.location.lng : -1;
        var latitude = responseJson.results[0].geometry.location.lat ? responseJson.results[0].geometry.location.lat : -1;
        firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(function(user) {
          /* Ajouter les informations de l'utilisateur a notre base */
          DB.child("client").push({
            nom: nom,
            prenom: prenom,
            telephone: telephone,
            email: email,
            coordonnes: [
              {
                adresse: adresse,
                latitude: latitude,
                longitude: longitude
              }
            ]
          });
          callback(false, "");
        }, function(error) {
          if (error.code == "auth/weak-password") {
            callback(true, "Votre mot de passe est trop court !");
          }
          else if (error.code == "auth/invalid-email") {
            callback(true, "Cette adresse mail est invalide !");
          }
          else
            callback(true, "Un compte existe deja avec ce mail !");
        });
      })
      .catch((error) => {
        callback(true, "Merci de donner une adresse valide !");
      });
  }


  /**
  * Logout
  **/
  logout() {
    firebase.auth().signOut();
    AsyncStorage.removeItem(KEY_NAME);
  }

}
