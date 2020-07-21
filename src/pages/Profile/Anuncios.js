import moment from 'moment';

import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image } from 'react-native';

import { useDropDown } from '../../contexts';

import api, { baseURL } from '../../services/api';
import { useFocusEffect } from '@react-navigation/native';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';


import { connect } from 'react-redux';

moment.updateLocale('pt-br', {
  months: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
  weekdays: ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado']
});

const Anuncios = props => {
  const [products, setProducts] = useState([]);

  const { navigation, user } = props;

  console.log('valor de user ', user)

  const Anuncio = props => {
    const { item, end, navigate, index } = props;

    const { ref } = useDropDown();

    console.log(props.item.photos)

    const handleRemoveFavorite = async () => {

      console.log(user._id)
      const res = await api.delete(`product/${item._id}`)
        .then(res => {
          setProducts(products.filter(product => product._id !==  item._id))
          ref.current.alertWithType("success", "Sucesso!", "Seu anúncio foi removido da OLX :)");
        })
        .catch(err => {

          console.log(err.response.data)
          ref.current.alertWithType("error", "Erro!", "Não foi possivel remover o produto dos favoritos");
        })

      console.log('aqui');
    }

    return (
      <TouchableOpacity
        onPress={() => navigate('Produto', {product: item})}
        style={[
           end ? { marginBottom: 30} : undefined, 
          {
            height: 130, flexDirection: "row", backgroundColor: "#FFF",
            marginTop: 7.5,
            marginHorizontal: 5,
            borderRadius: 5, overflow: "hidden"
          }]} >

        {item && item.photos && item.photos.length
          ?
          <Image style={{ width: 125, height: 125 }} source={{ uri: `${baseURL}/images/${item.photos[0]}/` }} />
          :
          <View style={{ width: 125, backgroundColor: '#' + (Math.random() * 0xFFFFFF << 0).toString(16) }} />
        }

        <View style={{ flexDirection: "row", flex: 1, justifyContent: "space-between", alignItems: "center", padding: 15 }} >

          <View style={{ height: "100%", maxWidth: 220,flexDirection: "column", justifyContent: "space-between" }} >
            <Text style={{ fontSize: 14, fontWeight: "100", }}>{item.title}</Text>
            <Text style={{ fontSize: 17, fontWeight: "600" }}>{item.price ? 'R$ ' + item.price : ''}</Text>
            <Text style={{ fontSize: 12 }}>{moment(item.createdAt).format("D [de] MMMM [às] HH:mm")}</Text>
          </View>

          <TouchableOpacity onPress={handleRemoveFavorite} >
            <MaterialIcons style={{ marginHorizontal: 5 }} name="delete" size={20} color="#666" />
          </TouchableOpacity>
          {/*<Text style={{ fontSize: 12 }}>{moment(item.createdAt).format("D [de] MMMM")}</Text>*/}
        </View>
      </TouchableOpacity>
    );
  }

  useFocusEffect(
    React.useCallback(() => {
      const loadMyProducts = async () => {
        const res = await api.get(`products/user/${user._id}`) 

        console.log(res.data)

        setProducts(res.data);
      }

      loadMyProducts();
    }, [])
  );

  return (
    <View>
      <FlatList style={{ backgroundColor: "#F2F2F2" }}
      keyExtractor={(item, index) => index.toString()}
      data={products}
      renderItem={(item, index) => 
      < Anuncio {...item} {...navigation} 
            end={item.index === products.length - 1 ? true : false}
      />}
    />
    </View>
  );
}

const mapStateToProps = state => ({
  user: state.app.user,
});

export default connect(mapStateToProps, undefined)(Anuncios);