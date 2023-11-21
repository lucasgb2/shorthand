'use client';

import styled from 'styled-components';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';

const ContainerLayout = styled.div`
  height: 100vh;    
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 200px 1fr 100px;  
  grid-template-areas:
    'header'
    'main'
    'footer';
`

const Scaffold = () => {
  return (
    <ContainerLayout>
      <Header></Header>
      <Main></Main>
      <Footer></Footer>
    </ContainerLayout>
    
  )
}

export default Scaffold;
