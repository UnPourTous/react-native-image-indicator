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
          source={'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1496148333&di=fdcac00c65ba9c75ba102380d9c27c87&imgtype=jpg&er=1&src=http%3A%2F%2Fimg2081.poco.cn%2Fmypoco%2Fmyphoto%2F20111110%2F01%2F64030449201111100118289800869654960_068.jpg'}
          defaultImage={require('./images/default.jpg')}
          errorImage={require('./images/error.png')}
        />
      </View>
    )
  }
}
AppRegistry.registerComponent('example', () => example)
