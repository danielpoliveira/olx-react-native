import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

import api from '../../services/api';
import { onSignIn } from '../../services/auth';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { SignIn } from '../actions';

const Login = props => {
  const { navigation, SignIn } = props;
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function handleSubmit() {
    try {
      const res = await api.post('/auth/entrar', {
        email,
        password,
      });

      await onSignIn(res.data.token).then(
        () => {
          SignIn()
          navigation.navigate('Anúncios')
        }
      );
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <View style={{ padding: 15, flex: 1, justifyContent: "center" }}>

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

          flexDirection: "row", justifyContent: "space-between"
        }} >
          <Text style={{
            color: "#555", fontWeight: "bold"
          }}>Senha</Text>
          <Text style={{ color: "#6D0AD6", fontWeight: "bold" }}>Esqueceu sua senha?</Text>
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

      <View style={{ marginVertical: 10 }}>
        <TouchableOpacity 
          onPress={handleSubmit}
          style={{
            borderRadius: 25,
            justifyContent: "center", flexDirection: "row", alignItems: "center", padding: 15, backgroundColor: "#F88323"
          }} 
        >
          <Text style={{ color: "#FFF", fontSize: 17 }}>Entrar</Text>
        </TouchableOpacity>
      </View>

      <View style={{
        padding: 30,
        marginTop: 15,
        borderTopWidth: StyleSheet.hairlineWidth,
        borderColor: "#000",

        justifyContent: "center", alignItems: "center",
      }}>
        <Text>Não tem uma conta? <Text style={{ color: "#6D0AD6", fontWeight: "bold" }}>Cadastre-se</Text></Text>
      </View>
    </View>
  );
}

const mapDispatchToProps = dispatch => bindActionCreators({
  SignIn
}, dispatch);

export default connect(undefined, mapDispatchToProps)(Login);

// export default Login;