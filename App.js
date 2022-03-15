import { useState, useEffect, useCallback } from 'react'
import { View, SafeAreaView, Text, StyleSheet, TextInput, TouchableOpacity, FlatList, Modal } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import Item from './components/Item'
import * as Animatable from 'react-native-animatable'
import AsyncStorageLib from '@react-native-async-storage/async-storage'

const AnimatedButton = Animatable.createAnimatableComponent(TouchableOpacity)

const App = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [item, setItem] = useState('')
  const [listItems, setListItems] = useState([])

  useEffect(() => {
    async function retrieveItems() {
      const itemsStorage = await AsyncStorageLib.getItem('purchase_list')
      if (itemsStorage) {
        setListItems(JSON.parse(itemsStorage))
      }
    }
    retrieveItems()
  }, [])

  useEffect(() => {
    async function persistItems() {
      await AsyncStorageLib.setItem('purchase_list', JSON.stringify(listItems))
    }
    persistItems()
  }, [listItems])

  const handleAdd = () => {
    if (item === '') {
      return
    }
    const data = {
      key: item,
      item: item,
      isDone: false
    }
    setListItems([...listItems, data])
    setIsModalOpen(false)
    setItem('')
  }

  const markCheck = useCallback((data) => {
    let newState = [...listItems]
    newState.forEach((item) => {
      if (item.key === data.key) {
        item.isDone = true
      }
    })
    setListItems(newState)
  })

  const deleteItem = useCallback((data) => {
    const find = listItems.filter(item => item.key !== data.key);
    setListItems(find)
  })

  return (
    <SafeAreaView style={styles.container}>
      <Modal animationType='slide' transparent={false} visible={isModalOpen}>

        <SafeAreaView style={styles.modal}>

          <View style={styles.modalHeader}>
            <TouchableOpacity onPress={() => setIsModalOpen(false)}>
              <Ionicons
                style={{ marginLeft: 5, marginRight: 5 }}
                name='md-arrow-back'
                size={40}
                color='#fff' />
            </TouchableOpacity>
            <Text style={styles.modalTitle}>Novo item</Text>
          </View>

          <Animatable.View style={styles.modalBody} animation='fadeInUp' useNativeDriver>
            <TextInput
              multiline
              placeholderTextColor={'#2d3537'}
              autoCorrect={false}
              placeholder='O que precisa comprar?'
              style={styles.input}
              value={item}
              onChangeText={(item) => setItem(item)}
            />
            <TouchableOpacity style={styles.addButton} onPress={handleAdd}>
              <Text style={styles.addText}>
                Salvar
              </Text>
            </TouchableOpacity>
          </Animatable.View>

        </SafeAreaView>
      </Modal>
      <Text style={styles.title}>Lista de Compras</Text>
      {listItems.length > 0 ? (
        <FlatList
          showsHorizontalScrollIndicator={false}
          data={listItems}
          keyExtractor={(item) => String(item.key)}
          renderItem={({ item }) => <Item data={item} markCheck={markCheck} deleteItem={deleteItem} />}
        />
      ) : (
        <View style={styles.empty}>
          <Text style={styles.emptyText}>
            Adicione um item na sua lista de compras para começar.
          </Text>
        </View>
      )}
      <AnimatedButton
        useNativeDriver
        animation='bounceInUp'
        duration={1500}
        onPress={() => setIsModalOpen(true)}
        style={styles.buttonContainer}>
        <Ionicons name='ios-add' size={35} color='#fff' />
      </AnimatedButton>
      <View style={styles.copyright}>
        <Text style={styles.copyrightText}>
          Desenvolvido por Johnnatan Santos
        </Text>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#02002E',
  },
  title: {
    textAlign: 'center',
    marginTop: 30,
    marginBottom: 10,
    fontSize: 30,
    color: '#FFF'
  },
  buttonContainer: {
    position: 'absolute',
    width: 60,
    height: 60,
    backgroundColor: '#0094ff',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    right: 25,
    bottom: 25,
    elevation: 2,
    zIndex: 9,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: {
      width: 1,
      height: 3
    }
  },
  buttonText: {
    color: '#fff',
    fontSize: 25,
  },
  modal: {
    flex: 1,
    backgroundColor: '#171d31',
  },
  modalHeader: {
    marginLeft: 10,
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center'
  },
  modalTitle: {
    marginLeft: 15,
    fontSize: 23,
    color: '#FFF'
  },
  modalBody: {
    marginTop: 15
  },
  input: {
    fontSize: 15,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 30,
    backgroundColor: '#FFF',
    padding: 9,
    height: 85,
    textAlignVertical: 'top',
    color: '#000',
    borderRadius: 5
  },
  addButton: {
    backgroundColor: '#FFF',
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10,
    marginRight: 10,
    height: 40,
    borderRadius: 5
  },
  addText: {
    fontSize: 20
  },
  empty: {
    flex: 1,
    alignContent: 'center',
    justifyContent: 'center'
  },
  emptyText: {
    textAlign: 'center',
    fontSize: 15,
    color: '#FFF'
  },
  copyright: {
    position: 'absolute',
    bottom: 2,
    left: 95,
  },
  copyrightText: {
    color: '#FFF',
    fontSize: 10
  }
})

export default App