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

const cellheight = 40
export default class example extends Component {
  constructor (props) {
    super(props)
  }


  render () {
    return (
      <View style={{
        flex: 1,
        backgroundColor: '#efefef',
        flexDirection: 'column',
        justifyContent: 'flex-start',
      }}>
        <CustomImage
          style={{alignItems: 'center', justifyContent: 'center', backgroundColor: '#fdf9e6'}}
          source={'http://www.threepullpa.com/data/uploads/66/510237-sunset-view.jpg'}
          defaultImage={require('../images/default.jpg')} />
      </View>
    )
  }
}
AppRegistry.registerComponent('example', () => example)
