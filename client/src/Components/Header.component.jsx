import React, { memo } from 'react';
import styled from '@emotion/styled';

const HeaderContainer = styled.header`
    width: 100%;
    height: 8vh;
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const HeaderNav = styled.nav`
    display: flex;
    align-items: center;
    justify-content: space-around;
    color: #f8f8f8;
    list-style: none;
`;


const Header = () => (
    <HeaderContainer>
            <img src="./images/logo.svg" alt="Logo du site Par ici" />
            <HeaderNav>
                <li style={{ fontSize: '1rem' }} >Avis</li>
                <li style={{ marginLeft: '5rem', fontWeight: '600', textDecoration: 'underline', fontSize: '1rem'}}>Déposer votre avis ?</li>
            </HeaderNav>
    </HeaderContainer>
)

export default memo(Header);
