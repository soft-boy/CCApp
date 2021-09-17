
import React from "react"
import styled from '@emotion/native';
import { SearchIcon } from "react-native-heroicons/outline";
import Text from './util/Text'
import Pressable from './util/Pressable';
import formatMoney from "./util/formatMoney";

const Container = styled.View`
  background-color: white;
  margin: 20px;
  padding: 16px 12px;
  ${'' /* height: 600px; */}
  border-radius: 5px;
` 

const RowSpaceBetween = styled.View`
  flex-direction: row;
  justify-content: space-between;
`

const Item = styled.View`
  height: 80px;
  background: white;
  border-bottom-width: 1px;
  border-bottom-color: 'rgb(211, 211, 211)';
  justify-content: center;
`

const Gap = styled.View`
  height: 12px;
`

const titleStyle = {
  fontSize: 18,
  fontWeight: 'bold',
}

export default (props) => {
  return (
    <Container>
      <RowSpaceBetween>
        <Text style={titleStyle}>Recent Transactions</Text>
        {/* <Pressable><SearchIcon color="#999999" size={18} /></Pressable> */}
      </RowSpaceBetween>
      <Gap />
      {props.tx.map(renderTx)}   
    </Container>
  )
}

const renderTx = (tx) => (
  <Item>
    <RowSpaceBetween>
      <Text style={{fontWeight: 'bold', fontSize: 16,}}>{tx.merchant_name}</Text>
      <Text style={{fontSize: 16,}}>{formatMoney(tx.amount)}</Text>
    </RowSpaceBetween>
    <Text style={{color: 'grey'}}>{tx.payment_channel}</Text>
    <Text style={{color: 'grey'}}>{tx.date}</Text>
  </Item>
)