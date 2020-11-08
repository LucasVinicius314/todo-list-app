import 'react-native-gesture-handler'

import * as React from 'react'

import Login from '../screens/Login'
import NewTodo from '../screens/NewTodo'
import SignIn from '../screens/SignIn'
import Todos from '../screens/Todos'
import { createStackNavigator } from '@react-navigation/stack'

const { Navigator, Screen } = createStackNavigator()

export default class Stack extends React.Component {
  render = () => (
    <Navigator headerMode='none'>
      <Screen name='Login' component={Login} />
      <Screen name='SignIn' component={SignIn} />
      <Screen name='Todos' component={Todos} />
      <Screen name='NewTodo' component={NewTodo} />
    </Navigator>
  )
}
