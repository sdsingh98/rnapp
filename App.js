
import React, { Component } from 'react';
import { Alert,AppRegistry, Text, TextInput, Button, StyleSheet, View } from 'react-native';
import { StackNavigator } from 'react-navigation';
import  CheckBox  from 'react-native-check-box';

// First Page
class FirstPage extends Component {
  constructor(props) {
    super(props);
    this.state = {text: ''};
  }
  static navigationOptions = {
    title: 'Home',
  };

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <TextInput
          style={{height: 40}}
          placeholder="Enter Name"
          onChangeText ={(textN) => this.setState({textN})}
        />
        <Text>
    	Your Name is : {this.state.textN}
        </Text>
        <TextInput
          style={{height: 80}}
          placeholder="Enter Address"
          onChangeText ={(textA) => this.setState({textA})}
        />
        <Text>
    	Your Address is : {this.state.textA}
        </Text>
        <Button
          onPress={() => navigate('SecondPage')}
          title="Food Joint"
        />
        <Button
          onPress={() => navigate('ThirdPage')}
          title="Wine Shop"
        />
      </View>
    );
  }
}

// Second Page
class SecondPage extends Component {
  static navigationOptions = {
    title: 'Food Shop',
  };
  constructor(props) {
    super(props);
    this.state = {
      text: '',
    };
  }
  onClickEgg()
  {
  //  this.props.isChecked = !this.props.isChecked;
    Alert.alert('Egg selected!');
    this.setState({
      text: 'Egg'
    })
  }
  onClickFF()
  {
  //  this.props.isChecked = !this.props.isChecked;
    Alert.alert('Fast Food selected!');
    this.setState({
      text: 'Fast Food'
    })
  }
  onClickD()
  {
  //  this.props.isChecked = !this.props.isChecked;
    Alert.alert('Dinner selected!');
    this.setState({
      text: 'Dinner'
    })
  }
  onClickVeg()
  {
  //  this.props.isChecked = !this.props.isChecked;
    Alert.alert('Veg selected!');
    this.setState({
      text: 'Veg'
    })
  }


  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style = {styles.container}>
      <Text>
      Available Food Options
      Selection: {this.state.test}
      </Text>
      <TextInput
        style={{height: 80}}
        placeholder="Enter Timing"
        onChangeText ={(textA) => this.setState({textA})}
      />
      <Text>
    Your Timing is : {this.state.textA}
      </Text>
        <CheckBox
          style={{flex: 1, padding: 10}}
          onClick={()=>this.onClickEgg()}
          isChecked={false}
          leftText={'Egg'}
        />
        <CheckBox
          style={{flex: 1, padding: 10}}
          onClick={()=>this.onClickFF()}
          isChecked={false}
          leftText={'Fast Food'}
        />
        <CheckBox
          style={{flex: 1, padding: 10}}
          onClick={()=>this.onClickD()}
          isChecked={false}
          leftText={'Dinner'}
        />
        <CheckBox
          style={{flex: 1, padding: 10}}
          onClick={()=>this.onClickVeg()}
          isChecked={false}
          leftText={'Veg'}
        />
        <Button
          onPress={() => navigate('FirstPage')}
          title="Save"
        />
      </View>

    );
  }
}
class ThirdPage extends Component {
  static navigationOptions = {
    title: 'Wine Shop',
  };
  constructor(props) {
    super(props);
    this.state = {
      text: '',
    };
  }
  onClickType()
  {
  //  this.props.isChecked = !this.props.isChecked;
    Alert.alert('Only Beer selected!');
    this.setState({
      text: 'Beer'
    })
  }
  onClickIce()
  {
  //  this.props.isChecked = !this.props.isChecked;
    Alert.alert('Ice cubes Available!');
    this.setState({
      text: 'Ice Available'
    })
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
    <View style = {styles.container}>
        <TextInput
        style={{height: 80}}
        placeholder="Enter Timing"
        onChangeText ={(textA) => this.setState({textA})}
        />
        <Text>
        Your Timing is : {this.state.textA}
        </Text>
        <CheckBox
          style={{flex: 1, padding: 10}}
          onClick={()=>this.onClickType()}
          isChecked={false}
          leftText={'Only Beer?'}
        />
        <CheckBox
          style={{flex: 1, padding: 10}}
          onClick={()=>this.onClickIce()}
          isChecked={false}
          leftText={'Ice?'}
        />
        <Button
          onPress={() => navigate('FirstPage')}
          title="Save"
        />
    </View>
    );
  }
}


const SimpleApp = StackNavigator({
  FirstPage: { screen: FirstPage},
  SecondPage: { screen: SecondPage},
  ThirdPage: { screen: ThirdPage},
});


const styles = StyleSheet.create({
  container: {
   flex: 1,
   justifyContent: 'center',
  },
  buttonContainer: {
    margin: 20
  },
  alternativeLayoutButtonContainer: {
    margin: 20,
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
})

export default SimpleApp;
AppRegistry.registerComponent('Shop', () => SimpleApp);
