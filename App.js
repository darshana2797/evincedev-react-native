/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  Dimensions,
  TouchableOpacity
} from 'react-native';

import DropDownPicker from 'react-native-dropdown-picker';

class App extends Component{ 

  constructor(props) {
    super(props);
    this.state = {
      selectedDropdownItem: '0',
      gridItemsArray: [],      
      generatedItem: null
    }
  }

  getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }

  generateRandomNumber = () => {
    //select a random number only from the obj values whose 'selected' flag is false to avoid repeated values.
    const unselectedNumbers = this.state.gridItemsArray.filter(item => !item.selected)
    const index = this.getRandomInt(unselectedNumbers.length - 1);
    const item = this.state.gridItemsArray.find((item) => item == unselectedNumbers[index]);
    item.selected = true;
    const items = [...this.state.gridItemsArray];
    this.setState({gridItemsArray: items, generatedItem: item})
  }

  onChangeDropdownValue = (item) => {
    this.setState(()=>{
      const items = []
      for (let i = 1; i <= item.value*item.value; i++) {
        items.push({value: i, selected: false})
      } 
      return {selectedDropdownItem: item.value, gridItemsArray: items, generatedItem: null}
    })
  }

  render() {
    const screenWidth = Dimensions.get('window').width
    let selectedDropdownItem = this.state.selectedDropdownItem

    let dropdownValues = []
    for (let i = 2; i <=9; i++) {
      dropdownValues.push({label: ''+i, value: ''+i})
    }

    const renderItem = ({ item }) => (
      <TouchableOpacity 
        style={[styles.grid,{width: screenWidth / selectedDropdownItem, backgroundColor: item.selected ? 'green': 'white'}]}
        onPress = {(event) => {
           this.state.generatedItem == item ? this.setState({generatedItem: null}) : null
        }}>
        <Text>{item.value}</Text>
      </TouchableOpacity>
    );

    return (
      <View style={styles.body}>

        <DropDownPicker
            items={dropdownValues}
            containerStyle={[styles.dropdownContainer, {width: screenWidth - 30}]}
            style={styles.dropDownStyle}
            itemStyle={styles.itemStyle}
            dropDownStyle={styles.dropDownStyle}
            onChangeItem={item => {this.onChangeDropdownValue(item)}}
        />
      
        <View style={styles.flexContainer}>
          <FlatList
            key={this.state.selectedDropdownItem}
            data={this.state.gridItemsArray}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            numColumns={ this.state.selectedDropdownItem}
          />
        </View>

        {this.state.selectedDropdownItem !== '0' &&
          <TouchableOpacity
            style={[styles.generateButton, {backgroundColor: this.state.generatedItem !== null ? 'grey' : 'green'}]}
            onPress={(event)=>this.generateRandomNumber()}
            title="Generate"
            color="#fff"
            accessibilityLabel="Generate"
            disabled={this.state.generatedItem !== null}
          >
            <Text style={styles.buttonTextStyle}>GENERATE A RANDOM NUMBER</Text>
          </TouchableOpacity>
        }

      </View>
    );
  }
};

const styles = StyleSheet.create({
  body: {
    backgroundColor: '#fff',
    display: 'flex',
    justifyContent: 'center',
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width
  },
  flexContainer: {
    display: 'flex',
    justifyContent: "space-between",
    overflow: 'scroll'
  },
  generateButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: 35,
    width: Dimensions.get('window').width - 70,
    margin: 35,
    borderRadius: 5,
    backgroundColor: '#00832E'
  },
  buttonTextStyle: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16
  },
  grid: {
    flex: 1, 
    height: 30, 
    borderWidth: 1, 
    borderColor: '#000', 
    alignItems: 'center', 
    justifyContent: 'center',
    borderRadius: 2
  },
  itemStyle: {
    justifyContent: 'flex-start'
  },
  dropDownStyle: {
    backgroundColor: '#fafafa'
  },
  dropdownContainer: {
    height: 40, 
    marginHorizontal: 15, 
    marginVertical: 10
  }

});

export default App;
