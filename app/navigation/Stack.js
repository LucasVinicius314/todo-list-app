import 'react-native-gesture-handler'

import * as React from 'react'

import Colors from '../Colors'
import Login from '../screens/Login'
import SignIn from '../screens/SignIn'
import { createStackNavigator } from '@react-navigation/stack'

const { Navigator, Screen } = createStackNavigator()

export default class Stack extends React.Component {
  render = () => (
    <Navigator headerMode='none'>
      <Screen name='Login' component={Login} />
      <Screen name='SignIn' component={SignIn} />
    </Navigator>
  )
}
