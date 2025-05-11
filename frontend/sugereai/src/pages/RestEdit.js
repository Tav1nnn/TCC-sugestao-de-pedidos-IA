import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import LoadingAnimation from '../components/LoadingAnimation';
import { Button, VStack, HStack, Box, Text } from "@chakra-ui/react";
import { AiOutlineClose } from "react-icons/ai";
import { FaPlus, FaRobot } from "react-icons/fa";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import EditableField from "../components/EditableField";
import "../styles/RestEdit.css";

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
            const decoded = jwtDecode(token);
            if (!decoded.role?.includes('ROLE_ADMIN') && decoded.restaurantId !== id) {
                navigate('/home');
                return;
            }
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

                const rawMenu = response.data.menu;
                const enrichedMenu = await Promise.all(
                    rawMenu.map(async (category) => {
                        const updatedItems = await Promise.all(
                            category.menuItem.map(async (dish) => {
                                const res = await axios.get(`http://localhost:8080/api/menuItem/${dish.menuItemId}`, {
                                    headers: { Authorization: `Bearer ${token}` }
                                });
                                const fullDish = res.data;
                                return { ...dish, description: fullDish.description ?? dish.description, imageUrl: fullDish.imageURL ?? dish.imageUrl, price: fullDish.price ?? dish.price };
                            })
                        );
                        return { ...category, menuItem: updatedItems };
                    })
                );
                setMenuData(enrichedMenu);
                setEditedMenuData(enrichedMenu);
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
            await axios.put(`http://localhost:8080/api/categories/${categoryId}`, { name: newName }, { headers: { Authorization: `Bearer ${token}` } });
            alert('Categoria atualizada com sucesso!');
        } catch (error) {
            console.error("Erro ao atualizar categoria:", error);
        }
    };

    const handleSaveDish = async (dishId, updatedDishData) => {
        const token = localStorage.getItem('authToken');
        console.log("Atualizando prato:", updatedDishData);
        try {
            const response = await axios.get(`http://localhost:8080/api/menuItem/${dishId}`, { headers: { Authorization: `Bearer ${token}` } });
            const currentDish = response.data;
            if (!currentDish.categoryId) return alert("Erro: prato sem categoria atribuída.");
            if (!Array.isArray(currentDish.ingredientIds) || currentDish.ingredientIds.length === 0) return alert("Erro: ingredientes não encontrados.");
            const updatedDish = { name: updatedDishData.name, description: updatedDishData.description, price: updatedDishData.price, imageURL: updatedDishData.imageUrl ?? '', categoryId: currentDish.categoryId, ingredientIds: currentDish.ingredientIds };
            await axios.put(`http://localhost:8080/api/menuItem/${dishId}`, updatedDish, { headers: { Authorization: `Bearer ${token}` } });
            alert('Prato atualizado com sucesso!');
        } catch (error) {
            console.error("Erro ao atualizar prato:", error);
            alert("Erro ao atualizar prato. Verifique o console.");
        }
    };

    const handleCreateCategory = async () => {
        const token = localStorage.getItem('authToken');
        try {
            const response = await axios.post('http://localhost:8080/api/categories', { name: 'Nova Categoria' }, { headers: { Authorization: `Bearer ${token}` } });
            alert('Categoria criada com sucesso!');
        } catch (error) {
            console.error('Erro ao criar categoria:', error);
            alert('Erro ao criar categoria.');
        }
    };

    const handleCreateDish = async (categoryId) => {
        const token = localStorage.getItem('authToken');
        try {
            const response = await axios.post('http://localhost:8080/api/menuItem', { name: 'Novo Prato', description: '', price: 0, imageURL: '', categoryId, ingredientIds: [] }, { headers: { Authorization: `Bearer ${token}` } });
            alert('Prato criado com sucesso!');
        } catch (error) {
            console.error('Erro ao criar prato:', error);
            alert('Erro ao criar prato.');
        }
    };

    const handleSaveIngredient = async (ingredientId, newName) => {
        const token = localStorage.getItem('authToken');
        try {
            const getResponse = await axios.get(`http://localhost:8080/api/ingredients/${ingredientId}`, { headers: { Authorization: `Bearer ${token}` } });
            const ingredientData = getResponse.data;
            if (ingredientData.isGlobal) return alert("Ingrediente padrão, não é possível editar");
            await axios.put(`http://localhost:8080/api/ingredients/${ingredientId}`, { name: newName }, { headers: { Authorization: `Bearer ${token}` } });
            alert('Ingrediente atualizado com sucesso!');
        } catch (error) {
            alert("Erro ao atualizar ingrediente");
        }
    };

    const handleCreateIngredient = async () => {
        const token = localStorage.getItem('authToken');
        try {
            await axios.post('http://localhost:8080/api/ingredients', { name: 'Novo Ingrediente' }, { headers: { Authorization: `Bearer ${token}` } });
            alert('Ingrediente criado com sucesso!');
        } catch (error) {
            alert('Erro ao criar ingrediente.');
        }
    };

    if (isLoading) return <LoadingAnimation />;

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
                        <h6>Clique sobre as informações para editar!</h6>
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

                <div className="menuSection">
                    {editedMenuData.map((category, catIndex) => (
                        <Box key={catIndex} id={`cat-${category.categoryId}`} className="menuItem" p={4} borderWidth="1px" borderRadius="md" mb={4}>
                            <HStack mb={2} alignItems={"center"} justifyContent="space-between">
                                <EditableField
                                    value={category.category}
                                    onChange={(val) => handleCategoryChange(catIndex, val)}
                                    onSave={() => handleSaveCategory(category.categoryId, category.category)}
                                />
                                <Button onClick={handleCreateCategory}>
                                    <FaPlus />
                                </Button>
                            </HStack>

                            {category.menuItem.map((dish, dishIndex) => (
                                <Box key={dishIndex} className="dishRow" p={3} borderWidth="1px" borderRadius="md" mb={3}>
                                    <HStack mb={2} display={"grid"} gridTemplateColumns={"repeat(1, 1fr)"} gap={2} >
                                        <EditableField
                                            value={dish.name}
                                            onChange={(val) => handleDishChange(catIndex, dishIndex, 'name', val)}
                                            onSave={() => handleSaveDish(dish.menuItemId, dish)}
                                        />
                                        <EditableField
                                            value={dish.description ?? ''}
                                            onChange={(val) => handleDishChange(catIndex, dishIndex, 'description', val)}
                                            onSave={() => handleSaveDish(dish.menuItemId, dish)}
                                        />
                                        <EditableField
                                            value={'Valor: ' + dish.price}
                                            onChange={(val) => handleDishChange(catIndex, dishIndex, 'price', parseFloat(val))}
                                            onSave={() => handleSaveDish(dish.menuItemId, dish)}
                                        />
                                        <EditableField
                                            value={'Alterar imagem do ' + dish.name}
                                            onChange={(val) => handleDishChange(catIndex, dishIndex, 'imageUrl', val)}
                                            onSave={() => handleSaveDish(dish.menuItemId, dish)}
                                        />
                                        <Button onClick={() => handleCreateDish(category.categoryId)}>
                                            <FaPlus />
                                        </Button>
                                    </HStack>
                                    <Text fontSize='medium' fontWeight={'bold'} mb={2} mt={6}>Ingredientes: </Text>
                                    <VStack >
                                        {dish.ingredients.map((ing, ingIndex) => (
                                            <HStack key={ingIndex} mb={2} width="100%" justifyContent="space-between" >
                                                <EditableField
                                                    value={ing.ingredient}
                                                    isEditable={!ing.isGlobal}
                                                    onChange={(val) => handleIngredientChange(catIndex, dishIndex, ingIndex, val)}
                                                    onSave={() => handleSaveIngredient(ing.ingredientId, ing.ingredient)}
                                                />
                                                <Button onClick={handleCreateIngredient}>
                                                    <FaPlus />
                                                </Button>
                                            </HStack>
                                        ))}
                                    </VStack>
                                </Box>
                            ))}
                        </Box>
                    ))}
                </div>


                <div>
                    <Button className="btnRest-ia" onClick={() => navigate(`/chatRest/${id}`)}>
                        <FaRobot className="iconRest-ia" />
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default RestEdit;

