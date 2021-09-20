import Header from "./Header.js";
import styled from "styled-components";
import BackgroundTheme from "./BackgroundTheme.js";
import { Component } from "react";
const Hero = styled.div`
max-width:500px;
margin:129px auto;
background: rgba(0,0,0,0.6);
padding: 27px;
`;
const HeroHead = styled.h2`
font-size: 3rem;
font-family: 'Didact Gothic', sans-serif;
padding:18px;
font-weight:bold;
color:#fff;
`;
const Input = styled.input`
display: block;
width: 58%;
margin: 20px auto;
padding: 16px;
border-radius: 5px;
background: #333;
border: 0px;
`;
const GreenButton = styled.button`
display: block;
width: 64%;
margin: 38px auto;
padding: 16px;
border-radius: 5px;
background: #0af05e;
border: 0px;
`;
const initialState = {
    email: '',
    password: '',
    emailError:'',
    passwordError:'',
    // redirectToHomePage: false,
    // error: false,
  }
class RegisterPage extends Component {
    constructor(props) {
      super(props);
      this.state = initialState;
    }
    render(){
        return (
            <div>
                <Header />
                <BackgroundTheme />
                <Hero>
                    <HeroHead>Sign Up</HeroHead>
                    <form onSubmit={this.handleSubmit}>
                        <Input type="email" placeholder="Email" id="email" name="email"  required />
                        <Input type="password" placeholder="Password" id="password" name="password" required />
                        <Input type="password" placeholder="Confirm Password" id="cpassword" name="cpassword" required />
                        <GreenButton type={'submit'}>Sign Up</GreenButton>
                    </form>
                </Hero>
            </div>
    
        )
    }
    }
export default RegisterPage;