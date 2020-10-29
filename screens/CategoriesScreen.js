import React from 'react'
import { View, Text, StyleSheet, Button, FlatList, TouchableOpacity, Platform, Dimensions } from 'react-native'


import {CATEGORIES} from '../data/dummy-data'
import CategoryGridTile from '../components/CategoryGridTile'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import HeaderButton from '../components/HeaderButton'



const CategoriesScreen = props => {

   {/* <View style={styles.screen}>
      <Text>The Categories Screen!</Text>
      <Button title="Go to Meals" onPress={ () => {
         props.navigation.navigate({routeName: "CategoryMeals" })  
         //props.navigation.push("Categories")  
         //props.navigation.replace("Categories")  
      }} />
   </View> */}

   const renderGridItem = (itemData) => {
      return (
         <CategoryGridTile  
            title={itemData.item.title}  
            color= {itemData.item.color}
            onSelect={() => {props.navigation.navigate({
                  routeName: 'CategoryMeals', 
                  params: {categoryId: itemData.item.id}
                  })  
               } 
            } 
         />
      )
   }

   return (

      <FlatList data={CATEGORIES} renderItem={renderGridItem} numColumns={2}   />
      
   )

}

CategoriesScreen.navigationOptions = (navData) => {
   
   return{
      headerTitle: 'Meal Categories',
      headerLeft: () => (<HeaderButtons HeaderButtonComponent={HeaderButton}>
         <Item title='Menu' iconName="ios-menu" onPress={ () => {
            navData.navigation.toggleDrawer()
            }} />
      </HeaderButtons>)
   }
   
}

const styles = StyleSheet.create({
   screen: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
   },

})

export default CategoriesScreen;