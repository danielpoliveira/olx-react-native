import React from 'react';
import { View, Text, SafeAreaView, ScrollView, Dimensions, StyleSheet, Image } from 'react-native';

import Svg, {Path} from 'react-native-svg';

const screen = Dimensions.get("screen").width;

export default ({ route }) => {
  if(!route)
    return null;

  const { product } = route.params;

  console.log(product);
  return (
    <SafeAreaView>
      <ScrollView>
        <View 
          style={{
            height: 270,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#ddd"
          }} 
        >

        <Image 
          style={{height: 270, width: 150}}
          source={{uri: 'https://img.olx.com.br/images/58/581045309324385.jpg'}}
        />

        </View>
        
        <View>
          <View style={{ 
            marginHorizontal: 20,
            borderBottomWidth: StyleSheet.hairlineWidth,
            borderColor: "#777",
            paddingVertical: 20}} >
            <Text style={{fontSize: 19, color: "#333"}}>Moto z3 play apenas troca</Text>
            <Text style={{marginVertical: 10, color: "#777"}}>Publicado em 15/07 às 12:10</Text>
          </View>

          <View
            style={{
              marginHorizontal: 20,
              borderBottomWidth: StyleSheet.hairlineWidth,
              borderColor: "#777",
              paddingVertical: 20
            }} 
          >
            <Text style={{fontSize: 19, color: "#333"}}>Descrição</Text>
            <Text style={{marginVertical: 10, color: "#444"}} >
              Troco meu moto z3 play em outro celular obs eu não aceito j7 j5 G6 play G7 play e iPhone interessado celular em perfeito estado de conservação
            </Text>
          </View>

          <View 
            style={{
              marginHorizontal: 20,
              borderBottomWidth: StyleSheet.hairlineWidth,
              borderColor: "#777",
              paddingVertical: 20
            }} 
          >
            <Text style={{fontSize: 19, color: "#333"}}>Detalhes</Text>
            <View style={{
              paddingVertical:10,
               flexDirection: "column"}} >
              <View 
                style={{
                  marginVertical:5,
                  flexDirection: "row" }}
              >
                <Text 
                  style={{
                    color: "#444",
                    width: 180
                  }}>Novo/Usado</Text>
                <Text>Novo</Text>
              </View>
              
              <View style={{
                marginVertical:5,
                flexDirection: "row"}} >
                <Text style={{
                  color: "#444",
                  width: 180}}>Tipo</Text>
                <Text>Motorola e Lenovo</Text>
              </View>
            </View>
            
          </View>

          <View
            style={{
              marginHorizontal: 20,
              borderBottomWidth: StyleSheet.hairlineWidth,
              borderColor: "#777",
              paddingVertical: 20
            }} 
          >
            <Text style={{fontSize: 19, color: "#333"}}>Localização</Text>
            <View style={{
              paddingVertical:10,
               flexDirection: "column"}} >
              <View 
                style={{
                  marginVertical:5,
                  flexDirection: "row" }}
              >
                <Text 
                  style={{
                    color: "#444",
                    width: 180
                  }}>CEP</Text>
                <Text>65068593</Text>
              </View>
              <View 
                style={{
                  marginVertical:5,
                  flexDirection: "row" }}
              >
                <Text 
                  style={{
                    color: "#444",
                    width: 180
                  }}>Município</Text>
                <Text>São Luís</Text>
              </View>
              
              <View 
                style={{
                  marginVertical:5,
                  flexDirection: "row" }}
              >
                <Text 
                  style={{
                    color: "#444",
                    width: 180
                  }}>Bairro</Text>
                <Text>Vila Luizão</Text>
              </View>
            </View>
          </View>

          <View
            style={{
              marginHorizontal: 20,
              borderBottomWidth: StyleSheet.hairlineWidth,
              borderColor: "#777",
              paddingVertical: 20
            }} 
          >
            <Text style={{fontSize: 19, color: "#333"}}>Anunciante</Text>

            <View style={{
                backgroundColor: "#eaeaea", 
                marginTop: 15, 
                padding: 10,
                borderRadius: 5,
                marginBottom: 60,
              }} 
            >
              <Text>Lucianotiopepis</Text>
            </View>
          </View>     
        </View>
      </ScrollView>

      <View 
        style={{
          width: 300,
          position: "absolute",
          bottom: 15,
          left: screen / 2 - 150,
          borderRadius: 25,
          flexDirection: "row",
          backgroundColor: "#F88323", justifyContent: "center", alignItems: "center", 
          padding: 10
        }} 
      >
        <Svg style={{
          marginRight: 3}} width="30" height="30" >
          <Path
            fill="#FFF"
            transform="translate(3,3)"
            d="M7.31 17.75l-3.78 3.78A.75.75 0 012.25 21V5A2.75 2.75 0 015 2.25h14A2.75 2.75 0 0121.75 5v10A2.75 2.75 0 0119 17.75H7.31zm-3.56 1.44l2.72-2.72a.75.75 0 01.53-.22h12c.69 0 1.25-.56 1.25-1.25V5c0-.69-.56-1.25-1.25-1.25H5c-.69 0-1.25.56-1.25 1.25v14.19z"
          />
        </Svg>
        <Text style={{
                marginLeft: 3,
                color: "#FFF", 
                fontSize: 17
              }}
        >Chat</Text>
      </View>



    </SafeAreaView>
  );
}