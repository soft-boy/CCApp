
import React from "react"
import styled from '@emotion/native';
import { SearchIcon } from "react-native-heroicons/outline";
import Text from './util/Text'
import Pressable from './util/Pressable';
import formatMoney from "./util/formatMoney";
import moment from "moment";
import colors from "./util/colors";

const Container = styled.View`
  background-color: white;
  margin: 20px;
  padding: 16px 12px;
  min-height: 300px;
  border-radius: 5px;
` 

const RowSpaceBetween = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`

const Item = styled.View`
  height: 80px;
  background: white;
  border-bottom-width: 1px;
  border-bottom-color: 'rgb(230, 230, 230)';
  justify-content: center;
`

const Gap = styled.View`
  height: 12px;
`

const titleStyle = {
  fontSize: 22,
  fontWeight: 'bold',
}

export default (props) => {
  return (
    <Container>
      <RowSpaceBetween>
        <Text style={titleStyle}>Recent Transactions</Text>
        <Pressable><Text style={{ color: colors.starCommandBlue, fontWeight: 'bold' }}>View All</Text></Pressable>
      </RowSpaceBetween>
      <Gap />
      {props.tx.slice(0, 6).map((tx) => renderTx(tx, props.navigation))}   
    </Container>
  )
}

const renderTx = (tx, navigation) => {
  let txName = tx.merchant_name || tx.name
  let txNameArr = txName.split(' ');
  txNameArr = txNameArr.map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
  txName = txNameArr.join(' ')

  return (
    <Pressable key={tx.transaction_id} onPress={() => navigation.navigate('Transaction', { tx })}>
      <Item>
        <RowSpaceBetween>
          <Text style={{fontWeight: 'bold', fontSize: 16,}}>{txName}</Text>
          <Text style={{fontSize: 16,}}>{formatMoney(tx.amount)}</Text>
        </RowSpaceBetween>
        {/* TODO find way to fill in real card name */}
        <Text style={{color: 'grey'}}>{tx.account_id[0] === 'a' ? 'Uber Card' : 'Chase Sapphire'}</Text>
        <Text style={{color: 'grey'}}>{moment(tx.date).format('M/D/YY')}</Text>
      </Item>
    </Pressable>
  )
}