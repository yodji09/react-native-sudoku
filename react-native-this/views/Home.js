import React, {useState, useEffect} from 'react';
import {View, Text, TextInput, Button} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { setUserName } from '../store/actions';



export default function Home({route, navigation}) {
  const dispatch = useDispatch()
  const [userName, setUser] = useState('')
  const name = useSelector(state => state.userName)
  const [message, setMessage] = useState('')

  useEffect(() => {

  }, [name])

  function handleName(text) {
    setUser(text)
  }

  function goToGame(event) {
    if(userName.length < 3) {
      setMessage('Name not less than 3 character @@@@')
      setTimeout(() => {
        setMessage('')
      }, 3000);
    } else {
      dispatch(setUserName(userName))
      navigation.navigate('Game')
    }
  }

  return (
    <View style={{padding: 10, flex: 1, alignContent: 'center'}}>
      <Text>{message}</Text>
      <Text style={{textAlign: 'center', fontSize: 20, color: 'red'}}>Input Username</Text>
      <TextInput
      style={{justifyContent: 'center', backgroundColor: 'orange', margin: 10}}
      placeholder={'Input Your Name'}
      keyboardType={'default'}
      defaultValue={name}
      onChangeText={text => handleName(text)}
      //onKeyPress={({nativeEvent}) => handleKeyPress(nativeEvent)}
      />
      <Button title={'Submit'} style={{margin: 10}} onPress={event => goToGame(event)} />
    </View>
  )
}