//
 // This is the Informations class
 //

 // React native and others libraries imports
 import React, { Component } from 'react';
 import { ScrollView, View, StyleSheet, Dimensions, Image, TouchableWithoutFeedback, Linking, Platform } from 'react-native';
 import { Button, Text, Icon } from 'react-native-elements';
 import Carousel, { Pagination } from 'react-native-snap-carousel';
 import call from 'react-native-phone-call';

 // Our custom files and classes import
 import Language from '../Language';
 import Error from './common/Error';

 export default class Informations extends Component {
   state = {
     activeSlide: 0,
     hasError: false,
     errorMsg: ""
   };


 	render() {
    var resto = this.props.navigation.state.params.resto;
 		return(
      <View>
 			<ScrollView containerStyle={styles.container}>
        <Carousel
          sliderWidth={Dimensions.get('window').width}
          itemWidth={Dimensions.get('window').width}
          onSnapToItem={(index) => this.setState({ activeSlide: index }) }
          enableSnap={true}
          data={resto.gallerie}
          renderItem={(img, i) => (
            <TouchableWithoutFeedback
              key={i}
              onPress={() => this.openGallery()}
            >
              <Image
                source={{uri: img.item.url}}
                style={styles.image}
                resizeMode="cover"
              />
            </TouchableWithoutFeedback>
          )}
        />
        <Pagination
          dotsLength={resto.gallerie.length}
          activeDotIndex={this.state.activeSlide}
          containerStyle={{ backgroundColor: 'transparent',paddingTop: 0, paddingBottom: 0, marginTop: -15 }}
          dotStyle={{
              width: 10,
              height: 10,
              borderRadius: 5,
              marginHorizontal: 2,
              backgroundColor: 'rgba(255, 255, 255, 0.92)'
          }}
          inactiveDotOpacity={0.4}
          inactiveDotScale={0.6}
        />

        <View style={styles.content}>
          <View style={[styles.row, styles.section, styles.header]}>
            <Text style={styles.title}>{resto.nom}</Text>
              <Button
                icon={{name: 'documents', type:"entypo", color: "#e74c3c"}}
                title={Language.RestaurantInformations.menuBtn}
                onPress={() => this.props.navigation.navigate('Carte', {title: resto.nom, resto: resto})}
                buttonStyle={styles.carteBtn}
                textStyle={styles.carteBtnText}
              />
          </View>

          <View style={[styles.row, styles.btnContainer]}>
            <Button
              raised
              icon={{name: 'map-signs', type: 'font-awesome', color: '#33332E'}}
              title={Language.RestaurantInformations.intineraryBtn}
              onPress={() => this.iteniraire(resto.coordonnees)}
              buttonStyle={styles.btn}
              textStyle={{color: '#33332E'}}
            />
            <Button
              raised
              icon={{name: 'phone', color: '#33332E'}}
              title={Language.RestaurantInformations.callBtn}
              onPress={() => call({number: resto.telephone, prompt: true})}
              buttonStyle={styles.btn}
              textStyle={{color: '#33332E'}}
            />
            <Button
              raised
              icon={{name: 'web', type: 'material-community', color: '#33332E'}}
              title={Language.RestaurantInformations.websiteBtn}
              onPress={() => Linking.openURL(resto.site)}
              buttonStyle={styles.btn}
              textStyle={{color: '#33332E'}}
            />
          </View>

          <View style={styles.section}>
            <View style={styles.row}>
              <Text h4 style={styles.sectionTitre}>{Language.RestaurantInformations.description}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.description} multiline={true}>{resto.description}</Text>
            </View>
          </View>

          <View style={styles.section}>
            <View style={styles.row}>
              <Text h4 style={styles.sectionTitre}>{Language.RestaurantInformations.informations}</Text>
            </View>
            <View style={styles.row}>
              <Icon color="#7f8c8d"containerStyle={styles.icon} size={12} name="location-pin" type="entypo" />
              <Text style={styles.text}>{resto.coordonnees.adresse}</Text>
            </View>
            <View style={styles.row}>
              <Icon color="#7f8c8d"containerStyle={styles.icon} size={12} name="phone" />
              <Text style={styles.text}>{resto.telephone}</Text>
            </View>
            <View style={styles.row}>
              <Icon color="#7f8c8d"containerStyle={styles.icon} size={12} name="ios-clock-outline" type="ionicon"/>
              <Text style={styles.text}>
                {
                  this.renderHoraire(resto.horaire)
                }
              </Text>
            </View>
            <View style={styles.row}>
              <Icon color="#7f8c8d"containerStyle={styles.icon} size={12} name="ios-mail" type="ionicon" />
              <Text style={styles.text}>{resto.email}</Text>
            </View>
          </View>

          <View style={styles.section}>
            <View style={styles.row}>
              <Icon color="#7f8c8d"containerStyle={styles.icon} size={12} name="cutlery" type="font-awesome" />
              <Text h4 style={styles.sectionTitre}>{Language.RestaurantInformations.kitchenType}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.text}>
                {
                  resto.typeCuisine.map((tag, i) => {
                    return tag + (i < resto.typeCuisine.length-1 ? ", " : "")
                  })
                }
              </Text>
            </View>
          </View>

          <View style={styles.section}>
            <View style={styles.row}>
              <Icon color="#7f8c8d"containerStyle={styles.icon} size={12} name="test-tube" type="material-community" />
              <Text h4 style={styles.sectionTitre}>{Language.RestaurantInformations.exigency}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.text}>
                {
                  resto.exigenceAlimentaire.map((tag, i) => {
                    return tag + (i < resto.exigenceAlimentaire.length-1 ? ", " : "")
                  })
                }
              </Text>
            </View>
          </View>

          <View style={styles.section}>
            <View style={styles.row}>
              <Icon color="#7f8c8d"containerStyle={styles.icon} size={12} name="users" type="feather" />
              <Text h4 style={styles.sectionTitre}>{Language.RestaurantInformations.environment}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.text}>
                {
                  resto.ambiance.map((tag, i) => {
                    return tag + (i < resto.ambiance.length-1 ? ", " : "")
                  })
                }
              </Text>
            </View>
          </View>

          <View style={styles.section}>
            <View style={styles.row}>
              <Icon color="#7f8c8d"containerStyle={styles.icon} size={12} name="md-document" type="ionicon" />
              <Text h4 style={styles.sectionTitre}>{Language.RestaurantInformations.services}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.text}>
                {
                  resto.prestation.map((tag, i) => {
                    return tag + (i < resto.prestation.length-1 ? ", " : "")
                  })
                }
              </Text>
            </View>
          </View>

          <View style={styles.section}>
            <View style={styles.row}>
              <Icon color="#7f8c8d"containerStyle={styles.icon} size={12} name="credit-card" type="evilicon" />
              <Text h4 style={styles.sectionTitre}>{Language.RestaurantInformations.payment}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.text}>
                {
                  resto.modePaiement.map((tag, i) => {
                    return tag + (i < resto.modePaiement.length-1 ? ", " : "")
                  })
                }
              </Text>
            </View>
          </View>

          <View style={styles.section}>
            <View style={styles.row}>
              <Icon color="#7f8c8d"containerStyle={styles.icon} size={12} name="file-document-box" type="material-community" />
              <Text h4 style={styles.sectionTitre}>{Language.RestaurantInformations.style}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.text}>
                {
                  resto.concours.map((tag, i) => {
                    return tag + (i < resto.concours.length-1 ? ", " : "")
                  })
                }
              </Text>
            </View>
          </View>

          <View style={styles.section}>
            <View style={styles.row}>
              <Icon color="#7f8c8d"containerStyle={styles.icon} size={12} name="earth" type="material-community" />
              <Text h4 style={styles.sectionTitre}>{Language.RestaurantInformations.region}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.text}>{resto.regionMonde}</Text>
            </View>
          </View>


          <View style={styles.section}>
            <View style={styles.row}>
              <Icon color="#7f8c8d"containerStyle={styles.icon} size={12} name="flag" type="fontawesome" />
              <Text h4 style={styles.sectionTitre}>{Language.RestaurantInformations.speciality}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.text}>
                {
                  resto.specialite.map((tag, i) => {
                    return tag + (i < resto.specialite.length-1 ? ", " : "")
                  })
                }
              </Text>
            </View>
          </View>
        </View>

      </ScrollView>
      <Error hasError={this.state.hasError} errorMsg={this.state.errorMsg} />
      </View>
 		);
 	}

  renderHoraire(horaire) {
    var result = "";
    horaire.map((item, i) => {
      for (var tag in item){
          if (item.hasOwnProperty(tag)) {
               result += tag;
               if(i < horaire.length-1)
                result += ", ";
          }
      }
    });
    return result;
      //return tag + (i < resto.horaire.length-1 ? ", " : "")
  }

  openGallery() {
    this.props.navigation.navigate('Gallerie',{images: this.props.navigation.state.params.resto.gallerie, position: this.state.activeSlide});
  }

  iteniraire(adresse) {
    var scheme = Platform.OS === 'ios' ? 'http://maps.apple.com/?ll=' : 'geo:';
    var url = scheme + adresse.latitude+','+adresse.longitude;
    Linking.canOpenURL(url).then(supported => {
      if (supported) {
          Linking.openURL(url);
      }
      else {
        this.setState({hasError: true, errorMsg: Language.RestaurantInformations.itineraryError});
      }
  });
  }

 }

const styles = StyleSheet.create({
  container: {},
  image: {
    width: Dimensions.get('window').width,
    height: 200
  },
  content: {
    paddingLeft: 7,
    paddingRight: 7
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  section: {
    backgroundColor: '#fdfdfd',
    marginTop: 5,
    marginLeft: -7,
    marginRight: -7,
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 7,
    paddingRight: 7,
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderTopColor: 'rgba(73 ,71, 81, 0.2)',
    borderLeftColor: 'rgba(73 ,71, 81, 0.2)',
    borderRightColor: 'rgba(73 ,71, 81, 0.2)',
    borderBottomColor: 'rgba(73 ,71, 81, 0.2)',
  },
  title: {
    fontSize: 18
  },
  header: {
    justifyContent: "space-between"
  },
  carteBtn: {
    backgroundColor: '#fdfdfd'
  },
  carteBtnText: {
    color: '#e74c3c',
    fontWeight: 'bold',
    fontSize: 16
  },
  btnContainer: {
    marginTop: 10,
    marginBottom: 5,
    justifyContent: "space-around"
  },
  btn: {
    backgroundColor: '#fdfdfd'
  },
  sectionTitre: {
    fontSize: 16
  },
  icon: {
    marginRight: 7
  },
  description: {},
  text: {
    fontSize: 16,
    marginLeft: 15
  }
});
