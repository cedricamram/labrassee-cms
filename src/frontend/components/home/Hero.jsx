import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { LQIP_SCENE_2 } from '@/frontend/data/lqip-scene-2';

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
// Chaque photo existe en deux tailles : -m.jpg (100-175 Ko) pour le téléphone,
// .jpg (190-280 Ko) au-delà.
const PHOTOS_SCENE = [
  { nom: 'scene-1', position: '50% 74%' },
  { nom: 'scene-2', position: '50% 70%' },
  { nom: 'scene-5', position: '50% 55%' },
  { nom: 'scene-3', position: '50% 52%' },
  { nom: 'scene-4', position: '50% 30%' },
];

// Photo rendue par le serveur : elle part avec la page, sans attendre le tirage.
// Le haut de l'accueil n'est donc jamais un aplat noir, même sur un réseau lent
// (constat d'Athéna, 05/10 23 h 40 : fond noir ~37 s).
const PHOTO_DEPART = PHOTOS_SCENE[1];

const srcPhoto = (p) => `/images/landing/${p.nom}.jpg`;
const srcSetPhoto = (p) =>
  `/images/landing/${p.nom}-m.jpg 900w, /images/landing/${p.nom}.jpg 1600w`;

const BackgroundImage = styled.img`
  position: absolute;
  width: 100vw;
  height: 100%;
  object-fit: cover;
  z-index: 0;

  /* La photo tirée au hasard se pose sur celle de départ, en fondu, une fois chargée. */
  &.tiree {
    opacity: 0;
    transition: opacity 0.6s ease;
  }
  &.tiree.visible {
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
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: calc(var(--header-height) + 20px);
`;

// Signature au-dessus du titre (Cédric, 05/10/2026 23 h 43 : « faudrait quand même
// qu'on voie que c'est La Brassée sur la page d'accueil »). Picto en trait jaune,
// sans fond, jamais le rond plein nommé (sa règle du 11/08).
const Signature = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  margin-bottom: 14px;

  .nom {
    display: flex;
    align-items: center;
    gap: 10px;
    font-family: var(--font-din);
    color: var(--color-white);
    font-size: 20px;
    font-weight: 500;
    letter-spacing: 6px;
    text-transform: uppercase;
    text-shadow: 0 2px 10px rgba(0, 0, 0, 0.6);
  }

  .nom img {
    width: 34px;
    height: 34px;
    filter: drop-shadow(0 2px 8px rgba(0, 0, 0, 0.6));
  }

  .ou {
    font-family: var(--font-din);
    color: rgba(232, 228, 216, 0.9);
    font-size: 12px;
    letter-spacing: 2.5px;
    text-transform: uppercase;
    text-shadow: 0 2px 8px rgba(0, 0, 0, 0.7);
  }

  @media (max-width: 480px) {
    margin-bottom: 10px;
    .nom { font-size: 17px; letter-spacing: 5px; }
    .nom img { width: 28px; height: 28px; }
    .ou { font-size: 10.5px; letter-spacing: 2px; }
  }
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
    font-size: 16vw;
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
    // Réseau lent ou économie de données : on garde la photo de départ, une seule requête d'image
    // (Apollon, 06/10/2026 : la 2e photo ralentissait la première en 3G). Sinon : seulement APRÈS
    // l'événement load, pour ne rien disputer à la photo de départ.
    const c = typeof navigator !== 'undefined' ? navigator.connection : null;
    if (c && (c.saveData || /^(slow-2g|2g|3g)$/.test(c.effectiveType || ''))) return undefined;
    const tirer = () => {
      const tiree = PHOTOS_SCENE[Math.floor(Math.random() * PHOTOS_SCENE.length)];
      if (tiree !== PHOTO_DEPART) setPhoto(tiree);
    };
    if (document.readyState === 'complete') {
      tirer();
      return undefined;
    }
    window.addEventListener('load', tirer, { once: true });
    return () => window.removeEventListener('load', tirer);
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
    <HeroSection
      style={{
        backgroundImage: `url('${LQIP_SCENE_2}')`,
        backgroundSize: 'cover',
        backgroundPosition: PHOTO_DEPART.position,
      }}
    >
      <BackgroundImage
        src={srcPhoto(PHOTO_DEPART)}
        srcSet={srcSetPhoto(PHOTO_DEPART)}
        sizes="100vw"
        alt=""
        fetchPriority="high"
        style={{ objectPosition: PHOTO_DEPART.position }}
      />
      {photo && (
        <BackgroundImage
          src={srcPhoto(photo)}
          srcSet={srcSetPhoto(photo)}
          sizes="100vw"
          alt=""
          style={{ objectPosition: photo.position }}
          className={chargee ? 'tiree visible' : 'tiree'}
          onLoad={() => setChargee(true)}
        />
      )}
      <GradientOverlay />
      
      <HeroContent>
        <Signature
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="nom">
            <img src="/images/brand/picto_outlined_jaune.svg" alt="" />
            La Brassée
          </div>
          <div className="ou">Café de quartier · Rosemont–La Petite-Patrie</div>
        </Signature>
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
