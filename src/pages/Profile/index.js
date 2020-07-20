import React, { useEffect } from 'react';
import { View, Text } from 'react-native';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import { isLogged, clearToken } from '../../services/auth';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { SignIn, Loggout } from '../actions';

import { useDropDown } from '../../contexts';

const Profile = props => {
  const { navigation, logged, user } = props;

  if (!logged) {
    navigation.navigate('Login');
    return null;
  }

  const { ref } = useDropDown();

  async function handleLogout() {

    const token = await isLogged();

    if (token) {
      await clearToken();

      props.Loggout();

      navigation.navigate('Anúncios');

      ref
        .current
        .alertWithType("success", "Sucesso", 'Logout efetuado com exito :)');
    }

  }

  return (
    <View>
      <View style={{
        height: 180, backgroundColor: "#6D0AD6",
        flexDirection: "row",
        justifyContent: "center", alignItems: "center"
      }}>

        <View style={{
          flexDirection: "column",
          alignItems: "center",
        }}>
          <Text style={{ color: "#FFFFFF", fontSize: 19, fontWeight: "600" }}>{user.name}</Text>
          <Text style={{ color: "#FFFFFF", fontSize: 14, fontWeight: "600" }}>{user.username}</Text>
          <View style={{ flexDirection: "row", alignItems: "center" }} >

            <MaterialIcons style={{ marginRight: 2.5 }}
              name="location-on" size={18} color="#FFF" />
            <Text style={{ color: "#FFFFFF", marginLeft: 2.5, fontSize: 16 }}>DDD 98 - Região de São Luís</Text>
          </View>

        </View>

      </View>

      <View>
        <View
          onTouchEnd={() => navigation.navigate('Meus Anuncios')}
          style={{ padding: 20 }} >
          <Text style={{ fontWeight: "bold", color: "#6D0AD6", fontSize: 15 }}>Meus anúncios</Text>
        </View>

        <View
          onTouchEnd={() => navigation.navigate('Favoritos')}
          style={{ padding: 20 }} >
          <Text style={{ fontWeight: "bold", color: "#6D0AD6", fontSize: 15 }}>Favoritos</Text>
        </View>

        <View

          onTouchEnd={handleLogout}

          style={{ padding: 20 }} >
          <Text style={{ fontWeight: "bold", color: "#6D0AD6", fontSize: 15 }}>Sair</Text>
        </View>

      </View>
    </View>
  );

}

const mapStateToProps = state => ({
  logged: state.app.logged,
  user: state.app.user,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  SignIn, Loggout,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Profile);