import styled from 'styled-components';
import Header from "./Header";
import BackgroundTheme from './BackgroundTheme';
const Hero = styled.div`
max-width:1057px;
margin:158px auto;
background: rgba(0,0,0,0.6);
`;
const HeroHead = styled.h2`
font-size: 5rem;
font-family: 'Didact Gothic', sans-serif;
text-align:center;
padding:34px;
font-weight:bold;
color:#fff;
`;
function Main() {
    return (
        <div>
            <BackgroundTheme />
            <Header />
            <Hero>
                <HeroHead>A website by programmers, for programmers.</HeroHead>
            </Hero>
        </div>
    )
}
export default Main;