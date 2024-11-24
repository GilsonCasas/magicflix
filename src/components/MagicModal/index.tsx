/* eslint-disable */
import React, { useState, useEffect } from "react";
import axios from 'axios';
import {
  Modal,
  Box,
  Typography,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
  Grid,
} from "@mui/material";

import { IoMdClose } from 'react-icons/io';

// Importando as imagens
import magicflixLogo from "../../assets/magicflix.png";
import animadoIcon from "../../assets/animado.png";
import deboaIcon from "../../assets/deboa.png";
import irritadoIcon from "../../assets/irritado.png";
import ansiosoIcon from "../../assets/ansioso.png";
import nabadIcon from "../../assets/nabad.png";
import comtedioIcon from "../../assets/comtedio.png";

interface MagicModalProps {
  open: boolean;
  onClose: () => void;
}

const MagicModal: React.FC<MagicModalProps> = ({ open, onClose }) => {
  const [step, setStep] = useState(1);
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({});

  const handleOptionSelect = (stepKey: string, value: string) => {
    setSelectedOptions((prev) => ({ ...prev, [stepKey]: value }));
    if (step < 4) setStep(step + 1);
    else setStep(5);
  };

  const resetAndClose = () => {
    setStep(1);
    setTmdbRecommendations([]);
    setSelectedOptions({});
    onClose();
  };

  const getHeader = () => (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
        marginBottom: "16px",
      }}
    >
      <img
        src={magicflixLogo}
        alt="Logo Magic Flix"
        style={{
          height: "70px",
          width: "auto",
          objectFit: "contain",
          marginRight: "10px",
          backgroundColor: "transparent",
          marginLeft: "-15px",
          mixBlendMode: "lighten"
        }}
      />
      <Box
        sx={{
          height: "4px",
          width: `${20 * step}%`,
          backgroundColor: "#e50914",
          transition: "width 0.5s ease",
        }}
      />
    </Box>
  );

  type Movie = {
    poster_path: string;
    title: string;
    overview: string;
    runtime?: number;
  };
  
   const [tmdbRecommendations, setTmdbRecommendations] = useState<Movie[]>([]);
   
   useEffect(() => {
    if (step === 5) {
      const getDecisionTreeRecommendation = () => {
        const tempo = Number(selectedOptions.tempo);
        const foco  = selectedOptions.foco;
        const sentimento = selectedOptions.sentimento;
  
      // Melhorar a árvore de decisão para determinar o tipo de filme a ser recomendado
     if (tempo <= 30) {
      if (sentimento === 'Animado') {
        if (foco === 'Leve') {
          return '35'; // Comédia
        } else if (foco === 'Foco') {
          return '16'; // Animação
        } else {
          return '35'; // Comédia
        }
      } else if (sentimento === 'Na bad') {
        return foco === 'Leve' ? '10749' : foco === 'Foco' ? '18' : '10749'; // Romance ou Drama
      } else if (sentimento === 'Curioso') {
        return foco === 'Leve' ? '99' : foco === 'Foco' ? '36' : '99'; // Documentário ou Histórico
      } else if (sentimento === 'Ansioso') {
        return foco === 'Leve' ? '878' : foco === 'Foco' ? '53' : '878'; // Ficção científica ou Suspense
      } else if (sentimento === 'Com tédio') {
        return foco === 'Leve' ? '35' : foco === 'Foco' ? '18' : '35'; // Comédia ou Drama
      } else if (sentimento === 'De boa') {
        return foco === 'Leve' ? '10749' : foco === 'Foco' ? '12' : '10749'; // Romance ou Aventura
      }
    } else if (tempo > 30 && tempo <= 90) {
      if (sentimento === 'Animado') {
        return foco === 'Leve' ? '10749' : foco === 'Foco' ? '12' : '10749'; // Romance ou Aventura
      } else if (sentimento === 'Na bad') {
        return foco === 'Leve' ? '18' : foco === 'Foco' ? '9648' : '18'; // Drama ou Mistério
      } else if (sentimento === 'Curioso') {
        return foco === 'Leve' ? '99' : foco === 'Foco' ? '53' : '99'; // Documentário ou Suspense
      } else if (sentimento === 'Ansioso') {
        return foco === 'Leve' ? '27' : foco === 'Foco' ? '878' : '27'; // Terror ou Ficção Científica
      } else if (sentimento === 'Com tédio') {
        return foco === 'Leve' ? '35' : foco === 'Foco' ? '12' : '35'; // Comédia ou Aventura
      } else if (sentimento === 'De boa') {
        return foco === 'Leve' ? '10749' : foco === 'Foco' ? '14' : '10749'; // Romance ou Fantasia
      }
    } else {
      if (sentimento === 'Animado') {
        return foco === 'Leve' ? '28' : foco === 'Foco' ? '14' : '28'; // Ação ou Fantasia
      } else if (sentimento === 'Na bad') {
        return foco === 'Leve' ? '36' : foco === 'Foco' ? '18' : '36'; // Histórico ou Drama
      } else if (sentimento === 'Curioso') {
        return foco === 'Leve' ? '878' : foco === 'Foco' ? '99' : '878'; // Ficção científica ou Documentário
      } else if (sentimento === 'Ansioso') {
        return foco === 'Leve' ? '53' : foco === 'Foco' ? '27' : '53'; // Suspense ou Terror
      } else if (sentimento === 'Com tédio') {
        return foco === 'Leve' ? '35' : foco === 'Foco' ? '14' : '35'; // Comédia ou Fantasia
      } else if (sentimento === 'De boa') {
        return foco === 'Leve' ? '10749' : foco === 'Foco' ? '12' : '10749'; // Romance ou Aventura
      }
    }

    // Valor padrão se nenhuma condição for atendida
    return '12'; // Aventura
  };
  
      const fetchRecommendationsFromTMDb = async (genre: string, tempo: Number ) => {
        const randomPage = Math.floor(Math.random() * 10) + 1;
        const apiUrl = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=pt-BR&page=${randomPage}&sort_by=popularity.desc&without_genres=${genre}&with_runtime.lte=${tempo}&with_watch_providers=8&watch_region=BR`;
  
        try {
          const response = await axios.get(apiUrl, {
            headers: {
              Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3MTExNjE4NWI2MGZlNWE3MDIzYmM4MDU2ZTJlNWIwZSIsIm5iZiI6MTczMjM5Njk3Ni44ODUzMzI2LCJzdWIiOiI2NzI3ODNhMzU1NWUzZWZjODljMzFiZGEiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.LuxH4aPsJ7c8AvxRdRtJpIlQnjI__O3mGCz0lXEzc5s'
            }
          });
       return response.data.results.slice(0, 3); // Retorna as três principais recomendações
      } catch (error) {
        console.error('Erro ao buscar recomendações personalizadas:', error);
        return [];
      }
    };

  
      const genre = getDecisionTreeRecommendation();
      const tempo = Number(selectedOptions.tempo);
      fetchRecommendationsFromTMDb(genre, tempo).then((movies) => {
        setTmdbRecommendations(movies);
      });
    }
  }, [step]);
  
  const getContent = () => {
    switch (step) {
      case 1:
        return (
          <>
            {getHeader()}
            <Typography
              variant="h5"
              fontWeight="bold"
              gutterBottom
              sx={{
                fontSize: "1.8rem",
                color: "#ffffff",
                marginBottom: "16px",
              }}
            >
              Bem-vindo ao MagicFlix! 🎉
            </Typography>
            <Typography
              variant="body1"
              sx={{
                fontSize: "1rem",
                color: "#b3b3b3",
                marginBottom: "12px",
              }}
            >
              Agora, escolher o que assistir ficou mais fácil e divertido. Com o
              MagicFlix, você tem um assistente interativo que oferece
              recomendações rápidas e personalizadas, feitas especialmente para
              o seu momento.
            </Typography>
            <Button
              variant="contained"
              onClick={() => setStep(2)}
              sx={{
                backgroundColor: "#e50914",
                "&:hover": { backgroundColor: "#b00610" },
              }}
            >
              Continuar
            </Button>
          </>
        );
      case 2:
        return (
          <>
            {getHeader()}
            <Typography
              variant="h6"
              fontWeight="bold"
              gutterBottom
              sx={{ fontSize: "1.5rem", color: "#ffffff", marginBottom: "16px" }}
            >
              Quanto tempo você tem para assistir agora?
            </Typography>
            <RadioGroup
              value={selectedOptions.tempo}
              onChange={(e) => handleOptionSelect('tempo', e.target.value)}
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "8px",
              }}
            >
              <FormControlLabel
                value="30"
                control={<Radio sx={{ display: "none" }} />}
                label="30 minutos"
                sx={optionStyles(selectedOptions.tempo === "30")}
              />
              <FormControlLabel
                value="60"
                control={<Radio sx={{ display: "none" }} />}
                label="60 Minutos"
                sx={optionStyles(selectedOptions.tempo === "60")}
              />
              <FormControlLabel
                value="120"
                control={<Radio sx={{ display: "none" }} />}
                label="Mais de 120 minutos"
                sx={optionStyles(selectedOptions.tempo === "120")}
              />
            </RadioGroup>
          </>
        );
      case 3:
        return (
          <>
            {getHeader()}
            <Typography
              variant="h6"
              fontWeight="bold"
              gutterBottom
              sx={{ fontSize: "1.5rem", color: "#ffffff", marginBottom: "16px" }}
            >
              Como você está se sentindo no momento?
            </Typography>
            <RadioGroup
              value={selectedOptions.sentimento}
              onChange={(e) => handleOptionSelect('sentimento', e.target.value)}
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "8px",
              }}
            >
              <Grid container spacing={2} justifyContent="space-between" alignItems="center" sx={{ margin: 0, maxWidth: "100%" }}>
                {[
                  { value: "Animado", label: "Animado", icon: animadoIcon },
                  { value: "De boa", label: "De Boa", icon: deboaIcon },
                  { value: "Irritado", label: "Irritado", icon: irritadoIcon },
                  { value: "Ansioso", label: "Ansioso", icon: ansiosoIcon },
                  { value: "Na bad", label: "Na bad", icon: nabadIcon },
                  { value: "Com tédio", label: "Com tédio", icon: comtedioIcon },
                ].map((option) => (
                  <FormControlLabel
                    value={option.value}
                    sx={{ margin: 0 }}
                    control={<Radio sx={{ display: "none" }} />}
                    label={
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "flex-start",
                          width: "200px",
                          height: "70px",
                          padding: "8px",
                          border: "2px solid transparent",
                          borderRadius: "8px",
                          transition: "all 0.3s ease",
                          marginTop: "10px",
                          backgroundColor: selectedOptions.sentimento === option.value ? "#333333" : "#181818",
                          borderColor: selectedOptions.sentimento === option.value ? "#e50914" : "#ffffff33",
                          "&:hover": {
                            borderColor: "#e50914",
                          },
                        }}
                      >
                        <img
                          src={option.icon}
                          alt={option.label}
                          style={{
                            width: "32px",
                            height: "32px",
                            objectFit: "contain",
                          }}
                        />
                        <Typography sx={{ color: "#ffffff", marginLeft: "12px" }}>
                          {option.label}
                        </Typography>
                      </Box>
                    }
                  />
                ))}
              </Grid>
            </RadioGroup>
          </>
        );
      case 4:
        return (
          <>
            {getHeader()}
            <Typography
              variant="h6"
              fontWeight="bold"
              gutterBottom
              sx={{ fontSize: "1.5rem", color: "#ffffff", marginBottom: "16px" }}
            >
              Está mais no clima de algo leve ou de algo que exija total atenção?
            </Typography>
            <RadioGroup
              value={selectedOptions.foco}
              onChange={(e) => handleOptionSelect('foco', e.target.value)}
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "8px",
              }}
            >
              <FormControlLabel
                value="Leve"
                control={<Radio sx={{ display: "none" }} />}
                label="Prefiro um conteúdo leve"
                sx={optionStyles(selectedOptions.foco === "Leve")}
              />
              <FormControlLabel
                value="Foco"
                control={<Radio sx={{ display: "none" }} />}
                label="Prefiro um conteúdo para focar"
                sx={optionStyles(selectedOptions.foco === "Foco")}
              />
              <FormControlLabel
                value="Sem preferência"
                control={<Radio sx={{ display: "none" }} />}
                label="Não tenho preferência de conteúdo"
                sx={optionStyles(selectedOptions.foco === "Sem preferência")}
              />
            </RadioGroup>
          </>
        );
        case 5:
   return (
      <>
        {getHeader()}
        <Typography
          variant="h6"
          fontWeight="bold"
          gutterBottom
          sx={{ fontSize: "1.5rem", color: "#ffffff", marginBottom: "16px" }}
        >
          Recomendações para você:
        </Typography>
        {tmdbRecommendations.length > 0 ? (
          <Grid container spacing={2}>
            {tmdbRecommendations.slice(0, 3).map((movie, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Box sx={{ textAlign: "center" }}>
                  <img
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                    onError={(e) => {
                      e.currentTarget.src = 'https://via.placeholder.com/500x750?text=Imagem+n%C3%A3o+dispon%C3%ADvel';
                    }}
                    style={{
                      width: "100%",
                      height: "auto",
                      borderRadius: "8px",
                      marginBottom: "8px",
                    }}
                  />
                  <Typography variant="h6" sx={{ color: "#ffffff" }}>
                    {movie.title}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "#b3b3b3" }}>
                    {movie.overview.length > 100
                      ? `${movie.overview.substring(0, 100)}...`
                      : movie.overview}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "#b3b3b3", marginTop: "8px" }}>
                    Duração: {movie.runtime ? `${movie.runtime} minutos` : 'Duração não disponível'}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        ) : (
          <Typography sx={{ color: "#b3b3b3" }}>
            Nenhuma recomendação encontrada para suas escolhas.
          </Typography>
        )}
        <Button
          variant="contained"
          onClick={resetAndClose}
          sx={{
            marginTop: "16px",
            backgroundColor: "#e50914",
            "&:hover": { backgroundColor: "#b00610" },
          }}
        >
          Fechar
        </Button>
      </>
    );
  default:
    return null;
};
  }
  return (
    <Modal
      open={open}
      onClose={resetAndClose}
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 600,
          bgcolor: "#181818",
          color: "white",
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: "15px",
            right: "10px",
            cursor: "pointer",
            color: "#fff",
            fontSize: "1.5rem",
            fontWeight: "bold",
            zIndex: 1,
            "&:hover": {
              color: "#e50914",
            },
          }}
          onClick={resetAndClose}
        >
          <IoMdClose />
        </Box>
        {getContent()}
      </Box>
    </Modal>
  );
};

const optionStyles = (isSelected: boolean) => ({
  border: isSelected ? "2px solid #e50914" : "2px solid transparent",
  borderRadius: "8px",
  padding: "8px",
  backgroundColor: isSelected ? "#333333" : "#181818",
  color: "#ffffff",
  transition: "all 0.3s ease",
  "&:hover": {
    backgroundColor: "#333333",
    borderColor: "#e50914",
  },
});

export default MagicModal;
