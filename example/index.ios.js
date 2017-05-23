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
          source={'https://timgsa.baidu.com/timg?image&quality=80&size=b10000_10000&sec=1495540924&di=d56fb89f48ce4be47135ef2e35375546&src=http://img.pconline.com.cn/images/upload/upc/tx/photoblog/1212/20/c4/16749893_16749893_1355985730137.jpg'}
          defaultImage={require('./images/default.jpg')}
          errorImage={require('./images/error.png')}
        />
      </View>
    )
  }
}
AppRegistry.registerComponent('example', () => example)
