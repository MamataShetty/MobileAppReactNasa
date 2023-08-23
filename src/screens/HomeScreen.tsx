import React, {FC, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  ScrollView,
} from 'react-native';
import axios from 'axios';

const HomeScreen = ({navigation}: {navigation: any}) => {
  const [asteroidId, setAsterioId] = useState('');
  const [searchresult, setSearchresultMessage] = useState('');

  const searchAsterioDetails = async (astId: any) => {
    try {
      setSearchresultMessage('');
      let endpoint = `https://api.nasa.gov/neo/rest/v1/neo/${astId}?api_key=z4PYwSCKDoq9HKxRlKvSCXP9bhDcmNTG25dxArFb`;
      const response = await axios.get(endpoint);

      navigation.navigate('DetailsScreen', {
        asteroidDetails: response?.data,
      });
    } catch (error) {
      // console.log(error?.response);
      setSearchresultMessage(
        'Result not found for above id please try for other data',
      );
    }
  };

  const searchRandomAsteroid = async () => {
    try {
      setSearchresultMessage('');
      let TotalPage = Math.floor(1657 / 20);
      let pageNumber = Math.floor(Math.random() * TotalPage);
      let endpoint = `https://api.nasa.gov/neo/rest/v1/neo/browse?page=${pageNumber}&size=20&api_key=z4PYwSCKDoq9HKxRlKvSCXP9bhDcmNTG25dxArFb`;
      const response = await axios.get(endpoint);
      let randomSize = Math.floor(Math.random() * 20);
      searchAsterioDetails(response?.data?.near_earth_objects[randomSize]?.id);
    } catch (error) {
      setSearchresultMessage('Error in generating random Id');
    }
  };

  return (
    <>
      <View
        style={{
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'center',
          height: 100,
          padding: 20,
          backgroundColor: 'white',
        }}>
        <SafeAreaView>
          <Text style={styles.textstyle}>Asteroid ID</Text>
          <TextInput
            style={styles.input}
            testID="asteroidId"
            keyboardType="numeric"
            value={asteroidId}
            onChangeText={text => {
              setAsterioId(text);
            }}
            placeholder="Enter Asteroid ID"
          />
          <View style={styles.row}>
            <View style={{marginRight: '2%', width: '48%'}}>
              <TouchableOpacity
                testID="SubmitButton"
                style={
                  asteroidId === ''
                    ? styles.buttonPrimaryDisable
                    : styles.buttonPrimary
                }
                onPress={() => searchAsterioDetails(asteroidId)}>
                <Text style={styles.buttonText}>Submit</Text>
              </TouchableOpacity>
            </View>
            <View style={{width: '48%'}}>
              <TouchableOpacity
                testID="SubmitRandomAstID"
                style={styles.buttonWrapper}
                onPress={() => searchRandomAsteroid()}>
                <Text style={styles.buttonText}>Random Asteroid</Text>
              </TouchableOpacity>
            </View>
          </View>
          {searchresult !== '' && (
            <Text
              accessibilityLabel="noResultLabel"
              style={styles.textstyle}
              testID="noResult">
              {searchresult}
            </Text>
          )}
        </SafeAreaView>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  input: {
    borderColor: '#ddd',
    borderRadius: 10,
    height: 40,
    borderWidth: 1,
    padding: 10,

    alignItems: 'center',
    borderBottomWidth: 1.5,
    fontSize: 16,
    justifyContent: 'center',
    margin: 5,
    paddingVertical: 10,
  },
  textstyle: {
    paddingBottom: 0,
    fontSize: 15,
    color: '#000',
    margin: 0,
    marginBottom: 15,
  },
  buttonWrapper: {
    backgroundColor: '#000',
    borderRadius: 5,
    marginTop: 25,
    alignItems: 'center',
    padding: 10,
    marginBottom: 20,
  },
  buttonPrimary: {
    backgroundColor: '#895cf8',
    borderRadius: 5,
    marginTop: 25,
    alignItems: 'center',
    padding: 10,
    marginBottom: 20,
  },

  buttonPrimaryDisable: {
    opacity: 0.8,
    backgroundColor: '#895cf8',
    borderRadius: 5,
    marginTop: 25,
    alignItems: 'center',
    padding: 10,
    marginBottom: 20,
  },
  buttonText: {
    color: 'white',
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});

export default HomeScreen;
