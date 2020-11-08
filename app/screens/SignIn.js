import 'react-native-gesture-handler'

import * as React from 'react'

import { Button, Headline, TextInput } from 'react-native-paper'
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
} from 'react-native'

import Colors from '../Colors'
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

  request = () => null

  render = () => {
    const { email, password, name } = this.state
    const { setEmail, setPassword, setName } = this
    return (
      <SafeAreaView style={styles.safeAreaView}>
        <Statusbar backgroundColor={Colors.white} barStyle='dark-content' />
        <ScrollView style={styles.container} contentContainerStyle={styles.content}>
          <Headline style={styles.headline}>Create Account</Headline>
          <TextInput
            style={styles.textInput}
            label="Name"
            mode='outlined'
            value={name}
            onChangeText={setName}
          />
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
            onPress={this.request}>Create</Button>
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
