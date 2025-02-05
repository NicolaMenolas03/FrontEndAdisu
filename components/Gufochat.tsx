import React, { useState } from 'react';
import { View, Text, Modal, TextInput, TouchableOpacity, Image, FlatList, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { HfInference } from "@huggingface/inference";

const KEY = "aGZfTld0elBrYXJlZE5nWmpGaXJZWXRvVEdSb3hiR2Z1VXJkRA==";
const MODEL_NAME = "mistralai/Mistral-7B-Instruct-v0.3";

const GufoChat = () => {
  const [isChatVisible, setChatVisible] = useState(false);
  const [messages, setMessages] = useState<{ text: string; sender: string }[]>([]);
  const [inputText, setInputText] = useState('');
  const decodeBase64 = (base64String: WithImplicitCoercion<string> | { [Symbol.toPrimitive](hint: "string"): string; }) => {
    return Buffer.from(base64String, 'base64').toString('utf-8');
  };

  const hf = new HfInference(decodeBase64(KEY));
  const toggleChat = () => setChatVisible(!isChatVisible);

  const sendMessage = async () => {
    if (!inputText.trim()) return;

    const newMessage = { text: inputText, sender: 'user' };
    setMessages((prev) => [...prev, newMessage]);
    setInputText('');

    try {
      const response = await hf.textGeneration({
        model: MODEL_NAME,
        inputs: inputText,
        parameters: { max_new_tokens: 100, temperature: 0.7 },
      });

      let botText = { text: response.generated_text || "Non ho capito. Puoi ripetere?", sender: 'bot' };
      if (botText.text.startsWith(inputText)) {
        botText.text = botText.text.replace(inputText, '').trim();
      }
      const botMessage = { text: botText.text, sender: 'bot' };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Errore nella richiesta:", error);
      setMessages((prev) => [...prev, { text: "Errore di connessione. Riprova più tardi.", sender: 'bot' }]);
    }
  };

  return (
    <>
      <TouchableOpacity style={styles.gufoButton} onPress={toggleChat}>
        <Image source={require('../assets/images/Gufo.png')} style={styles.gufoImage} />
      </TouchableOpacity>

      <Modal visible={isChatVisible} animationType="slide" transparent>
        <View style={styles.modalContainer}>
          <View style={styles.transparentSection} />
          <View style={styles.chatSection}>
            <View style={styles.chatHeader}>
              <Text style={styles.chatTitle}>GufoChat</Text>
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
                <Ionicons name="send" size={24} color="#007fff" />
              </TouchableOpacity>
            </View>
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
    right: 20,
    alignSelf: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 50,
    padding: 10,
    elevation: 5,
    width: 80,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: 'rgba(0,127,255,1)',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 31,
  },
  gufoImage: {
    width: 80,
    height: 80,
    borderRadius: 50,
  },
  modalContainer: {
    flex: 1,
  },
  transparentSection: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  chatSection: {
    flex: 2,
    backgroundColor: 'white',
    borderRadius: 20,
    overflow: 'hidden',
    marginStart: 20,
    marginEnd: 20,
    marginBottom: 20,
    shadowColor: 'rgba(0,127,255,1)',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 31,
  },
  chatHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#007fff',
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
    backgroundColor: '#007fff',
    alignSelf: 'flex-end',
  },
  botBubble: {
    backgroundColor: '#6F7378',
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
    borderColor: '#e0e0e0',
    borderRadius: 5,
    paddingHorizontal: 10,
    height: 40,
    color: '#737373',
  },
});

export default GufoChat;
