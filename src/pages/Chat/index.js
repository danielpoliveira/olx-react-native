import React from 'react';
import { View, Text, SafeAreaView, FlatList, StyleSheet } from 'react-native';

const DATA = [
  { id: "00", title: "Fones de ouvido", username: "Jennifer Santos", data: "Dom, 21 de Jun" }, 
  { id: "01", title: "Fones de ouvido", username: "Jennifer Santos", data: "Dom, 21 de Jun" }, 
  { id: "02", title: "Fones de ouvido", username: "Jennifer Santos", data: "Dom, 21 de Jun" }, 
  { id: "03", title: "Fones de ouvido", username: "Jennifer Santos", data: "Dom, 21 de Jun" }, 
  { id: "04", title: "Fones de ouvido", username: "Jennifer Santos", data: "Dom, 21 de Jun" }, 
  { id: "05", title: "Fones de ouvido", username: "Jennifer Santos", data: "Dom, 21 de Jun" }, 
  { id: "06", title: "Fones de ouvido", username: "Jennifer Santos", data: "Dom, 21 de Jun" }, 
  { id: "07", title: "Fones de ouvido", username: "Jennifer Santos", data: "Dom, 21 de Jun" }, 
  { id: "08", title: "Fones de ouvido", username: "Jennifer Santos", data: "Dom, 21 de Jun" }, 
];

const RenderItem = props => {
  const { navigate } = props;
  const user = props.item;

  return (
    <View 
      onTouchEnd={() => navigate('Conversa', { user })}
      style={{
        flexDirection: "row", alignItems: "center"}} 
    >
      <View 
        style={{
          borderRadius: 5,
          margin: 15,
          width: 60, height: 60, backgroundColor: "gray"
        }}
      />

      <View style={{
        flex:1,
        paddingVertical: 20,
        paddingRight: 10,
        height: 90,
        
        flexDirection: "row",
        justifyContent: "space-between",
        borderColor: "#AAA",
        borderBottomWidth: StyleSheet.hairlineWidth,
      }}
      >
        <View>
          <Text style={{fontWeight: "bold", fontSize: 15}} >{user.title}</Text>
          <Text>{user.username}</Text>
        </View>

        <View>
          <Text style={{color: "#888", fontSize: 12}}>{user.data}</Text>
        </View>
      </View>
    </View>
  )
}

export default props => {
 
  const { navigation } = props;

  console.log('chat props ================> '+ props)
  return (
    <SafeAreaView>
      <FlatList data={DATA} renderItem={user => <RenderItem {...navigation}  {...user} />} />
    </SafeAreaView>
  );
}