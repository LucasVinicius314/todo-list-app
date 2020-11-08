import 'react-native-gesture-handler'

import * as React from 'react'

import { AntDesign, Feather } from '@expo/vector-icons'
import {
  FAB,
  Headline,
  List,
  TouchableRipple,
} from 'react-native-paper'
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native'

import Api from '../Api'
import AppContext from '../AppContext'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Colors from '../Colors'
import Statusbar from '../components/StatusBar'

const { log } = console

export default class Todos extends React.Component {
  static contextType = AppContext

  componentDidMount = () => this.getTodos()

  getTodos = () => this.context.setters.getTodos()

  favorite = async id => {
    Api.post('/todo/favorite', { id }, { headers: { 'token': await AsyncStorage.getItem('token') } })
      .then(d => this.getTodos())
      .catch(e => alert(e.response.data.message))
  }

  unfavorite = async id => {
    Api.post('/todo/unfavorite', { id }, { headers: { 'token': await AsyncStorage.getItem('token') } })
      .then(d => this.getTodos())
      .catch(e => alert(e.response.data.message))
  }

  delete = async id => {
    Api.post('/todo/delete', { id }, { headers: { 'token': await AsyncStorage.getItem('token') } })
      .then(d => this.getTodos())
      .catch(e => alert(e.response.data.message))
  }

  newTodo = () => this.props.navigation.navigate('NewTodo')

  render = () => {
    const { todos } = this.context
    const { newTodo } = this
    return (
      <SafeAreaView style={styles.safeAreaView}>
        <Statusbar backgroundColor={Colors.white} barStyle='dark-content' />
        <ScrollView style={styles.container} contentContainerStyle={styles.content}>
          <Headline style={styles.headline}>Todos</Headline>
          <List.Section style={styles.section}>
            {todos.map((v, k) => <List.Item
              key={k}
              title={v.title}
              description={v.text}
              right={() =>
                <View style={styles.row}>
                  <TouchableRipple onPress={() => v.favorite === 'true' ? this.unfavorite(v.id) : this.favorite(v.id)}>
                    <AntDesign
                      size={24}
                      style={styles.icon}
                      name={v.favorite === 'true' ? 'star' : 'staro'}
                      color={v.favorite === 'true' ? Colors.yellow : Colors.gray} />
                  </TouchableRipple>
                  <TouchableRipple onPress={() => this.delete(v.id)}>
                    <Feather style={styles.icon} name="trash-2" size={24} color={Colors.red} />
                  </TouchableRipple>
                </View>
              } />)}
          </List.Section>
        </ScrollView>
        <FAB
          style={styles.fab}
          icon="plus"
          label='New Todo'
          onPress={newTodo}
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
    width: '100%',
    alignItems: 'center',
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
  section: {
    width: '100%',
  },
  row: {
    alignSelf: 'center',
    flexDirection: 'row',
  },
  icon: {
    marginHorizontal: 5,
  },
})
