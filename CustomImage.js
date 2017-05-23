/**
 * Created by vengeanliu on 17/3/4.
 */

'use strict'
import {
  View,
  Image,
  ActivityIndicator,
  TouchableOpacity
} from 'react-native'

import React, {Component} from 'react'

export default class CustomImage extends Component {
  static propTypes = {
    source: React.PropTypes.string,
    errorImage: React.PropTypes.number,
    defaultImage: React.PropTypes.number,
    onClick: React.PropTypes.func,
    indicator: React.PropTypes.func,
    indicatorProps: React.PropTypes.object,
    renderIndicator: React.PropTypes.func,
    threshold: React.PropTypes.number
  }

  static defaultProps = {
    threshold: 50
  }

  constructor (props, context) {
    super(props, context)

    this.state = {
      loading: false,
      progress: 0,
      headIcon: {uri: props.source} || null,
      thresholdReached: !props.threshold
    }
  }

  render () {
    const {indicator, indicatorProps, renderIndicator} = this.props
    const {progress, loading, thresholdReached} = this.state

    let style = this.props.style
    let content = this.props.children

    if ((loading || progress < 1) && thresholdReached) {
      style = style ? [
        {
          alignItems: 'center',
          justifyContent: 'center'
        },
        style
      ] : {
        alignItems: 'center',
        justifyContent: 'center'
      }
      if (renderIndicator) {
        content = renderIndicator(progress, !loading || !progress)
      } else {
        const IndicatorComponent = (typeof indicator === 'function' ? indicator : ActivityIndicator)
        content = (
          <IndicatorComponent progress={progress} indeterminate={!loading || !progress} {...indicatorProps} />)
      }
    }
    return (
      <TouchableOpacity onPress={this.props.onClick}>
        <Image
          style={style}
          source={this.state.headIcon}
          defaultSource={this.props.defaultImage ? this.props.defaultImage : null}
          loadingIndicatorSource={this.props.defaultImage ? this.props.defaultImage : null}
          onError={this.onImageLoadError.bind(this)}
          onProgress={this.handleProgress.bind(this)}
          onLoad={this.onLoad.bind(this)}
          onLoadStart={this.onStart.bind(this)}>
          {content}
        </Image>
      </TouchableOpacity>
    )
  }

  componentDidMount () {
    if (this.props.threshold) {
      this._thresholdTimer = setTimeout(() => {
        this.setState({thresholdReached: true})
        this._thresholdTimer = null
      }, this.props.threshold)
    }
  }

  componentWillReceiveProps (newProps) {
    if (newProps && newProps.source !== this.props.source) {
      this.loadImage(newProps.source)
    }
  }

  componentWillUnmount () {
    if (this._thresholdTimer) {
      clearTimeout(this._thresholdTimer)
    }
  }

  loadImage (url) {
    this.setState({
      loading: false,
      progress: 0,
      headIcon: {uri: url} || null
    })
  }

  onStart () {
    if (!this.state.loading && this.state.progress !== 1) {
      this.setState({
        loading: true,
        progress: 0
      })
    }
    this.bubbleEvent('onLoadStart')
  }

  handleProgress (event) {
    const progress = event.nativeEvent.loaded / event.nativeEvent.total
    // RN is a bit buggy with these events, sometimes a loaded event and then a few
    // 100% progress – sometimes in an infinite loop. So we just assume 100% progress
    // actually means the image is no longer loading
    if (progress !== this.state.progress && this.state.progress !== 1) {
      this.setState({
        loading: progress < 1,
        progress: progress
      })
    }
    this.bubbleEvent('onProgress', event)
  }

  onLoad (event) {
    if (this.state.progress !== 1) {
      this.setState({
        loading: false,
        progress: 1
      })
    }
    this.bubbleEvent('onLoad', event)
  }

  onImageLoadError (event) {
    this.setState({
      loading: false,
      progress: 0,
      headIcon: this.props.errorImage ? this.props.errorImage : null
    })
    this.bubbleEvent('onError', event)
  }

  bubbleEvent (propertyName, event) {
    if (typeof this.props[propertyName] === 'function') {
      this.props[propertyName](event)
    }
  }
}
