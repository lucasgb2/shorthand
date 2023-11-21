import styled from "styled-components";


const Container = styled.div`  
  grid-area: header;       
  display: block;   
  justify-content: center;
  align-items: center;
`;

const SubTitle = styled.div` 
  display: flex ;
  height: 25% ;
  align-items: top ;
  justify-content: center;
  color: grey;
  font-size:  14px;
`

const Title = styled.div`  
  display: flex ;
  align-items: center;
  justify-content: center;
  height: 75%;

//@import url(https://fonts.googleapis.com/css?family=Montserrat);

svg {
    display: block;
    font: 10.5em 'Arial';
    width: 960px;
    height: 300px;
   margin: 0 auto;
}

.text-copy {
    fill: none;
    stroke: white;
    stroke-dasharray: 6% 29%;
    stroke-width: 2px;
    stroke-dashoffset: 0%;
    animation: stroke-offset 5.5s infinite linear;
}

.text-copy:nth-child(1){
	stroke: #d198f1;
	animation-delay: -1;
}

.text-copy:nth-child(2){
	stroke: #ac63d6;
	animation-delay: -2s;
}

.text-copy:nth-child(3){
	stroke: #a87ac2;
	animation-delay: -3s;
}

.text-copy:nth-child(4){
	stroke: #ab82c2;
	animation-delay: -4s;
}

.text-copy:nth-child(5){
	stroke: #ab65d1;
	animation-delay: -5s;
}

@keyframes stroke-offset{
	100% {stroke-dashoffset: -35%;}
}

`;



const Header = () =>{
  return (
    <Container>

        <Title>
        <div className="container">
            <svg viewBox="0 60 780 400">
              <symbol id="s-text">
                <text text-anchor="middle" x="50%" y="80%">Shorthand</text>
              </symbol>

              <g xlinkHref = "g-ants">
                <use xlinkHref="#s-text" className="text-copy"></use>
                <use xlinkHref="#s-text" className="text-copy"></use>
                <use xlinkHref="#s-text" className="text-copy"></use>
                <use xlinkHref="#s-text" className="text-copy"></use>
                <use xlinkHref="#s-text" className="text-copy"></use>
              </g>
            </svg>
          </div>   
        </Title>  
        
        <SubTitle>          
          É possível trilhar atalhos com segurança que cheguem ao mesmo destino? Sim, Shorthand, seu encurtador de links da web.
        </SubTitle>         
        
    </Container>
  );
  

}

export default Header;
