import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Button, ScrollView, StyleSheet, Text, TextInput, View, KeyboardAvoidingView, FlatList, TouchableOpacity} from 'react-native';

import SvgComponentBK from "./assets/svg/Subtle-Prism-Test-r.js";
import IngredientItem from "./components/IngredientItem.js"
import RecipeItem from "./components/RecipeItem.js"

export default function App() {
  {/* Props */}
  const [inputIngredient, setInputIngredient] = useState('')
  const [inputHttpIngredients, setInputHttpIngredients] = useState('')
  const [outputRecipeList, setOutputRecipeList] = useState([])
  const [inputIngredientList, setInputIngredientList] = useState([])

  const getRecipesFromApi = () => {
    return fetch('http://www.recipepuppy.com/api/?i=' + inputHttpIngredients + '&p=10')
      .then(response => response.json())
      .then(data => {
        console.log(data)
        setOutputRecipeList(data.Object.results)
      })
      .catch(error => {
        console.error(error)
      });
  };

  {/* Events */}
    {/* Change Text */}
  const changeTextInputHandler=(inputIngredient)=>{
    setInputIngredient(inputIngredient)
  }
    {/* Press */}
  const addHandler=()=>{
    setInputIngredientList(currenstate => [...currenstate, {id: Math.random().toString(), value: inputIngredient, type: '+', isPlus: true,}])
    setInputIngredient('')
  }
  const banHandler=()=>{
    setInputIngredientList(currenstate => [...currenstate, {id: Math.random().toString(), value: inputIngredient, type: '-', isPlus: false,}])
    setInputIngredient('')
  }
  const findHandler=()=>{
    if(inputIngredientList && inputIngredientList.length > 0){
      setInputHttpIngredients('')

      inputIngredientList.forEach(ingredient => {
        setInputHttpIngredients(inputHttpIngredients + ',' + ingredient.type.toString() + ingredient.value.toString())
      });

      {/* http://www.recipepuppy.com/api/?i=+onions,-garlic,milk&p=1 */}

      getRecipesFromApi();
    }
  }
  const removeHandler=(id)=>{
    setInputIngredientList(currenstate => {
      return currenstate.filter((ingredient) => ingredient.id != id)
    })
  }
  const sendToLinkHandler=(href)=>{
    console.log('sending user to [' + href + ']...')
  }
  {/* Main func */}
  return (
    <View style={styles.main}>
      
      <SvgComponentBK style={styles.backgroundI} />

      <View style={styles.body}>
        <View style={styles.head}>
            {/* För minne oneplue skärm är konstig på toppen. */} 
            {/* <View style={{paddingTop: 20}}></View> */} 
            <View style={{flex: 1}}></View>

            <ScrollView>
              <Text style={styles.listSpace, {flex: 2}}>
                {'\t'}
                Enter an ingredient you have and want to use in the recipe and push the add ingredient button. 
                If you're going to find recipes without an ingredient, enter an ingredient and press the ban ingredient button.
              </Text>
            </ScrollView>

            <TextInput 
              onChangeText={changeTextInputHandler} 
              value={inputIngredient} 
              placeholder='onion' 
              style={styles.listSpace, {backgroundColor: '#fff', padding: 1, flex: 2}}
            />

            <View style={{flex: 1}, styles.ListSpace, styles.nav}>
              <View style={styles.listItem}><Button onPress={addHandler} title='Add'/></View>
              <View style={styles.listItem}><Button onPress={banHandler} title='Ban'/></View>
            </View>

            <View style={styles.ListSpace, {flex: 8}}>
              
                <View style={{margin: 0, padding: 0, minHeight: 110}}>

                  <FlatList 
                    numColumns={5}
                    data={inputIngredientList} 
                    renderItem={itemData => 

                      <IngredientItem 
                        InputOnPressHandler={removeHandler} 
                        InputId={itemData.item.id}
                        InputData={itemData.item.value} 
                        InputType={itemData.item.type} 
                        InputIsPlus={itemData.item.isPlus} 
                      />

                    } 
                    keyExtractor={(item, index) => item.id} 
                  />

                </View>
         
            </View>
            <View style={{flex: 1}, styles.listItem}>
              <Button onPress={findHandler} title='Find recipes' />
            </View>
        </View>

        <View style={styles.artikel}>
          {/*
          <FlatList 
            numColumns={1}
            data={outputRecipeList} 
            renderItem={itemData => 

              <RecipeItem
                InputOnPressLink={sendToLinkHandler}
                InputHref={itemData.item.href}
                InputTitle={itemData.item.title}
                InputIngredients={itemData.item.ingredients}
                InputThumbnail={itemData.item.thumbnail}
              />

            } 
            keyExtractor={(item, index) => item.id} 
          />
          */}
        </View>
      </View>  

    </View>
  );
}

{/* StyleSheet main */}
const styles = StyleSheet.create({
  ListSpace: {
    marginBottom: 10,
    marginTop: 10,
  },
  main: {
    height: '100%', 
    width: '100%', 
    flex: 1,
  },
  gird: {
    flex: 1,
    alignItems: 'flex-start',
    alignContent: 'flex-start',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  girdItem: {
    flex: 1,
    borderColor: '#000',
    borderWidth: 1,
    position: 'relative',
    display: 'flex',
    padding: 10,

  },
  listItem: {
    width: 150,
  },
  nav: {
    flexDirection: 'row', 
    justifyContent: 'space-between',
  },
  textParagraph: {
    textAlign: 'justify',
  },
  listSpace: {
    marginTop: 5,
    marginBottom: 5,
  },
  backgroundI: {
    flex: 1, 
    position: 'absolute',
    top: 0, 
    left: 0, 
    height: '100%', 
    width: '100%', 
    zIndex: 1,
  },
  body: {
    flex: 1, 
    position: 'relative', 
    zIndex: 2,
  },
  head: {
    flex: 1, 
    padding: 10, 
    backgroundColor: 'rgba(245, 152, 66, 0.5)', 
    position: 'relative',
    zIndex: 12,
  },
  artikel: {
    flex: 1, 
    backgroundColor: 'rgba(66, 208, 245, 0.5)',
    position: 'relative',
    zIndex: 11,
  },
});