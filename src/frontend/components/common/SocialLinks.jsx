import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { businessInfo as fallbackBusinessInfo } from '../../data/menu';

const SocialContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  width: 100%;
  border-top: 1px solid #4a4a4a;
  border-bottom: 1px solid #4a4a4a;
  padding: 20px 0;
  margin: 40px 0;
`;

const SocialBlock = styled(motion.a)`
  display: grid;
  grid-template-rows: 40px auto;
  place-items: center;
  gap: 8px;
  text-decoration: none;
  color: var(--color-white);
`;

const IconWrapper = styled.div`
  font-size: 40px;
  color: ${props => props.$color};
  transition: transform 0.3s ease;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  
  ${SocialBlock}:hover & {
    transform: scale(1.1);
  }
  
  @media (max-width: 480px) {
    font-size: 30px;
    height: 30px;
  }
`;

const SocialText = styled.span`
  font-size: 12px;
  text-transform: uppercase;
`;

const SocialLinks = ({ businessInfo }) => {
  const source = businessInfo || fallbackBusinessInfo;

  const socialData = [
    {
      name: 'FACEBOOK',
      icon: 'fab fa-facebook',
      color: '#359df8',
      link: source.social?.facebook || fallbackBusinessInfo.social.facebook
    },
    {
      name: 'INSTAGRAM',
      icon: 'fab fa-instagram',
      color: '#f14179',
      link: source.social?.instagram || fallbackBusinessInfo.social.instagram
    }
  ];
  // ⚠️ 2026-08-23 — le clin d'œil ONLYFANS a été retiré du site ENTIER.
  // Décision de Cédric à 18h24 : « on enlève le clin d'œil de partout ».
  // Contexte : Apollon a relevé que ce n'était pas une blague inerte — le lien
  // pointait vraiment vers onlyfans.com et ouvrait un nouvel onglet, présenté à
  // poids égal avec les deux vrais comptes. Sur /comptoir (page d'employeur),
  // quelqu'un de 18 ans à sa première candidature ne pouvait pas le lire comme
  // une blague. Cédric a tranché plus large que la question posée : partout.
  // Le champ `social.onlyfans` existe encore dans Payload et dans les types —
  // il n'est plus rendu nulle part. Ne pas le rebrancher.

  return (
    <SocialContainer>
      {socialData.map((social, index) => (
        <SocialBlock
          key={social.name}
          href={social.link}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          whileHover={{ y: -5 }}
        >
          <IconWrapper $color={social.color}>
            <i className={social.icon}></i>
          </IconWrapper>
          <SocialText>{social.name}</SocialText>
        </SocialBlock>
      ))}
    </SocialContainer>
  );
};

export default SocialLinks;
