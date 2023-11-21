import { useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  grid-area: main;
  background-color: #fcf8fd;      
  
`;

const Form = styled.div`
    width: 50%;
    margin: 0 auto ;
    margin-top:  30px;
`

const Label = styled.label`
  font-size: 25px ;
  color: #ab65d1;
`

const InputLink = styled.input`
  width: 70%;
  padding: 12px 20px ;  
  margin: 8px 0;
  display: inline-block;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;  
  font-size: 20px;
  
  input.focus {
    border-color: #3f0a5e;  
  }

`

const InputLongLink = styled(InputLink)`
  color : #555455;
`

const InputShortLink = styled(InputLongLink)`
  width: 100%;  
  border: 1px solid #3f0a5e;  
  color: #3f0a5e;
  
  
`

const Button = styled.button`
  width: 25%;
  background-color: #ac63d6;
  color: white;
  padding: 14px 20px;
  margin: 8px 0;
  margin-left: 5%;
  border: none;
  border-radius: 4px;  
  cursor: pointer;  
`

const Main = () => {

  const [longUrl, setLongUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');

  const onChangeInputLongLink = (event: any) =>{
    setLongUrl(event.target.value);
  }

  const callApi = () => {
    
    const jsonLongUrl = {"url" : longUrl};
    console.log(jsonLongUrl);
    fetch('http://localhost:9000/v1/short', {           
      method: 'POST',     
      headers: { "Content-Type": "application/json" },
      body : JSON.stringify(jsonLongUrl)
    }).then(response => {
       if (response.ok) {
        return response.json();      
       }
    }).then(data => {
      console.log(data)
      if (data.hasOwnProperty('url')){
        setShortUrl(data.url);    
      } else if (data.hasOwnProperty('message')){
        alert(data.message);
      }
      
    }).catch(error => {
      alert('Humm, algo de errado ocorreu.');
      console.log(error)
    });
    
    
  }

  return (
    <Container>      
        <Form>
        <Label>Insira seu loooooooooooooooongo link</Label>
        <br />
        <InputLongLink onChange={onChangeInputLongLink} value={longUrl}></InputLongLink>
        <Button onClick={callApi}>Encurtar</Button>
        <br />
        <InputShortLink value={shortUrl} readOnly></InputShortLink>     
    
        </Form>
      
    </Container>)
}

export default Main;
