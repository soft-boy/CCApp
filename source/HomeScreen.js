import React from 'react';
import { View, Image, ScrollView } from 'react-native';
import styled, {css} from '@emotion/native';
import { Dimensions } from 'react-native';
import colors from './util/colors'
import SpendingSummaryCarousel from './SpendingSummaryCarousel';
import TransactionsList from './TransactionsList';
import { LibraryIcon, DotsVerticalIcon } from "react-native-heroicons/outline";
import Pressable from './util/Pressable';

const windowWidth = Dimensions.get('window').width;

const Container = styled.View`
  background-color: ${colors.beige};
  padding-bottom: 20px;
`

const Content = styled.View`
  align-items: stretch;
`

const Gap = styled.View`
  width: 18px;
`

const bgImageStyle = {
  width: windowWidth,
  height: 0.6*windowWidth,
  position: 'absolute',
  top: -35,
  zIndex: -1
}

const spacerHeight = 1000;

export default ({ navigation }) => {
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
          <View style={{
              marginTop: 48,
              marginRight: 20,
              flexDirection: 'row',
              justifyContent: 'flex-end'
            }}
          >
            <Pressable onPress={() => navigation.navigate('Details')}>
              <LibraryIcon color="white" />
            </Pressable>
            <Gap />
            <Pressable onPress={() => navigation.navigate('Settings')}>
              <DotsVerticalIcon color="white" />
            </Pressable>
          </View>
          <SpendingSummaryCarousel />
          <TransactionsList />
        </Content>
      </Container>
    </ScrollView>
  );
}
