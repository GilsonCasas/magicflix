import React, { useEffect, useState } from 'react';
import { FaSearch, FaBell, FaGift, FaCaretDown, FaBiohazard } from 'react-icons/fa';
import MagicModal from '../MagicModal';
import LogoNetflix from '../../assets/logo.png';

import { Container, RoutesMenu, Profile } from './styles';

const NavBar: React.FC = () => {
  const [isBlack, setIsBlack] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModal = () => setModalOpen(false);

  useEffect(() => {
    window.addEventListener('scroll', () => setIsBlack(window.scrollY > 10));

    // Remove o evento quando o componente for desmontado
    return () => {
      window.removeEventListener('scroll', () => setIsBlack(window.scrollY > 10));
    };
  }, []);

  return (
    <Container isBlack={isBlack}>
      <RoutesMenu>
        <img src={LogoNetflix} alt="Netflix Logo" />
        <ul>
          <li style={{ fontWeight: 'bold' }}>Inicio</li>
          <li>Series</li>
          <li>Filmes</li>
          <li>Mais Recentes</li>
          <li>Minha Lista</li>
        </ul>
      </RoutesMenu>
      <Profile>
        <FaBiohazard onClick={handleOpenModal} style={{ cursor: 'pointer' }} />
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
