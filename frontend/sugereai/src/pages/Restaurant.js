import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import LoadingAnimation from '../components/LoadingAnimation';
import "../styles/Restaurant.css";
import { Button } from "@chakra-ui/react";
import { FaRobot } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";
import axios from "axios";

const Restaurant = () => {
    const { id } = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const [menuData, setMenuData] = useState([]);
    const [restaurantData, setRestaurantData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem('authToken');
            /*const userId = localStorage.getItem('userId');*/

            try {
                const restaurantResponse = await axios.get(`http://localhost:8080/api/restaurants/${id}`, {
                    headers: {
                        /*'UserId': userId,*/
                        Authorization: `Bearer ${token}`
                      }
                    });
                console.log("Restaurante:", restaurantResponse.data);
                setRestaurantData(restaurantResponse.data);

                const response = await axios.get(`http://localhost:8080/api/menuItem/${id}`, {
                    headers: {
                        /*'UserId': userId,*/
                        Authorization: `Bearer ${token}`
                      }
                    });
                console.log("Menu:", response.data.menu);
                setMenuData(response.data.menu);
            } catch (error) {
                console.error("Erro ao buscar dados:", error);
                if (error.response?.status === 401) {
                    alert('Sessão expirada. Faça login novamente.');
                    window.location.href = '/';
                  }
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [id]);

    if (isLoading) {
        return <LoadingAnimation />;
    }

    return (
        <div className="home-container">
            <div className="restaurant-headerRest">
                <div className="close-btn">
                    <a href='http://localhost:3000/home' rel='noopener noreferrer'>
                        <Button bg={'#2D2C31'} border={'2px solid #A10808'} borderRadius={'50%'} color={'white'}>
                            <AiOutlineClose />
                        </Button>
                    </a>
                </div>
                <h1>{restaurantData?.name || "Restaurante"}</h1>
            </div>
            <div className="restaurant-description">
                <div className="restaurant-image">
                    <img
                        src={restaurantData?.imageUrl || "https://img.restaurantguru.com/ra34-Turbo-Lanches-interior-2021-09-2.jpg"}
                        alt={restaurantData?.name || "Imagem do Restaurante"}
                    />
                </div>
                <div className="restaurant-menutitle">
                    <h2>Cardápio</h2>
                </div>

                <div className="menu-section">
                    {menuData.map((category, index) => (
                        <div key={index} className="menu-item">
                            <h3>{category.category}</h3>

                            {category.menuItem.map((dish, dishIndex) => (
                                <div key={dishIndex} className="dish-row">
                                    <div className="dish-image">
                                        <img src={dish.imageUrl} alt={dish.name} />
                                    </div>

                                    {/*Texto */}
                                    <div className="dish-info">
                                        <p className="dish-name"><strong>{dish.name}</strong></p>
                                        <p className="dish-ingredients">{dish.ingredients.join(", ")}.</p>
                                        <p className="dish-price">R$ {dish.price.toFixed(2)}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
                <div>
                    <a href='http://localhost:3000/chat' rel='noopener noreferrer'> {/* Adicionar validação no Button */}
                        <Button className='btn-iaRest'>
                            <FaRobot className='icon-ia' />
                        </Button>
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Restaurant;
