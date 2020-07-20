import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';

import { baseURL } from '../../services/api';

import { onSignIn } from '../../services/auth';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { SignIn } from '../actions';

import axios from 'axios';

import { useDropDown } from '../../contexts';

const checkEmpty = obj => {
  const errors = [];

  for (let elem in obj)
    if(typeof obj[elem] === 'object' && !obj[elem].length || !obj[elem]){
      errors.push({ 
        message: '\''+ elem +'\'' + ' is empty',
        label: elem,
      });   
    }

  if(!errors.length) 
    return false;
  
  return errors;
}

const SignUp = props => {

  const { navigation, SignIn } = props;

  const { ref } = useDropDown();

  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [number, setNumber] = useState('');
  
  const [emptyField, setEmptyField] = useState(null);

  async function handleSubmit() {
    
    const empty = checkEmpty({ name, username, email, password, number });

    if(!empty) {
      const res = await axios.post(`${baseURL}auth/cadastro`, {
        name,
        username,
        email,
        password,
        number,
      })
      .then(async res => {
        const { user, token } = res.data;

        await onSignIn(token).then(
          () => {
            SignIn(user);

            ref
            .current
            .alertWithType("success", "Sucesso!", 'Conta criada com sucesso :)');    

            navigation.navigate('Anúncios');
          }
        );
      })
      .catch(err => {

        const msg = err.response && err.response.data? err.response.data: undefined;
                
          ref
          .current
          .alertWithType("error", "Erro!", msg.error);    
        

        console.log(err.response.data)
      })
    } else {
      ref
      .current
      .alertWithType("error", "Erro!", empty.map(item => item.message + '\n'));
    }
  } 

  return (
  <SafeAreaView style={{ padding: 15 }} >
  {/* <View style={{ padding: 15, flex: 1, justifyContent: "center" }}> */}
  <View>

  <View>
    <Text style={{
      marginVertical: 10,
      color: "#555",
      fontWeight: "bold"
    }}>Nome</Text>
    <TextInput
      value={name}
      onChangeText={setName}
      style={{
        borderRadius: 5,
        borderColor: "#000",
        borderWidth: StyleSheet.hairlineWidth,
        padding: 10
      }}
    />
  </View>

  <View>
    <Text style={{
      marginVertical: 10,
      color: "#555",
      fontWeight: "bold"
    }}>Apelido</Text>
    <TextInput
      value={username}
      onChangeText={setUsername }
      style={{
        borderRadius: 5,
        borderColor: "#000",
        borderWidth: StyleSheet.hairlineWidth,
        padding: 10
      }}
    />
  </View>
  
  <View>
    <Text style={{
      marginVertical: 10,
      color: "#555",
      fontWeight: "bold"
    }}>E-mail</Text>
    <TextInput
      value={email}
      onChangeText={setEmail}
      style={{
        borderRadius: 5,
        borderColor: "#000",
        borderWidth: StyleSheet.hairlineWidth,
        padding: 10
      }}
    />
  </View>

  <View>
    <View style={{
      marginVertical: 10,

      flexDirection: "row",
    }} >
      <Text style={{
        color: "#555", fontWeight: "bold"
      }}>Senha</Text>
    </View>
    <TextInput
      value={password}
      secureTextEntry={true}
      onChangeText={setPassword}
      style={{
        borderRadius: 5,
        borderColor: "#000",
        borderWidth: StyleSheet.hairlineWidth,
        padding: 10
      }}
    />
  </View>

  <View>
    <Text style={{
      marginVertical: 10,
      color: "#555",
      fontWeight: "bold"
    }}>Numero de telefone (somente números) </Text>
    <TextInput
      value={number}
      onChangeText={setNumber}
      style={{
        borderRadius: 5,
        borderColor: "#000",
        borderWidth: StyleSheet.hairlineWidth,
        padding: 10
      }}
    />
  </View>

  <View style={{ marginVertical: 10 }}>
    <TouchableOpacity 
      onPress={handleSubmit}
      style={{
        borderRadius: 25,
        justifyContent: "center", flexDirection: "row", alignItems: "center", padding: 15, backgroundColor: "#F88323"
      }} 
    >
      <Text style={{ color: "#FFF", fontSize: 17 }}>Cadastre-se</Text>
    </TouchableOpacity>
  </View>
</View>
</SafeAreaView>
);
}

const mapDispatchToProps = dispatch => bindActionCreators({
  SignIn
}, dispatch);

export default connect(undefined, mapDispatchToProps)(SignUp);