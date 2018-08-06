/**
* This file is used to initialize our database connexion, and make an instance of it
* Then we will use that instance when needed
**/

import * as firebase from "firebase";
import Config from './Config';

/* Check if firebase is not initializied, if not do it */
const fb = firebase.initializeApp(Config.firebase);

const DB = firebase.database(fb).ref();

export default DB;
