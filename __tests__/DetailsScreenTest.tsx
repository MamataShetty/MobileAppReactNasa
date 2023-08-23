import React from 'react';
import {render} from '@testing-library/react-native';
import '@testing-library/jest-dom';
import DetailScreen from '../src/screens/DetailsScreen';
import {expect as jestExpect} from '@jest/globals';

describe('Details screen', () => {
  it('Render asteroid details', () => {
    const route = {
      params: {
        asteroidDetails: {
          name: 'PK9',
          is_potentially_hazardous_asteroid: 'yes',
          nasa_jpl_url: 'http://ssd.jpl.nasa.gov/sbdb.cgi?sstr=3542519',
        },
      },
    };

    const {getByText} = render(<DetailScreen route={route} />);
    jestExpect(getByText('Name')).toBeTruthy();
    jestExpect(getByText('PK9')).toBeTruthy();
    jestExpect(getByText('Jpl Url')).toBeTruthy();
    jestExpect(
      getByText('http://ssd.jpl.nasa.gov/sbdb.cgi?sstr=3542519'),
    ).toBeTruthy();
    jestExpect(getByText('Potentially hazardous')).toBeTruthy();
    jestExpect(getByText('Yes')).toBeTruthy();
  });
});
