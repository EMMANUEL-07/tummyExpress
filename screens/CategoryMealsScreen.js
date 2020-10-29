import React from 'react'
import { View, Text, StyleSheet, FlatList } from 'react-native'
import {useSelector} from 'react-redux'

import {CATEGORIES } from '../data/dummy-data'
import Colors from '../constants/Colors'
import MealItem from '../components/MealItem'
import MealList from '../components/MealList'


const CategoryMealsScreen = props => {
   
   const catId = props.navigation.getParam('categoryId')

   //const selectedCategory = CATEGORIES.find( cat => cat.id === catId)

   const availableMeals = useSelector(state => state.meals.filteredMeals)

   const displayedMeals = availableMeals.filter(meal => meal.categoryIds.indexOf(catId) >= 0 )

   if(displayedMeals.length === 0){
      return(
         <View style={styles.content}>
            <Text style={styles.text}>Probably no meals found inline with your preference settings. </Text>
            <Text style={styles.text}>Would advise you <Text style={styles.emp}>stick with your dietician's</Text> recommendation</Text>
         </View>
      )
   }

   return (
      <MealList listData={displayedMeals} navigation={props.navigation} />
   )
}

CategoryMealsScreen.navigationOptions = (navigationData) =>  {
   const catId = navigationData.navigation.getParam('categoryId')

   const selectedCategory = CATEGORIES.find( cat => cat.id === catId)

   return {
      headerTitle: selectedCategory.title,
   }
}

const styles= StyleSheet.create({
   content: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      margin: 20
   },
   text: {
      padding: 16,
      fontSize: 19
   },
   emp: {
      fontStyle: "italic",
      fontWeight: "bold",
      color: Colors.accent
   }
})



export default CategoryMealsScreen;