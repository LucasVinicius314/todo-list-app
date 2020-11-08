import 'react-native-gesture-handler'

import * as React from 'react'

import {
  FAB,
  Headline,
  TextInput,
} from 'react-native-paper'
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
} from 'react-native'

import Api from '../Api'
import AppContext from '../AppContext'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Colors from '../Colors'
import { Ionicons } from '@expo/vector-icons'
import Statusbar from '../components/StatusBar'

const { log } = console

export default class NewTodo extends React.Component {
  static contextType = AppContext

  state = {
    title: '',
    text: '',
    validated: false,
  }

  create = async () => {
    const { title, text } = this.state
    Api.post('/todo/create', { title, text }, { headers: { 'token': await AsyncStorage.getItem('token') } })
      .then(d => {
        this.context.setters.getTodos()
        this.props.navigation.goBack()
      })
      .catch(e => alert(e.response.data.message))
  }

  setTitle = title => this.setState({ title }) || this.validate({ title })

  setText = text => this.setState({ text }) || this.validate({ text })

  validate = ({ title, text }) => {
    title = title || this.state.title
    text = text || this.state.text
    title = title.trim()
    text = text.trim()
    this.setState({ validated: title.length > 0 && text.length > 0 })
  }

  goBack = () => this.props.navigation.goBack()

  render = () => {
    const { title, text, validated } = this.state
    const { setTitle, setText, create, goBack } = this
    return (
      <SafeAreaView style={styles.safeAreaView}>
        <Statusbar backgroundColor={Colors.white} barStyle='dark-content' />
        <ScrollView style={styles.container} contentContainerStyle={styles.content}>
          <Headline style={styles.headline}>New Todo</Headline>
          <FAB color='black' icon='arrow-left' style={styles.back} onPress={goBack}>
            <Ionicons name="ios-arrow-back" size={26} color="black" />
          </FAB>
          <TextInput
            style={styles.textInput}
            label="Title"
            mode='outlined'
            value={title}
            onChangeText={setTitle}
          />
          <TextInput
            style={styles.textInput}
            multiline={true}
            label="Text"
            mode='outlined'
            value={text}
            onChangeText={setText}
          />
        </ScrollView>
        <FAB
          style={styles.fab}
          disabled={!validated}
          icon="check"
          label='Save'
          onPress={create}
        />
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  safeAreaView: {
    width: '100%',
    height: '100%',
    backgroundColor: Colors.white,
  },
  container: {
    width: '100%',
    height: '100%',
  },
  content: {
    paddingHorizontal: 20,
    width: '100%',
    alignItems: 'center',
  },
  textInput: {
    width: '100%',
    marginVertical: 10,
  },
  headline: {
    marginVertical: 30,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
  back: {
    backgroundColor: Colors.transparent,
    elevation: 0,
    position: 'absolute',
    left: 0,
    top: 0,
    margin: 16,
  },
})
