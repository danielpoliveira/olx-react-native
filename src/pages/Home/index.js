import moment from 'moment';

import React, { useState } from 'react';
import { View, Text, Image, Dimensions, Alert, TouchableOpacity } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { useFocusEffect } from '@react-navigation/native';

import { baseURL } from '../../services/api';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

moment.updateLocale('pt-br', {
  months: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
  weekdays: ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado']
});

import api from '../../services/api';

import { useDropDown } from '../../contexts';

const screen = Dimensions.get("screen").width;

const Anuncio = props => {
  const { item, end, navigate } = props;

  return (
    <TouchableOpacity
      onPress={() => navigate('Produto', { product: item })}
      style={[
        end ? { marginBottom: 95 } : undefined, {
          height: 130, flexDirection: "row", backgroundColor: "#FFF",
          marginTop: 7.5,
          marginHorizontal: 5,
          borderRadius: 5, overflow: "hidden"
        }]} >

      {item.photos && item.photos.length
        ?
        <Image style={{ width: 125, height: 125 }} source={{ uri: `${baseURL}/images/${item.photos[0]}/` }} />
        :
        <View style={{ width: 125, backgroundColor: '#' + (Math.random() * 0xFFFFFF << 0).toString(16) }} />
      }

      <View style={{ flexDirection: "column", justifyContent: "space-between", padding: 15 }} >
        <Text style={{ fontSize: 14, fontWeight: "100", }}>{item.title}</Text>
        <Text style={{ fontSize: 17, fontWeight: "600" }}>{item.price ? 'R$ ' + item.price : ''}</Text>
        <Text style={{ fontSize: 12 }}>{moment(item.createdAt).format("D [de] MMMM")}</Text>
      </View>
    </TouchableOpacity>
  );
}

export default props => {
  const [products, setProducts] = useState([]);

  const { ref } = useDropDown();

  useFocusEffect(
    React.useCallback(() => {
      const loadProducts = async () => {
        const res = await api.get('products')
          .then(res => setProducts(res.data))
          .catch(err => {
            ref.current.alertWithType("error", "Erro!", err.message);
          });
      }

      loadProducts();
    }, [])
  );

  const { navigation, route } = props;

  return (
    <>
      {/*<View style={{
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0,
        shadowRadius: 2,
        elevation: 5,

        backgroundColor: "#FFFFFF", width: "100%", flexDirection: "row", justifyContent: "space-between",
      }} >

        <View style={{ flex: 1, padding: 12.5, justifyContent: "center", alignItems: "center" }} >
          <Text style={styles.filterLabel} >DDD 98 - Regiã...</Text>
        </View>

        <View style={{
          flex: 1, padding: 10,
          borderLeftWidth: StyleSheet.hairlineWidth,
          borderRightWidth: StyleSheet.hairlineWidth,
          borderColor: "#bbb",
          justifyContent: "center", alignItems: "center"
        }} >
          <Text style={styles.filterLabel} >Categoria</Text>
        </View>

        <View style={{ flex: 1, padding: 10, justifyContent: "center", alignItems: "center" }} >
          <Text style={styles.filterLabel} >Filtros</Text>
        </View>
      </View>*/}


      <FlatList
        style={{ backgroundColor: "#F2F2F2" }}
        keyExtractor={(item) => item._id}
        data={products} renderItem={(item, index) => < Anuncio {...navigation} {...item} end={item.index === products.length - 1 ? true : false} />}
      />

      <TouchableOpacity
        onPress={() => navigation.navigate('Inserir Anúncio')}
        style={{
          width: 168, height: 60, backgroundColor: "#F18000",
          borderRadius: 35, position: "absolute", bottom: 17.5,
          left: screen / 2 - 85,
          flexDirection: "row",
          justifyContent: "center", alignItems: "center"
        }}
      >
        <MaterialIcons name="camera-alt" size={25} color="#FFFFFF" />
        <Text style={{ marginLeft: 5, fontSize: 17, color: "#FFFFFF" }} >Anunciar agora</Text>
      </TouchableOpacity>

    </>
  );
}
