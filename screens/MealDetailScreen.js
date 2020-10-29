import React, {useEffect, useCallback } from 'react'
import { View, Text, StyleSheet, Button, ScrollView, Image, Dimensions } from 'react-native'
import {HeaderButtons, Item} from 'react-navigation-header-buttons'
//import { MEALS } from '../data/dummy-data';
import {useSelector, useDispatch} from 'react-redux'
import HeaderButton from '../components/HeaderButton'
import {toggleFavorite} from '../store/actions/mealsActions'

const ListItem = props => {
   return (
      <View style={styles.listItem}>
         <Text>{props.children}</Text>
      </View>
   )
}


const MealDetailsScreen = props => {

   const mealId = props.navigation.getParam('mealId')

   
   const availableMeals = useSelector(state => state.meals.meals)
   const currentMealIsFav = useSelector(state => state.meals.favoriteMeals.some(meal => meal.id === mealId ))

   const selectedMeal = availableMeals.find( meal => meal.id === mealId )

   const dispatch = useDispatch()

   const toggleFavoriteHandler = useCallback(() => {
      dispatch(toggleFavorite(mealId))
   }, [dispatch, mealId])

   useEffect(() => {
      props.navigation.setParams({toggleFav: toggleFavoriteHandler})      
   }, [toggleFavoriteHandler])

   useEffect(() => {
      props.navigation.setParams({isFav: currentMealIsFav})      
   }, [currentMealIsFav])
   

   return (
      <ScrollView>
         <Image source={{uri: selectedMeal.imageUrl}} style={styles.image}/>
         <View style={styles.mealDetails} >
            <Text style={styles.details} > {selectedMeal.duration}minutes </Text>
            <Text style={styles.details} > {selectedMeal.complexity.toUpperCase()} </Text>
            <Text style={styles.details} > {selectedMeal.affordablity.toUpperCase()} </Text>
         </View>
         <Text style={styles.title}>Ingredients</Text>
         {selectedMeal.ingredients.map( ing => (<ListItem key={ing}> {ing} </ListItem>))}
         <Text style={styles.title}>Steps</Text>
         {selectedMeal.steps.map( steps => (<ListItem key={steps}> {steps} </ListItem>))}
         
      </ScrollView>
   )
}

MealDetailsScreen.navigationOptions = (navigationData) => {
   //const mealId =   navigationData.navigation.getParam('mealId')
   const mealTitle =   navigationData.navigation.getParam('mealTitle')
   const toggleFavorite = navigationData.navigation.getParam('toggleFav')
   const isFavorite = navigationData.navigation.getParam('isFav')
   //const selectedMeal = MEALS.find( meal => meal.id === mealId )

   return {
      
      headerTitle: mealTitle,
      headerRight: () => (<HeaderButtons HeaderButtonComponent={HeaderButton}  >
         <Item title='Favorite' iconName={ isFavorite ? 'md-star' : 'md-star-outline'} onPress={toggleFavorite} />
      </HeaderButtons>)
   }
}

const styles = StyleSheet.create({
   image: {
      width: '100%',
      height:  Dimensions.get('window').width > 540 ? 500 :250 
   },
   mealDetails:{
      flexDirection: 'row',
      padding: 15,
      justifyContent: 'space-around'
   },
   details:{
      fontSize: Dimensions.get('window').width > 540 ? 28 : 16,
   },
   title: {
      fontSize: 22,
      textAlign: 'center',
      fontWeight: 'bold'
   },
   listItem: {
      marginHorizontal: 20,
      marginVertical: 10,
      borderColor: '#ccc',
      padding: 10,
      borderWidth: 1
   }
})

export default MealDetailsScreen;