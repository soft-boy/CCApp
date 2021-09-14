
import React from "react"
import styled from '@emotion/native';
import { SearchIcon } from "react-native-heroicons/outline";
import Text from './util/Text'
import Pressable from './util/Pressable';

const Container = styled.View`
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

const Item = styled.View`
  height: 72px;
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

export default () => {
  return (
    <Container>
      <RowSpaceBetween>
        <Text style={titleStyle}>Recent Transactions</Text>
        {/* <Pressable><SearchIcon color="#999999" size={18} /></Pressable> */}
      </RowSpaceBetween>
      <Gap />
      <Item>
        <RowSpaceBetween>
          <Text style={{fontWeight: 'bold'}}>Trader Joe's</Text>
          <Text>$20.62</Text>
        </RowSpaceBetween>
        <Text style={{color: 'grey'}}>Pending - Capitola, CA</Text>
        <Text style={{color: 'grey'}}>7 hours ago</Text>
      </Item>
      <Item>
        <RowSpaceBetween>
          <Text style={{fontWeight: 'bold'}}>Trader Joe's</Text>
          <Text>$72.30</Text>
        </RowSpaceBetween>
        <Text style={{color: 'grey'}}>Pending - Capitola, CA</Text>
        <Text style={{color: 'grey'}}>7 hours ago</Text>
      </Item>
      <Item>
        <RowSpaceBetween>
          <Text style={{fontWeight: 'bold'}}>Proper Food</Text>
          <Text>$21.73</Text>
        </RowSpaceBetween>
        <Text style={{color: 'grey'}}>Pending - San Francisco, CA</Text>
        <Text style={{color: 'grey'}}>Monday</Text>
      </Item>
      <Item>
        <RowSpaceBetween>
          <Text style={{fontWeight: 'bold'}}>WeWork</Text>
          <Text>$30.02</Text>
        </RowSpaceBetween>
        <Text style={{color: 'grey'}}>Card Number Used</Text>
        <Text style={{color: 'grey'}}>Monday</Text>
      </Item>
    </Container>
  )
}