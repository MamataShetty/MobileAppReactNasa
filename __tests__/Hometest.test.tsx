import React from 'react';
import {
  render,
  fireEvent,
  waitFor,
  screen,
} from '@testing-library/react-native';
import '@testing-library/jest-dom';
import Home from '../src/screens/HomeScreen';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
const mock = new MockAdapter(axios);

describe('Details screen', () => {
  afterEach(() => {
    mock.reset();
  });

  const mockData = {
    name: '433 Eros (A898 PA)',
    nasa_jpl_url: 'http://ssd.jpl.nasa.gov/sbdb.cgi?sstr=2000433',
    is_potentially_hazardous_asteroid: false,
  };

  const mockDataRandom = {
    near_earth_objects: [
      {
        id: '2000433',
        ddd: 'dsds',
      },
      {
        id: '20004234',
      },
    ],
  };

  it('Render home screen', async () => {
    const navigation = {navigate: jest.fn()};
    mock
      .onGet(
        'https://api.nasa.gov/neo/rest/v1/neo/2000433?api_key=z4PYwSCKDoq9HKxRlKvSCXP9bhDcmNTG25dxArFb',
      )
      .reply(200, mockData);

    render(<Home navigation={navigation} />);

    fireEvent.changeText(screen.getByTestId(/asteroidId/i), '2000433');
    await waitFor(() => screen.getByTestId('SubmitButton'));

    fireEvent.press(screen.getByTestId('SubmitButton'));
    // expect(navigation.navigate).toHaveBeenCalledWith('DetailsScreen', {
    //   asteroidDetails: mockData,
    // });

    expect(screen.queryByTestId('noResultLabel')).not.toBeInTheDocument();
  });

  it('APi when   failed', async () => {
    const navigation = {navigate: jest.fn()};
    mock
      .onGet(
        'https://api.nasa.gov/neo/rest/v1/neo/2000433?api_key=z4PYwSCKDoq9HKxRlKvSCXP9bhDcmNTG25dxArFb',
      )
      .reply(404, {});
    render(<Home navigation={navigation} />);
    expect(screen.queryByTestId('noResultLabel')).not.toBeInTheDocument();
  });

  it('APi when random button clicked ', async () => {
    const navigation = {navigate: jest.fn()};
    const searchAsterioDetails = jest.fn();
    render(<Home navigation={navigation} />);

    // fireEvent.changeText(screen.getByTestId('asteroidId'), 3542519);
    mock
      .onGet(
        'https://api.nasa.gov/neo/rest/v1/neo/browse?page=5&size=20&api_key=z4PYwSCKDoq9HKxRlKvSCXP9bhDcmNTG25dxArFb',
      )
      .reply(200, mockDataRandom);
    mock
      .onGet(
        'https://api.nasa.gov/neo/rest/v1/neo/2000433?api_key=z4PYwSCKDoq9HKxRlKvSCXP9bhDcmNTG25dxArFb',
      )
      .reply(200, mockData);

    fireEvent.press(screen.getByTestId('SubmitRandomAstID'));
    // expect(searchAsterioDetails).toHaveBeenCalledWith(
    //   mockDataRandom?.near_earth_objects[0].id,
    // );
    // expect(navigation.navigate).toHaveBeenCalledWith('DetailsScreen', {
    //   asteroidDetails: mockData,
    // });
  });
});
