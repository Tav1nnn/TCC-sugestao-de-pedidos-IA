import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import LoadingAnimation from '../components/LoadingAnimation';
import "../styles/Restaurant.css";
import { Button } from "@chakra-ui/react";
import { FaRobot } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";
import axios from "axios";

const Restaurant = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    const [menuData, setMenuData] = useState([]);
    const [restaurantData, setRestaurantData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem('authToken');

            try {
                const restaurantResponse = await axios.get(`http://localhost:8080/api/restaurants/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                console.log("Restaurante:", restaurantResponse.data);
                setRestaurantData(restaurantResponse.data);

                const response = await axios.get(`http://localhost:8080/api/menuItem/${id}`, {
                    headers: {
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
        <div className="homeRest-container">
            <div className="restaurantRest-description">
                <div className="restaurantRest-image-capa">
                    <img
                        src={restaurantData?.coverUrl || "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2b/56/71/59/atmosphere.jpg"}
                        alt={restaurantData?.name || "Imagem do Restaurante"}
                    />
                    <div className="restaurantRest-text-info">
                        <h1>{restaurantData?.name || "Restaurante"}</h1>
                        <h3>{restaurantData?.description || "Descrição do Restaurante"}</h3>
                        <h2>Cardápio</h2>
                        <Button
                                bg={'#2D2C31'}
                                border={'2px solid #A10808'}
                                borderRadius={'50%'}
                                color={'white'}
                                position={'absolute'}
                                top={'10px'}
                                right={'20px'}
                                onClick={() => navigate(-1)}
                            >
                                <AiOutlineClose />
                            </Button>
                    </div>
                </div>

                <div className="menuRest-section">
                    {menuData.map((category, index) => (
                        <div key={index} className="menuRest-item">
                            <h3>{category.category}</h3>

                            {category.menuItem.map((dish, dishIndex) => (
                                <div key={dishIndex} className="dishRest-row">
                                    <div className="dishRest-image">
                                        <img src={dish.imageUrl} alt={dish.name} />
                                    </div>

                                    <div className="dishRest-info">
                                        <p className="dishRest-name"><strong>{dish.name}</strong></p>
                                        <p className="dishRest-ingredients">{dish.ingredients.join(", ")}</p>
                                        <p className="dishRest-price">R$ {dish.price.toFixed(2)}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
                <div>
                    <div>
                        <Button className='btnRest-ia' onClick={() => navigate(`/chatRest/${id}`)}>
                            <FaRobot className='iconRest-ia' />
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Restaurant;
