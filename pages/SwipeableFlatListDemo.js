import React,{ Component } from 'react';
import { 
	StyleSheet,
	Text, 
	View,
	SwipeableFlatList,
	TouchableHighlight} from 'react-native';
const dimensions = require('Dimensions');
const {width, height} = dimensions.get('window');

export default class SwipeableFlatListDemo extends Component{
	constructor(props) {
        super(props);
        this.page = 1;
		this.state = {
			CITY_NAMES:['北京','上海','广州','深圳','武汉','成都','西安','拉萨','甘肃','贵州'],
			is_Loading:false,
			isLoadMore:false,
			showFoot: 1,
			index:5
		}
	}
	_renderItem(data){
		const { navigation } = this.props
		return <TouchableHighlight   
				style={styles.item}
				onPress={()=>{
					navigation.navigate('ItemInfo',{name:data.item})
				}}>
				<Text style={styles.text}>{data.item}</Text>
			</TouchableHighlight >
	}
	_keyExtractor(item, index){
		return `index${index}`
	}

	_createSeparatorComponent(){
		return(
			<View style={{height: 5, backgroundColor: '#eeeeee'}}/>
		)
	}
	genQuickAction(){
		return <View style={styles.quickContiner}>
			<TouchableHighlight>
				<View>
					<Text 
						style={styles.delText}
						onPress={()=>{
							alert("您确定要删除吗？")
						}}>删除</Text>
				</View>
			</TouchableHighlight>
		</View>
	}
	render(){
		return (
			<View style={styles.container}>
				<SwipeableFlatList
					data={this.state.CITY_NAMES}
					renderItem={(data) => this._renderItem(data)}
					ItemSeparatorComponent = {()=>this._createSeparatorComponent()}
					keyExtractor={this._keyExtractor}
					renderQuickActions={()=>this.genQuickAction()}
					maxSwipeDistance={50}
					bounceFirstRowOnMount={false}
				/>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container:{
		flex:1
	},
	item:{
		backgroundColor:'#232121',
		height:100,
		alignItems:'center',
		justifyContent:'center'
	},
	text:{
		color:'white',
		fontSize:20
	},
	indicatorContainer:{
		margin:10,
		alignItems:'center',
		justifyContent:'center'
	},
	indicator:{
		margin:10
	},
	headView: {
        width: width,
        height: 50,
        backgroundColor: '#26C9FF',
        justifyContent: 'center',
        alignItems: 'center'
    },
    topView:{
    	width: width,
        height: 80,
        backgroundColor: '#008C8C',
        justifyContent: 'center',
        alignItems: 'center'
    },
    quickContiner:{
    	flex:1,
    	justifyContent: 'center',
    	alignItems: 'flex-end',
    	padding:10,
    	backgroundColor:'red'
    },
    delText:{
    	color:'white'
    }
})