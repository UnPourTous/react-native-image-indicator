# A Image Component with Indicator, Default Image and Error Default Image

[![JavaScript Style Guide](https://cdn.rawgit.com/feross/standard/master/badge.svg)](https://github.com/feross/standard)

### React Native Indicator Image 

A image component with indicator and error default image

<img src='https://github.com/UnPourTous/react-native-image-indicator/blob/master/screenshots/react-native-image-indicator-demo.gif?raw=true' />

## Installation

`$ npm install @unpourtous/react-native-image-indicator --save`

## Usage

```js
import CustomImage from '@unpourtous/react-native-image-indicator'

<CustomImage
  style={{alignItems: 'center', justifyContent: 'center', height:300,width:300, backgroundColor: '#fdf9e6'}}
  source={'image url'}
  defaultImage={require('./images/default.jpg')}
  errorImage={require('./images/error.png')} />
```
## API

Props | Type | Description
--- | --- | --- 
source | string | The remote URL image source.
defaultImage | number | The image before remote image loaded
errorImage | number | The image when remote image loade failed
renderIndicator | function | The function that render indicator component(exclusion indicator when renderIndicator setted)
indicator | function | The indicator component when image is loading
indicatorProps | object | The props of indicator component 
threshold | number | Delay before indicator component show in milliseconds, default value 50.

## License
This library is distributed under MIT Licence.<br>
[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bhttps%3A%2F%2Fgithub.com%2FUnPourTous%2Freact-native-image-indicator.svg?type=large)](https://app.fossa.io/projects/git%2Bhttps%3A%2F%2Fgithub.com%2FUnPourTous%2Freact-native-image-indicator?ref=badge_large)
