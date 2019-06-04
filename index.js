/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import { createStackNavigator, createAppContainer} from 'react-navigation'
import FlatListDemo from './pages/FlatListDemo'
import ItemInfo from './pages/ItemInfo'
import SwipeableFlatListDemo from './pages/SwipeableFlatListDemo'
import SectionListDemo from './pages/SectionListDemo'
const AppRoot = createStackNavigator({
	App:{
		screen:App
	},
	FlatListDemo:{
		screen:FlatListDemo,
		navigationOptions:{
			title:'FlatListDemo'
		}
	},
	ItemInfo:{
		screen:ItemInfo,
		navigationOptions:({navigation})=>({//动态配置title
			title:`${navigation.state.params.name}页面名`
		})
	},
	SwipeableFlatListDemo:{
		screen:SwipeableFlatListDemo,
		navigationOptions:{
			title:'SwipeableFlatListDemo'
		}
	},
	SectionListDemo:{
		screen:SectionListDemo,
		navigationOptions:{
			title:'SectionListDemo'
		}
	}
})
const AppNavigatorsContainer = createAppContainer(AppRoot);

AppRegistry.registerComponent('flatlist_demo', () => AppNavigatorsContainer);
