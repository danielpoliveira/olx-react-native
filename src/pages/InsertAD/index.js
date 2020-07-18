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

import _ from 'lodash'

import {Picker} from '@react-native-community/picker';

//import {  } from '@react'
//import {Picker} from '@react-native-community/picker';

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

  const selected = route.params ? route.params.selected : undefined;
  const subcategory = 
    selected && selected.subcategory? selected.subcategory: undefined;

  console.log()

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [categoria, setCategoria] = useState('');
  const [cep, setCep] = useState('');
  const [checkBox, setCheckBox] = useState(true);

  async function handleSubmit() {
    console.log('------------------------------------------------------------------------------')
    console.log(title)
    console.log(description)
    console.log(categoria)
    console.log(cep)
    console.log(checkBox? 'true': 'false');
    console.log('------------------------------------------------------------------------------')
  }

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
              onChangeText={setTitle}
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
              onChangeText={setDescription}
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
                  {
                  selected ?
                    selected.subcategory && !_.isEmpty(selected.subcategory)?
                      selected.subcategory.name
                    : 
                      selected.category
                  : 
                    "Selecione uma nova categoria"
                  }
                </Text>
                

                <MaterialIcons name="keyboard-arrow-right" size={30} color="#777" />
              </View>
            </TouchableOpacity>
            
          </View>

          {
            subcategory?

              <View style={{flexDirection: "column"}} >
                {Object.entries(subcategory).map((item, index) =>
                  
                  item[0] !== 'name'? 
                  (<View key={index} style={{flexDirection: "column"}} >
                    <Text style={{
                      textTransform: 'capitalize',
                      marginVertical: 10,
                      fontSize: 16,
                      
                    }}>{item[0].replace(/[^a-z0-9-]/g, ' ')}</Text>
                    
                    {typeof item[1] === "object"? 

                      item[0] !== 'estado_financeiro'  && item[0] !== 'opcionais' && item[0] !== 'options'? 
                      <View 
                        style={{
                          borderColor: "#666",
                          borderWidth: StyleSheet.hairlineWidth,
                          borderRadius: 5,
                          paddingLeft: 10,
                        }} 
                      >
                      <Picker style={{ height: 50, width: '100%'}} >
                      {item[1].map((value, index) => 
                        <Picker.Item key={index} label={value} value={value} />    
                      )}
                        {/* <Picker.Item label={'test'} value={1} />     */}
                      </Picker>
                      </View>
                      :

                      item[0] === 'estado_financeiro' || item[0] === 'opcionais' ?

                        <View>
                        { item[1].map((value, index) => 
                          <View key={index} style={{flexDirection: "row", alignItems: "center"}} >
                            <CheckBox />
                            <Text>{value }</Text>
                          </View>
                          
                          )
                        }
                        </View>  
                      
                      : 
                      
                      <View>
                        {item[1].map((value, index) => 
                          <View key={index} style={{flexDirection: "column", marginBottom: 10}}  >
                            <Text style={{fontSize: 16, textTransform: "capitalize", marginBottom: 5}} >{value.replace(/[^a-z0-9-]/g, ' ')}</Text>  
                            

                            <View 
                              style={{
                                borderWidth: StyleSheet.hairlineWidth,
                                borderColor: "#666",
                            
                                borderRadius: 5,  
                                paddingLeft: 10
                              }}  
                            >{ value === 'aceita_trocas' || value === 'unico_dono'?

                              <Picker style={{ height: 50, width: '100%'}}> 
                                <Picker.Item label={'Sim'} value={true} />
                                <Picker.Item label={'Não'} value={false} />
                              </Picker>
                              
                              :
                              
                              <TextInput />
                            }
                          </View>
                            
                            
                          </View>
                        )}
                      </View>

                      
                          




                      // <View 
                      //   style={{
                      //     borderColor: "#666",
                      //     borderWidth: StyleSheet.hairlineWidth,
                      //     borderRadius: 5,
                      //     paddingLeft: 10,
                      //   }} 
                      // >
                      //   <Picker style={{ height: 50, width: '100%'}} >
                      //   {item[1].map(value => 
                      //     <Picker.Item label={value} value={value} />    
                      //   )}
                      //     {/* <Picker.Item label={'test'} value={1} />     */}
                      //   </Picker>
                      // </View>
                      :
                      <Text>{item[1]}</Text>
                    }
                    
                  </View> )
                  : undefined
                )}
              </View>
            : 
            undefined




          }

          <View>
            <Text style={{ marginVertical: 10, fontSize: 16 }} >CEP*</Text>

            <TextInput
              onChangeText={setCep}
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
              value={checkBox}
              onValueChange={() => checkBox ? setCheckBox(false) : setCheckBox(true)}
              style={{
                marginVertical: 10,
                marginLeft: -7,
                padding: 0
              }}
            />

            <Text style={{ fontWeight: "700" }}>Ocultar meu telefone neste anúncio</Text>
          </View>

          <TouchableOpacity

            onPress={handleSubmit}

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