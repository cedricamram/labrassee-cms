import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const HeroSection = styled.section`
  min-height: 85vh;
  width: 100vw;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0 0 40px 0;

  /* Téléphone : héros court, pour que les prochains événements soient
     visibles sans défiler (retour de Cédric, 03/10/2026). */
  @media (max-width: 768px) {
    min-height: 40vh;
    min-height: 40svh;
    padding: 0 0 8px 0;
  }
`;

// Le fond tire au hasard une photo de la scène avec des artistes à chaque visite
// (Cédric, 05/10/2026 : « changer aléatoirement le fond d'écran », « des photos
// de la scène avec artistes »). Photos de la banque d'Apollon, 2026, sans public
// reconnaissable. Pour en ajouter une : la déposer dans /images/landing et
// l'inscrire ici avec le point à garder dans le cadre.
// Cadrages testés à 375 px (05/10/2026) : les visages des artistes passent
// AU-DESSUS du titre « Entre voisins », jamais dessous.
const PHOTOS_SCENE = [
  { src: '/images/landing/scene-1.jpg', position: '50% 62%' },
  { src: '/images/landing/scene-2.jpg', position: '50% 70%' },
  { src: '/images/landing/scene-5.jpg', position: '50% 55%' },
  { src: '/images/landing/scene-3.jpg', position: '50% 52%' },
  { src: '/images/landing/scene-4.jpg', position: '50% 30%' },
];

const BackgroundImage = styled.img`
  position: absolute;
  width: 100vw;
  height: 100%;
  object-fit: cover;
  z-index: 0;
  opacity: 0;
  transition: opacity 0.6s ease;

  &.visible {
    opacity: 1;
  }
`;

const GradientOverlay = styled.div`
  position: absolute;
  width: 100vw;
  height: 100%;
  background: linear-gradient(to bottom,
    rgba(16, 15, 9, 0.15) 0%,
    rgba(16, 15, 9, 0.35) 40%,
    rgba(16, 15, 9, 0.3) 60%, 
    rgba(16, 15, 9, 0.8) 85%, 
    var(--color-dark) 100%
  );
  z-index: 1;
`;

const HeroContent = styled(motion.div)`
  position: relative;
  z-index: 2;
  text-align: center;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: calc(var(--header-height) + 20px);
`;

const HeroTitle = styled(motion.h1)`
  color: var(--color-brand);
  font-size: 12vw;
  line-height: 0.9;
  font-weight: 200;
  letter-spacing: -1px;
  font-family: var(--font-din);
  
  @media (max-width: 768px) {
    font-size: 16vw;
  }
  
  @media (max-width: 480px) {
    font-size: 19vw;
  }
`;

const ScrollIndicator = styled(motion.div)`
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 15px;
  z-index: 2;
  cursor: pointer;
  padding-bottom: 40px;

  @media (max-width: 768px) {
    padding-bottom: 12px;
  }
`;

const ScrollText = styled(motion.span)`
  color: var(--color-brand);
  font-size: 18px;
  font-weight: 500;
  letter-spacing: 1px;
  font-family: var(--font-din);
  text-align: center;
  
  @media (max-width: 480px) {
    font-size: 16px;
  }
`;

const ScrollArrow = styled(motion.div)`
  color: var(--color-brand);
  font-size: 20px;
  
  @media (max-width: 480px) {
    font-size: 18px;
  }
`;

const Hero = () => {
  // Tirage côté navigateur : la page est mise en cache côté serveur, un tirage
  // là-bas montrerait la même photo à tout le monde pendant 5 minutes.
  const [photo, setPhoto] = useState(null);
  const [chargee, setChargee] = useState(false);
  useEffect(() => {
    setPhoto(PHOTOS_SCENE[Math.floor(Math.random() * PHOTOS_SCENE.length)]);
  }, []);

  const titleVariants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      scale: 0.9
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const scrollIndicatorVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.4,
        duration: 0.4
      }
    }
  };

  const arrowPulse = {
    scale: [1, 1.2, 1],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut"
    }
  };

  const handleScrollClick = () => {
    window.scrollTo({
      top: window.innerHeight * 0.85,
      behavior: 'smooth'
    });
  };

  return (
    <HeroSection>
      {photo && (
        <BackgroundImage
          src={photo.src}
          alt=""
          fetchPriority="high"
          style={{ objectPosition: photo.position }}
          className={chargee ? 'visible' : undefined}
          onLoad={() => setChargee(true)}
        />
      )}
      <GradientOverlay />
      
      <HeroContent>
        <HeroTitle
          initial="hidden"
          animate="visible"
          variants={titleVariants}
        >
          ENTRE<br />VOISINS
        </HeroTitle>
      </HeroContent>

      <ScrollIndicator
        initial="hidden"
        animate="visible"
        variants={scrollIndicatorVariants}
        onClick={handleScrollClick}
        whileHover={{ scale: 1.05 }}
      >
        <ScrollArrow animate={arrowPulse}>
          <i className="fas fa-chevron-right"></i>
        </ScrollArrow>
        <ScrollText>Notre programmation</ScrollText>
        <ScrollArrow animate={arrowPulse}>
          <i className="fas fa-chevron-left"></i>
        </ScrollArrow>
      </ScrollIndicator>
    </HeroSection>
  );
};

export default Hero;
