import React from 'react';
import { View, Text } from 'react-native';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { SignIn } from '../actions';



const Profile = props => {

  const { navigation, logged } = props;

  if(!logged) {
    navigation.navigate('Login');
    return null;
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
          <Text style={{ color: "#FFFFFF", fontSize: 19, fontWeight: "600" }}>Tecspace</Text>
          <View style={{ flexDirection: "row", alignItems: "center" }} >

            <MaterialIcons style={{ marginRight: 2.5 }}
              name="location-on" size={18} color="#FFF" />
            <Text style={{ color: "#FFFFFF", marginLeft: 2.5, fontSize: 16 }}>DDD 98 - Região de São Luís</Text>
          </View>

        </View>

      </View>
    </View>
  );

}

const mapStateToProps = state => ({
  logged: state.app.logged
});

const mapDispatchToProps = dispatch => bindActionCreators({
  SignIn,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Profile);