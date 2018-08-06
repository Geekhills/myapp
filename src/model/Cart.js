/**
* Cart Model
*/

import * as firebase from 'firebase';
import { AsyncStorage } from "react-native";
import DB from '../DB';

const KEY_NAME = "MyRestoPanier"; // Key Name in the mobile storage

export default class Cart {


  /**
  * Add an item to cart
  * callback(error?)
  **/
  add(consommable, qte, note, montant, resto, callback) {
    AsyncStorage.getItem(KEY_NAME).then((value) => {
      var stored = JSON.parse(value);
      if(stored == null || stored == undefined || stored.length <=0) {
        var newItem = {
          resto: resto,
          commande: [
            {
              consommable: consommable,
              quantite: qte,
              note: note,
              prix: montant
            }
          ]
        };
        stored = [newItem];
      }
      else {
        var found = false;
        for(var i=0; i<stored.length; i++) {
          // We already made an order from this resto, so add this new order to the old ones
          if(stored[i].resto.email == resto.email) {
            found = true;
            stored[i].commande.push({
              consommable: consommable,
              quantite: qte,
              note: note,
              prix: montant
            });
          }
        }
        if(!found) {
          stored.push({
            resto: resto,
            commande: [
              {
                consommable: consommable,
                quantite: qte,
                note: note,
                prix: montant
              }
            ]
          });
        }
      }
      AsyncStorage.setItem(KEY_NAME, JSON.stringify(stored));
      callback(false);
    });
  }


  /**
  * Get all cart items
  * callback(arrayOfItems, error)
  **/
  get(callback) {
    AsyncStorage.getItem(KEY_NAME).then((value) => {
      if(!value) callback([], true);
      else callback(JSON.parse(value), false);
    });
  }

  /**
  * Check if two arrays of objects are equals
  **/
  equalArray(a, b) {
    if(a.length != b.length)
    	return false;
  	for(var j=0; j<a.length; j++) {
    	if(JSON.stringify(a[j]) == JSON.stringify(b[j]))
      	return true;
    }
    return false;
  }

  /**
  * Delete an item from cart
  * callback(error?)
  **/
  delete(commande, resto, callback) {
    this.get((panier) => {
      var found = false;
      var toDeleteIndex = -1;

      for(var i = 0; i < panier.length; i++) {
        if(panier[i].resto.nom == resto.nom && panier[i].resto.site == resto.site) {
          if(this.equalArray(panier[i].commande, commande)) {
            found = true;
            toDeleteIndex = i;
            break;
          }
        }
      };
      if(toDeleteIndex > -1) {
        panier.splice(toDeleteIndex, 1);
        AsyncStorage.removeItem(KEY_NAME);
        AsyncStorage.setItem(KEY_NAME, JSON.stringify(panier));
        callback(false);
      }
      else {
        callback(true);
      }
    });
  }

}
