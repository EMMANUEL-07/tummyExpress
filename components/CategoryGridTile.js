import React from 'react'
import  {TouchableOpacity, View, Text, StyleSheet, Dimensions } from 'react-native'

const CategoryGridTile = props => {

   return (
      <TouchableOpacity 
         style={styles.gridItem} 
         onPress={props.onSelect} 
      >
         <View style={{...styles.container, ...{backgroundColor: props.color} }}> 
            <Text style={styles.title} numberOfLines={2} >{props.title}</Text>
         </View>
      </TouchableOpacity>
   )
}

const styles = StyleSheet.create({

   gridItem: {
      flex: 1,
      margin:13,
      height: Dimensions.get('window').width > 540 ? 250 : 150
   },
   container: {
      flex: 1,
      borderRadius: 10,
      elevation: 5,
      justifyContent: 'flex-end',
      alignItems: 'flex-end',
      padding: 15
   },
   title:{
      fontSize: Dimensions.get('window').width > 540 ? 44 : 22,
      textAlign: 'right'
   }
})

export default CategoryGridTile