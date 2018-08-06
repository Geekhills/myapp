/**
* Client Model
*/

import DB from '../DB';

export default class Restaurant {

  /**
  * Read all the data from the Restaurant collection and return it in the callback function
  **/
  read(callback) {
    var data = [];
    DB.child("restaurant").once('value').then(function(snapshot) {
      snapshot.forEach(function(snapshotData) {
        resto = snapshotData.val();
        resto.id = snapshotData.key;
        data.push(resto);
      });
      callback(data, false);
    }, function(error) {
      callback([], true);
    });
  }

  /**
  * Search a restaurant by name
  * PERFORMANCE PROBLEM: Make the server returns the searched restaurant not all of them
  * Currently there's no function on firebase that support the LIKE %string%
  * So we did retrieve all the data from the restaurant collection and then apply a filter on the client side
  **/
  search(searchValue, callback) {
    var data = [];
    DB.child("restaurant").once('value').then(function(snapshot) {
       snapshot.forEach(function(snapshotData) {
         resto = snapshotData.val();
         resto.id = snapshotData.key;
         if(
           resto.nom.toUpperCase().indexOf(searchValue.toUpperCase()) >= 0
         )
             data.push(resto);
       });
       callback(data, false);
   }, function(error) {
     callback([], true);
   });
  }
}
