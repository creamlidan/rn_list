import React,{ Component } from 'react';
import { 
	StyleSheet,
	Text, 
	View,
	SectionList,
	TouchableHighlight,
	RefreshControl} from 'react-native';
const dimensions = require('Dimensions');
const {width, height} = dimensions.get('window');

export default class SectionListDemo extends Component{
	constructor(props) {
        super(props);
		this.state = {
			CITY_NAMES:[{data:['北京','上海','广州','深圳'],title:'一线城市'},{data:['武汉','成都','西安','拉萨'],title:'二线城市'},{data:['西安','拉萨','南充','宜宾'],title:'三线城市'}],
			is_Loading:false,
			isLoadMore:false,
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
	_renderSectionHeader({section}){
		return <View style={styles.sectionHeader_view}>
			<Text style={styles.sectionHeader_text}>{section.title}</Text>
		</View>
	}
	_onRefresh(){
		this.setState({
			is_Loading:true
		})
		setTimeout(()=>{
			let CITY_NAMES = this.state.CITY_NAMES
			CITY_NAMES.reverse();
			this.setState({
				CITY_NAMES,
				is_Loading:false
			})
		},2000)
	}
	render(){
		return (
			<View style={styles.container}>
				<SectionList
					sections={this.state.CITY_NAMES}
					renderItem={(data) => this._renderItem(data)}
					ItemSeparatorComponent = {()=>this._createSeparatorComponent()}
					keyExtractor={this._keyExtractor}
					renderSectionHeader={(data)=>this._renderSectionHeader(data)}
					refreshControl = {
						<RefreshControl
							title={'loading'}
							colors={['red']}
							refreshing= { this.state.is_Loading }
							onRefresh={() => this._onRefresh()}
						/>
					}
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
    },
    sectionHeader_view:{
    	backgroundColor:'white',
    	width:width,
    	height:50,
    	alignItems:'center',
    	justifyContent:'center',
    	flex:1
    },
    sectionHeader_text:{
    	color:'black',
    }
})