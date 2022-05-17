import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import AppleHealthKit, {
  HealthValue,
  HealthKitPermissions,
} from 'react-native-health';

/* Permission options */
const permissions = {
  permissions: {
    read: [AppleHealthKit.Constants.Permissions.ActiveEnergyBurned],
    write: [AppleHealthKit.Constants.Permissions.ActiveEnergyBurned],
  },
} as HealthKitPermissions;

AppleHealthKit.initHealthKit(permissions, (error: string) => {
  /* Called after we receive a response from the system */

  if (error) {
    console.log('[ERROR] Cannot grant permissions!');
  }

  /* Can now read or write to HealthKit */

  // const options = {
  //   startDate: new Date(2022, 1, 1).toISOString(),
  //   // startDate: new Date(2020, 1, 1).toISOString(),
  // };

  // AppleHealthKit.getHeartRateSamples(
  //   options,
  //   (callbackError: string, results: HealthValue[]) => {
  //     /* Samples are now collected from HealthKit */
  //   },
  // );
});

export default function App() {
  // const [authStatus, setAuthStatus] = useState<any>({});

  // const handlePressGetAuthStatus = () => {
  //   AppleHealthKit.getAuthStatus(permissions, (err, result) => {
  //     if (err) {
  //       console.error(err);
  //     }
  //     setAuthStatus(result);
  //   });
  // };

  const options = {
    startDate: new Date(2020, 1, 1).toISOString(),
  };
  
  // AppleHealthKit.getHeartRateSamples(
  //   options,
  //   (callbackError: string, results: HealthValue[]) => {
  //     /* Samples are now collected from HealthKit */
  //   },
  // );
  const [calories, setCalories] = useState<any>({})
  
  const handlePressGetActiveEnergyBurned = () => {
    AppleHealthKit.getActiveEnergyBurned(
      options,
      (err: Object, results: HealthValue[]) => {
        if (err) {
          return
        }
        // console.log('calories')
        setCalories(results)
      },
    )
  }


  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
          <View style={styles.body}>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>
                React Native Health Example
              </Text>
              <Text onPress={handlePressGetActiveEnergyBurned}>
                Press me to get Calories Burned
              </Text>
              <Text style={styles.sectionDescription}>
                {JSON.stringify(calories)}
                {/* {calories == undefined ? <></> : calories} */}

              </Text>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});
