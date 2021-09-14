import React from 'react';
import { Image, ScrollView } from 'react-native';
import styled, {css} from '@emotion/native';
import { Dimensions } from 'react-native';
import colors from './util/colors'
import Text from './util/Text'
import SpendingSummary from './SpendingSummary';

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

export default () => {
  return (
    <ScrollView style={css`background-color: #EE5644`}>
      <Container>
        <Image style={bgImageStyle} source={require('./sunset_bg.png')} />
        <Content>
          <SpendingSummary />
          <TransactionList>
            <RowSpaceBetween>
              <Text style={titleStyle}>Recent Transactions</Text>
              <Text>search</Text>
            </RowSpaceBetween>
          </TransactionList>
        </Content>
      </Container>
    </ScrollView>
  );
}
