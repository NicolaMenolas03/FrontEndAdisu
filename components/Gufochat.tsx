import React, { useState } from 'react';
import { View, Text, Modal, TextInput, TouchableOpacity, Image, FlatList, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';

const GufoChat = () => {
  const [isChatVisible, setChatVisible] = useState(false);
  const [messages, setMessages] = useState<{ text: string; sender: string }[]>([]);
  const [inputText, setInputText] = useState('');

  const toggleChat = () => setChatVisible(!isChatVisible);

  const sendMessage = async () => {
    if (!inputText.trim()) return;

    const newMessage = { text: inputText, sender: 'user' };
    setMessages((prev) => [...prev, newMessage]);
    setInputText('');

    try {
      const response = await axios.post('https://your-backend.com/api/chat', { message: inputText });
      const botMessage = { text: response.data.reply, sender: 'bot' };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error('Errore nel recupero della risposta', error);
    }
  };

  return (
    <>
      <TouchableOpacity style={styles.gufoButton} onPress={toggleChat}>
        <Image source={require('../assets/images/Gufo.png')} style={styles.gufoImage} />
      </TouchableOpacity>

      <Modal visible={isChatVisible} animationType="slide" transparent>
        <View style={styles.chatContainer}>
          <View style={styles.chatHeader}>
            <Text style={styles.chatTitle}>Chat con il Gufo</Text>
            <Ionicons name="close" size={24} color="white" onPress={toggleChat} />
          </View>

          <FlatList
            data={messages}
            keyExtractor={(_, index) => index.toString()}
            renderItem={({ item }) => (
              <View style={[styles.messageBubble, item.sender === 'user' ? styles.userBubble : styles.botBubble]}>
                <Text style={styles.messageText}>{item.text}</Text>
              </View>
            )}
          />

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.textInput}
              value={inputText}
              onChangeText={setInputText}
              placeholder="Scrivi un messaggio..."
            />
            <TouchableOpacity onPress={sendMessage}>
              <Ionicons name="send" size={24} color="#005dff" />
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  gufoButton: {
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center',
    backgroundColor: '#005dff',
    borderRadius: 50,
    padding: 10,
    elevation: 5,
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  gufoImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  chatContainer: {
    flex: 1,
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 20,
    paddingBottom: 10,
  },
  chatHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#005dff',
    padding: 15,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  chatTitle: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
  },
  messageBubble: {
    padding: 10,
    borderRadius: 10,
    margin: 5,
    maxWidth: '80%',
  },
  userBubble: {
    backgroundColor: '#005dff',
    alignSelf: 'flex-end',
  },
  botBubble: {
    backgroundColor: '#e0e0e0',
    alignSelf: 'flex-start',
  },
  messageText: {
    color: 'white',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderTopWidth: 1,
    borderColor: '#ccc',
  },
  textInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    height: 40,
  },
});

export default GufoChat;
