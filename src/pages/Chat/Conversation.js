import React from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, KeyboardAvoidingView } from 'react-native';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const DATA = [
  {id: '00', msg: 'Aceita troca?', is_me: true},
  {id: '01', msg: 'testando', is_me: false},
  {id: '02', msg: 'testando', is_me: true},
  {id: '03', msg: 'testando', is_me: false},
  {id: '04', msg: 'testando', is_me: false},
  {id: '05', msg: 'testando', is_me: true},
  {id: '06', msg: 'testando', is_me: true},
  
  {id: '07', msg: 'Chat', is_me: false},
  {id: '08', msg: 'Bem', is_me: false},
  {id: '09', msg: 'Legal', is_me: false},
  {id: '10', msg: ':)', is_me: false},
  {id: '11', msg: 'Simmm', is_me: true},
];

const RenderItem = props => {
  const {item,end } = props;

  console.log(props);

  return (
    <View style={[{ 

    flexDirection: "row",
    justifyContent:  item.is_me? 'flex-end': 'flex-start',
    marginBottom: !end? 2: 50, 
    }]}>
      <View style={{
        maxWidth: 200,
        borderRadius: 7,
        backgroundColor: item.is_me? "#6D0AD6": "#E5E5E5",
        paddingVertical: 10, paddingHorizontal: 15,
      }}>
        <Text style={[item.is_me? {color: "#FFF"}: undefined]}>{item.msg}</Text>
      </View>
    </View>
  );
}

export default props => (
  <>
    <View style={{
      backgroundColor: "#FFF",
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderColor: "#888",
      flexDirection: "row", alignItems: "center"}} >
      <View  style={{width: 50, height: 50, backgroundColor: "gray"}} />
      <View style={{paddingHorizontal: 10, 
      
      }} >
        <Text>Fones de ouvido</Text>
        <Text style={{fontWeight: "700"}}>R$ 20</Text>
      </View>
    </View>

    <FlatList 
      style={{paddingHorizontal: 10, paddingTop: 10, paddingBottom: 10}}
      data={DATA} renderItem={item => <RenderItem {...item}
         end={item.index === DATA.length-1} />} 
    />

    <View><Text>Aqui</Text></View>
  
  <KeyboardAvoidingView 
    style={{
    width: "100%", 
    position: 'absolute',  bottom: 0}}
    behavior="absolute"
  >

  <View style={{

    borderColor: "#bbb",
    borderTopWidth: StyleSheet.hairlineWidth,
    flexDirection: "row", justifyContent: "space-between", alignItems: "center",
    backgroundColor: "#FFF", paddingHorizontal: 10,}} >
    <TextInput
      style={{  flex:1 }}
      placeholder="Digite uma mensagem..."
    />

    <MaterialIcons name="send" size={25} color="#D2D2D2" />

  </View>
 </KeyboardAvoidingView>
 </>
);