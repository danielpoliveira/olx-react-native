import moment from 'moment';

import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import { useDropDown } from '../../contexts';

import api from '../../services/api';

moment.updateLocale('pt-br', {
  months:   ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
  weekdays: ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado']
});

const Anuncio = props => {
  const { item, end, navigate, index } = props;


	const { ref } = useDropDown();

  const handleRemoveFavorite = async () => {
  	

  	const res = await api.delete(`favorite/${item.productId._id}`)
  	.then(res => {


			ref.current.alertWithType("success", "Sucesso!", "Produto removido dos favoritos :)");

  	})
  	.catch(err => {
			ref.current.alertWithType("error", "Erro!", "Não foi possivel remover o produto dos favoritos");  		
  	})
  }

  return (
    <View 

    	//onTouchEnd={() => navigate('Produto', {product: item.productId})}
      style={[
       // end ? { marginBottom: 95 } : undefined, 
       {
        height: 130, flexDirection: "row", backgroundColor: "#FFF",
        marginTop: 7.5,
        marginHorizontal: 5,
        borderRadius: 5, overflow: "hidden"
      }]} >

      {  item.productId && item.productId.photos && item.productId.photos.length
      ?
        <Image style={{ width: 125, height: 125}} source={{uri: `http://192.168.0.42:3333/images/${item.photos[0]}/`}} />
      :
        <View style={{ width: 125, backgroundColor: '#' + (Math.random() * 0xFFFFFF << 0).toString(16) }} />
      }

      <View style={{ flexDirection: "row", flex:1,justifyContent: "space-between", alignItems: "center", padding: 15 }} >
        
        <View style={{ height: "100%", flexDirection: "column", justifyContent: "space-between"}} >
        	<Text style={{ fontSize: 14, fontWeight: "100", }}>{item.productId.title}</Text>
        	<Text style={{ fontSize: 17, fontWeight: "600" }}>{item.productId.price? 'R$ ' + item.productId.price: ''}</Text>
    		<Text style={{ fontSize: 12 }}>{moment(item.createdAt).format("D [de] MMMM [às] HH:mm")}</Text>
	  	</View>	

	  	<TouchableOpacity onPress={handleRemoveFavorite} >
	  		<MaterialIcons style={{marginHorizontal: 5}} name="delete" size={20} color="#666" />	
	  	</TouchableOpacity>
        {/*<Text style={{ fontSize: 12 }}>{moment(item.createdAt).format("D [de] MMMM")}</Text>*/}
      </View>
    </View>
  );
}

export default props => {
  const [products, setProducts] = useState([]);

  const { navigation } = props;

  useFocusEffect(
    React.useCallback(() => {
      const loadFavorites = async () => {
        const res = await api.get('favorites');
  
        setProducts(res.data);
      }
  
      loadFavorites();
    }, [])
  );

	return (<View>   

    <FlatList style={{ backgroundColor: "#F2F2F2" }}
    	keyExtractor={(item, index) => index.toString()}
    	data={products} 
		renderItem={(item, index) => < Anuncio {...item} {...navigation} />}
	/>

  </View>);
}