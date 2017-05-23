/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react'
import {
  AppRegistry,
  View,
  Text,
  PixelRatio
} from 'react-native'
import CustomImage from '@unpourtous/react-native-image-indicator'

export default class example extends Component {
  constructor (props) {
    super(props)
  }


  render () {
    return (
      <View style={{
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#efefef',
        flexDirection: 'column',
        justifyContent: 'center',
      }}>
        <CustomImage
          style={{alignItems: 'center', justifyContent: 'center', height:300,width:300, backgroundColor: '#fdf9e6'}}
          source={'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2527908864,2652178879&fm=23&gp=0.jpg'}
          defaultImage={require('./images/default.jpg')}
          errorImage={require('./images/error.png')}
        />
      </View>
    )
  }
}
AppRegistry.registerComponent('example', () => example)
