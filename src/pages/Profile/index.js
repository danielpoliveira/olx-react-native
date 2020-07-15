import React from 'react';
import { View, Text } from 'react-native';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export default props => (
  <View>
    <View style={{height: 180, backgroundColor: "#6D0AD6", 
      flexDirection: "row",
      justifyContent: "center", alignItems: "center"
      }}>

      <View style={{
        flexDirection: "column",
        alignItems: "center",
      }}>
        <Text style={{color: "#FFFFFF", fontSize: 19, fontWeight: "600"}}>Tecspace</Text>
        <View style={{flexDirection: "row", alignItems: "center"}} >
          
          <MaterialIcons style={{marginRight: 2.5}}
            name="location-on" size={18} color="#FFF" />
          <Text style={{color: "#FFFFFF", marginLeft: 2.5,fontSize: 16}}>DDD 98 - Região de São Luís</Text>
        </View>

      </View>

    </View>
  </View>
);