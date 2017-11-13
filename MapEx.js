import React, { Component } from 'react';
import { AppRegistry, Alert, StyleSheet, View, Dimensions, Text } from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import LocationServicesDialogBox from "react-native-android-location-services-dialog-box";
import BatteryStatus from '@remobile/react-native-battery-status';
import RNRestart from 'react-native-restart';
const ASPECT_RATIO = 0.5;
const LATITUDE = 0;
const LONGITUDE = 0;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
export default class MapEx2 extends Component {
  constructor() {
    super();
    this.state = {
      region: {
        latitude: LATITUDE,
        longitude: LONGITUDE,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      },
      locCheck: {
        value: false,
      }
    };
  }
getPos()
{
  console.log(this.state.region.latitude);
}

  setCurrentPos(){
    console.log(this.state.region.latitude);
    console.log(this.state.region.longitude);
    navigator.geolocation.getCurrentPosition(
      position => {
        this.setState({
          region: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
          }
        });
      },
    (error) => console.log(error.message),
    { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
    );
  }
onBatteryStatus(info) {
    console.log(info.level+"%");
    Alert.alert("Your Battery Level is: "+info.level+"%");
}
onBatteryLow(info) {
    console.log(info.level+"%");
    Alert.alert("Your battery is low: "+info.level+"%!");
}
onBatteryCritical(info) {
    console.log(info.level+"%");
    Alert.alert("Your battery is critically low: "+info.level+"%!");
}
register() {
    BatteryStatus.register({
        onBatteryStatus: this.onBatteryStatus,
        onBatteryLow: this.onBatteryLow,
        onBatteryCritical: this.onBatteryCritical,
    });
}
unregister() {
    BatteryStatus.unregister();
}
  componentDidMount() {
    this.register();
    setInterval(() => this.setCurrentPos(), 1000);
    LocationServicesDialogBox.checkLocationServicesIsEnabled({
            message: "<h2>Use Location ?</h2>This app wants to change your device settings:<br/><br/>Use GPS, Wi-Fi, and cell network for location<br/><br/><a href='#'>Learn more</a>",
            ok: "Yes",
            cancel: "No",
            enableHighAccuracy: true, // true => GPS AND NETWORK PROVIDER, false => ONLY GPS PROVIDER
            showDialog: true, // false => Opens the Location access page directly
            openLocationServices: true // false => Directly catch method is called if location services are turned off
        }).then(function(success) {
//x          RNRestart.Restart();
          console.log("enabled");

    navigator.geolocation.getCurrentPosition(
      position => {
        this.setState({
          region: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
          }
        });
      },
    (error) => console.log(error.message),
    { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
    );
});

    this.watchID = navigator.geolocation.watchPosition(

      position => {
        this.setState({
          region: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
          }
        });
      }
    );
  }
  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchID);
  }
  render() {
    return (
      <View>
      <MapView
        provider={ PROVIDER_GOOGLE }
        style={ styles.container }
        showsUserLocation={ true }
        region={ this.state.region }
        onRegionChange={ this.setCurrentPos() }
        onRegionChangeComplete={ this.setCurrentPos() }
      >
      <MapView.Marker draggable
        coordinate={ this.state.region }
        />
      </MapView>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
  }
});
AppRegistry.registerComponent('MapEx2', () => MapEx2);
