import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View, FlatList, TextInput, TouchableOpacity, KeyboardAvoidingView, ScrollView } from 'react-native';
import axios from 'axios';
import {useSelector, useDispatch} from 'react-redux'
import { fetchData, fetchDataSolve, handleDataSubmit, setChange } from '../store/actions';

export default function Game({route, navigation}) {
  const name = useSelector(state => state.userName)
  const board = useSelector(state => state.board)
  const initialBoard = useSelector(state => state.initialBoard)
  const message = useSelector(state => state.message)
  const dispatch = useDispatch()
  const change = useSelector(state => state.change)
  const count = 10

  useEffect(() => {
    dispatch(fetchData())
  },[change])

  function handleSubmit() {
    dispatch(handleDataSubmit(board))
    if(message === 'solved'){
      navigation.navigate('Finish')
    }
  }

  function handleReset() {
    dispatch(fetchData())
  }

  function handleSolve() {
    dispatch(fetchDataSolve(initialBoard))
  }

  function handleChange(event, index, item) {
    if(event === '') {
      event = 0
    }
    item[index] = parseInt(event)
  }

  return (
    <View>
      <Text style={{textAlign: "center", fontSize: 20, color: "blue"}}>Welcome to the game {name}</Text>
      <Text style={{textAlign: "center"}}>{message}</Text>
      <ScrollView>
        <View>
          {board.map((item, i) => {
            return (
              <View style={{flex: 0.2, flexDirection: "row", justifyContent: "center", padding: 5 }} key={i}>
              {item.map((ele, index) => {
                return (
                  <View style={{
                    backgroundColor: "blue",
                    padding: 3,
                    color: "white",
                    justifyContent:"center",
                    textAlign:"center"}}
                    key={(i*count) + index}>
                  <TextInput
                  style={{
                    backgroundColor: "red",
                    color: "white",
                    justifyContent:"center",
                    textAlign:"center"}}
                  editable={ele ? false: true}
                  defaultValue={ele === 0 ? '':ele.toString()}
                  keyboardType={'numeric'}
                  maxLength={1}
                  onChangeText={event => handleChange(event, index, item)}
                  />
                  </View>)
                })
              }
            </View>
            )
          })}
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'center'}} >
          <View style={styles.button}>
            <TouchableOpacity
              style={{backgroundColor: 'red'}}
              onPress={() => handleSubmit()}
            >
              <Text style={styles.textButton}>Submit Sudoku</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.button}>
            <TouchableOpacity
              style={{backgroundColor: 'green'}}
              onPress={() => handleSolve()}
            >
              <Text style={styles.textButton}>Solve Sudoku</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.button}>
            <TouchableOpacity
              style={{backgroundColor: 'black'}}
              onPress={() => handleReset()}
            >
              <Text style={styles.textButton}>Reset Sudoku</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    padding: 10
  },
  textButton: {
    padding: 4,
    color: 'white'
  }
});
