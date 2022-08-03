import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: lightgray;
`;

const Title = styled.h1`
    font-size: 50px;
    font-weight: 700;
`;

const PageNotFound = () => {
    return (
        <Container>
            <Title>
                404 Page Not Found
            </Title>
        </Container>
    )
}

export default PageNotFound