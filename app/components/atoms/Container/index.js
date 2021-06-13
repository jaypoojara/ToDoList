/**
 *
 * Container
 *
 */

import React from 'react';
import styled from 'styled-components/native';
import { SafeAreaView } from 'react-native';
import { colors } from '../../../themes';

const StyledContainer = styled.View`
  display: flex;
  flex: 1;
  flex-direction: column;
  background-color: ${colors.primary};
  padding: 10px;
  justify-content: center;
`;
const Container = ({ children }) => (
  <StyledContainer testID="container">
    <SafeAreaView style={{ flex: 1 }}>{children}</SafeAreaView>
  </StyledContainer>
);

Container.propTypes = {};

export default Container;
