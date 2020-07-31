import React, { useState } from 'react';
import {Text, View, Button} from 'react-native'
import { useSelector, useDispatch } from 'react-redux';
import { setUserName, setChange } from '../store/actions';

export default function Finish({navigation}) {
  const name = useSelector(state => state.userName)
  const change = useSelector(state => state.change)
  const dispatch = useDispatch()

  function handleBackToGame(event) {
    dispatch(setChange(!change))
    navigation.navigate('Game')
  }
  function handleEndGame(event) {
    dispatch(setUserName(''))
    navigation.navigate('Home')
  }

  return (
    <View style={{padding: 10, margin: 10}}>
      <Text style={{paddingBottom:10, color: 'blue'}}>Selamat {name}, anda memenangkan Hadiah Doa, semoga anda jomblo terus ya, :P</Text>
      <View style={{padding: 10, backgroundColor:'yellow'}}>
        <Button title={'Back To Game'} onPress={event => handleBackToGame(event)} />
      </View>
      <View style={{padding: 10, backgroundColor:'yellow'}}>
        <Button title={'End Game'} onPress={event => handleEndGame(event)} />
      </View>
    </View>
  )
}