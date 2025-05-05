import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import LoadingAnimation from "../components/LoadingAnimation";
import "../styles/Dish.css";
import { Button } from "@chakra-ui/react";
import { AiOutlineClose } from "react-icons/ai";
import axios from "axios";

const Dish = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    const [dishData, setDishData] = useState(null);

    useEffect(() => {
        const fetchDishAndIngredients = async () => {
            const token = localStorage.getItem("authToken");
    
            try {
                const dishResponse = await axios.get(`http://localhost:8080/api/menuItem/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
    
                const foundDish = dishResponse.data;
    
                const ingResponse = await axios.get(`http://localhost:8080/api/ingredients`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
    
                const allIngredients = ingResponse.data;
    
                const fullIngredients = foundDish.ingredientIds.map(ingId => {
                    const match = allIngredients.find(i => i.id === ingId);
                    return match?.name || "Desconhecido";
                });
                
                setDishData({
                    ...foundDish,
                    ingredients: fullIngredients
                });
    
            } catch (error) {
                console.error("Erro ao buscar prato ou ingredientes:", error);
                if (error.response?.status === 401) {
                    alert("Sessão expirada. Faça login novamente.");
                    window.location.href = "/";
                }
            } finally {
                setIsLoading(false);
            }
        };
    
        fetchDishAndIngredients();
    }, [id]);
    
    

    if (isLoading) return <LoadingAnimation />;

    return (
        <div className="dish-container">
            <div className="dish-description">
                <div className="dish-image-capa">
                    <img
                        src={dishData?.imageURL || "https://via.placeholder.com/600x200"}
                        alt={dishData?.name || "Prato"}
                    />
                    <div className="dish-text-info">
                        <h1>{dishData?.name || "Prato"}</h1>
                        <h3>{dishData?.description || "Descrição do prato"}</h3>
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
    
                <div className="dish-info-section">
                    <p><strong>Ingredientes:</strong> {dishData?.ingredients.join(", ")} </p>
                    <p><strong>Preço:</strong> R$ {dishData?.price?.toFixed(2)}</p>
                </div>
            </div>
        </div>
    );    
};

export default Dish;
