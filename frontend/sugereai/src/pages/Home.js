import React, { useState, useEffect } from 'react';
import '../styles/Home.css';
import LoadingAnimation from '../components/LoadingAnimation';
import {
  Button
} from "@chakra-ui/react";
import { FaRobot } from "react-icons/fa";

const restaurants = [
  {
    id: 1,
    name: 'Restaurante A',
    description: 'Descrição do Restaurante A',
    image: 'https://marketplace.canva.com/EAFuRCowrBE/1/0/1600w/canva-logotipo-para-restaurante-moderno-laranja-marrom-M2uDDAK9eXw.jpg'
  },
  {
    id: 2,
    name: 'Restaurante B',
    description: 'Descrição do Restaurante B',
    image: 'https://static.vecteezy.com/ti/vetor-gratis/p1/9291628-restaurante-logo-design-vetor.jpg'
  },
  {
    id: 3,
    name: 'Restaurante C',
    description: 'Descrição do Restaurante C',
    image: 'https://img.freepik.com/vetores-gratis/logotipo-do-restaurante-retro_23-2148490227.jpg'
  },
  {
    id: 4,
    name: 'Restaurante D',
    description: 'Descrição do Restaurante D',
    image: 'https://static.vecteezy.com/ti/vetor-gratis/p1/10411845-restaurante-logo-design-modelo-gratis-vetor.jpg'
  },
  {
    id: 5,
    name: 'Restaurante E',
    description: 'Descrição do Restaurante E',
    image: 'https://img.freepik.com/vetores-premium/logotipo-do-restaurante-retro_23-2148474404.jpg'
  },
  {
    id: 6,
    name: 'Restaurante F',
    description: 'Descrição do Restaurante F',
    image: 'https://www.creativefabrica.com/wp-content/uploads/2019/08/Restaurant-Logo-by-Koko-Store-580x386.jpg'
  },
  {
    id: 7,
    name: 'Restaurante G',
    description: 'Descrição do Restaurante G',
    image: 'https://d1csarkz8obe9u.cloudfront.net/posterpreviews/logotipo-restaurant-design-template-208dd1149913cdd7974bb7d832a59dc4_screen.jpg?ts=1625803921'
  },
  {
    id: 8,
    name: 'Restaurante H',
    description: 'Descrição do Restaurante H',
    image: 'https://images.vexels.com/content/172815/preview/restaurant-logo-design-5460fc.png'
  }
];

const Home = () => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
        setIsLoading(false);
        }, 2000);
        return () => clearTimeout(timer);
    }, []);

    if (isLoading) {
        return <LoadingAnimation />;
    }
  return (
    <div className="home-container">
      <div className="home-header">
        <h1>Restaurantes</h1>
      </div>
      <div className='sugere-ai'>
        <img src='https://peraweb.com.br/wp-content/uploads/2024/10/food-5-768x432.webp' alt='Sugere ai' />
        <h2> ENCONTRE A SUGESTÃO QUE IRÁ TE SURPREENDER!</h2>
      </div>
      <div className="restaurant-cards">
        {restaurants.map(restaurant => (
          <div key={restaurant.id} className="restaurant-card">
            <img src={restaurant.image} alt={restaurant.name} /> 
            <h2>{restaurant.name.toUpperCase()}</h2>
            {/* <p>{restaurant.description}</p> */}
          </div>
        ))}
      </div>
      <div>
        <a href='http://localhost:3000/chat' rel='noopener noreferrer'>
          <Button className='btn-ia'>
            <FaRobot className='icon-ia'/>
            {/*<PiOpenAiLogoBold className='icon-ia'/> */}
          </Button>
        </a>
      </div>
    </div>
  );
};

/* Nunca foi tão fácil saber o que pedir, aqui você não fica na dúvida 
    Placeholder "Diga ao chat o que você deseja comer".
*/

export default Home;