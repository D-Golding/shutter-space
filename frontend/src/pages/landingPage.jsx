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

const NavLinks = styled.div`
  display: flex;
  gap: 2.5rem;

  @media (max-width: 768px) {
    display: none;
  }
`;

const NavLink = styled.a`
  text-decoration: none;
  color: ${props => props.theme.text};
  font-size: 1rem;
  font-weight: 500;
  position: relative;
  transition: all 0.2s ease;

  &:after {
    content: '';
    position: absolute;
    width: 0;
    height: 2px;
    bottom: -5px;
    left: 0;
    background-color: ${props => props.theme.accent};
    transition: width 0.3s ease;
  }

  &:hover {
    color: ${props => props.theme.accent};
    &:after {
      width: 100%;
    }
  }
`;

const HamburgerMenu = styled.div`
  display: none;
  cursor: pointer;
  
  @media (max-width: 768px) {
    display: block;
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
    background: url('/public/hero.jpeg') center/cover no-repeat;
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

const AboutContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 3rem;
  max-width: 1000px;
  margin: 0 auto;
  
  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
  }
`;

const AboutImageContainer = styled.div`
  flex: 1;
  border-radius: 50%;
  overflow: hidden;
  aspect-ratio: 1;
  max-width: 300px;
  box-shadow: ${props => props.theme.cardShadow};
  
  @media (max-width: 768px) {
    max-width: 200px;
  }
`;

const AboutImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const AboutContent = styled.div`
  flex: 2;
`;

const AboutTitle = styled.h3`
  font-size: 2rem;
  margin-bottom: 1.5rem;
`;

const AboutText = styled.p`
  font-size: 1.1rem;
  line-height: 1.8;
  margin-bottom: 1.5rem;
  color: ${props => props.isDark ? '#b0b0b0' : '#666'};
`;

const ContactContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  max-width: 1000px;
  margin: 0 auto;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ContactInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const ContactItem = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const ContactIcon = styled.div`
  font-size: 1.5rem;
  color: ${props => props.theme.accent};
  display: flex;
`;

const ContactText = styled.p`
  font-size: 1.1rem;
`;

const ContactForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const FormLabel = styled.label`
  font-size: 1rem;
  font-weight: 500;
`;

const FormInput = styled.input`
  padding: 0.8rem;
  border-radius: 4px;
  border: 1px solid ${props => props.isDark ? '#555' : '#ddd'};
  background-color: ${props => props.isDark ? '#333' : '#fff'};
  color: ${props => props.theme.text};
  font-size: 1rem;
  
  &:focus {
    outline: none;
    border-color: ${props => props.theme.accent};
  }
`;

const FormTextarea = styled.textarea`
  padding: 0.8rem;
  border-radius: 4px;
  border: 1px solid ${props => props.isDark ? '#555' : '#ddd'};
  background-color: ${props => props.isDark ? '#333' : '#fff'};
  color: ${props => props.theme.text};
  font-size: 1rem;
  min-height: 150px;
  resize: vertical;
  
  &:focus {
    outline: none;
    border-color: ${props => props.theme.accent};
  }
`;

const FormSubmit = styled.button`
  padding: 1rem;
  background-color: ${props => props.theme.accent};
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s ease;
  
  &:hover {
    background-color: ${props => props.isDark ? '#5a90b7' : '#3a6a8e'};
  }
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
          <LogoImage src="/public/icon.jpeg" alt="Shutter Space Logo" />
          <LogoText>Shutter Space</LogoText>
        </Logo>
        <NavLinks>
          <NavLink href="#features">Features</NavLink>
          <NavLink href="#gallery">Gallery</NavLink>
          <NavLink href="#about">About</NavLink>
          <NavLink href="#contact">Contact</NavLink>
        </NavLinks>
        <ThemeToggle onClick={toggleTheme}>
          {isDarkMode ? <MdOutlineLightMode /> : <MdOutlineDarkMode />}
        </ThemeToggle>
        <HamburgerMenu>☰</HamburgerMenu>
      </NavBar>

      <HeroSection>
        <HeroContent>
          <HeroTitle>Capture Moments. Create Memories.</HeroTitle>
          <HeroSubtitle>
            A professional photography portfolio platform designed to showcase your best work with style and elegance.
          </HeroSubtitle>
          <CTAButton>Explore Gallery</CTAButton>
        </HeroContent>
      </HeroSection>

      <Section id="features">
        <SectionTitle>Features</SectionTitle>
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

      <Section id="gallery">
        <SectionTitle>Featured Work</SectionTitle>
        <GalleryGrid>
          <GalleryItem>
            <GalleryImage src="/public/pic1.jpeg" alt="Photography sample 1" />
            <GalleryOverlay className="overlay">
              <GalleryTitle>Urban Exploration</GalleryTitle>
              <GalleryMeta>City Architecture • Sony A7IV</GalleryMeta>
            </GalleryOverlay>
          </GalleryItem>

          <GalleryItem>
            <GalleryImage src="/public/pic2.jpeg" alt="Photography sample 2" />
            <GalleryOverlay className="overlay">
              <GalleryTitle>Natural Landscapes</GalleryTitle>
              <GalleryMeta>Mountain Range • Canon EOS R5</GalleryMeta>
            </GalleryOverlay>
          </GalleryItem>

          <GalleryItem>
            <GalleryImage src="/public/pic3.jpeg" alt="Photography sample 3" />
            <GalleryOverlay className="overlay">
              <GalleryTitle>Portrait Session</GalleryTitle>
              <GalleryMeta>Studio Lighting • Nikon Z6</GalleryMeta>
            </GalleryOverlay>
          </GalleryItem>

          <GalleryItem>
            <GalleryImage src="/public/pic4.jpeg" alt="Photography sample 4" />
            <GalleryOverlay className="overlay">
              <GalleryTitle>Wildlife Capture</GalleryTitle>
              <GalleryMeta>Safari Series • Canon 600mm f/4</GalleryMeta>
            </GalleryOverlay>
          </GalleryItem>

          <GalleryItem>
            <GalleryImage src="/public/pic5.jpeg" alt="Photography sample 5" />
            <GalleryOverlay className="overlay">
              <GalleryTitle>Macro World</GalleryTitle>
              <GalleryMeta>Insect Close-up • 100mm Macro</GalleryMeta>
            </GalleryOverlay>
          </GalleryItem>

          <GalleryItem>
            <GalleryImage src="/public/pic6.jpeg" alt="Photography sample 6" />
            <GalleryOverlay className="overlay">
              <GalleryTitle>Street Photography</GalleryTitle>
              <GalleryMeta>Urban Life • Fujifilm X-T4</GalleryMeta>
            </GalleryOverlay>
          </GalleryItem>
        </GalleryGrid>
      </Section>

      <Section id="about">
        <SectionTitle>About the Photographer</SectionTitle>
        <AboutContainer>
          <AboutImageContainer>
            <AboutImage src="/public/profile.jpeg" alt="Photographer profile" />
          </AboutImageContainer>
          <AboutContent>
            <AboutTitle>Capturing Stories Through Lenses</AboutTitle>
            <AboutText isDark={isDarkMode}>
              With over 10 years of professional experience, I've developed a distinctive style that blends technical precision with artistic vision. My work spans multiple genres, from breathtaking landscapes to intimate portraits and dynamic urban scenes.
            </AboutText>
            <AboutText isDark={isDarkMode}>
              I believe photography is more than just taking pictures—it's about freezing moments in time, telling stories, and evoking emotions. Every image in my portfolio represents a unique narrative, captured with passion and crafted with meticulous attention to detail.
            </AboutText>
            <CTAButton>View Full Portfolio</CTAButton>
          </AboutContent>
        </AboutContainer>
      </Section>

      <Section id="contact">
        <SectionTitle>Get In Touch</SectionTitle>
        <ContactContainer>
          <ContactInfo>
            <AboutTitle>Let's Discuss Your Project</AboutTitle>
            <AboutText isDark={isDarkMode}>
              Whether you're looking for a professional photographer for your event, need stunning imagery for your brand, or want to collaborate on a creative project, I'm here to help bring your vision to life.
            </AboutText>

            <ContactItem>
              <ContactIcon>
                <BsEnvelopeAt />
              </ContactIcon>
              <ContactText>contact@shutterspace.com</ContactText>
            </ContactItem>

            <ContactItem>
              <ContactIcon>
                <ImMobile />
              </ContactIcon>
              <ContactText>+1 (555) 123-4567</ContactText>
            </ContactItem>

            <ContactItem>
              <ContactIcon>
                <MdPinDrop />
              </ContactIcon>
              <ContactText>Photography Studio, 123 Creative Ave, Art District</ContactText>
            </ContactItem>
          </ContactInfo>

          <ContactForm>
            <FormGroup>
              <FormLabel>Name</FormLabel>
              <FormInput type="text" placeholder="Your Name" isDark={isDarkMode} />
            </FormGroup>

            <FormGroup>
              <FormLabel>Email</FormLabel>
              <FormInput type="email" placeholder="your@email.com" isDark={isDarkMode} />
            </FormGroup>

            <FormGroup>
              <FormLabel>Subject</FormLabel>
              <FormInput type="text" placeholder="How can I help you?" isDark={isDarkMode} />
            </FormGroup>

            <FormGroup>
              <FormLabel>Message</FormLabel>
              <FormTextarea placeholder="Tell me about your project..." isDark={isDarkMode} />
            </FormGroup>

            <FormSubmit isDark={isDarkMode}>Send Message</FormSubmit>
          </ContactForm>
        </ContactContainer>
      </Section>

      <Footer>
        <FooterLogo>
          <LogoImage src="/public/icon.jpeg" alt="Shutter Space Logo" />
          <LogoText>Shutter Space</LogoText>
        </FooterLogo>

        <FooterContent>
          <FooterText isDark={isDarkMode}>
            A professional photography portfolio platform designed to showcase your best work with style and elegance.
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