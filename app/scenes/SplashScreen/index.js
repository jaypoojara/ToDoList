import React from 'react';
import styled from 'styled-components/native';
import AppContainer from '@atoms/Container';
import { colors } from '@themes';
import T from '../../components/atoms/T';

const Container = styled(AppContainer)`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${colors.primary};
`;

const SplashScreen = () => (
  <Container testID="splash-screen">
    <T id="welcome" />
  </Container>
);

export default SplashScreen;
