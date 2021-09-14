import React from 'react';
import { View, Image, ScrollView } from 'react-native';
import styled, {css} from '@emotion/native';
import { Dimensions } from 'react-native';
import colors from './util/colors'
import Text from './util/Text'
import SpendingSummary from './SpendingSummary';
import { SearchIcon } from "react-native-heroicons/outline";
import Pressable from './util/Pressable';

const windowWidth = Dimensions.get('window').width;

const Container = styled.View`
  background-color: ${colors.beige};
  padding-bottom: 20px;
`

const Content = styled.View`
  align-items: stretch;
`

const TransactionList = styled.View`
  background-color: white;
  margin: 20px;
  padding: 16px 12px;
  height: 600px;
  border-radius: 5px;
` 

const RowSpaceBetween = styled.View`
  flex-direction: row;
  justify-content: space-between;
`

const bgImageStyle = {
  width: windowWidth,
  height: 0.6*windowWidth,
  position: 'absolute',
  top: -35,
  zIndex: -1
}

const titleStyle = {
  fontSize: 18,
  fontWeight: 'bold',
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
          <TransactionList>
            <RowSpaceBetween>
              <Text style={titleStyle}>Recent Transactions</Text>
              <Pressable><SearchIcon color="#999999" size={18} /></Pressable>
            </RowSpaceBetween>
          </TransactionList>
        </Content>
      </Container>
    </ScrollView>
  );
}
