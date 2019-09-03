import React from 'react';
import { Text } from 'react-native';
import { Container, Content } from 'native-base';
import { Block, Header } from '../../components';

const License: React.FC = () => {
  return (
    <Container>
      <Header />
      <Content contentContainerStyle={{ flex: 1 }}>
        <Block center>
          <Text>License Screen</Text>
        </Block>
      </Content>
    </Container>
  );
};

export default License;
