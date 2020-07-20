import React from 'react';
import { View, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import Home     from './Home';
import InsertAD from './InsertAD';
import Product from './Product';
import Categories from './Categories';
import { Subcategory } from './Categories/CategoriesOptions';
import Chat from './Chat';
import Conversation from './Chat/Conversation';
import Profile from './Profile';
import MeusAnuncios  from './Profile/Anuncios';

import Favorites from './Favorites';

import Login from './Login';
import SignUp from './SignUp';

const Stack = createStackNavigator();

const customHeaderStyle = {
  backgroundColor: "#6D0AD6",
};

export const HomeStack = props => {

  const { navigation, route } = props;

  return (
    <Stack.Navigator  children={route}
      screenOptions={{
        headerStyle: customHeaderStyle,
        headerTintColor: "#FFF" ,  
      }}
    >
      {/* <Stack.Screen 
        name="Anúncios"
        options={{
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
        }}
      >
        {props => <Home {...props} route={route } />}
      </Stack.Screen> */}

      <Stack.Screen 
        name="Anúncios" component={Home} 
        options={{
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

              <TouchableOpacity style={{marginLeft: 10}} onPress={() => navigation.navigate('Favoritos')} >
                <MaterialIcons name="favorite-border" size={25} color="#FFF" />
              </TouchableOpacity>
            </View>)
        }}
      /> 

      <Stack.Screen name="Login" component={Login} />

      <Stack.Screen name="Cadastrar" component={SignUp} />

      <Stack.Screen name="Produto" component={Product}
        options={{}} 
      /> 
      
      {/* <Stack.Screen name="Produto"
        options={{
          headerRight: () =>
          (<View style={{ flexDirection: "row", paddingRight: 12.5}} >
            <TouchableOpacity style={{marginLeft: 10}} onPress={ han } >
              <MaterialIcons name="favorite-border" size={25} color="#FFF" />
            </TouchableOpacity>
          </View>)
        }} 
      >
        {props => <Product {...product} />}
      </Stack.Screen> */}


    </Stack.Navigator>
  ); 

}

export const InsertADStack = ({ navigation }) => {
  return (

  <Stack.Navigator screenOptions={{ 
    headerStyle: customHeaderStyle,
    headerTintColor: "#FFF" ,
    
  }} >
    <Stack.Screen 
    
      options={{
        headerLeft: () => 
      (<TouchableOpacity style={{ paddingLeft: 12.5 }} onPress={() => navigation.openDrawer()  }>
        <MaterialIcons name="menu" size={25} color="#FFF" />
      </TouchableOpacity>),
      }}

      name="Inserir Anúncio" component={InsertAD} />
    <Stack.Screen name="Categorias" component={Categories} />
    <Stack.Screen name="Subcategoria" component={Subcategory} />
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
  <Stack.Navigator screenOptions={{ 
    headerStyle: customHeaderStyle,
    headerTintColor: "#FFF" ,
    
  }}>
    <Stack.Screen 
      name="Chat" component={Chat} 
      options={{        
        headerLeft: () => 
          (<TouchableOpacity style={{ paddingLeft: 12.5 }} onPress={() => navigation.openDrawer()}>
            <MaterialIcons name="menu" size={25} color="#FFF" />
          </TouchableOpacity>),
      }}
    />

    <Stack.Screen name="Conversa" component={Conversation} 
      options={({ route }) => ({ title: route.params.user.username })}
    />

  </Stack.Navigator>
);

export const FavoritesStack = ({ navigation }) => (
  <Stack.Navigator screenOptions={{
    headerStyle: customHeaderStyle,
    headerTintColor: "#FFF" ,
    headerLeft: () => 
      (<TouchableOpacity style={{ paddingLeft: 12.5 }} onPress={() => navigation.openDrawer()}>
        <MaterialIcons name="menu" size={25} color="#FFF" />
      </TouchableOpacity>),
    }}
  >
    <Stack.Screen name="Favoritos" component={Favorites} />
  </Stack.Navigator>
);

export const ProfileStack = ({ navigation }) => (
  <Stack.Navigator screenOptions={{ 
    headerStyle: customHeaderStyle,
    headerTintColor: "#FFF" ,
    
  }}>
    <Stack.Screen name="Minha Conta" component={Profile} 
      options={{        
        headerLeft: () => 
          (<TouchableOpacity style={{ paddingLeft: 12.5 }} onPress={() => navigation.openDrawer()}>
            <MaterialIcons name="menu" size={25} color="#FFF" />
          </TouchableOpacity>),
      }}
    />

    <Stack.Screen name="Meus Anuncios" component={MeusAnuncios} />
  </Stack.Navigator>
);


const Notification = () => (
  <View>
    <Text>Notification</Text>
  </View>
);

