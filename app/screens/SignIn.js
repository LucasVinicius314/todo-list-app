import 'react-native-gesture-handler'

import * as React from 'react'

import {
  Button,
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
import Colors from '../Colors'
import { Ionicons } from '@expo/vector-icons'
import Statusbar from '../components/StatusBar'

export default class SignIn extends React.Component {
  state = {
    name: '',
    email: '',
    password: '',
  }

  setName = name => this.setState({ name })

  setEmail = email => this.setState({ email })

  setPassword = password => this.setState({ password })

  create = async () => {
    const { name, email, password } = this.state
    Api.post('/user/create', { name, email, password })
      .then(({ data }) => {
        alert(data.message)
      })
      .catch(e => alert(e.response.data.message))
  }

  goBack = () => this.props.navigation.goBack()

  render = () => {
    const { email, password, name } = this.state
    const { setEmail, setPassword, setName, create, goBack } = this
    return (
      <SafeAreaView style={styles.safeAreaView}>
        <Statusbar backgroundColor={Colors.white} barStyle='dark-content' />
        <ScrollView style={styles.container} contentContainerStyle={styles.content}>
          <Headline style={styles.headline}>Create Account</Headline>
          <FAB color='black' icon='arrow-left' style={styles.back} onPress={goBack}>
            <Ionicons name="ios-arrow-back" size={26} color="black" />
          </FAB>
          <TextInput
            style={styles.textInput}
            label="Name"
            mode='outlined'
            textContentType='name'
            value={name}
            onChangeText={setName}
          />
          <TextInput
            style={styles.textInput}
            label="Email"
            mode='outlined'
            textContentType='emailAddress'
            value={email}
            onChangeText={setEmail}
          />
          <TextInput
            style={styles.textInput}
            label="Password"
            mode='outlined'
            textContentType='password'
            secureTextEntry={true}
            value={password}
            onChangeText={setPassword}
          />
          <Button
            style={styles.btn}
            mode="contained"
            onPress={create}>Create</Button>
        </ScrollView>
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
  btn: {
    marginVertical: 10,
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
