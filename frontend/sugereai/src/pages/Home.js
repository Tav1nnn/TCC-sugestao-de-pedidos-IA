import React, { useState, useEffect } from 'react';
import '../styles/Home.css';
import LoadingAnimation from '../components/LoadingAnimation';
import {
  Button
} from "@chakra-ui/react";
import { FaRobot } from "react-icons/fa";
import axios from 'axios';
import logo from '../images/Logo preta escrita.png';

const Home = () => {
  const [restaurants, setRestaurants] = useState([]);

  const getRestaurants = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/restaurants`);
      console.log(response.data);
      setRestaurants(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getRestaurants();
  }, []);

  if (restaurants.length === 0) {
    return <LoadingAnimation />;
  }

  return (
    <div className="home-container">
      <div className="home-header">
        <img src={logo} alt="Logo" className="logo" />
        <h1>RESTAURANTES</h1>
      </div>
      <div className="home-image">
        <div className='sugere-ai'>
          <img src='https://peraweb.com.br/wp-content/uploads/2024/10/food-5-768x432.webp' alt='Sugere ai' />
          <h2> ENCONTRE A SUGESTÃO QUE IRÁ TE SURPREENDER!</h2>
        </div>
        <div className="restaurant-cards">
          {restaurants.map(restaurant => (
            <a href={`http://localhost:3000/restaurant/${restaurant.id}`} rel='noopener noreferrer'>
              <div key={restaurant.id} className="restaurant-card">
                <img src={restaurant.imageUrl} alt={restaurant.name} />
                <h2>{restaurant.name.toUpperCase()}</h2>
                {/* <p>{restaurant.description}</p> */}
              </div>
            </a>
          ))}
        </div>
        <div>
          <a href='http://localhost:3000/chat' rel='noopener noreferrer'> {/* Adicionar validação no Button */}
            <Button className='btn-ia'>
              <FaRobot className='icon-ia' />
            </Button>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Home;