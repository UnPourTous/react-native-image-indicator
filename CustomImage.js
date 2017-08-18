/**
 * Created by vengeanliu on 17/3/4.
 */

'use strict'
import {
  View,
  Image,
  ActivityIndicator
} from 'react-native'

import React, { Component } from 'react'
import CachedImage from 'react-native-cached-image'

export default class CustomImage extends Component {
  static propTypes = {
    source: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.number, React.PropTypes.object]),
    errorImage: React.PropTypes.number,
    defaultImage: React.PropTypes.number,
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

    let source = null
    if (props.source) {
      if (props.source.uri) {
        source = props.source
      } else {
        source = {uri: props.source}
      }
    }
    this.state = {
      loading: false,
      progress: 0,
      opacity: 0,
      source,
      thresholdReached: !props.threshold
    }

    this._showImage = this._showImage.bind(this)
  }

  _showImage() {
    this.setState({opacity: 1})
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
      <CachedImage
        style={[style, {opacity: this.state.opacity}]}
        source={this.state.source}
        defaultSource={this.props.defaultImage ? this.props.defaultImage : null}
        loadingIndicatorSource={this.props.defaultImage ? this.props.defaultImage : null}
        onError={this.onImageLoadError.bind(this)}
        onProgress={this.handleProgress.bind(this)}
        onLoad={this.onLoad.bind(this)}
        onLoadEnd={this._showImage}
        onLoadStart={this.onStart.bind(this)}>
        {content}
      </CachedImage>
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
    let source = null
    if (url) {
      if (url.uri) {
        source = url
      } else {
        source = {uri: url}
      }
    }
    this.setState({
      loading: false,
      progress: 0,
      source
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
      source: this.props.errorImage ? this.props.errorImage : {}
    })
    this.bubbleEvent('onError', event)
  }

  bubbleEvent (propertyName, event) {
    if (typeof this.props[propertyName] === 'function') {
      this.props[propertyName](event)
    }
  }
}
