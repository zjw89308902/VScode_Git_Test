/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {Component} from 'react';
import {Text,View,Modal,TouchableOpacity,ScrollView,Image,
} from 'react-native';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {allSon: [], showImg: false, selImg: ''};
  }

  UNSAFE_componentWillMount() {
    fetch('http://www.cjlly.com:3041/record')
      .then(res => res.json())
      .then(res => {
        this.setState({
          allSon: res,
        });
      });
  }

  delete = item => {
    var res = JSON.parse(JSON.stringify(this.state.allSon));
    for (let i = 0; i < this.state.allSon.length; i++) {
      if (item.id === this.state.allSon[i].id) {
        res.splice(i, 1);
      }
    }
    this.setState({
      allSon: res,
    });
  };

  renderSingerSon = ({item, index}) => {
    return (
      <View
        key={index}
        style={{
          height: 95,
          backgroundColor: '#fff',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottomColor: '#333',
          borderBottomWidth: 1,
        }}>
        <Text
          style={{
            marginRight: 5,
            color: '#333',
          }}>
          {index}
        </Text>
        <Image
          source={{uri: item.img}}
          style={{
            height: 90,
            width: 134,
            borderWidth: 4,
            borderColor: '#333',
          }}
        />

        <Text
          style={{
            fontSize: 16,
            flex: 1,
            textAlign: 'left',
            color: '#333',
            paddingLeft: 20,
          }}>
          {item.name}
        </Text>

        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <TouchableOpacity
            style={{
              width: 50,
              height: 80,
              backgroundColor: '#fff',
              justifyContent: 'center',
              marginRight: 10,
            }}>
            <Text
              style={{
                height: 30,
                width: 50,
                backgroundColor: '#333',
                color: '#fff',
                textAlign: 'center',
                lineHeight: 30,
                borderRadius: 30,
              }}
              onPress={() => {
                this.delete(item);
              }}>
              删除
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  render() {
    let {showImg, selImg} = this.state;
    return (
      <ScrollView style={{backgroundColor: '#333'}}>
        <Text
          style={{
            fontSize: 20,
            lineHeight: 25,
            paddingTop: 10,
            paddingLeft: 10,
            width: '100%',
            textAlign: 'center',
            color: '#4fc08d',
          }}>
          列表
        </Text>
        {this.state.allSon.map((item, index) => {
          return (
            <TouchableOpacity
              key={index}
              onPress={() => {
                console.log(item);
                this.setState({
                  showImg: true,
                  selImg: item.img,
                });
              }}>
              {this.renderSingerSon({item, index})}
            </TouchableOpacity>
          );
        })}
        <Modal
          animationType="slide"
          transparent={false}
          visible={showImg}
          onRequestClose={() => {
            this.setState({
              showImg: false,
            });
          }}>
          <View style={{marginTop: 22, flex: 1, alignItems: 'center'}}>
            <Image
              source={{uri: selImg}}
              style={{height: 305, width: 305, marginTop: 100}}
            />
          </View>
        </Modal>
      </ScrollView>
    );
  }
}
module.exports = App;

