/* eslint-disable */
import React, { useEffect, useState } from 'react';
import { FaSearch, FaBell, FaGift, FaCaretDown } from 'react-icons/fa';
import MagicModal from '../MagicModal';
import magicflixLogo1 from '../../assets/magicflix_no_bg.png';
import magicFlixM from "../../assets/M.png";

import { Container, RoutesMenu, Profile } from './styles';

const NavBar: React.FC = () => {
  const [isBlack, setIsBlack] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(true); // Efeito inicial chamativo

  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModal = () => setModalOpen(false);

  useEffect(() => {
    window.addEventListener('scroll', () => setIsBlack(window.scrollY > 10));

    return () => {
      window.removeEventListener('scroll', () => setIsBlack(window.scrollY > 10));
    };
  }, []);

  useEffect(() => {
    // Remove o efeito de animação após 5 segundos
    const timer = setTimeout(() => setIsAnimating(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Container isBlack={isBlack}>
      <style>
        {`
          @keyframes highlight {
            0%, 100% {
              transform: scale(1) rotate(0deg);
              filter: brightness(1);
            }
            50% {
              transform: scale(1.3) rotate(15deg);
              filter: brightness(1.5);
            }
          }
          .animate-icon {
            animation: highlight 1.5s infinite ease-in-out;
          }
        `}
      </style>
      <RoutesMenu>
        <img
          src={magicflixLogo1}
          alt="Logo Magic Flix"
          style={{
            height: "70px",
            width: "auto",
            objectFit: "contain",
            marginRight: "10px",
            backgroundColor: "#11ffee00",
            marginLeft: "-15px",
            mixBlendMode: "lighten"
          }}
        />
        <ul>
          <li style={{ fontWeight: 'bold' }}>Inicio</li>
          <li>Series</li>
          <li>Filmes</li>
          <li>Mais Recentes</li>
          <li>Minha Lista</li>
        </ul>
      </RoutesMenu>
      <Profile>
        <img
          src={magicFlixM}
          alt="Magic Flix M"
          onClick={handleOpenModal}
          className={isAnimating ? 'animate-icon' : ''}
          style={{
            cursor: 'pointer',
            height: '24px',
            width: '24px',
            objectFit: "contain",
            backgroundColor: 'transparent',
            marginLeft: "15px",
            marginRight: "20px",
            transition: 'all 0.3s ease-in-out',
          }}
        />
        <FaSearch />
        <FaGift />
        <FaBell />
        <button type="button">
          <img
            src="https://occ-0-761-185.1.nflxso.net/dnm/api/v6/Z-WHgqd_TeJxSuha8aZ5WpyLcX8/AAAABR8DzEDMx6x6rgkSexM2EYh44oQISc8fyEFr6WnraR9_HyniHFDRbXRrElpLThfL9OYFOueAItK7VIEb2xH7AqA.png?r=c71"
            alt="imagem profile usuario"
          />
          <FaCaretDown />
        </button>
      </Profile>
      <MagicModal open={modalOpen} onClose={handleCloseModal} />
    </Container>
  );
};

export default NavBar;

/* eslint-disable */