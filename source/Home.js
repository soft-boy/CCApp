import React from 'react';
import { View, Image, ScrollView } from 'react-native';
import styled, {css} from '@emotion/native';
import { Dimensions } from 'react-native';
import colors from './util/colors'
import SpendingSummary from './SpendingSummary';
import TransactionsList from './TransactionsList';

const windowWidth = Dimensions.get('window').width;

const Container = styled.View`
  background-color: ${colors.beige};
  padding-bottom: 20px;
`

const Content = styled.View`
  align-items: stretch;
`

const bgImageStyle = {
  width: windowWidth,
  height: 0.6*windowWidth,
  position: 'absolute',
  top: -35,
  zIndex: -1
}

const spacerHeight = 1000;

export default () => {
  return (
    <ScrollView style={css`background-color: ${colors.beige}`}>
      <Container>
        <View 
          style={{
            backgroundColor: '#EE5644',
            height: spacerHeight,
            position: 'absolute',
            top: -spacerHeight,
            left: 0,
            right: 0,
          }} 
        />
        <Image style={bgImageStyle} source={require('./sunset_bg.png')} />
        <Content>
          <SpendingSummary />
          <TransactionsList />
        </Content>
      </Container>
    </ScrollView>
  );
}
