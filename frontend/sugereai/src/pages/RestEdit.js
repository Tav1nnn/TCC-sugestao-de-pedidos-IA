import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import LoadingAnimation from '../components/LoadingAnimation';
import { Button, Input, VStack, HStack, Box} from "@chakra-ui/react";
import { FaCheck, FaRobot,} from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";
import axios from "axios";

const RestEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [menuData, setMenuData] = useState([]);
  const [restaurantData, setRestaurantData] = useState(null);
  const [editedMenuData, setEditedMenuData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('authToken');

      try {
        const restaurantResponse = await axios.get(`http://localhost:8080/api/restaurants/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setRestaurantData(restaurantResponse.data);

        const response = await axios.get(`http://localhost:8080/api/menuItem/restaurant/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setMenuData(response.data.menu);
        setEditedMenuData(response.data.menu);
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

  const handleCategoryChange = (index, value) => {
    const updatedData = [...editedMenuData];
    updatedData[index].category = value;
    setEditedMenuData(updatedData);
  };

  const handleDishChange = (catIndex, dishIndex, field, value) => {
    const updatedData = [...editedMenuData];
    updatedData[catIndex].menuItem[dishIndex][field] = value;
    setEditedMenuData(updatedData);
  };

  const handleIngredientChange = (catIndex, dishIndex, ingIndex, value) => {
    const updatedData = [...editedMenuData];
    updatedData[catIndex].menuItem[dishIndex].ingredients[ingIndex].ingredient = value;
    setEditedMenuData(updatedData);
  };

  const handleSaveCategory = async (categoryId, newName) => {
    const token = localStorage.getItem('authToken');
    try {
      await axios.put(`http://localhost:8080/api/categories/${categoryId}`, { name: newName }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      alert('Categoria atualizada com sucesso!');
    } catch (error) {
      console.error("Erro ao atualizar categoria:", error);
    }
  };

  const handleSaveDish = async (dishId, updatedDish) => {
    const token = localStorage.getItem('authToken');
    try {
      await axios.put(`http://localhost:8080/api/menuItems/${dishId}`, updatedDish, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      alert('Prato atualizado com sucesso!');
    } catch (error) {
      console.error("Erro ao atualizar prato:", error);
    }
  };

  const handleSaveIngredient = async (ingredientId, newName) => {
    const token = localStorage.getItem('authToken');
    try {
      await axios.put(`http://localhost:8080/api/ingredients/${ingredientId}`, { ingredient: newName }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      alert('Ingrediente atualizado com sucesso!');
    } catch (error) {
      console.error("Erro ao atualizar ingrediente:", error);
    }
  };

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
          {editedMenuData.map((category, catIndex) => (
            <Box key={catIndex} className="menuRest-item" p={4} borderWidth="1px" borderRadius="md" mb={4}>
              <HStack mb={2}>
                <Input
                  value={category.category}
                  onChange={(e) => handleCategoryChange(catIndex, e.target.value)}
                />
                <Button onClick={() => handleSaveCategory(category.categoryId, category.category)}><FaCheck/></Button>
              </HStack>

              {category.menuItem.map((dish, dishIndex) => (
                <Box key={dishIndex} className="dishRest-row" p={3} borderWidth="1px" borderRadius="md" mb={3}>
                  <HStack mb={2}>
                    <Input
                      placeholder="Nome do Prato"
                      value={dish.name}
                      onChange={(e) => handleDishChange(catIndex, dishIndex, 'name', e.target.value)}
                    />
                    <Input
                      placeholder="Preço"
                      type="number"
                      value={dish.price}
                      onChange={(e) => handleDishChange(catIndex, dishIndex, 'price', parseFloat(e.target.value))}
                    />
                    <Input
                      placeholder="URL da Imagem"
                      value={dish.imageUrl}
                      onChange={(e) => handleDishChange(catIndex, dishIndex, 'imageUrl', e.target.value)}
                    />
                    <Button onClick={() => handleSaveDish(dish.menuItemId, dish)}><FaCheck/></Button>
                  </HStack>

                  <VStack align="start" spacing={2}>
                    {dish.ingredients.map((ing, ingIndex) => (
                      <HStack key={ingIndex}>
                        <Input
                          placeholder="Ingrediente"
                          value={ing.ingredient}
                          onChange={(e) => handleIngredientChange(catIndex, dishIndex, ingIndex, e.target.value)}
                        />
                        <Button onClick={() => handleSaveIngredient(ing.ingredientId, ing.ingredient)}><FaCheck/></Button>
                      </HStack>
                    ))}
                  </VStack>
                </Box>
              ))}
            </Box>
          ))}
        </div>

        <div>
          <Button className='btnRest-ia' onClick={() => navigate(`/chatRest/${id}`)}>
            <FaRobot className='iconRest-ia' />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RestEdit;
