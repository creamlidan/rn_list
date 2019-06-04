import React,{ Component } from 'react';
import { 
	StyleSheet,
	Text, 
	View,
	FlatList,
	RefreshControl,
	ActivityIndicator,
	TouchableOpacity} from 'react-native';
const dimensions = require('Dimensions');
const {width, height} = dimensions.get('window');

export default class FlatListDemo extends Component{
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
		return (
			<TouchableOpacity
				activeOpacity={0.5}
				onPress={()=>{
					navigation.navigate('ItemInfo',{name:data.item})
				}}>
				<View style={styles.item}>
					<Text style={styles.text}>{data.item}</Text>
				</View>
			</TouchableOpacity>
		)
	}
	_onRefresh(){
		if(!this.state.is_Loading){
			this.setState({
				is_Loading:true
			})
			let CITY_NAMES = this.state.CITY_NAMES.reverse()
			this.setState({
				CITY_NAMES,
				is_Loading:false
			})
		}
	}
	_onLoadMore(){
		if(!this.state.isLoadMore && this.page <= 3){
			setTimeout(()=>{
				let CITY_N = this.state.CITY_NAMES
				CITY_NAMES = [...CITY_N,...CITY_N]
				this.page = this.page+1;
				this.setState({
					CITY_NAMES
				})
			},2000)
		}else{
			this.setState({
				showFoot:0
			})
		}
	}
	_createListFooter(){
		return(
			<View style={styles.indicatorContainer}>
				{	this.state.showFoot === 1
					&& 
					<ActivityIndicator
						style={styles.indicator}
						size = 'small'
						animating = {true}
						color = 'red'
					/>
				}
				<Text>{this.state.showFoot === 1?'正在加载更多数据...':'没有更多数据'}</Text>
			</View>
		)
	}
	_createListHeader(){
		return (
            <View style={styles.headView}>
                <Text style={{color: 'white'}}>
                    头部布局
                </Text>
            </View>
        )
	}

	_keyExtractor(item, index){
		return `index${index}`
	}

	_createSeparatorComponent(){
		return(
			<View style={{height: 5, backgroundColor: '#eeeeee'}}/>
		)
	}
	_toEnd(){
		this._flatList.scrollToEnd();
	}
	_toItem(){
		//viewPosition参数：0表示顶部，0.5表示中部，1表示底部
		this._flatList.scrollToIndex({viewPosition: 0, index: this.state.index});
	}
	render(){
		return (
			<View style={styles.container}>
				<View style={styles.topView}>
					<Text onPress={()=>{this._toEnd()}}>我是外部的头部</Text>
				</View>
				<FlatList
					data={this.state.CITY_NAMES}
					renderItem={(data) => this._renderItem(data)}
					ref={(flatList) => this._flatList = flatList}
					//不需要自定义样式的时候
					/*	refreshing = { this.state.is_Loading }
					onRefresh = {()=>{
						this.loadData();
					}}*/
					//修改loading样式
					refreshControl = {
						<RefreshControl
							title = {'loading'}
							colors = {['red']}
							tintColor = {'red'}
							refreshing = { this.state.is_Loading }
							onRefresh = {()=>{
								this._onRefresh();
							}}
						/>
					}
					ListHeaderComponent={()=> this._createListHeader()}
					ListFooterComponent = {()=> this._createListFooter()}
					ItemSeparatorComponent = {()=>this._createSeparatorComponent()}
					onEndReached ={()=>{
						this._onLoadMore();
					}}
					//horizontal = {true}
					onEndReachedThreshold={0.1}
					keyExtractor={this._keyExtractor}
					getItemLayout={(data, index) => ({
					  length:200, offset: (200 + 5) * index, index
					})}
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
		height:200,
/*		marginRight:15,
		marginLeft:15,
		marginBottom:15,*/
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
		justifyContent: 'center'
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
    }
})