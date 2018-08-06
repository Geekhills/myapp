/**
* Commande Model
*/

import * as firebase from 'firebase';
import { AsyncStorage } from "react-native";
import DB from '../DB';
import Client from './Client';
import Cart from './Cart';
import Config from '../Config';

const KEY_NAME = "MyRestoCommande"; // Key Name in the mobile storage
const GOOGLE_MAP_GEOCODE_API_KEY = Config.googleMapApiKey; // Google Geocode key to use in google api

export default class CommandeModel {
  /**
  * Ajouter une commande a notre storage
  * callback(error?)
  **/
  ajouter(commande, resto, adresse, total, modePaiement, chargeId, callback) {
    var clientModel = new Client();
    clientModel.get((client, error) => {
      if(error) {
        callback(true);
      }
      else {
        var today = new Date();
        var dateCommande = today.toISOString();

        var aAjouter = {
          affecte: false,
          client: client,
          clientId: client.id,
          composant: commande,
          dateCommande: dateCommande,
          id: -1,
          livreur: {id: -1, nom: "", prenom: "",telephone: ""},
          livreurId: -1,
          modePaiement: modePaiement,
          numero: Math.floor((Math.random() * 1000) + 1),
          positionActuelle: {latitude: resto.coordonnees.latitude, longitude: resto.coordonnees.longitude},
          pretA: "",
          adresse: adresse,
          restaurant: resto,
          restaurantId: resto.id,
          statut: "Enregistré",
          total: total,
          chargeId: chargeId
        };
        DB.child("commande").push(aAjouter);
        // Supprimer la commande du panier
        var panier = new Cart();
        panier.delete(commande, resto, (error) => {});
        callback(false);
      }
    });
  }

  /**
  * Suivre une commande
  * callback(commande, error?)
  **/
  suivre(commande, callback) {
    DB.child("commande/"+commande.id).once('value').then(function(snapshot) {
      var commandeUpdated = snapshot.val();
      callback(commandeUpdated, true);
    }, function(error) {
      callback([], true);
    });
  }

  /**
  * Get tout les commande de ce client
  * callback(commandes, error?)
  **/
  getAll(callback) {
    var clientModel = new Client();
    clientModel.get((client, error) => {
      if(error) {
        callback([], true);
      }
      else {
        var data = [];
        DB.child("commande").orderByChild("clientId").equalTo(client.id).once('value').then(function(snapshot) {
          snapshot.forEach(function(snapshotData) {
            commande = snapshotData.val();
            commande.id = snapshotData.key;
            data.push(commande);
          });
          callback(data, false);
       }, function(error) {
         callback([], true);
       });
      }
    });
  }

  /**
  * Get the duration between two points
  * callback(duration, error?)
  **/
  duration(startPoint, endPoint, callback) {
    fetch("https://maps.googleapis.com/maps/api/distancematrix/json?origins="
    +startPoint.latitude+","+startPoint.longitude
    +"&destinations="+endPoint.latitude+","+endPoint.longitude
    +"&key="+GOOGLE_MAP_GEOCODE_API_KEY
    +"&language=fr"
    )
    .then((response) => response.json())
      .then((responseJson) => {
        if(responseJson.status == "OK") {
          callback(responseJson.rows[0].elements[0].duration.text,false);
        }
        else {
          callback("", true);
        }
      });
  }

  /**
  * Supprimer une commande
  **/
  supprimer() {

  }
}
