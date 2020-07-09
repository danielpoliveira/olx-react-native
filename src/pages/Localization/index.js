import React from 'react';
import { View, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';


export default () => (
  <View style={{flex:1, }} >
    <View>
      <Text>Buscando sua localização atual</Text>
    </View>

    <View>

    </View>

    <View>
      <Text>Selecionar manualmente</Text>
      <TouchableOpacity>
        <Text>Escolher estado</Text>
      </TouchableOpacity>
    </View>
  </View>
);