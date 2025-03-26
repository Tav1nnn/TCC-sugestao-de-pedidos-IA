import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import LoadingAnimation from '../components/LoadingAnimation';
import "../styles/Restaurant.css"; // Importando o CSS separado
import { Button } from "@chakra-ui/react";
import { FaRobot } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";
import axios from "axios";

const Restaurant = () => {
    const { id } = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const [menuData, setMenuData] = useState([]); // Estado para armazenar o cardápio comentar caso utilize os menus diretos

    useEffect(() => {
        const fetchMenu = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/menuItem/${id}`);
                console.log("Menu:", response.data.menu);
                setMenuData(response.data.menu); // Pegamos a lista de menus da API
            } catch (error) {
                console.error("Erro ao buscar o menu:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchMenu();
    }, [id]); // Executa toda vez que o ID mudar

    if (isLoading) {
        return <LoadingAnimation />;
    }

    /*useEffect(() => {
        setTimeout(() => {
            setIsLoading(false);
            // Simulando os dados do cardápio (sem API) comentar ate o 2000 caso utilizar direto.
            setMenuData([
                {
                    category: "Entradas",
                    description: "Deliciosas opções para começar sua refeição.",
                    dishes: [
                        {
                            name: "Bruschetta",
                            image: 'https://static.itdg.com.br/images/1200-675/dadafb5a13a8fc316bded0ea8feb2a37/326223-original.jpg',
                            ingredients: ["Pão italiano", "Tomate", "Manjericão", "Azeite"]
                        },
                        {
                            name: "Carpaccio",
                            image: 'https://www.minhareceita.com.br/app/uploads/2025/02/R1224_Carpaccio_de_Lagarto_com_Pesto_de_Rucula_e_Lascas_de_Parmesao-desk.webp',
                            ingredients: ["Carne bovina", "Parmesão", "Rúcula", "Azeite"]
                        }
                    ]
                },
                {
                    category: "Pratos Principais",
                    description: "Escolha entre diversas opções de pratos saborosos.",
                    dishes: [
                        {
                            name: "Risoto de Camarão",
                            image: 'https://receitas.wap.ind.br/wp-content/uploads/2024/10/risoto-de-camarao-1080x640.jpg',
                            ingredients: ["Arroz arbóreo", "Camarão", "Queijo parmesão", "Creme de leite"]
                        }
                    ]
                },
                {
                    category: "Bebidas",
                    description: "Refrigerantes, sucos e drinks especiais.",
                    dishes: [
                        {
                            name: "Coca Cuela",
                            image: 'https://carrefourbrfood.vtexassets.com/arquivos/ids/119765719/coca-cola-lata-350-ml-1.jpg?v=638224488171270000',
                            ingredients: ["Água gaseificada", "Corante preto"]
                        }
                    ]
                },
                {
                    category: "Sobremesas",
                    description: "Finalize sua refeição com um doce irresistível.",
                    dishes: [
                        {
                            name: "Banoffe",
                            image: 'https://i.ytimg.com/vi/57rMmZL6png/maxresdefault.jpg',
                            ingredients: ["Banana", "Creme de leite fresco batido", "Doce de leite", "Crumble de bolacha de maizena"]
                        }
                    ]
                }
            ]);
        }, 2000);
    }, []);

    if (isLoading) {
        return <LoadingAnimation />;
    }*/

    return (
        <div className="home-container">
            <div className="restaurant-header">
                <div className="close-btn">
                    <a href='http://localhost:3000/home' rel='noopener noreferrer'>
                        <Button bg={'#2D2C31'} border={'2px solid #A10808'} borderRadius={'50%'} color={'white'}>
                            <AiOutlineClose />
                        </Button>
                    </a>
                </div>
                <h1>Turbos</h1>
            </div>

            <div className="restaurant-image">
                <img
                    src="https://img.restaurantguru.com/ra34-Turbo-Lanches-interior-2021-09-2.jpg"
                    alt="Imagem do Restaurante"
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
                                    <img src={dish.image} alt={dish.name} />
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

            {/* Uso sem API antigo definindo na mão
        <div className="menu-section">
        <div className="menu-item">
          <h3>Entradas</h3>
          <p>Deliciosas opções para começar sua refeição.</p>
        </div>
        <div className="menu-item">
          <h3>Pratos Principais</h3>
          <p>Escolha entre diversas opções de pratos saborosos.</p>
        </div>
        <div className="menu-item">
          <h3>Bebidas</h3>
          <p>Refrigerantes, sucos e drinks especiais.</p>
        </div>
        <div className="menu-item">
          <h3>Sobremesas</h3>
          <p>Finalize sua refeição com um doce irresistível.</p>
        </div>
      </div>*/}
            <div>
                <a href='http://localhost:3000/chat' rel='noopener noreferrer'> {/* Adicionar validação no Button */}
                    <Button className='btn-ia'>
                        <FaRobot className='icon-ia' />
                        {/*<PiOpenAiLogoBold className='icon-ia'/> */}
                    </Button>
                </a>
            </div>
        </div>
    );
};

export default Restaurant;
