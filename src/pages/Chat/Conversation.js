import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, KeyboardAvoidingView, TouchableOpacity } from 'react-native';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import io from 'socket.io-client';

import { baseURL } from '../../services/api';

import { connect } from 'react-redux';

class Conversation extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      text: '',
      messages: []
    };

    this.socket = io(baseURL);

    this.socket.on('previousMessage', (data) => {
      console.log(data)

      this.setState({ messages: data })
    });

    this.socket.on('receivedMessage', (data) => {

      this.setState({ messages: [...this.state.messages, data] });
    });

  }

  render() {

    const handleSubmitMessage = () => {

      if (this.state.text) {
        this.socket.emit('sendMessage', {
          author: this.props.user._id,
          message: this.state.text,
        });

        this.setState({ messages: [...this.state.messages, { author: this.props.user._id, message: this.state.text }] })
        this.setState({ text: '' })
      }
    }


    const RenderItem = props => {
      
      const { item, end, is_me } = props;

      return (
        <View style={[{

          flexDirection: "row",
          justifyContent: is_me ? 'flex-end' : 'flex-start',
          marginBottom: !end ? 2 : 50,
        }]}>
          <View style={{
            maxWidth: 200,
            borderRadius: 7,
            //backgroundColor: item.is_me ? "#6D0AD6" : "#E5E5E5",
            backgroundColor: is_me ? "#6D0AD6" : "#E5E5E5",
            paddingVertical: 10, paddingHorizontal: 15,
          }}>
            <Text style={[is_me ? { color: "#FFF" } : undefined]}>{item.message}</Text>
          </View>
        </View>
      );
    }

    return (
      <>
        <View style={{
          backgroundColor: "#FFF",
          borderBottomWidth: StyleSheet.hairlineWidth,
          borderColor: "#888",
          flexDirection: "row", alignItems: "center"
        }} >
          <View style={{ width: 50, height: 50, backgroundColor: "gray" }} />
          <View style={{
            paddingHorizontal: 10,

          }} >
            <Text>Fones de ouvido</Text>
            <Text style={{ fontWeight: "700" }}>R$ 20</Text>
          </View>
        </View>

        <FlatList
          style={{ paddingHorizontal: 10, paddingTop: 10, paddingBottom: 10 }}
          data={this.state.messages}
          keyExtractor={(item, index) => index.toString()}
          renderItem={item => <RenderItem {...item} is_me={item.item.author === this.props.user._id ? true : false} end={item.index === this.state.messages.length - 1} />}
        />

        <View><Text>Aqui</Text></View>

        <KeyboardAvoidingView
          style={{
            width: "100%",
            position: 'absolute', bottom: 0
          }}
          behavior="absolute"
        >

          <View style={{
            borderColor: "#bbb",
            borderTopWidth: StyleSheet.hairlineWidth,
            flexDirection: "row", justifyContent: "space-between", alignItems: "center",
            backgroundColor: "#FFF", paddingHorizontal: 10,
          }} >
            <TextInput
              value={this.state.text}
              onChangeText={value => this.setState({ text: value })}
              style={{ flex: 1 }}
              placeholder="Digite uma mensagem..."
            />

            <TouchableOpacity onPress={handleSubmitMessage}>
              <MaterialIcons
                name="send"
                size={25}
                color={this.state.text ? "#F18000" : "#D2D2D2"}
              />
            </TouchableOpacity>

          </View>
        </KeyboardAvoidingView>
      </>
    );
  }
}

const mapStateToProps = state => ({
  user: state.app.user,
})

export default connect(mapStateToProps, undefined)(Conversation);
