import _ from 'lodash';
import moment from 'moment';

import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, ScrollView, Dimensions, StyleSheet, Image, YellowBox, TouchableOpacity } from 'react-native';
import Svg, { Path } from 'react-native-svg';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import api from '../../services/api';

import { useDropDown } from '../../contexts';

import ImageSlider from 'react-native-image-slider';

import { baseURL } from '../../services/api';

YellowBox.ignoreWarnings(['Warning: componentwillmount has been renamed and is not recommended for use.']);

moment.updateLocale('pt-br', {
  months: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
  weekdays: ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado']
});

const screen = Dimensions.get("screen").width;

export default ({ navigation, route }) => {
  if (!route)
    return null;

  const { ref } = useDropDown();

  const onFavoritePressed = () => {
    setFavoriteIcon({ name: favoriteIcon.name === "favorite" ? "favorite-border" : "favorite" });
  }

  navigation.setOptions({
    headerRight: () =>
      (<View style={{ flexDirection: "row", paddingRight: 12.5 }} >
        <TouchableOpacity style={{ marginLeft: 10 }} onPress={handleFavorite} >
          <MaterialIcons {...favoriteIcon} size={25} color="#FFF" />
        </TouchableOpacity>
      </View>)
  });

  const { product } = route.params;
  const { userId } = product;

  const [user, setUser] = useState({});
  const [location, setLocation] = useState({});
  const [favorite, setFavorite] = useState(null);
  const [favoriteIcon, setFavoriteIcon] = useState({ name: "favorite-border" });

  const handleFavorite = () => {
    if (!_.isEmpty(favorite)) {
      const res = api.delete(`/favorite/${product._id}`).then(value => {
        setFavoriteIcon({ name: "favorite-border" });

        setFavorite(null);

        ref.current.alertWithType("success", "Sucesso!", "Produto removido dos favoritos :)");
      })
    } else {
      const res = api.post(`/favorite/${product._id}`).then(value => {
        setFavoriteIcon({ name: "favorite" });

        setFavorite(value.data.favorite);

        ref.current.alertWithType("success", "Sucesso!", "Produto adicionado aos favoritos :)");
      });
    }
  }

  useEffect(() => {
    async function loadUser() {
      const res = await api.get(`/user/${userId}`);

      setUser(res.data.user);
    }

    async function loadFavorite() {
      const res = await api.get(`/favorite/${product._id}`);
      if (res.data) {
        setFavorite(res.data);
        console.log(res.data)
        setFavoriteIcon({ name: "favorite" });
      }
    }

    async function loadLocation() {
      const res = await api.get(`https://viacep.com.br/ws/${product.cep}/json/`);

      setLocation(res.data);
    }

    loadFavorite();
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
          {product.photos && product.photos.length ?
            <ImageSlider images={

              product.photos.map(photo => {
                //return `http://192.168.0.42:3333/images/${photo}`
                return `${baseURL}/images/${photo}`
              })
            } style={{ height: 270, width: 270 }} />

            /*<Image
              style={{ height: 270, width: 270 }}
              source={{ uri: `http://192.168.0.42:3333/images/${product.photos[0]}` }}
            />*/
            // <Image
            //   style={{ height: 270, width: 270 }}
            //   source={{ uri: `http://192.168.0.42:3333/images/${product.photos[0]}` }}
            // />
            :
            <View
              style={{ height: 270, width: 150, backgroundColor: "gray" }}

            />
          }
        </View>

        <View>
          <View style={{
            marginHorizontal: 20,
            borderBottomWidth: StyleSheet.hairlineWidth,
            borderColor: "#777",
            paddingVertical: 20
          }}
          >
            <Text style={{ fontSize: 19, color: "#333" }}>{product.title}</Text>
            <Text style={{ marginVertical: 10, color: "#777" }}>Publicado em {moment(product.createdAt).format("D [de] MMMM [às] HH:mm")}</Text>
          </View>

          <View
            style={{
              marginHorizontal: 20,
              borderBottomWidth: StyleSheet.hairlineWidth,
              borderColor: "#777",
              paddingVertical: 20
            }}
          >
            <Text style={{ fontSize: 19, color: "#333" }}>Descrição</Text>
            <Text style={{ marginVertical: 10, color: "#444" }} >
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
            <Text style={{ fontSize: 19, color: "#333" }}>Detalhes</Text>
            <View
              style={{
                paddingVertical: 10,
                flexDirection: "column"
              }}
            >
              <View
                style={{
                  marginVertical: 5,
                  flexDirection: "row"
                }}
              >
                <Text
                  style={{
                    color: "#444",
                    width: 180
                  }}>Novo/Usado</Text>
                <Text>{product.newProduct ? 'Novo' : 'Usado'}</Text>
              </View>

              {product.type &&
                <View style={{
                  marginVertical: 5,
                  flexDirection: "row"
                }} >
                  <Text style={{
                    color: "#444",
                    width: 180
                  }}>Tipo</Text>
                  <Text>{product.type}</Text>
                </View>
              }

              {
                product.details && _.isEmpty(!product.details) &&
                Object.entries(product.details).map((item, index) =>
                  <View key={index} style={{ marginVertical: 5, flexDirection: item[0] !== 'options' ? "row" : "column" }} >
                    <Text
                      style={{
                        color: "#444",
                        width: 180, textTransform: "capitalize"
                      }}>{item[0].replace(/[^a-z0-9-]/g, ' ')}</Text>
                    {

                      item[0] !== 'options' ?

                        typeof item[1] === 'boolean' ?
                          <Text>{item[1] ? 'Sim' : 'Não'}</Text> :

                          typeof item[1] === 'object' ?
                            <View style={{ flexDirection: "column" }} >
                              {item[1].map((value, index) => <Text key={index} >{value}</Text>)}
                            </View>
                            :
                            <Text style={{ flex: 1, flexWrap: 'wrap' }}>{item[1]}</Text>
                        :
                        item[1].map((aux, index) => {

                          return <View key={index}>
                            {Object.entries(aux).map((aux2, index) =>
                              <View key={index} style={{ flexDirection: "row", marginVertical: 3, }} >
                                <Text style={{ width: 180, textTransform: "capitalize" }} >{aux2[0].replace(/[^a-z0-9-]/g, ' ')}</Text>
                                <Text>{aux2[1] === 'false' ? 'Não' : aux2[1] === 'true' ? 'Sim' : aux2[1]}</Text>
                              </View>
                            )}
                          </View>
                        })
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
            <Text style={{ fontSize: 19, color: "#333" }}>Localização</Text>
            <View style={{
              paddingVertical: 10,
              flexDirection: "column"
            }} >
              <View
                style={{
                  marginVertical: 5,
                  flexDirection: "row"
                }}
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
                  marginVertical: 5,
                  flexDirection: "row"
                }}
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
                  marginVertical: 5,
                  flexDirection: "row"
                }}
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
            <Text style={{ fontSize: 19, color: "#333" }}>Anunciante</Text>

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

      <TouchableOpacity

        onPress={() => navigation.navigate('Chat')}

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
          marginRight: 3
        }} width="30" height="30" >
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
      </TouchableOpacity>
    </SafeAreaView>
  );
}