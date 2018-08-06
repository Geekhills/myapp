//
 // This is the Aproximite class
 //

 // React native and others libraries imports
 import React, { Component } from 'react';
 import { View, StyleSheet } from 'react-native';
 import MapView from 'react-native-maps';

 // Our custom files and classes import
 import Language from "../Language";
 import RestoitemMap from './common/RestoitemMap';
 import Loading from './common/Loading';
 import Restaurant from '../model/Restaurant';

 export default class Aproximite extends Component {
   state = {
      searchValue: "",
      hasError: false,
      errorMsg: "",
      restos: [],
      loading: false
   };

   r = new Restaurant();

   componentWillMount() {
     this.setState({loading: true});
     this.r.read((restaurants, error) => {
       if(error)
        this.setState({restos: [], loading: false, hasError: true, errorMsg: Language.Error});
       else
        this.setState({restos: restaurants, loading: false});
     });

   }

 	render() {
    var currentLat = this.props.navigation.state.params.position.coords.latitude;
    var currentLong = this.props.navigation.state.params.position.coords.longitude;
 		return(
 			<View style={styles.container}>
           <MapView
             region={{
               latitude: parseFloat(currentLat),
               longitude: parseFloat(currentLong),
               latitudeDelta: 0.0051,
               longitudeDelta: 0.0021
             }}
             loadingEnabled={true}
             style={styles.map}
           >
             <MapView.Marker
               coordinate={{latitude: currentLat, longitude: currentLong}}
               image={require('./img/currentMarker.png')}
               flat={true}
             />
             {
               this.state.restos.map((item, i) => {
                 return(
                   <MapView.Marker
                     coordinate={item.coordonnees}
                     key={i}
                     image={require('./img/marker.png')}
                     flat={true}
                   >
                     <MapView.Callout style={{width: 250}} onPress={() => this.props.navigation.navigate('Informations', {title: item.nom, resto: item})}>
                       <RestoitemMap resto={item} />
                     </MapView.Callout>
                   </MapView.Marker>
                 )
               })
             }
           </MapView>
           <Loading loading={this.state.loading} />
      </View>
 		);
 	}
 }



 const styles = StyleSheet.create({
   container: {
     flex: 1
   },
   map: {
     width: '100%',
     height: '100%'
   }
 });
