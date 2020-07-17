import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, Dimensions, StyleSheet } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import api from '../../services/api';

const screen = Dimensions.get("screen").width;

const Anuncio = props => {
  const { item, end, navigate } = props;

  return (
    <View 
      onTouchEnd={() => navigate('Produto', {product: item})}
      style={[
        end ? { marginBottom: 95 } : undefined, {
        height: 130, flexDirection: "row", backgroundColor: "#FFF",
        marginTop: 7.5,
        marginHorizontal: 5,
        borderRadius: 5, overflow: "hidden"
      }]} >
      <View style={{ width: 125, backgroundColor: '#' + (Math.random() * 0xFFFFFF << 0).toString(16) }} />

      <View style={{ flexDirection: "column", justifyContent: "space-between", padding: 15 }} >
        <Text style={{ fontSize: 14, fontWeight: "100", }}>{item.title}</Text>
        <Text style={{ fontSize: 17, fontWeight: "600" }}>{item.price? 'R$ ' + item.price: ''}</Text>
        <Text style={{ fontSize: 12 }}>{item.createdAt}</Text>
      </View>
    </View>
  );
}

export default props => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const loadProducts = async () => {
      const res = await api.get('products');
      console.log(res.data);

      setProducts(res.data);
    }

    loadProducts();
  }, []);

  const { navigation } = props;
  
  return (
    <>
      <View style={{
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
      </View>

      <FlatList 
        style={{ backgroundColor: "#F2F2F2" }}
        keyExtractor={(item) => item._id}
        data={products} renderItem={(item, index) => < Anuncio {...navigation} {...item} end={item.index === products.length - 1 ? true : false}  />}
      />

      <View 
        onTouchEnd={() => navigation.navigate('Inserir Anúncio')}

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
      </View>

    </>
  );
}

const styles = StyleSheet.create({
  filterLabel: {
    color: "#6210CE",
    fontSize: 18,
  },
});