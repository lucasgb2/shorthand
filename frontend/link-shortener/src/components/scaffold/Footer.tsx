import styled from "styled-components";
import Image from 'next/image';

const Container = styled.div`
  grid-area: footer;
  background-color: #ecdff1;    
  display: flex;
  align-items: center;
  justify-content: center;  
`;

const ImageTecnlogic = styled.img`
  margin: 0 auto ;
  
`

const Footer = () => {
  return (
    <Container>
      
      <Image style={{paddingRight: "20px"}} src="/nodejs_icon.png" width={90} height={90} alt="mongo"></Image>
      
      <Image style={{paddingRight: "20px"}} src="/ts_icon.png" width={30} height={30} alt="mongo"></Image>

      <Image style={{paddingRight: "20px"}} src="/mysql_icon.png" width={70} height={70} alt="mongo"></Image>

      <Image style={{paddingRight: "20px"}} src="/redis_icon.png" width={90} height={90} alt="mongo"></Image>
      
      <Image style={{paddingRight: "20px"}} src="/mongo_icon.png" width={90} height={90} alt="mongo"></Image>
      
      
      
      
    </Container>
  );
}
export default Footer;
