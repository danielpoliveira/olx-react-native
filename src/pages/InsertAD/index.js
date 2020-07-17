import React, { useState } from 'react';
import {
  StyleSheet, 
  SafeAreaView, 
  ScrollView, 
  View, 
  Text, 
  TextInput,
  TouchableOpacity,
} from 'react-native';

import CheckBox from '@react-native-community/checkbox';

import Icons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { SignIn } from '../actions';

const InsertAD = props => {

  const { navigation, route, logged } = props;

  if(!logged){
    navigation.navigate('Login');
    return null;
  }
  
  const [toggleCheckBox, setToggleCheckBox] = useState(false);

  const selected = route.params ? route.params.selected : undefined;

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={{ backgroundColor: "#dfdfdf" }} >
          <View style={{
            height: 250, margin: 20,
            justifyContent: "center", alignItems: "center",
            borderColor: "#6D0AD6", borderStyle: "dashed", borderWidth: 1, borderRadius: 8
          }}
          >
            <View style={{ flexDirection: "column", alignItems: "center" }} >

              <Icons name="camera-outline" size={45} color="#6D0AD6" />
              <Text style={{

                color: "#6D0AD6", fontWeight: "700"
              }} >Incluir Fotos</Text>
              <Text>0 de 6 adicionados</Text>
            </View>
          </View>
        </View>

        <View style={{ marginHorizontal: 20, marginBottom: 20 }}>
          <View>
            <Text style={{
              marginVertical: 10,
              fontSize: 16
            }} >Titulo do anúncio*</Text>

            <TextInput
              style={{
                paddingHorizontal: 15,
                borderRadius: 8,
                borderWidth: StyleSheet.hairlineWidth,
                borderColor: "#0000008a"
              }}
              placeholder="Ex: Samsung S9 novo na caixa"
            />
          </View>

          <View style={{}} >
            <Text style={{
              marginVertical: 10,
              fontSize: 16
            }} >Descrição*</Text>

            <TextInput
              style={{
                padding: 15,
                borderRadius: 8,
                borderColor: "#0000008a",
                fontSize: 15,
                borderWidth: StyleSheet.hairlineWidth,
              }}
              textAlignVertical="top"
              multiline
              numberOfLines={6}
              placeholder="Ex: Smartphone Samsung Galaxy S9 com 128gb de memória, com caixa, todos os cabos e sem marca de uso ."
            />
          </View>

          <View style={{}}>
            <Text style={{
              marginVertical: 10,
              fontSize: 16
            }} >Categoria*</Text>

            <TouchableOpacity onPress={() => navigation.navigate('Categorias')} >
              <View style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",

                borderWidth: StyleSheet.hairlineWidth,
                borderColor: "#0000008a",
                padding: 7.5,
                paddingLeft: 15,
                borderRadius: 8
              }} >
                <Text style={{ color: "#aaa" }}>
                  {selected ?
                    selected : "Selecione uma nova categoria"
                  }
                </Text>
                <MaterialIcons name="keyboard-arrow-right" size={30} color="#777" />
              </View>
            </TouchableOpacity>
          </View>

          <View>
            <Text style={{ marginVertical: 10, fontSize: 16 }} >CEP*</Text>

            <TextInput
              style={{
                width: 160,
                paddingHorizontal: 15,
                borderWidth: StyleSheet.hairlineWidth,
                borderColor: "#0000008a",
                borderRadius: 8,
              }}

              placeholder="Seu CEP aqui"
            />
          </View>

          <View style={{
            flexDirection: "row",
            alignItems: "center",
          }}
          >
            <CheckBox
              tintColors={{ true: "#6D0AD6", false: "#AAAAAA" }}
              value={toggleCheckBox}
              onValueChange={() => toggleCheckBox ? setToggleCheckBox(false) : setToggleCheckBox(true)}
              style={{
                marginVertical: 10,
                marginLeft: -7,
                padding: 0
              }}
            />

            <Text style={{ fontWeight: "700" }}>Ocultar meu telefone neste anúncio</Text>
          </View>

          <TouchableOpacity
            style={{
              backgroundColor: "#F88323",
              justifyContent: "center",
              alignItems: "center",
              padding: 15,
              borderRadius: 25,
            }}
          >
            <Text style={{ color: "#FFFFFF" }}> Enviar anúncio</Text>
          </TouchableOpacity>

        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const mapStateToProps = state => ({
  logged: state.app.logged
});

const mapDispatchToProps = dispatch => bindActionCreators({
  SignIn,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(InsertAD);