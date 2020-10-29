import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MealsNavigator from './navigation/MealsNavigatior'
import {enableScreens} from 'react-native-screens'
import {createStore, combineReducers} from 'redux'
import mealsReducer from './store/reducers/meals'
import {Provider} from 'react-redux'

enableScreens()

const rootReducer = combineReducers({
  meals: mealsReducer
})

const store = createStore(rootReducer);

export default function App() {

  return (
    <Provider store={store}>
      <MealsNavigator />
    </Provider>
  ) 
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
