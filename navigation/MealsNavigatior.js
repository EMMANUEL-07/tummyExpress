import React from 'react'
import { Platform } from 'react-native'
import { createStackNavigator } from 'react-navigation-stack'
import { createBottomTabNavigator } from 'react-navigation-tabs'
//import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import { createDrawerNavigator } from 'react-navigation-drawer'
import { createAppContainer } from 'react-navigation'
import { Ionicons } from '@expo/vector-icons'

import CategoriesScreen from '../screens/CategoriesScreen'
import CategoryMealsScreen from '../screens/CategoryMealsScreen'
import MealDetailScreen from '../screens/MealDetailScreen'
import FavoritesScreen from '../screens/FavoritesScreen'
import FiltersScreen from '../screens/FiltersScreen'

import Colors from '../constants/Colors'

const defaultStackNavOptions = {
   headerStyle: {
      backgroundColor: Colors.primary
   },
   headerTintColor: 'white'
}

const MealsNavigator = createStackNavigator({
   Categories: {
      screen: CategoriesScreen,
   },
   CategoryMeals: {
      screen: CategoryMealsScreen,
   },
   MealDetail: MealDetailScreen,
}, {
      //initialRouteName: 'Categories',
      defaultNavigationOptions: defaultStackNavOptions
   }
)

const FavNavigator = createStackNavigator({
   Favorites: {
      screen: FavoritesScreen
   },
   CategoryMeals: {
      screen: CategoryMealsScreen,
   },
   MealDetail: MealDetailScreen,
}, {
      //initialRouteName: 'Categories',
      defaultNavigationOptions: defaultStackNavOptions
   }
)

const tabScreenConfig = {
   Meals: {
      screen: MealsNavigator,
      navigationOptions: {
         tabBarIcon: tabInfo => {
            return (
               <Ionicons name="ios-restaurant" size={25} color={tabInfo.tintColor} />
            );
         },
         tabBarColor: Colors.primaryColor
      }
   },
   Favorites: {
      screen: FavNavigator,
      navigationOptions: {
         tabBarIcon: tabInfo => {
            return <Ionicons name="ios-star" size={25} color={tabInfo.tintColor} />;
         },
         tabBarColor: Colors.accentColor
      }
   }
};



const MealsFavTabNavigator =
   Platform.OS === 'android'
      ? createBottomTabNavigator(tabScreenConfig, {
         activeTintColor: 'white',
         shifting: true,
         barStyle: {
            backgroundColor: Colors.primary
         }
      })
      : createBottomTabNavigator(tabScreenConfig, {
         tabBarOptions: {
            activeTintColor: Colors.accent
         }
      })
;

const FiltersNavigator = createStackNavigator(
   {
     Filters: FiltersScreen
   },
   {
     // navigationOptions: {
     //   drawerLabel: 'Filters!!!!'
     // },
     defaultNavigationOptions: defaultStackNavOptions
   }
);


const mainNavigator = createDrawerNavigator({
   MealsFavs: {screen: MealsFavTabNavigator, navigationOptions: {
      drawerLabel: 'Meals'
   }},
   Preferences: FiltersNavigator

},{
   contentOptions: {
      activeTintColor: Colors.accent,
      /* labelStyle: {
         fontFamily: 'open-sans-bold'
      } */
   }
})

export default createAppContainer(mainNavigator);