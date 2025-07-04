import React, { useState, useEffect } from 'react';
import '../styles/Home.css';
import LoadingAnimation from '../components/LoadingAnimation';
import {
  Button
} from "@chakra-ui/react";
import { FaRobot } from "react-icons/fa";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import logo from '../images/Logo preta escrita.png';
import { jwtDecode } from "jwt-decode";
import { MdLogout } from "react-icons/md";
import { toaster } from "../components/ui/toaster"

const Home = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/");
  };

  const getRestaurants = async () => {
    try {
      const token = localStorage.getItem('authToken');

      if (!token) {
        toaster.create({
                    title: "Sessão expirada. Faça login novamente.",
                    type: "error",
                    duration: 3000,
                });
        navigate('/');
        return;
      }

      const decodedPayload = jwtDecode(token);

      const response = await axios.get('http://localhost:8080/api/restaurants', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      const responseUser = await axios.get('http://localhost:8080/api/users/getUser', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setRestaurants(response.data);
      setUser({
        ...responseUser.data,
        ...decodedPayload
      });
    } catch (error) {
      if (error.response?.status === 401) {
        toaster.create({
          title: "Sessão expirada. Faça login novamente.",
          type: "error",
          duration: 3000,
        });
        navigate('/');
      }
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
        <Button className="btn-profile" onClick={() => navigate(`/profile/${user.id}`)}>
          <img
            src={user?.imageUrl || 'https://via.placeholder.com/40'}
            alt={`Foto de ${user?.name || 'usuário'}`}
          />
        </Button>

        <img src={logo} alt="Logo" className="logo" />

        <Button className="btn-logout" onClick={handleLogout}>
          <MdLogout />
        </Button>
      </div>
      <div className="home-image">
        <div className='sugere-ai'>
          <img src='https://peraweb.com.br/wp-content/uploads/2024/10/food-5-768x432.webp' alt='Sugere ai' />
          <h2> ENCONTRE A SUGESTÃO QUE IRÁ TE SURPREENDER!</h2>
        </div>
        <div className="restaurant-cards">
          {restaurants.map(restaurant => (
            <div
              key={restaurant.id}
              className="restaurant-card"
              onClick={() => navigate(`/restaurant/${restaurant.id}`)}
              style={{ cursor: 'pointer' }}
            >
              <img src={restaurant.imageUrl} alt={restaurant.name} />
              <h2>{restaurant.name.toUpperCase()}</h2>
            </div>
          ))}
        </div>
        <div>
          <div>
            <Button className='btn-ia-home' onClick={() => navigate(`/chat`)}>
              <FaRobot className='icon-ia-home' />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;