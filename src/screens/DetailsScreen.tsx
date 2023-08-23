import React, {useState} from 'react';
import {Text, StyleSheet, View, Image, Button, ScrollView} from 'react-native';
import axios from 'axios';

type textLabelPops = {
  label: string;
  labelData: any;
};

const CustomForm = (props: textLabelPops) => {
  return (
    <>
      <Text style={styles.text}>{props.label}</Text>
      <Text style={styles.name}>{props.labelData}</Text>
    </>
  );
};

const DetailScreen = ({route}: {route: any}) => {
  const {asteroidDetails} = route.params;

  return (
    <ScrollView>
      {asteroidDetails !== undefined && (
        <View style={styles.box}>
          <CustomForm label="Name" labelData={asteroidDetails.name} />
          <CustomForm
            label="Jpl Url"
            labelData={asteroidDetails?.nasa_jpl_url}
          />
          <CustomForm
            label="Potentially hazardous"
            labelData={
              asteroidDetails?.is_potentially_hazardous_asteroid ? 'Yes' : 'No'
            }
          />
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  box: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    marginBottom: 10,
  },
  WeatherBox: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    marginBottom: 10,
  },
  text: {
    fontWeight: '500',
    color: '#767676',
  },
  name: {
    fontWeight: '500',
    color: '#000',
    marginBottom: 20,
  },
  tinyLogo: {
    resizeMode: 'contain',
  },
});
export default DetailScreen;
