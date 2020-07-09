import React from 'react';
import { View, Text, StatusBar, StyleSheet} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator, DrawerItemList } from '@react-navigation/drawer';


import  Svg, {Path}  from 'react-native-svg';

import { HomeStack, InsertADStack, ChatStack, FavoritesStack, NotificationStack, ProfileStack } from './pages/index';

setIcon = (name = '', color, size, focused) => {
  console.log("valor de name -------> ", name);
  
  const d = [];

  const olxLogoColors = ["#6E0AD6", "#8CE563", "#F28000"];

  switch(name){
    case "Anúncios": 
      d[0] = "M7.579 26.294c-2.282 0-3.855-1.89-3.855-4.683 0-2.82 1.573-4.709 3.855-4.709 2.28 0 3.855 1.889 3.855 4.682 0 2.82-1.574 4.71-3.855 4.71m0 3.538c4.222 0 7.578-3.512 7.578-8.248 0-4.682-3.173-8.22-7.578-8.22C3.357 13.363 0 16.874 0 21.61c0 4.763 3.173 8.221 7.579 8.221";
      d[1] = "M18.278 23.553h7.237c.499 0 .787-.292.787-.798V20.44c0-.505-.288-.798-.787-.798h-4.851V9.798c0-.505-.288-.798-.787-.798h-2.386c-.498 0-.787.293-.787.798v12.159c0 1.038.551 1.596 1.574 1.596";
      d[2] = "M28.112 29.593l4.353-5.082 4.222 5.082c.367.452.839.452 1.258.08l1.705-1.517c.42-.373.472-.851.079-1.277l-4.694-5.321 4.274-4.869c.367-.426.34-.878-.078-1.277l-1.6-1.463c-.42-.4-.892-.373-1.259.08l-3.907 4.602-3.986-4.603c-.367-.425-.84-.479-1.259-.08l-1.652 1.49c-.42.4-.446.825-.053 1.278l4.354 4.868-4.747 5.348c-.393.452-.34.905.079 1.277l1.652 1.464c.42.372.891.345 1.259-.08";
      break;
    case "Inserir Anúncio": 
      d[0] = "M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z";
      break;
    case "Notificações":
      d[0] = "M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.63-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.64 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2zm-2 1H8v-6c0-2.48 1.51-4.5 4-4.5s4 2.02 4 4.5v6z";
      break;
    case "Chat":
      d[0] = "M8.463 18.389a.75.75 0 0 1 .575.042 7.632 7.632 0 0 0 3.462.819 7.751 7.751 0 0 0 6.93-4.288 7.63 7.63 0 0 0 .82-3.46l.001-.46C20.034 7.106 16.893 3.965 13 3.75h-.502a7.633 7.633 0 0 0-3.463.82 7.75 7.75 0 0 0-4.285 6.932 7.63 7.63 0 0 0 .82 3.46.75.75 0 0 1 .042.575l-1.426 4.277 4.277-1.425zm12.308-2.754a9.25 9.25 0 0 1-8.269 5.115 9.13 9.13 0 0 1-3.854-.842l-5.41 1.804a.75.75 0 0 1-.95-.95l1.804-5.41A9.128 9.128 0 0 1 3.25 11.5a9.249 9.249 0 0 1 5.112-8.27 9.128 9.128 0 0 1 4.138-.98l.541.001c4.698.26 8.449 4.01 8.709 8.749v.5a9.127 9.127 0 0 1-.98 4.135z";
      break;
    case "Favoritos":
      d[0] = "M16.5 3c-1.74 0-3.41.81-4.5 2.09C10.91 3.81 9.24 3 7.5 3 4.42 3 2 5.42 2 8.5c0 3.78 3.4 6.86 8.55 11.54L12 21.35l1.45-1.32C18.6 15.36 22 12.28 22 8.5 22 5.42 19.58 3 16.5 3zm-4.4 15.55l-.1.1-.1-.1C7.14 14.24 4 11.39 4 8.5 4 6.5 5.5 5 7.5 5c1.54 0 3.04.99 3.57 2.36h1.87C13.46 5.99 14.96 5 16.5 5c2 0 3.5 1.5 3.5 3.5 0 2.89-3.14 5.74-7.9 10.05z";
      break;
    case "Minha Conta":
      d[0] = "M20.75 21v-2A4.75 4.75 0 0 0 16 14.25H8A4.75 4.75 0 0 0 3.25 19v2a.75.75 0 1 0 1.5 0v-2A3.25 3.25 0 0 1 8 15.75h8A3.25 3.25 0 0 1 19.25 19v2a.75.75 0 1 0 1.5 0zM12 11.75a4.75 4.75 0 1 1 0-9.5 4.75 4.75 0 0 1 0 9.5zm0-1.5a3.25 3.25 0 1 0 0-6.5 3.25 3.25 0 0 0 0 6.5z";
      break;
    default:
      d[0] = "M13.06 12l5.47 5.47a.75.75 0 0 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 1.06-1.06L12 10.94l5.47-5.47a.75.75 0 0 1 1.06 1.06L13.06 12z";
  }

  return <>
    <Svg viewBox="0 0 40 40"  width="30" height="30" >
      {d.map((srcPath, index) => <Path key={index} d={srcPath}
       {...name !== "Anúncios"? { transform:"translate(1.75,1.5)", scaleX:1.5, scaleY:1.5,  fill: focused? "orange": "#444"} :  
        {fill: focused? olxLogoColors[index]: "#444" } }  />)}
    </Svg>
  </>
}

const screenOptions = ({ route }) => ({
  drawerIcon: ({ focused, color, size }) => {  
    console.log(focused )
    const Icon = setIcon(route.name, color, size, focused);

    return Icon;
  }
})


const Drawer = createDrawerNavigator();
const Routes = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator 
      screenOptions={screenOptions}
      drawerContent={
        props => {
          console.log("valor de props: ------> ", props);
         return <>
          <View style={{ paddingTop: StatusBar.currentHeight, backgroundColor: "#6D0AD6" }}>
            <View  style={{paddingVertical: 25,justifyContent: "center", flexDirection: "row", alignItems: "center"}} >  
              <Svg width="35" height="35" viewBox="0 0 24 24" style={{ marginRight: 7.5 }} >
                <Path fill="#FFF" d="M20.75 21v-2A4.75 4.75 0 0 0 16 14.25H8A4.75 4.75 0 0 0 3.25 19v2a.75.75 0 1 0 1.5 0v-2A3.25 3.25 0 0 1 8 15.75h8A3.25 3.25 0 0 1 19.25 19v2a.75.75 0 1 0 1.5 0zM12 11.75a4.75 4.75 0 1 1 0-9.5 4.75 4.75 0 0 1 0 9.5zm0-1.5a3.25 3.25 0 1 0 0-6.5 3.25 3.25 0 0 0 0 6.5z"/>
              </Svg>

              <View style={{flexDirection: "column", marginLeft: 7.5}} >
                <Text style={{fontSize: 16, color: "#FFFFFF"}}>Acesse sua conta agora!</Text>
                <Text style={{fontSize: 13, color: "#FFFFFF"}}>Clique aqui</Text>

              </View>
            </View>
          </View>
          <DrawerItemList {...props} activeTintColor="#EE8101" 
            itemStyle={{ backgroundColor: "#FFF" }} 
          />
        </>
        }
      }>
        <Drawer.Screen name="Anúncios" component={HomeStack} options={{

          
        }} />

        <Drawer.Screen name="Inserir Anúncio" component={InsertADStack} options={{

          
        }} />

        <Drawer.Screen name="Notificações" component={NotificationStack} />
        <Drawer.Screen name="Chat" component={ChatStack} />
        <Drawer.Screen name="Favoritos" component={FavoritesStack} />
        <Drawer.Screen name="Minha Conta" component={ProfileStack} />
      </Drawer.Navigator>
    </NavigationContainer>
  )
}

export default () => (
  <>
    <StatusBar  
    
    translucent
    backgroundColor="rgba(0, 0, 0, 0.20)"
    animated/>

    <Routes />
  </>
);