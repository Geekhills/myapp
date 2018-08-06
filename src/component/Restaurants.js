//
 // This is the Restaurants class
 //

 // React native and others libraries imports
 import React, { Component } from 'react';
 import { ScrollView, StyleSheet, Keyboard, View, Picker } from 'react-native';
 import { Button, Text, Icon } from 'react-native-elements';
 import { MenuContext, Menu, MenuOptions, MenuOption, MenuTrigger, renderers } from 'react-native-popup-menu';

 // Our custom files and classes import
 import Language from '../Language';
 import Restaurant from '../model/Restaurant';
 import Restoitem from './common/Restoitem';
 import Input from './common/Input';
 import Error from './common/Error';
 import Loading from './common/Loading';



 export default class Restaurants extends Component {
   state = {
      searchValue: "",
      hasError: false,
      errorMsg: "",
      filterBy: {
        ambiance: [],
        typeCuisine: [],
        exigenceAlimentaire: [],
        prestation: [],
        concours: [],
        specialite: []
      },
      selectedFilterButtons: [],
      restos: [],
      allRestos: [],
      loading: false
   };

   r = new Restaurant();

   componentWillMount() {
     this.setState({loading: true});
     this.r.search(this.props.navigation.state.params.name, (restaurants, error) => {
       if(error)
        this.setState({restos: [], loading: false, hasError: true, errorMsg: "Erreur de connexion !"});
       else
        this.setState({restos: restaurants, allRestos: restaurants, loading: false});
     });

   }

 	render() {
 		return(
      <MenuContext>
   			<ScrollView contentContainerStyle={styles.container}>
          <Input
            placeholder={Language.Home.search}
            icon="search" style={styles.input}
            onFocus={() => this.setState({hasError: false})}
            onChange={(text) => this.setState({searchValue: text})}
            onSubmit={this.trouver.bind(this)}
            returnKeyType="search"
          />
          <View style={styles.row}>
            <Button
              icon={{name: 'filter-variant', type: 'material-community', color: '#33332E'}}
              title={Language.Restaurants.filterBy}
              onPress={() => this.openFiltre()}
              buttonStyle={styles.btn}
              textStyle={{color: '#33332E'}}
            />
          </View>
          <Error hasError={this.state.hasError} errorMsg={this.state.errorMsg} />
          {
              this.state.restos.map((resto, i) => <Restoitem key={i} resto={resto} {...this.props} />)
          }
          {
            (this.state.loading == false && this.state.restos.length <= 0) ? <View style={styles.vide}><Text>{Language.Restaurants.empty}</Text></View> : null
          }
          <Loading loading={this.state.loading} />
          <Menu ref="filtreMenu" renderer={renderers.SlideInMenu}>
              <MenuTrigger />
              <MenuOptions>
                <Text style={{marginTop: 5, marginLeft: 5, fontSize: 18}}>{Language.Restaurants.filterBy}</Text>
                <MenuOption onSelect={() => null} style={{marginLeft: 7}}>
                  <View style={styles.filtreRow}>
                    <Text>{Language.RestaurantInformations.environment}</Text>
                    <ScrollView contentContainerStyle={{flexDirection: 'row', marginLeft: 5}} horizontal={true} showsHorizontalScrollIndicator={false}>
                      <Button
                        title={Language.Filters.families}
                        onPress={() => this.filter('ambiance', 'Familiale')}
                        buttonStyle={this.state.selectedFilterButtons.indexOf('Familiale') > -1 ? styles.filterBtnSelected : styles.filterBtn}
                        textStyle={this.state.selectedFilterButtons.indexOf('Familiale') > -1 ? styles.filterBtnTextSelected : styles.filterBtnText}
                      />
                      <Button
                        title={Language.Filters.kids}
                        onPress={() => this.filter('ambiance', 'Enfants')}
                        buttonStyle={this.state.selectedFilterButtons.indexOf('Enfants') > -1 ? styles.filterBtnSelected : styles.filterBtn}
                        textStyle={this.state.selectedFilterButtons.indexOf('Enfants') > -1 ? styles.filterBtnTextSelected : styles.filterBtnText}
                      />
                      <Button
                        title={Language.Filters.couples}
                        onPress={() => this.filter('ambiance', 'Couples')}
                        buttonStyle={this.state.selectedFilterButtons.indexOf('Couples') > -1 ? styles.filterBtnSelected : styles.filterBtn}
                        textStyle={this.state.selectedFilterButtons.indexOf('Couples') > -1 ? styles.filterBtnTextSelected : styles.filterBtnText}
                      />
                    </ScrollView>
                  </View>

                  <View style={styles.filtreRow}>
                    <Text>{Language.RestaurantInformations.kitchenType}</Text>
                    <ScrollView contentContainerStyle={{flexDirection: 'row', marginLeft: 5}} horizontal={true} showsHorizontalScrollIndicator={false}>
                      <Button
                        title={Language.Filters.arab}
                        onPress={() => this.filter('typeCuisine', 'Arabe')}
                        buttonStyle={this.state.selectedFilterButtons.indexOf('Arabe') > -1 ? styles.filterBtnSelected : styles.filterBtn}
                        textStyle={this.state.selectedFilterButtons.indexOf('Arabe') > -1 ? styles.filterBtnTextSelected : styles.filterBtnText}
                      />
                      <Button
                        title={Language.Filters.lebanese}
                        onPress={() => this.filter('typeCuisine', 'Libanaise')}
                        buttonStyle={this.state.selectedFilterButtons.indexOf('Libanaise') > -1 ? styles.filterBtnSelected : styles.filterBtn}
                        textStyle={this.state.selectedFilterButtons.indexOf('Libanaise') > -1 ? styles.filterBtnTextSelected : styles.filterBtnText}
                      />
                      <Button
                        title={Language.Filters.mediterranean}
                        onPress={() => this.filter('typeCuisine', 'Mediterraneenne')}
                        buttonStyle={this.state.selectedFilterButtons.indexOf('Mediterraneenne') > -1 ? styles.filterBtnSelected : styles.filterBtn}
                        textStyle={this.state.selectedFilterButtons.indexOf('Mediterraneenne') > -1 ? styles.filterBtnTextSelected : styles.filterBtnText}
                      />
                      <Button
                        title={Language.Filters.middleEast}
                        onPress={() => this.filter('typeCuisine', 'Moyen-Orient')}
                        buttonStyle={this.state.selectedFilterButtons.indexOf('Moyen-Orient') > -1 ? styles.filterBtnSelected : styles.filterBtn}
                        textStyle={this.state.selectedFilterButtons.indexOf('Moyen-Orient') > -1 ? styles.filterBtnTextSelected : styles.filterBtnText}
                      />
                    </ScrollView>
                  </View>

                  <View style={styles.filtreRow}>
                    <Text>{Language.RestaurantInformations.exigency}</Text>
                    <ScrollView contentContainerStyle={{flexDirection: 'row', marginLeft: 5}} horizontal={true} showsHorizontalScrollIndicator={false}>
                      <Button
                        title={Language.Filters.vegetarien}
                        onPress={() => this.filter('exigenceAlimentaire', 'Vegetariens')}
                        buttonStyle={this.state.selectedFilterButtons.indexOf('Vegetariens') > -1 ? styles.filterBtnSelected : styles.filterBtn}
                        textStyle={this.state.selectedFilterButtons.indexOf('Vegetariens') > -1 ? styles.filterBtnTextSelected : styles.filterBtnText}
                      />
                      <Button
                        title={Language.Filters.halal}
                        onPress={() => this.filter('exigenceAlimentaire', 'Halal')}
                        buttonStyle={this.state.selectedFilterButtons.indexOf('Halal') > -1 ? styles.filterBtnSelected : styles.filterBtn}
                        textStyle={this.state.selectedFilterButtons.indexOf('Halal') > -1 ? styles.filterBtnTextSelected : styles.filterBtnText}
                      />
                    </ScrollView>
                  </View>

                  <View style={styles.filtreRow}>
                    <Text>{Language.RestaurantInformations.services}</Text>
                    <ScrollView contentContainerStyle={{flexDirection: 'row', marginLeft: 5}} horizontal={true} showsHorizontalScrollIndicator={false}>
                      <Button
                        title={Language.Filters.reservations}
                        onPress={() => this.filter('prestation', 'Reservations')}
                        buttonStyle={this.state.selectedFilterButtons.indexOf('Reservations') > -1 ? styles.filterBtnSelected : styles.filterBtn}
                        textStyle={this.state.selectedFilterButtons.indexOf('Reservations') > -1 ? styles.filterBtnTextSelected : styles.filterBtnText}
                      />
                      <Button
                        title={Language.Filters.import}
                        onPress={() => this.filter('prestation', 'Plats à emporter')}
                        buttonStyle={this.state.selectedFilterButtons.indexOf('Plats à emporter') > -1 ? styles.filterBtnSelected : styles.filterBtn}
                        textStyle={this.state.selectedFilterButtons.indexOf('Plats à emporter') > -1 ? styles.filterBtnTextSelected : styles.filterBtnText}
                      />
                      <Button
                        title={Language.Filters.outdoor}
                        onPress={() => this.filter('prestation', 'Terrasse')}
                        buttonStyle={this.state.selectedFilterButtons.indexOf('Terrasse') > -1 ? styles.filterBtnSelected : styles.filterBtn}
                        textStyle={this.state.selectedFilterButtons.indexOf('Terrasse') > -1 ? styles.filterBtnTextSelected : styles.filterBtnText}
                      />
                    </ScrollView>
                  </View>

                  <View style={styles.filtreRow}>
                    <Text>{Language.RestaurantInformations.style}</Text>
                    <ScrollView contentContainerStyle={{flexDirection: 'row', marginLeft: 5}} horizontal={true} showsHorizontalScrollIndicator={false}>
                      <Button
                        title={Language.Filters.lunch}
                        onPress={() => this.filter('concours', 'Cheque Dejeuner')}
                        buttonStyle={this.state.selectedFilterButtons.indexOf('Cheque Dejeuner') > -1 ? styles.filterBtnSelected : styles.filterBtn}
                        textStyle={this.state.selectedFilterButtons.indexOf('Cheque Dejeuner') > -1 ? styles.filterBtnTextSelected : styles.filterBtnText}
                      />
                    </ScrollView>
                  </View>

                  <View style={styles.filtreRow}>
                    <Text>{Language.RestaurantInformations.speciality}</Text>
                    <ScrollView contentContainerStyle={{flexDirection: 'row', marginLeft: 5}} horizontal={true} showsHorizontalScrollIndicator={false}>
                      <Button
                        title={Language.Filters.lebanese}
                        onPress={() => this.filter('specialite', 'Libanaise')}
                        buttonStyle={this.state.selectedFilterButtons.indexOf('SpecialiteLibanaise') > -1 ? styles.filterBtnSelected : styles.filterBtn}
                        textStyle={this.state.selectedFilterButtons.indexOf('SpecialiteLibanaise') > -1 ? styles.filterBtnTextSelected : styles.filterBtnText}
                      />
                      <Button
                        title={Language.Filters.european}
                        onPress={() => this.filter('specialite', 'Européen')}
                        buttonStyle={this.state.selectedFilterButtons.indexOf('Européen') > -1 ? styles.filterBtnSelected : styles.filterBtn}
                        textStyle={this.state.selectedFilterButtons.indexOf('Européen') > -1 ? styles.filterBtnTextSelected : styles.filterBtnText}
                      />
                      <Button
                        title={Language.Filters.fastFood}
                        onPress={() => this.filter('specialite', 'Fast-food')}
                        buttonStyle={this.state.selectedFilterButtons.indexOf('Fast-food') > -1 ? styles.filterBtnSelected : styles.filterBtn}
                        textStyle={this.state.selectedFilterButtons.indexOf('Fast-food') > -1 ? styles.filterBtnTextSelected : styles.filterBtnText}
                      />
                    </ScrollView>
                  </View>
                </MenuOption>
              </MenuOptions>
          </Menu>
        </ScrollView>
      </MenuContext>
 		);
 	}


  trouver() {
    Keyboard.dismiss();
    if(this.state.searchValue == "")  {
      return;
    }
    this.setState({hasError: false});
    this.setState({loading: true});
    this.r.search(this.state.searchValue, (restaurants) => {
      this.setState({restos: restaurants, loading: false});
    });
  }

  openFiltre() {
    this.refs["filtreMenu"].open();
  }

  applyAllfilters(filterBy) {
    var restos = this.state.allRestos;
    var newRestos = restos;
    for(var by in filterBy) {
      if(filterBy[by].length > 0) {
        for(var i=0; i<filterBy[by].length; i++) {
          for(var j=0; j<restos.length; j++) {
            if(restos[j][by].indexOf(filterBy[by][i]) < 0 )
              newRestos.splice(j, 1)
          }
        }
      }
    }
    return newRestos;
  }

  filter(by, value) {
    this.setState({loading: true});
    var newRestos = this.state.allRestos;
    var filterBy = this.state.filterBy;
    var selectedFilterButtons = this.state.selectedFilterButtons;
    if(selectedFilterButtons.indexOf(value) <= -1) {
      newRestos = this.state.restos.filter((resto) => resto[by].indexOf(value) > -1);
      filterBy[by].push(value);
      selectedFilterButtons.push(value);
    }
    else {
      this.setState({restos: this.state.allRestos});
      filterBy[by].splice(filterBy[by].indexOf(value), 1);
      selectedFilterButtons.splice(selectedFilterButtons.indexOf(value), 1);
      newRestos = this.applyAllfilters(filterBy);
    }
    this.setState({restos: newRestos, filterBy: filterBy, selectedFilterButtons: selectedFilterButtons, loading: false});
  }

 }

 const styles = StyleSheet.create({
   container: {
     paddingLeft: 7,
     paddingRight: 7,
   },
   input: {
     marginTop: 10,
     borderWidth: 1,
     borderColor: 'rgba(73 ,71, 81, 0.05)',
     borderBottomWidth: 1,
     borderBottomColor: 'rgba(73 ,71, 81, 0.1)',
   },
   vide: {
     flex: 1,
     justifyContent: 'center',
     alignItems: 'center',
     marginTop: 30
   },
   row: {
     flex: 1,
     flexDirection: 'row',
     justifyContent: 'flex-end'
   },
   filtreRow: {
     flexDirection: 'row',
     alignItems: 'center',
     marginBottom: 10
   },
   btn: {
     backgroundColor: '#E9E7EF', // transparent
     borderWidth: 0,
   },
   filterBtn: {
     borderRadius: 5,
     backgroundColor: '#ecf0f1',
   },
   filterBtnSelected: {
     borderRadius: 5,
     backgroundColor: '#e74c3c'
   },
   filterBtnText: {color: '#33332E'},
   filterBtnTextSelect: {color: '#fdfdfd'}
 });
