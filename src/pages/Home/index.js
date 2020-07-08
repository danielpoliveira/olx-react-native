import React from 'react';
import { View, Text, SafeAreaView, Dimensions, StyleSheet } from 'react-native';
import { ScrollView, FlatList } from 'react-native-gesture-handler';

import MaterialIcons  from 'react-native-vector-icons/MaterialIcons';


const screen = Dimensions.get("screen").width;
const window = Dimensions.get("window");

const DATA = [
  {id: "00", title: "A10", price: "R$750", timer: "04 de julho 17:14, Cidade Operária"},
  {id: "01", title: "Maquina de lavar eletrolux (retirada de peças)", price: "R$200", timer: "04 de julho 17:14, Jardim das Palmeiras"},
  {id: "02", title: "Macaquinho", price: "R$15", timer: "04 de julho 17:14, Cohaserma II"},
  {id: "03", title: "Vendo GUARDA ROUPA", price: "R$250", timer: "04 de julho 17:14, Anil"},
  {id: "04", title: "A10", price: "R$750", timer: "04 de julho 17:14, Cidade Operária"},
  {id: "05", title: "A10", price: "R$750", timer: "04 de julho 17:14, Cidade Operária"},
  {id: "06", title: "A10", price: "R$750", timer: "04 de julho 17:14, Cidade Operária"},
  {id: "07", title: "A10", price: "R$750", timer: "04 de julho 17:14, Cidade Operária"},
];

const Advertising = ({ item, end }) => (
  <View style={[ {height: 130, flexDirection: "row", backgroundColor: "#FFF", 
  marginTop: 7.5,  
  marginHorizontal: 5,
  borderRadius: 5, overflow: "hidden"}, end? { marginBottom: 10 }: undefined]} >
    <View style={{  width: 125, backgroundColor: '#'+(Math.random()*0xFFFFFF<<0).toString(16) }} />

    <View style={{  flexDirection: "column", justifyContent: "space-between", padding: 15}} >
      <Text style={{ fontSize: 14, fontWeight: "100"}}>{item.title}</Text>
      <Text style={{ fontSize: 17, fontWeight: "600"}}>{item.price}</Text>
      <Text style={{ fontSize: 12  }}>{item.timer}</Text>
    </View> 
  </View>
); 

export default () => {
  console.log('valor de screen:  -----> ', screen);
  console.log('valor de window:  -----> ', window);
return (
  <>
    <View style={{ 
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0,
      shadowRadius: 2,  
      elevation: 5,
      
      backgroundColor: "#FFFFFF",width: "100%", flexDirection: "row", justifyContent: "space-between", }} >
      
      <View style={{   flex:1, padding: 12.5, justifyContent: "center", alignItems: "center"}} >
        <Text style={styles.filterLabel} >DDD 98 - Regiã...</Text>
      </View>

      <View style={{ flex:1,  padding: 10, 
        borderLeftWidth: StyleSheet.hairlineWidth,
        borderRightWidth: StyleSheet.hairlineWidth,
        borderColor: "#bbb",
        justifyContent: "center", alignItems: "center"}} >
        <Text style={styles.filterLabel} >Categoria</Text>
      </View>

      <View style={{ flex:1,  padding: 10, justifyContent: "center", alignItems: "center"}} >
        <Text style={styles.filterLabel} >Filtros</Text>
      </View>
    </View>

    <FlatList style={{backgroundColor: "#F2F2F2"}}
      data={DATA} renderItem={ item => < Advertising {...item}  end={item.index === DATA.length -1 ? true: false} />}
    />

    <View style={{
      width: 168, height: 60, backgroundColor: "#F18000", 
      borderRadius: 35, position: "absolute", bottom: 17.5, 
      left: screen/2 - 85,
      flexDirection: "row",
      justifyContent: "center", alignItems: "center"
      
    }}> 
      <MaterialIcons name="camera-alt" size={25} color="#FFFFFF"/>
      <Text style={{ marginLeft: 5, fontSize: 17, color: "#FFFFFF" }} >Anunciar agora</Text>
    </View>
    
  </>
);
}

const styles = StyleSheet.create({
  filterLabel: {
    color: "#6210CE",
    fontSize: 18,
    
  },
});