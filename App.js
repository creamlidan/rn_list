/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Button} from 'react-native';

export default class App extends Component<Props> {
  render() {
    const { navigation } = this.props;
    return (
      <View style={styles.container}>
        <Button
          title={'FlatList_demo'}
          style={styles.button}
          onPress={()=>{
            navigation.navigate('FlatListDemo')
          }}
        />
        <Button
          style={styles.button}
          title={'SwipeableFlatListDemo'} 
          onPress={()=>{
            navigation.navigate('SwipeableFlatListDemo')
          }}
        />
        <Button
          style={styles.button}
          title={'sectionListDemo'} 
          onPress={()=>{
            navigation.navigate('SectionListDemo')
          }}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  button:{
    margin:10
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
