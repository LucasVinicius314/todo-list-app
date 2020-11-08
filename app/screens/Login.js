import 'react-native-gesture-handler'

import * as React from 'react'

import { Button, Headline, TextInput } from 'react-native-paper'
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
} from 'react-native'

import Api from '../Api'
import Colors from '../Colors'
import Statusbar from '../components/StatusBar'

const { log } = console

export default class Login extends React.Component {
  state = {
    email: '',
    password: '',
  }

  setEmail = email => this.setState({ email })

  setPassword = password => this.setState({ password })

  signIn = () => this.props.navigation.navigate('SignIn')

  request = () => {
    const { email, password } = this.state
    Api.post('/user/login', { email, password })
      .then(log)
      .catch(log)
  }

  render = () => {
    const { email, password } = this.state
    const { setEmail, setPassword, signIn, request } = this
    return (
      <SafeAreaView style={styles.safeAreaView}>
        <Statusbar backgroundColor={Colors.white} barStyle='dark-content' />
        <ScrollView style={styles.container} contentContainerStyle={styles.content}>
          <Headline style={styles.headline}>Login</Headline>
          <TextInput
            style={styles.textInput}
            label="Email"
            mode='outlined'
            value={email}
            onChangeText={setEmail}
          />
          <TextInput
            style={styles.textInput}
            label="Password"
            mode='outlined'
            value={password}
            onChangeText={setPassword}
          />
          <Button
            style={styles.btn}
            icon="login"
            mode="contained"
            onPress={request}>Login</Button>
          <Button
            color={Colors.primary}
            style={styles.btn}
            mode="text"
            onPress={signIn}>Create Account</Button>
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
  }
})
