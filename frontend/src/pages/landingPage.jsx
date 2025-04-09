import React, { useState, useEffect } from 'react';
import styled, { createGlobalStyle, ThemeProvider } from 'styled-components';

// Import icons
import { MdOutlineLightMode } from "react-icons/md";
import { MdOutlineDarkMode } from "react-icons/md";
import { GrGallery } from "react-icons/gr";
import { GiMagnifyingGlass } from "react-icons/gi";
import { GiCog } from "react-icons/gi";
import { LuFileSliders } from "react-icons/lu";
import { GrGlobe } from "react-icons/gr";
import { GiPadlock } from "react-icons/gi";
import { BsEnvelopeAt } from "react-icons/bs";
import { ImMobile } from "react-icons/im";
import { MdPinDrop } from "react-icons/md";
import { IoLogoInstagram } from "react-icons/io5";
import { LiaFacebookSquare } from "react-icons/lia";
import { LiaPinterestSquare } from "react-icons/lia";
import { MdNotifications } from "react-icons/md";
import { FiClock } from "react-icons/fi";

// Import images
import iconImage from '../assets/icon.jpeg';
import heroImage from '../assets/hero.jpeg';
import pic1Image from '../assets/pic1.jpeg';
import pic2Image from '../assets/pic2.jpeg';
import pic3Image from '../assets/pic3.jpeg';

// Themes for light and dark mode
const lightTheme = {
  primary: '#ffffff',
  secondary: '#f8f9fa',
  text: '#333333',
  accent: '#4e7a9e',
  navBg: 'rgba(255, 255, 255, 0.9)',
  cardBg: '#ffffff',
  cardShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  footerBg: '#f1f1f1',
};

const darkTheme = {
  primary: '#121212',
  secondary: '#1e1e1e',
  text: '#e0e0e0',
  accent: '#6ba0c7',
  navBg: 'rgba(18, 18, 18, 0.95)',
  cardBg: '#1e1e1e',
  cardShadow: '0 4px 6px rgba(0, 0, 0, 0.3)',
  footerBg: '#0a0a0a',
};

// Global styles
const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Montserrat', sans-serif;
  }

  body {
    background-color: ${props => props.theme.primary};
    color: ${props => props.theme.text};
    transition: all 0.3s ease;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: 'Playfair Display', serif;
    font-weight: 500;
  }
`;

// Styled Components
const NavBar = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem 5%;
  background-color: ${props => props.theme.navBg};
  backdrop-filter: blur(8px);
  z-index: 1000;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;
`;

const LogoImage = styled.img`
  height: 40px;
  width: auto;
`;

const LogoText = styled.h1`
  font-size: 1.8rem;
  font-weight: 600;
  letter-spacing: 1px;
`;

const ThemeToggle = styled.button`
  background: none;
  border: none;
  color: ${props => props.theme.text};
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
`;

const HeroSection = styled.section`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  position: relative;
  padding: 0 1rem;
  margin-bottom: 2rem;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: url(${heroImage});
    background-size: cover;
    background-position: center;
    filter: brightness(0.7);
    z-index: -1;
  }
`;

const HeroContent = styled.div`
  max-width: 800px;
  z-index: 1;
  padding: 2rem;
  border-radius: 8px;
  background-color: rgba(0, 0, 0, 0.6);
`;

const HeroTitle = styled.h1`
  font-size: 3.5rem;
  margin-bottom: 1.5rem;
  color: white;
  
  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const HeroSubtitle = styled.p`
  font-size: 1.5rem;
  margin-bottom: 2rem;
  color: #f0f0f0;
  line-height: 1.6;
  
  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
`;

const ComingSoonTag = styled.div`
  background-color: ${props => props.theme.accent};
  color: white;
  font-size: 1.2rem;
  font-weight: 600;
  padding: 0.5rem 1.5rem;
  border-radius: 30px;
  margin-bottom: 1.5rem;
  display: inline-flex;
  align-items: center;
  gap: 8px;
`;

const CTAButton = styled.button`
  padding: 1rem 2rem;
  font-size: 1rem;
  font-weight: 600;
  background-color: ${props => props.theme.accent};
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  }
`;

const SectionTitle = styled.h2`
  font-size: 2.2rem;
  text-align: center;
  margin-bottom: 3rem;
  position: relative;
  padding-bottom: 1rem;
  
  &:after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 80px;
    height: 3px;
    background-color: ${props => props.theme.accent};
  }
`;

const Section = styled.section`
  padding: 5rem 5%;
  transition: all 0.3s ease;
  
  &:nth-child(even) {
    background-color: ${props => props.theme.secondary};
  }
`;

const FeaturesContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const FeatureCard = styled.div`
  background-color: ${props => props.theme.cardBg};
  border-radius: 8px;
  padding: 2rem;
  box-shadow: ${props => props.theme.cardShadow};
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
  }
`;

const FeatureIcon = styled.div`
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
  color: ${props => props.theme.accent};
  display: flex;
  align-items: center;
`;

const FeatureTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 1rem;
`;

const FeatureDescription = styled.p`
  font-size: 1rem;
  line-height: 1.6;
  color: ${props => props.isDark ? '#b0b0b0' : '#666'};
`;

const GalleryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
  max-width: 1200px;
  margin: 0 auto;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const GalleryItem = styled.div`
  position: relative;
  border-radius: 8px;
  overflow: hidden;
  aspect-ratio: 3/2;
  cursor: pointer;
  
  &:hover img {
    transform: scale(1.05);
  }
  
  &:hover .overlay {
    opacity: 1;
  }
`;

const GalleryImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
`;

const GalleryOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 1.5rem;
  opacity: 0;
  transition: opacity 0.3s ease;
`;

const GalleryTitle = styled.h4`
  color: white;
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
`;

const GalleryMeta = styled.p`
  color: #d0d0d0;
  font-size: 0.9rem;
`;

const SubscribeSection = styled.section`
  padding: 5rem 5%;
  background-color: ${props => props.theme.secondary};
  text-align: center;
`;

const SubscribeContainer = styled.div`
  max-width: 700px;
  margin: 0 auto;
`;

const SubscribeDescription = styled.p`
  font-size: 1.2rem;
  line-height: 1.8;
  margin-bottom: 2.5rem;
  color: ${props => props.isDark ? '#b0b0b0' : '#666'};
`;

const SubscribeForm = styled.form`
  display: flex;
  max-width: 500px;
  margin: 0 auto;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
  }
`;

const SubscribeInput = styled.input`
  flex: 1;
  padding: 1rem 1.5rem;
  border-radius: 4px 0 0 4px;
  border: 1px solid ${props => props.isDark ? '#555' : '#ddd'};
  border-right: none;
  background-color: ${props => props.isDark ? '#333' : '#fff'};
  color: ${props => props.theme.text};
  font-size: 1rem;
  
  &:focus {
    outline: none;
    border-color: ${props => props.theme.accent};
  }
  
  @media (max-width: 768px) {
    border-radius: 4px;
    border-right: 1px solid ${props => props.isDark ? '#555' : '#ddd'};
  }
`;

const SubscribeButton = styled.button`
  padding: 1rem 2rem;
  background-color: ${props => props.theme.accent};
  color: white;
  border: none;
  border-radius: 0 4px 4px 0;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  
  &:hover {
    background-color: ${props => props.isDark ? '#5a90b7' : '#3a6a8e'};
  }
  
  @media (max-width: 768px) {
    border-radius: 4px;
  }
`;

const LaunchCountdown = styled.div`
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin: 3rem 0;
  
  @media (max-width: 768px) {
    gap: 1rem;
  }
`;

const CountdownItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CountdownNumber = styled.div`
  font-size: 3rem;
  font-weight: 700;
  color: ${props => props.theme.accent};
  line-height: 1;
  margin-bottom: 0.5rem;
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const CountdownLabel = styled.div`
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: ${props => props.isDark ? '#999' : '#777'};
`;

const Footer = styled.footer`
  background-color: ${props => props.theme.footerBg};
  padding: 3rem 5%;
  text-align: center;
`;

const FooterLogo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.8rem;
  margin-bottom: 2rem;
`;

const FooterContent = styled.div`
  max-width: 600px;
  margin: 0 auto;
`;

const FooterText = styled.p`
  font-size: 0.9rem;
  margin-bottom: 1.5rem;
  color: ${props => props.isDark ? '#999' : '#777'};
`;

const SocialLinks = styled.div`
  display: flex;
  justify-content: center;
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

const SocialLink = styled.a`
  color: ${props => props.theme.text};
  font-size: 1.8rem;
  transition: color 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    color: ${props => props.theme.accent};
  }
`;

const Copyright = styled.p`
  font-size: 0.8rem;
  color: ${props => props.isDark ? '#777' : '#999'};
`;

// Main Landing Page Component
function LandingPage() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Check user's preferred theme on initial load
  useEffect(() => {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setIsDarkMode(prefersDark);
  }, []);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const theme = isDarkMode ? darkTheme : lightTheme;

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <NavBar>
        <Logo>
          <LogoImage src={iconImage} alt="Shutter Space Logo" />
          <LogoText>Shutter Space</LogoText>
        </Logo>
        <ThemeToggle onClick={toggleTheme}>
          {isDarkMode ? <MdOutlineLightMode /> : <MdOutlineDarkMode />}
        </ThemeToggle>
      </NavBar>

      <HeroSection>
        <HeroContent>
          <ComingSoonTag>
            <FiClock /> Coming Soon
          </ComingSoonTag>
          <HeroTitle>Shutter Space</HeroTitle>
          <HeroSubtitle>
            A professional photography portfolio platform designed to showcase your best work with style and elegance.
          </HeroSubtitle>
          <CTAButton onClick={() => document.getElementById('subscribe').scrollIntoView({ behavior: 'smooth' })}>
            Get Early Access
          </CTAButton>
        </HeroContent>
      </HeroSection>

      <Section>
        <SectionTitle>What to Expect</SectionTitle>
        <FeaturesContainer>
          <FeatureCard>
            <FeatureIcon>
              <GrGallery size={42} />
            </FeatureIcon>
            <FeatureTitle>Responsive Galleries</FeatureTitle>
            <FeatureDescription isDark={isDarkMode}>
              Showcase your work with grid, masonry, or carousel layouts that adapt to any screen size with smooth animations.
            </FeatureDescription>
          </FeatureCard>

          <FeatureCard>
            <FeatureIcon>
              <GiMagnifyingGlass size={42} />
            </FeatureIcon>
            <FeatureTitle>Advanced Lightbox</FeatureTitle>
            <FeatureDescription isDark={isDarkMode}>
              High-resolution zoom and pan capabilities let viewers appreciate every detail of your photography.
            </FeatureDescription>
          </FeatureCard>

          <FeatureCard>
            <FeatureIcon>
              <GiCog size={42} />
            </FeatureIcon>
            <FeatureTitle>EXIF Data Display</FeatureTitle>
            <FeatureDescription isDark={isDarkMode}>
              Show camera settings with visual indicators to share your technical process with viewers and students.
            </FeatureDescription>
          </FeatureCard>

          <FeatureCard>
            <FeatureIcon>
              <LuFileSliders size={42} />
            </FeatureIcon>
            <FeatureTitle>Before/After Slider</FeatureTitle>
            <FeatureDescription isDark={isDarkMode}>
              Demonstrate your editing skills with an interactive comparison slider showcasing your pre and post-processing work.
            </FeatureDescription>
          </FeatureCard>

          <FeatureCard>
            <FeatureIcon>
              <GrGlobe size={42} />
            </FeatureIcon>
            <FeatureTitle>Location Mapping</FeatureTitle>
            <FeatureDescription isDark={isDarkMode}>
              Plot your photoshoots on interactive maps to tell the story behind your journeys and photography locations.
            </FeatureDescription>
          </FeatureCard>

          <FeatureCard>
            <FeatureIcon>
              <GiPadlock size={42} />
            </FeatureIcon>
            <FeatureTitle>Client Access Portal</FeatureTitle>
            <FeatureDescription isDark={isDarkMode}>
              Securely share private galleries with clients using password protection and customized access controls.
            </FeatureDescription>
          </FeatureCard>
        </FeaturesContainer>
      </Section>

      <Section>
        <SectionTitle>Sneak Peek</SectionTitle>
        <GalleryGrid>
          <GalleryItem>
            <GalleryImage src={pic1Image} alt="Photography sample 1" />
            <GalleryOverlay className="overlay">
              <GalleryTitle>Urban Exploration</GalleryTitle>
              <GalleryMeta>City Architecture • Sony A7IV</GalleryMeta>
            </GalleryOverlay>
          </GalleryItem>

          <GalleryItem>
            <GalleryImage src={pic2Image} alt="Photography sample 2" />
            <GalleryOverlay className="overlay">
              <GalleryTitle>Natural Landscapes</GalleryTitle>
              <GalleryMeta>Mountain Range • Canon EOS R5</GalleryMeta>
            </GalleryOverlay>
          </GalleryItem>

          <GalleryItem>
            <GalleryImage src={pic3Image} alt="Photography sample 3" />
            <GalleryOverlay className="overlay">
              <GalleryTitle>Portrait Session</GalleryTitle>
              <GalleryMeta>Studio Lighting • Nikon Z6</GalleryMeta>
            </GalleryOverlay>
          </GalleryItem>
        </GalleryGrid>
      </Section>

      <SubscribeSection id="subscribe">
        <SubscribeContainer>
          <SectionTitle>Be the First to Know</SectionTitle>
          <SubscribeDescription isDark={isDarkMode}>
            Join our waitlist to receive exclusive updates and be the first to know when Shutter Space launches. Early subscribers will receive priority access and special features.
          </SubscribeDescription>

          <LaunchCountdown>
            <CountdownItem>
              <CountdownNumber>30</CountdownNumber>
              <CountdownLabel isDark={isDarkMode}>Days</CountdownLabel>
            </CountdownItem>
            <CountdownItem>
              <CountdownNumber>12</CountdownNumber>
              <CountdownLabel isDark={isDarkMode}>Hours</CountdownLabel>
            </CountdownItem>
            <CountdownItem>
              <CountdownNumber>45</CountdownNumber>
              <CountdownLabel isDark={isDarkMode}>Minutes</CountdownLabel>
            </CountdownItem>
            <CountdownItem>
              <CountdownNumber>22</CountdownNumber>
              <CountdownLabel isDark={isDarkMode}>Seconds</CountdownLabel>
            </CountdownItem>
          </LaunchCountdown>

          <SubscribeForm>
            <SubscribeInput
              type="email"
              placeholder="Enter your email address"
              isDark={isDarkMode}
            />
            <SubscribeButton isDark={isDarkMode}>
              <MdNotifications /> Notify Me
            </SubscribeButton>
          </SubscribeForm>
        </SubscribeContainer>
      </SubscribeSection>

      <Footer>
        <FooterLogo>
          <LogoImage src={iconImage} alt="Shutter Space Logo" />
          <LogoText>Shutter Space</LogoText>
        </FooterLogo>

        <FooterContent>
          <FooterText isDark={isDarkMode}>
            Coming soon - a professional photography portfolio platform designed to showcase your best work with style and elegance.
          </FooterText>

          <SocialLinks>
            <SocialLink href="#" aria-label="Instagram">
              <IoLogoInstagram />
            </SocialLink>
            <SocialLink href="#" aria-label="Facebook">
              <LiaFacebookSquare />
            </SocialLink>
            <SocialLink href="#" aria-label="Pinterest">
              <LiaPinterestSquare />
            </SocialLink>
          </SocialLinks>

          <Copyright isDark={isDarkMode}>
            © {new Date().getFullYear()} Shutter Space. All rights reserved.
          </Copyright>
        </FooterContent>
      </Footer>
    </ThemeProvider>
  );
}

export default LandingPage;