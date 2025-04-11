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
import { FaRegImage } from "react-icons/fa";
import { MdCloudUpload } from "react-icons/md";
import { FaUserCircle } from "react-icons/fa";

// Import images
import iconImage from '../assets/icon.jpeg';
import heroImage from '../assets/hero.jpeg';
import shutterpic1 from '../assets/pic1.jpeg';
import shutterpic2 from '../assets/pic2.jpeg';
import shutterpic3 from '../assets/pic3.jpeg';
import shutterpic4 from '../assets/pic4.jpeg';
import shutterpic5 from '../assets/pic5.jpeg';
import shutterpic6 from '../assets/pic6.jpeg';
import profile from '../assets/profile.jpeg';

// Themes for light and dark mode
const lightTheme = {
  primary: '#ffffff',
  secondary: '#f8f9fa',
  text: '#2C3E50', // Dark blue for better contrast
  accent: '#1ABC9C', // Teal from the portfolio component
  navBg: 'rgba(255, 255, 255, 0.9)',
  cardBg: '#ffffff',
  cardShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  footerBg: '#f1f1f1',
};

const darkTheme = {
  primary: '#121212',
  secondary: '#1e1e1e',
  text: '#ECF0F1', // Light gray
  accent: '#1ABC9C', // Keep the teal accent
  navBg: 'rgba(18, 18, 18, 0.95)',
  cardBg: '#1E1F26', // From the portfolio component
  cardShadow: '0 4px 6px rgba(0, 0, 0, 0.3)',
  footerBg: '#0a0a0a',
};

// Global styles
const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Montserrat:wght@400;500;600;700;800&display=swap');

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    background-color: ${props => props.theme.primary};
    color: ${props => props.theme.text};
    font-family: 'Inter', sans-serif;
    transition: all 0.3s ease;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: 'Montserrat', sans-serif;
    font-weight: 600;
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
  width: 40px;
  border-radius: 50%;
  object-fit: cover;
`;

const LogoText = styled.h1`
  font-size: 1.8rem;
  font-weight: 700;
  letter-spacing: 1px;
  background: linear-gradient(to right, 
    ${props => props.theme.text}, 
    ${props => props.theme.accent});
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
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
  padding: 2.5rem;
  border-radius: 16px;
  background-color: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(5px);
`;

const HeroTitle = styled.h1`
  font-size: 3.5rem;
  margin-bottom: 1.5rem;
  color: white;
  font-weight: 800;
  letter-spacing: 2px;
  
  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const HeroSubtitle = styled.p`
  font-size: 1.5rem;
  margin-bottom: 2rem;
  color: #f0f0f0;
  line-height: 1.6;
  font-weight: 300;
  
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
  padding: 1rem 2.5rem;
  font-size: 1.1rem;
  font-weight: 600;
  background: linear-gradient(to right, ${props => props.theme.accent}, ${props => props.theme.accent}DD);
  color: white;
  border: none;
  border-radius: 8px;
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
  border-radius: 12px;
  padding: 2rem;
  box-shadow: ${props => props.theme.cardShadow};
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  border: 1px solid ${props => props.isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'};
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
    border-color: ${props => props.theme.accent}50;
  }
`;

const FeatureIcon = styled.div`
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
  color: ${props => props.theme.accent};
  display: flex;
  align-items: center;
  
  svg {
    background: linear-gradient(135deg, 
      ${props => props.theme.accent}20, 
      ${props => props.theme.accent}10);
    padding: 10px;
    border-radius: 12px;
  }
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
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(2, 300px);
  gap: 1.5rem;
  max-width: 1200px;
  margin: 0 auto;
  
  @media (max-width: 992px) {
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(3, 250px);
  }
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    grid-template-rows: repeat(6, 250px);
  }
`;

const GalleryItem = styled.div`
  position: relative;
  border-radius: 12px;
  overflow: hidden;
  grid-column: ${props => props.wide ? 'span 2' : 'span 1'};
  grid-row: ${props => props.tall ? 'span 2' : 'span 1'};
  box-shadow: 0 5px 15px rgba(0, 0, 0, ${props => props.isDark ? '0.3' : '0.1'});
  transition: all 0.3s ease;
  cursor: pointer;
  
  @media (max-width: 768px) {
    grid-column: span 1 !important;
    grid-row: span 1 !important;
  }
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 30px rgba(0, 0, 0, ${props => props.isDark ? '0.4' : '0.15'});
    
    img {
      transform: scale(1.1);
      filter: brightness(1.1);
    }
    
    .overlay {
      opacity: 1;
    }
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
  background: linear-gradient(0deg, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.1) 100%);
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
  font-weight: 600;
`;

const GalleryMeta = styled.p`
  color: rgba(255, 255, 255, 0.9);
  font-size: 0.9rem;
`;

const TestimonialSection = styled.section`
  padding: 5rem 5%;
  background-color: ${props => props.theme.secondary};
  text-align: center;
`;

const TestimonialContainer = styled.div`
  max-width: 900px;
  margin: 0 auto;
`;

const TestimonialCards = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const TestimonialCard = styled.div`
  background-color: ${props => props.theme.cardBg};
  border-radius: 12px;
  padding: 2rem;
  box-shadow: ${props => props.theme.cardShadow};
  text-align: left;
  position: relative;
  border-left: 4px solid ${props => props.theme.accent};
  
  &::before {
    content: '"';
    position: absolute;
    top: 10px;
    left: 10px;
    font-size: 5rem;
    color: ${props => props.theme.accent}20;
    font-family: 'Georgia', serif;
    line-height: 1;
  }
`;

const TestimonialText = styled.p`
  font-size: 1.1rem;
  line-height: 1.8;
  margin-bottom: 1.5rem;
  color: ${props => props.isDark ? '#b0b0b0' : '#666'};
  font-style: italic;
`;

const TestimonialAuthor = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const AuthorAvatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
`;

const AuthorInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const AuthorName = styled.span`
  font-weight: 600;
  font-size: 1rem;
`;

const AuthorTitle = styled.span`
  font-size: 0.9rem;
  color: ${props => props.isDark ? '#999' : '#777'};
`;

const EarlyAccessSection = styled.section`
  padding: 5rem 5%;
  background-color: ${props => props.theme.primary};
  text-align: center;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: url(${shutterpic3});
    background-size: cover;
    background-position: center;
    filter: brightness(0.2);
    z-index: 0;
  }
`;

const EarlyAccessContainer = styled.div`
  max-width: 700px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
`;

const EarlyAccessTitle = styled(SectionTitle)`
  color: white;
`;

const EarlyAccessDescription = styled.p`
  font-size: 1.2rem;
  line-height: 1.8;
  margin-bottom: 2.5rem;
  color: rgba(255, 255, 255, 0.9);
`;

const EarlyAccessForm = styled.form`
  display: flex;
  max-width: 500px;
  margin: 0 auto;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
  }
`;

const EarlyAccessInput = styled.input`
  flex: 1;
  padding: 1rem 1.5rem;
  border-radius: 8px 0 0 8px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-right: none;
  background-color: rgba(0, 0, 0, 0.4);
  color: white;
  font-size: 1rem;
  
  &::placeholder {
    color: rgba(255, 255, 255, 0.7);
  }
  
  &:focus {
    outline: none;
    border-color: ${props => props.theme.accent};
    background-color: rgba(0, 0, 0, 0.6);
  }
  
  @media (max-width: 768px) {
    border-radius: 8px;
    border-right: 1px solid rgba(255, 255, 255, 0.2);
  }
`;

const EarlyAccessButton = styled.button`
  padding: 1rem 2rem;
  background-color: ${props => props.theme.accent};
  color: white;
  border: none;
  border-radius: 0 8px 8px 0;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  
  &:hover {
    background-color: ${props => props.isDark ? '#0fa994' : '#0fa994'};
  }
  
  @media (max-width: 768px) {
    border-radius: 8px;
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
  background-color: rgba(0, 0, 0, 0.5);
  padding: 1rem;
  border-radius: 8px;
  min-width: 80px;
`;

const CountdownNumber = styled.div`
  font-size: 2.5rem;
  font-weight: 700;
  color: white;
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
  color: rgba(255, 255, 255, 0.7);
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

// Main Landing Page Component for Customers
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

  // Gallery items
  const galleryItems = [
    {
      id: 1,
      image: shutterpic1,
      title: "Responsive Gallery Layouts",
      description: "Adaptive grid & carousel layouts",
      wide: false,
      tall: false
    },
    {
      id: 2,
      image: shutterpic2,
      title: "Advanced Lightbox",
      description: "High-resolution zoom capabilities",
      wide: true,
      tall: false
    },
    {
      id: 3,
      image: shutterpic3,
      title: "Client Access Portal",
      description: "Secure private galleries",
      wide: false,
      tall: true
    },
    {
      id: 4,
      image: shutterpic4,
      title: "EXIF Data Display",
      description: "Share your technical process",
      wide: false,
      tall: false
    },
    {
      id: 5,
      image: shutterpic5,
      title: "Location Mapping",
      description: "Plot your photoshoot locations",
      wide: true,
      tall: false
    }
  ];

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <NavBar>
        <Logo>
          <LogoImage src={iconImage} alt="Shutter Space Logo" />
          <LogoText>ShutterSpace</LogoText>
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
          <HeroTitle>ShutterSpace</HeroTitle>
          <HeroSubtitle>
            Elevate your photography portfolio with an elegant platform designed for professionals who want their work to stand out.
          </HeroSubtitle>
          <CTAButton onClick={() => document.getElementById('early-access').scrollIntoView({ behavior: 'smooth' })}>
            Join Early Access
          </CTAButton>
        </HeroContent>
      </HeroSection>

      <Section>
        <SectionTitle>For Photographers Who Demand More</SectionTitle>
        <FeaturesContainer>
          <FeatureCard isDark={isDarkMode}>
            <FeatureIcon>
              <GrGallery size={42} />
            </FeatureIcon>
            <FeatureTitle>Stunning Gallery Layouts</FeatureTitle>
            <FeatureDescription isDark={isDarkMode}>
              Showcase your work with responsive grid, masonry, and carousel layouts that adapt beautifully to any device.
            </FeatureDescription>
          </FeatureCard>

          <FeatureCard isDark={isDarkMode}>
            <FeatureIcon>
              <GiMagnifyingGlass size={42} />
            </FeatureIcon>
            <FeatureTitle>Detail-Focused Lightbox</FeatureTitle>
            <FeatureDescription isDark={isDarkMode}>
              Let viewers explore the finest details of your work with high-resolution zoom and pan capabilities.
            </FeatureDescription>
          </FeatureCard>

          <FeatureCard isDark={isDarkMode}>
            <FeatureIcon>
              <GiCog size={42} />
            </FeatureIcon>
            <FeatureTitle>Technical Transparency</FeatureTitle>
            <FeatureDescription isDark={isDarkMode}>
              Share your expertise with elegant EXIF data displays that reveal the technical process behind each image.
            </FeatureDescription>
          </FeatureCard>

          <FeatureCard isDark={isDarkMode}>
            <FeatureIcon>
              <LuFileSliders size={42} />
            </FeatureIcon>
            <FeatureTitle>Show Your Editing Skills</FeatureTitle>
            <FeatureDescription isDark={isDarkMode}>
              Demonstrate your editing prowess with before/after comparison sliders that showcase your post-processing talent.
            </FeatureDescription>
          </FeatureCard>

          <FeatureCard isDark={isDarkMode}>
            <FeatureIcon>
              <GrGlobe size={42} />
            </FeatureIcon>
            <FeatureTitle>Tell Your Location Story</FeatureTitle>
            <FeatureDescription isDark={isDarkMode}>
              Map your photographic journey with interactive location displays that add context and narrative to your portfolio.
            </FeatureDescription>
          </FeatureCard>

          <FeatureCard isDark={isDarkMode}>
            <FeatureIcon>
              <GiPadlock size={42} />
            </FeatureIcon>
            <FeatureTitle>Professional Client Experience</FeatureTitle>
            <FeatureDescription isDark={isDarkMode}>
              Deliver a premium client experience with private galleries, password protection, and customized download options.
            </FeatureDescription>
          </FeatureCard>
        </FeaturesContainer>
      </Section>

      <Section>
        <SectionTitle>Preview Our Features</SectionTitle>
        <GalleryGrid>
          {galleryItems.map(item => (
            <GalleryItem key={item.id} wide={item.wide} tall={item.tall} isDark={isDarkMode}>
              <GalleryImage src={item.image} alt={item.title} />
              <GalleryOverlay className="overlay">
                <GalleryTitle>{item.title}</GalleryTitle>
                <GalleryMeta>{item.description}</GalleryMeta>
              </GalleryOverlay>
            </GalleryItem>
          ))}
        </GalleryGrid>
      </Section>

      <TestimonialSection>
        <TestimonialContainer>
          <SectionTitle>What Photographers Are Saying</SectionTitle>
          <TestimonialCards>
            <TestimonialCard>
              <TestimonialText isDark={isDarkMode}>
                "As a travel photographer, I've been looking for a portfolio platform that can showcase both the visual impact and the story behind my work. ShutterSpace's location mapping feature is exactly what I needed to bring context to my photography journeys."
              </TestimonialText>
              <TestimonialAuthor>
                <AuthorAvatar src={profile} alt="Sarah Chen" />
                <AuthorInfo>
                  <AuthorName>Sarah Chen</AuthorName>
                  <AuthorTitle isDark={isDarkMode}>Travel Photographer</AuthorTitle>
                </AuthorInfo>
              </TestimonialAuthor>
            </TestimonialCard>

            <TestimonialCard>
              <TestimonialText isDark={isDarkMode}>
                "The before/after comparison slider has revolutionized how I showcase my editing work to clients. Being able to demonstrate my post-processing value has actually helped me increase my rates. This platform pays for itself!"
              </TestimonialText>
              <TestimonialAuthor>
                <AuthorAvatar src={shutterpic2} alt="Michael Roberts" />
                <AuthorInfo>
                  <AuthorName>Michael Roberts</AuthorName>
                  <AuthorTitle isDark={isDarkMode}>Portrait & Wedding Photographer</AuthorTitle>
                </AuthorInfo>
              </TestimonialAuthor>
            </TestimonialCard>
          </TestimonialCards>
        </TestimonialContainer>
      </TestimonialSection>

      <EarlyAccessSection id="early-access">
        <EarlyAccessContainer>
          <EarlyAccessTitle>Be Among the First</EarlyAccessTitle>
          <EarlyAccessDescription>
            Join our exclusive early access list and be the first to experience ShutterSpace when we launch. Early adopters will receive premium features and special pricing.
          </EarlyAccessDescription>

          <LaunchCountdown>
            <CountdownItem>
              <CountdownNumber>30</CountdownNumber>
              <CountdownLabel>Days</CountdownLabel>
            </CountdownItem>
            <CountdownItem>
              <CountdownNumber>12</CountdownNumber>
              <CountdownLabel>Hours</CountdownLabel>
            </CountdownItem>
            <CountdownItem>
              <CountdownNumber>45</CountdownNumber>
              <CountdownLabel>Minutes</CountdownLabel>
            </CountdownItem>
            <CountdownItem>
              <CountdownNumber>22</CountdownNumber>
              <CountdownLabel>Seconds</CountdownLabel>
            </CountdownItem>
          </LaunchCountdown>

          <EarlyAccessForm>
            <EarlyAccessInput
              type="email"
              placeholder="Enter your email address"
            />
            <EarlyAccessButton isDark={isDarkMode}>
              <MdNotifications /> Get Priority Access
            </EarlyAccessButton>
          </EarlyAccessForm>
        </EarlyAccessContainer>
      </EarlyAccessSection>

      <Section>
        <SectionTitle>Benefits for Professional Photographers</SectionTitle>
        <FeaturesContainer>
          <FeatureCard isDark={isDarkMode}>
            <FeatureIcon>
              <FaRegImage size={42} />
            </FeatureIcon>
            <FeatureTitle>Stand Out From the Crowd</FeatureTitle>
            <FeatureDescription isDark={isDarkMode}>
              Differentiate your photography business with an exceptional presentation that showcases your work in its best light.
            </FeatureDescription>
          </FeatureCard>

          <FeatureCard isDark={isDarkMode}>
            <FeatureIcon>
              <MdCloudUpload size={42} />
            </FeatureIcon>
            <FeatureTitle>Effortless Management</FeatureTitle>
            <FeatureDescription isDark={isDarkMode}>
              Save time with intuitive organization tools, metadata extraction, and automated image optimization for all your devices.
            </FeatureDescription>
          </FeatureCard>

          <FeatureCard isDark={isDarkMode}>
            <FeatureIcon>
              <FaUserCircle size={42} />
            </FeatureIcon>
            <FeatureTitle>Impress Your Clients</FeatureTitle>
            <FeatureDescription isDark={isDarkMode}>
              Deliver a premium client experience with private galleries, custom branding, and professional presentation options.
            </FeatureDescription>
          </FeatureCard>
        </FeaturesContainer>
      </Section>

      <Footer>
        <FooterLogo>
          <LogoImage src={iconImage} alt="ShutterSpace Logo" />
          <LogoText>ShutterSpace</LogoText>
        </FooterLogo>

        <FooterContent>
          <FooterText isDark={isDarkMode}>
            Coming soon - A professional photography portfolio platform designed to showcase your best work with style and elegance.
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
            © {new Date().getFullYear()} ShutterSpace. All rights reserved.
          </Copyright>
        </FooterContent>
      </Footer>
    </ThemeProvider>
  );
}

export default LandingPage;