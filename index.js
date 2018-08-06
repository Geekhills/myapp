import { AppRegistry } from 'react-native';
import App from './Apps';
import {YellowBox} from 'react-native';

YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated'])

AppRegistry.registerComponent('foodapp', () => App);
