import React from 'react';
import { View, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';


import Home from './Home';

const Stack = createStackNavigator();

const customHeaderStyle = {
  backgroundColor: "#6D0AD6",
};

export const HomeStack = (props) => {

  const { navigation } = props;

  console.log(props);

  return (
  <Stack.Navigator  screenOptions={{

    headerStyle: customHeaderStyle,
    headerTintColor: "#FFF" ,
    headerTitle: false,
    
    headerLeft: () => 
      (<TouchableOpacity style={{ paddingLeft: 12.5 }} onPress={() => navigation.openDrawer()}>
        <MaterialIcons name="menu" size={25} color="#FFF" />
      </TouchableOpacity>),
    headerRight: () =>
      (<View style={{ flexDirection: "row", paddingRight: 12.5}} >
        <TouchableOpacity style={{marginRight: 10}} >
          <MaterialIcons name="search" size={25} color="#FFF" />
        </TouchableOpacity>

        <TouchableOpacity style={{marginLeft: 10}}>
          <MaterialIcons name="favorite-border" size={25} color="#FFF" />
        </TouchableOpacity>
      </View>)
     
    
  }}>
    <Stack.Screen name="Anúncios" component={Home} />
  </Stack.Navigator>
);

}

export const InsertADStack = ({ navigation }) => {
  
  return (
  <Stack.Navigator screenOptions={{ 
    
  }} >
    <Stack.Screen name="Inserir Anúncio" component={InsertAD} />
  </Stack.Navigator>
);
}
export const NotificationStack = ({ navigation }) => (
  <Stack.Navigator screenOptions={{
    headerLeft: () => 
      <TouchableOpacity onPress={() => navigation.goBack()} >
        <MaterialIcons name="arrow-back" size={20} color="#000" />
      </TouchableOpacity>
  }} >
    <Stack.Screen name="Notificações" component={Notification} />
  </Stack.Navigator>
);

export const ChatStack = ({ navigation }) => (
  <Stack.Navigator>
    <Stack.Screen name="Chat" component={Chat} />
  </Stack.Navigator>
);

export const FavoritesStack = ({ navigation }) => (
  <Stack.Navigator screenOptions={{
    headerLeft: () => 
      <TouchableOpacity onPress={() => navigation.goBack()} >
        <MaterialIcons name="arrow-back" size={20} color="#000" />
      </TouchableOpacity>
  }} >
    <Stack.Screen name="Favoritos" component={Favorites} />
  </Stack.Navigator>
);

export const ProfileStack = ({ navigation }) => (
  <Stack.Navigator>
    <Stack.Screen name="Minha Conta" component={Profile} />
  </Stack.Navigator>
);

const InsertAD = () => (
  <View>
    <Text>Insert AD</Text>
  </View>
);

const Notification = () => (
  <View>
    <Text>Notification</Text>
  </View>
);

const Chat = () => (
  <View>
    <Text>Chat</Text>
  </View>
);

const Favorites = () => (
  <View>
    <Text>Favorites</Text>
  </View>
);

const Profile = () => (
  <View>
    <Text>Profile</Text>
  </View>
);

const headerConfig = {

}