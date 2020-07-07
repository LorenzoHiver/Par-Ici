import React, { memo } from 'react';
import styled from '@emotion/styled';

import { Flex, FlexColumn } from '../Commons/Flex.commons';
import Header from '../Components/Header.component';
import StepContainer from '../Components/StepContainer.component';

const Container = styled.div`
    display: flex;
    font-family: 'Ubuntu', sans-serif;
    width: 100%;
    height: 100vh;
    background-image: url("./images/bg.svg");
    background-size: cover;
    background-position-y: -85px;
    background-position-x: 0px;
    align-items: flex-start;
    flex-direction: column;
    padding: 2rem 16%;
`;

const SubTitle = styled.h2`
    font-size: 1.3rem;
    color: #f8f8f8;
    font-weight: 200;
    padding: 2.5rem 0rem;
`;

const Strong = styled.strong`
    font-weight: 500;
`;

const P = styled.p`
    position: fixed;
    color: #f8f8f8;
    left: 20px;
    font-size: .8rem;
    top: calc(100% - (1rem + 20px));
`;

const Icon = styled.img`
    position: fixed;
    left: 50%;
    transform: translateY(-50%);
    top: 94%;
`;

const Index = () => {
    return (
        <>
            <Container>
                <Flex>
                    <Header />
                </Flex>
                <FlexColumn>
                    <SubTitle>Choisissez <Strong>la date</Strong> de votre prochain <Strong>départ</Strong> !</SubTitle>
                    <StepContainer />
                </FlexColumn>
                <P>Made with ❤️ by Lorenzo H. & Dylan L.</P>
                <Icon src="./images/eiffel.svg" />
            </Container>
        </>
    )
}
export default memo(Index);
