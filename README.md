# A component for ListView can search items, support chinese alphabetical

[![JavaScript Style Guide](https://cdn.rawgit.com/feross/standard/master/badge.svg)](https://github.com/feross/standard)

### React Native Search List

A component for image with indicator and default image<br>

<img src='https://github.com/UnPourTous/react-native-image-indicator/blob/master/screenshots/react-native-image-indicator-demo.gif?raw=true' />

## Installation

`$ npm install @unpourtous/react-native-image-indicator --save`

## Usage

To Use SearchList, need a array of object as data source,and each object has searchStr property:

```js
import CustomImage from '@unpourtous/react-native-image-indicator'

  <CustomImage
          style={{alignItems: 'center', justifyContent: 'center', height:300,width:300, backgroundColor: '#fdf9e6'}}
          source={'image url'}
          defaultImage={require('./images/default.jpg')}
          errorImage={require('./images/error.png')}
        />
```
## API

Props
-----

### `source`
The remote URL image source.

type: `string`

### `defaultImage`
The image before remote image loaded

type: `number`

### `errorImage`
The image when remote image loade failed

type: `number`

### `renderIndicator`
the function that render indicator component(exclusion indicator when renderIndicator setted)

type: `function`

### `indicator`
the indicator component when image is loading

type: `function`

### `indicatorProps`
the props of indicator component 

type: `object`

### `threshold`
delay milliseconds before indicator component show

type: `number`
defaultValue: `50`

## License
This library is distributed under MIT Licence.
[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bhttps%3A%2F%2Fgithub.com%2FUnPourTous%2Freact-native-image-indicator.svg?type=large)](https://app.fossa.io/projects/git%2Bhttps%3A%2F%2Fgithub.com%2FUnPourTous%2Freact-native-image-indicator?ref=badge_large)
