import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, ScrollView, Dimensions, StyleSheet, Image } from 'react-native';
import _ from 'lodash';
import Svg, {Path} from 'react-native-svg';

import api from '../../services/api';

const screen = Dimensions.get("screen").width;

export default ({ route }) => {
  if(!route)
    return null;
  
  const { product } = route.params;
  const { userId  } = product;

  const [ user, setUser ] = useState({}); 
  const [ location, setLocation ] = useState({});

  useEffect(() => {
    async function loadUser() {
      const res = await api.get(`/user/${userId}`);

      setUser(res.data.user);
    }

    async function loadLocation() {
      const res = await api.get(`https://viacep.com.br/ws/${product.cep}/json/`);

      setLocation(res.data);
    }

    loadLocation();
    loadUser();
  }, []);

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
            paddingVertical: 20}} 
          >
            <Text style={{fontSize: 19, color: "#333"}}>{product.title}</Text>
            <Text style={{marginVertical: 10, color: "#777"}}>Publicado em {product.createdAt}</Text>
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
              {product.description}
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
            <View 
              style={{
                paddingVertical:10,
                flexDirection: "column"
              }} 
            >     
              <View 
                style={{
                  marginVertical:5,
                  flexDirection: "row" 
                }}
              >
                <Text 
                  style={{
                    color: "#444",
                    width: 180
                  }}>Novo/Usado</Text>
                <Text>{product.newProduct? 'Novo' : 'Usado'}</Text>
              </View>
              
              { product.type &&
                <View style={{
                  marginVertical:5,
                  flexDirection: "row"}} >
                  <Text style={{
                    color: "#444",
                    width: 180}}>Tipo</Text>
                  <Text>{product.type}</Text>
                </View>
              }

              {
                product.details && _.isEmpty(!product.details) && 
                Object.entries(product.details).map((item, index) => 
                  <View key={index} style={{ marginVertical:5, flexDirection: "row" }} >
                    <Text 
                      style={{
                        color: "#444",
                        width: 180
                      }}>{item[0]}</Text>
                    { 
                      typeof item[1] === 'boolean'? 
                      <Text>{item[1] ? 'Sim' : 'Não'}</Text>:

                      typeof item[1] === 'object'? 
                        <View style={{flexDirection: "column"}} >
                          { item[1].map((value, index) => <Text key={index} >{value}</Text>) }
                        </View>
                      :
                        <Text style={{ flex: 1, flexWrap: 'wrap'}}>{item[1]}</Text>
                    }
                  </View>    
                )
              }

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
                <Text>{location.cep}</Text>
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
                <Text>{location.localidade}</Text>
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
                <Text>{location.bairro}</Text>
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

            <Text>{user.name}</Text>
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