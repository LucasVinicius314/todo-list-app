import 'react-native-gesture-handler'

import * as Font from 'expo-font'
import * as React from 'react'

import {
  DefaultTheme,
  Provider as PaperProvider,
  configureFonts,
} from 'react-native-paper'

import Api from './Api'
import AppContext from './AppContext'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Colors from './Colors'
import { NavigationContainer } from '@react-navigation/native'
import Stack from './navigation/Stack'

const fontConfig = {
  default: {
    regular: {
      fontFamily: 'Comfortaa-Regular',
      fontWeight: 'normal',
    },
    medium: {
      fontFamily: 'Comfortaa-Medium',
      fontWeight: 'normal',
    },
    light: {
      fontFamily: 'Comfortaa-Light',
      fontWeight: 'normal',
    },
    thin: {
      fontFamily: 'Comfortaa-Light',
      fontWeight: 'normal',
    },
  },
}

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: Colors.primary,
    background: Colors.white,
    accent: Colors.accent,
  },
  fonts: configureFonts(fontConfig),
  roundness: 10,
}

const { log } = console

export default class App extends React.Component {
  state = {
    loading: true,
    todos: [],
    setters: {
      getTodos: async () => {
        Api.post('/todo/all', {}, { headers: { 'token': await AsyncStorage.getItem('token') } })
          .then(async ({ data }) => this.setState({ todos: data.todos }))
          .catch(e => alert(e.response.data.message))
      },
    },
  }

  componentDidMount = () => {
    Font.loadAsync({
      'Comfortaa-Bold': {
        uri: require('./assets/fonts/Comfortaa-Bold.ttf'),
        display: Font.FontDisplay.FALLBACK,
      },
      'Comfortaa-Light': {
        uri: require('./assets/fonts/Comfortaa-Light.ttf'),
        display: Font.FontDisplay.FALLBACK,
      },
      'Comfortaa-Medium': {
        uri: require('./assets/fonts/Comfortaa-Medium.ttf'),
        display: Font.FontDisplay.FALLBACK,
      },
      'Comfortaa-Regular': {
        uri: require('./assets/fonts/Comfortaa-Regular.ttf'),
        display: Font.FontDisplay.FALLBACK,
      },
      'Comfortaa-SemiBold': {
        uri: require('./assets/fonts/Comfortaa-SemiBold.ttf'),
        display: Font.FontDisplay.FALLBACK,
      },
    }).finally(() => this.setState({ loading: false }))
  }

  render = () => {
    if (this.state.loading) return null
    return (
      <PaperProvider theme={theme}>
        <AppContext.Provider value={this.state}>
          <NavigationContainer>
            <Stack />
          </NavigationContainer>
        </AppContext.Provider>
      </PaperProvider>
    )
  }
}
