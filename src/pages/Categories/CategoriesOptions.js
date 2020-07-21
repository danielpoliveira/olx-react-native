import React from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, FlatList, StyleSheet } from 'react-native';

export const Subcategory = props => {
  const { navigation, route } = props;

  if (!route.params)
    return null;

  const { subcategory, category } = route.params;

  const RenderItem = props => {
    const { item, end } = props;

    return (
      <TouchableOpacity  
        
      onPress={() => navigation.navigate('Inserir Anúncio', {
        selected: {
          category: props.category,
          subcategory: item,
        }
      })}

        style={{ padding: 18, borderBottomWidth: !end? StyleSheet.hairlineWidth : 0}} >
        <Text>{item.name}</Text>
      </TouchableOpacity>
    );
  }

  return (
    <SafeAreaView>
      <FlatList data={subcategory}
        keyExtractor={(item, index) => index.toString()}
        renderItem={item => < RenderItem {...item} category={category} end={item.index === subcategory.length-1} />} />
    </SafeAreaView>
  );
}

<View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>

  <TouchableOpacity

    onPress={() => navigation.navigate('Inserir Anúncio')}
    style={{ backgroundColor: "gray", padding: 10 }} >
    <Text style={{}}>Clique em mim</Text>
  </TouchableOpacity>
</View>