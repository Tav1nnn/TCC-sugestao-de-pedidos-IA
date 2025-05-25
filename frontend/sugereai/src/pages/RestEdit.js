import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import LoadingAnimation from '../components/LoadingAnimation';
import { Button, VStack, HStack, Box, Text, Dialog, Portal, Input, NativeSelect, Accordion, Flex } from "@chakra-ui/react";
import { AiOutlineClose } from "react-icons/ai";
import { FaAngleDown, FaBars, FaCheck, FaEdit, FaMoneyBillWave, FaPlus, FaRobot, FaTrash } from "react-icons/fa";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import "../styles/RestEdit.css";
import { toaster } from "../components/ui/toaster"

const RestEdit = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    const [menuData, setMenuData] = useState([]);
    const [restaurantData, setRestaurantData] = useState(null);
    const [editedMenuData, setEditedMenuData] = useState([]);
    const [categoria, setCategoria] = useState('');
    const [dishId, setDishId] = useState('');
    const [dishName, setDishName] = useState('');
    const [dishDescription, setDishDescription] = useState('');
    const [dishPrice, setDishPrice] = useState('');
    const [dishImageUrl, setDishImageUrl] = useState('');
    const [dishCategory, setDishCategory] = useState('');
    const [dishIngredients, setDishIngredients] = useState([]);
    const [allIngredients, setAllIngredients] = useState([]);
    const [allCategories, setAllCategories] = useState([]);
    const [ingredient, setIngredient] = useState('');
    const [selectedIngredients, setSelectedIngredients] = useState([]);
    const [currentIngredient, setCurrentIngredient] = useState('');
    const [currentCategory, setCurrentCategory] = useState('');
    const [editingDishId, setEditingDishId] = useState(null);

    useEffect(() => {
        fetchData();
        fetchAllIngredients();
        fetchAllCategories();
    }, [id]);

    const fetchAllIngredients = async () => {
        const token = localStorage.getItem('authToken');
        try {
            const response = await axios.get('http://localhost:8080/api/ingredients', {
                headers: { Authorization: `Bearer ${token}` }
            });
            setAllIngredients(response.data);
        } catch (error) {
            console.error("Erro ao buscar ingredientes:", error);
        }
    };

    const fetchAllCategories = async () => {
        const token = localStorage.getItem('authToken');
        try {
            const response = await axios.get('http://localhost:8080/api/categories', {
                headers: { Authorization: `Bearer ${token}` }
            });
            setAllCategories(response.data);
        } catch (error) {
            console.error("Erro ao buscar categorias:", error);
        }
    };


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
            if (error.response?.status === 401) {
                toaster.create({
                    title: "Sessão expirada. Faça login novamente.",
                    type: "error",
                    duration: 3000,
                });
                window.location.href = '/';
            }
        } finally {
            setIsLoading(false);
        }
    };

    const handleSaveCategory = async (categoryId, newName) => {
        const token = localStorage.getItem('authToken');
        try {
            await axios.put(`http://localhost:8080/api/categories/${categoryId}`, { name: newName }, { headers: { Authorization: `Bearer ${token}` } });

            toaster.create({
                title: "Nome da categoria atualizado com sucesso! " + newName,
                type: "success",
                duration: 3000,
            })

            fetchData();
            setCurrentCategory('');
            setCategoria('');

        } catch (error) {
            toaster.create({
                title: "Erro ao atualizar categoria: " + error.message,
                type: "error",
                duration: 3000,
            })
        }
    };

    const clearDishForm = () => {
        setDishId(null);
        setDishName('');
        setDishDescription('');
        setDishPrice('');
        setDishImageUrl('');
        setDishCategory('');
        setDishIngredients([]);
        setSelectedIngredients([]);
    };

    const fillDish = (dish) => {
        setDishId(dish.menuItemId);
        setDishName(dish.name);
        setDishDescription(dish.description);
        setDishPrice(dish.price ? String(dish.price).replace('.', ',') : '0,00');
        setDishImageUrl(dish.imageUrl);
        setDishCategory(dish.categoryId);
        setDishIngredients(dish.ingredients.map(ing => ing.ingredientId) || []);

        setSelectedIngredients(
            dish.ingredients.map(ing => ({
                ingredientId: ing.ingredientId,
                ingredient: ing.ingredient
            })) || []
        );
    };


    const handleLocalSave = async () => {
        try {
            const priceValue = formatPriceForBackend(dishPrice || '0');

            if (priceValue <= 0) {
                toaster.create({
                    title: "Preço inválido. O preço deve ser maior que zero.",
                    type: "warning",
                    duration: 3000,
                })
                return;
            }

            const updatedDishData = {
                name: dishName,
                description: dishDescription,
                price: priceValue,
                imageUrl: dishImageUrl,
                categoryId: dishCategory,
                ingredientIds: dishIngredients.filter(Boolean)
            };

            await handleSaveDish(dishId, updatedDishData);

            fetchData();

        } catch (error) {
            toaster.create({
                title: "Erro ao salvar prato: " + error.message,
                type: "error",
                duration: 3000,
            })
        }
    };

    const handleExcludeDish = async (dishId) => {
        const confirmed = window.confirm("Quer mesmo excluir esse prato?");
        if (!confirmed) return;
        const token = localStorage.getItem('authToken');
        try {
            const response = await axios.delete(`http://localhost:8080/api/menuItem/${dishId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });

            toaster.create({
                title: "Prato excluído com sucesso!",
                type: "success",
                duration: 3000,
            })
            fetchData();
        } catch (error) {
            toaster.create({
                title: "Erro ao excluir prato: " + error.message,
                type: "error",
                duration: 3000,
            })
        }
    }

    const handleSaveDish = async (dishId, updatedDishData) => {
        const token = localStorage.getItem('authToken');
        try {
            const currentDishResponse = await axios.get(`http://localhost:8080/api/menuItem/${dishId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            const currentDish = currentDishResponse.data;

            const dishUpdate = {
                name: updatedDishData.name || currentDish.name,
                description: updatedDishData.description || currentDish.description,
                price: updatedDishData.price || currentDish.price,
                imageURL: updatedDishData.imageUrl || currentDish.imageURL || '',
                categoryId: updatedDishData.categoryId || currentDish.categoryId,
                ingredientIds: updatedDishData.ingredientIds || currentDish.ingredientIds || []
            };

            if (!dishUpdate.categoryId) {
                toaster.create({
                    title: "Categoria não definida para o prato.",
                    type: "warning",
                    duration: 3000,
                })
            }

            const response = await axios.put(
                `http://localhost:8080/api/menuItem/${dishId}`,
                dishUpdate,
                { headers: { Authorization: `Bearer ${token}` } }
            );

            toaster.create({
                title: "Prato atualizado com sucesso!",
                type: "success",
                duration: 3000,
            })

            fetchData();
            return response.data;
        } catch (error) {
            toaster.create({
                title: "Erro ao atualizar prato: " + error.message,
                type: "error",
                duration: 3000,
            });
            throw error;
        }
    };

    const formatPriceForBackend = (priceInput) => {
        const priceString = typeof priceInput === 'string' ? priceInput : String(priceInput || '0');

        try {
            const cleanValue = priceString
                .replace(/\./g, '')
                .replace(',', '.');

            const price = parseFloat(cleanValue);

            return isNaN(price) ? 0 : Number(price.toFixed(2));
        } catch (error) {
            toaster.create({
                title: "Erro ao formatar preço: " + error.message,
                type: "error",
                duration: 3000,
            })
            return 0;
        }
    };

    const handlePriceChange = (e) => {
        const value = e.target.value;

        if (typeof value !== 'string') return;

        const filteredValue = value
            .replace(/[^0-9,.]/g, '')
            .replace(/([,.])[,.]+/g, '$1');

        setDishPrice(filteredValue);
    };

    const formatPriceForDisplay = (value) => {
        if (!value) return '';

        const num = formatPriceForBackend(value);
        return num.toLocaleString('pt-BR', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });
    };

    const handleCreateCategory = async () => {
        const token = localStorage.getItem('authToken');
        try {
            const response = await axios.post('http://localhost:8080/api/categories', { name: categoria }, { headers: { Authorization: `Bearer ${token}` } });

            toaster.create({
                title: "Categoria criada com sucesso!",
                type: "success",
                duration: 3000,
            })
            setCategoria('');
            await fetchAllCategories();
        } catch (error) {
            toaster.create({
                title: "Erro ao criar categoria: " + error.message,
                type: "error",
                duration: 3000,
            })
        }
    };

    const handleCreateDish = async () => {
        if (selectedIngredients.length === 0) {
            toaster.create({
                title: "Adicione pelo menos um ingrediente.",
                type: "warning",
                duration: 3000,
            })
            return;
        }

        const priceValue = formatPriceForBackend(dishPrice || '0');

        if (priceValue <= 0) {
            toaster.create({
                title: "Preço inválido. O preço deve ser maior que zero.",
                type: "warning",
                duration: 3000,
            })
            return;
        }

        const dishData = {
            name: dishName,
            description: dishDescription,
            price: formatPriceForBackend(dishPrice),
            imageURL: dishImageUrl,
            categoryId: dishCategory,
            ingredientIds: selectedIngredients.map((ing) => ing.ingredientId),
        };


        const token = localStorage.getItem('authToken');

        try {
            const response = await axios.post(
                'http://localhost:8080/api/menuItem',
                dishData,
                { headers: { Authorization: `Bearer ${token}` } }
            );

            toaster.create({
                title: "Prato criado com sucesso!",
                type: "success",
                duration: 3000,
            });
            fetchData();

        } catch (error) {
            toaster.create({
                title: "Erro ao criar prato: " + error.message,
                type: "error",
                duration: 3000,
            });
        }
    };

    const handleSaveIngredient = async (ingredientId, newName) => {
        const token = localStorage.getItem('authToken');
        try {
            const getResponse = await axios.get(`http://localhost:8080/api/ingredients/${ingredientId}`, { headers: { Authorization: `Bearer ${token}` } });
            const ingredientData = getResponse.data;

            await axios.put(`http://localhost:8080/api/ingredients/${ingredientId}`, { name: newName }, { headers: { Authorization: `Bearer ${token}` } });

            fetchData();

            toaster.create({
                title: "Ingrediente atualizado com sucesso!",
                type: "success",
                duration: 3000,
            });
        } catch (error) {
            toaster.create({
                title: "Não é possível alterar um ingrediente padrão.",
                type: "error",
                duration: 3000,
            });
        }
    };


    const handleCreateIngredient = async () => {
        const token = localStorage.getItem('authToken');
        try {
            await axios.post(
                'http://localhost:8080/api/ingredients',
                { name: ingredient },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            const getResponse = await axios.get(
                'http://localhost:8080/api/ingredients',
                { headers: { Authorization: `Bearer ${token}` } }
            );

            setAllIngredients(getResponse.data);
            setIngredient('');
            toaster.create({
                title: "Ingrediente criado com sucesso!",
                type: "success",
            });
        } catch (error) {
            toaster.create({
                title: "Erro ao criar ingrediente: " + error.message,
                type: "error",
            });
        }
    };

    const handleRemoveIngredient = async (ingredientId) => {
        const confirmed = window.confirm("Quer mesmo excluir esse ingrediente?");
        if (!confirmed) return;
        const token = localStorage.getItem('authToken');
        try {
            const response = await axios.delete(`http://localhost:8080/api/ingredients/${ingredientId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });

            fetchAllIngredients();
            setCurrentIngredient('');
            toaster.create({
                title: "Ingrediente excluído com sucesso!",
                type: "success",
                duration: 3000,
            });
        } catch (error) {
            if (error.response && error.response.status === 409) {
                toaster.create({
                    title: "Esse ingrediente está associado a pratos e não pode ser excluído. Remova-o dos pratos primeiro.",
                    type: "warning",
                    duration: 4000,
                });
            } else {
                toaster.create({
                    title: "Erro ao excluir ingrediente: " + error.message,
                    type: "error",
                });
            }
        }
    }

    const handleRemoveCategory = async (categoryId) => {
        const confirmed = window.confirm("Quer mesmo excluir essa categoria?");
        if (!confirmed) return;
        const token = localStorage.getItem('authToken');
        try {
            const response = await axios.delete(`http://localhost:8080/api/categories/${categoryId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });

            fetchAllCategories();
            setCurrentCategory('');
            toaster.create({
                title: "Categoria removida com sucesso!",
                type: "success",
                duration: 3000,
            });
        } catch (error) {
            if (error.response && error.response.status === 409) {
                toaster.create({
                    title: "Essa categoria possui pratos associados e não pode ser excluída. Transfira os pratos ou remova-os primeiro.",
                    type: "warning",
                    duration: 4000,
                });
            } else {
                toaster.create({
                    title: "Erro ao remover categoria: " + error.message,
                    type: "error",
                    duration: 3000,
                });
            }
        }
    }

    const handleAddIngredientsToDish = async (dishId, newIngredients) => {
        const token = localStorage.getItem('authToken');

        try {
            const { data: currentDish } = await axios.get(`http://localhost:8080/api/menuItem/${dishId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });

            const updatedIngredientIds = Array.from(new Set([
                ...currentDish.ingredientIds,
                ...newIngredients.map(ing => ing.ingredientId)
            ]));

            const updatedDish = {
                ...currentDish,
                ingredientIds: updatedIngredientIds
            };

            await axios.put(`http://localhost:8080/api/menuItem/${dishId}`, updatedDish, {
                headers: { Authorization: `Bearer ${token}` }
            });

            fetchData();

            setSelectedIngredients([]);
            toaster.create({
                title: "Ingredientes adicionados ao prato com sucesso!",
                type: "success",
                duration: 3000
            });
        } catch (err) {
            toaster.create({
                title: "Erro ao adicionar ingredientes ao prato",
                type: "error",
                duration: 3000
            });
        }
    };

    const RemoveIngredientToDish = async (dishId, ingredientIdToRemove) => {
        const confirmed = window.confirm("Quer mesmo remover esse ingrediente desse prato?");
        if (!confirmed) return;
        const token = localStorage.getItem('authToken');

        try {
            const { data: currentDish } = await axios.get(`http://localhost:8080/api/menuItem/${dishId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });

            const updatedIngredientIds = currentDish.ingredientIds.filter(
                id => id !== ingredientIdToRemove
            );

            const updatedDish = {
                ...currentDish,
                ingredientIds: updatedIngredientIds
            };

            await axios.put(`http://localhost:8080/api/menuItem/${dishId}`, updatedDish, {
                headers: { Authorization: `Bearer ${token}` }
            });

            fetchData();

            toaster.create({
                title: "Ingrediente removido do prato com sucesso!",
                type: "success",
                duration: 3000
            });
        } catch (err) {
            toaster.create({
                title: "Erro ao remover ingrediente do prato",
                type: "error",
                duration: 3000
            });
        }
    };


    const addIngredientDish = () => {
        if (!currentIngredient) return;
        const selected = allIngredients.find(i => i.name === currentIngredient);
        if (
            selected &&
            !selectedIngredients.some(i => i.name === currentIngredient)
        ) {
            setSelectedIngredients([...selectedIngredients, {
                ingredientId: selected.id,
                ingredient: selected.name,
            }]);
            setCurrentIngredient('');
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
                        <Button
                            bg={'#2D2C31'}
                            border={'2px solid #A10808'}
                            borderRadius={'50%'}
                            color={'white'}
                            position={'absolute'}
                            top={'10px'}
                            right={'20px'}
                            onClick={() => navigate('/home')}
                        >
                            <AiOutlineClose />
                        </Button>
                        <Dialog.Root>
                            <Dialog.Trigger asChild>
                                <Button
                                    bg="#2D2C31"
                                    border="2px solid #A10808"
                                    borderRadius="50%"
                                    color="white"
                                    position="absolute"
                                    top="10px"
                                    right="70px"
                                    zIndex={4}
                                >
                                    <FaBars />
                                </Button>
                            </Dialog.Trigger>
                            <Portal>
                                <Dialog.Backdrop />
                                <Dialog.Positioner>
                                    <Dialog.Content
                                        backgroundColor="#2D2C31"
                                        minH={400}
                                        maxH="auto"
                                        m={'auto'}
                                        className="DialogContent"
                                        p={4}
                                    >
                                        <Dialog.Header minW={260} className="DialogHeader" display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
                                            <Dialog.Title minH={10} className="DialogTitle" fontSize={'unset'} pt={2}>GERENCIAR ITENS</Dialog.Title>
                                            <Dialog.ActionTrigger asChild>
                                                <Button minH={10} bg="#2D2C31" border="1px solid #A10808" color="white" size={'sm'}>
                                                    <AiOutlineClose />
                                                </Button>
                                            </Dialog.ActionTrigger>
                                        </Dialog.Header>

                                        {/* CATEGORIA */}
                                        <Accordion.Root collapsible defaultValue={[0]}>
                                            <Accordion.Item borderColor={'#525059'} value="categoria" className="AccordionItem">
                                                <Accordion.ItemTrigger
                                                    mt={4}
                                                    p={2}
                                                    pl={0}
                                                    color="white"
                                                    fontWeight="bold"
                                                    fontSize="small"
                                                    justifyContent={'space-between'}
                                                >
                                                    <Text>ADICIONE UMA CATEGORIA</Text>
                                                    <Accordion.ItemIndicator>
                                                        <FaAngleDown color="white" />
                                                    </Accordion.ItemIndicator>
                                                </Accordion.ItemTrigger>
                                                <Accordion.ItemContent>
                                                    <Accordion.ItemBody>
                                                        <Dialog.Body display="flex" justifyContent="inline" mb={4}>
                                                            <Input
                                                                mt={4}
                                                                p={2}
                                                                w="100%"
                                                                placeholder="Nome da categoria"
                                                                pl={0}
                                                                borderRadius={'none'}
                                                                value={categoria}
                                                                border={'none'}
                                                                borderBottom={'1px solid #A10808'}
                                                                onChange={(e) => setCategoria(e.target.value)}
                                                            />
                                                            <Button
                                                                mt={4}
                                                                w={'4%'}
                                                                position="absolute"
                                                                right={4}
                                                                backgroundColor={'#2D2C31'}
                                                                color={'white'}
                                                                size="sm"
                                                                onClick={handleCreateCategory}
                                                            >
                                                                <FaCheck />
                                                            </Button>
                                                        </Dialog.Body>
                                                    </Accordion.ItemBody>
                                                </Accordion.ItemContent>
                                            </Accordion.Item>
                                        </Accordion.Root>

                                        {/* INGREDIENTE */}
                                        <Accordion.Root collapsible defaultValue={[0]}>
                                            <Accordion.Item borderColor={'#525059'} value="ingrediente" className="AccordionItem">
                                                <Accordion.ItemTrigger
                                                    mt={4}
                                                    p={2}
                                                    pl={0}
                                                    borderRadius="md"
                                                    color="white"
                                                    fontWeight="bold"
                                                    fontSize="small"
                                                    justifyContent={'space-between'}
                                                >
                                                    <Text>ADICIONE UM INGREDIENTE</Text>
                                                    <Accordion.ItemIndicator >
                                                        <FaAngleDown color="white" />
                                                    </Accordion.ItemIndicator >
                                                </Accordion.ItemTrigger>
                                                <Accordion.ItemContent>
                                                    <Accordion.ItemBody>
                                                        <Dialog.Body display="flex" justifyContent="inline" mb={4}>
                                                            <Input
                                                                mt={4}
                                                                p={2}
                                                                pl={0}
                                                                pb={0}
                                                                borderRadius={'none'}
                                                                w="100%"
                                                                border={'none'}
                                                                borderBottom={'1px solid #A10808'}
                                                                placeholder="Nome do ingrediente"
                                                                value={ingredient}
                                                                onChange={(e) => setIngredient(e.target.value)}
                                                            />
                                                            <Button
                                                                mt={4}
                                                                w={'4%'}
                                                                position="absolute"
                                                                right={4}
                                                                backgroundColor={'#2D2C31'}
                                                                color={'white'}
                                                                size="sm"
                                                                onClick={handleCreateIngredient}
                                                            >
                                                                <FaCheck />
                                                            </Button>
                                                        </Dialog.Body>
                                                    </Accordion.ItemBody>
                                                </Accordion.ItemContent>
                                            </Accordion.Item>
                                        </Accordion.Root>

                                        {/* PRATO */}
                                        <Accordion.Root collapsible defaultValue={[0]}>
                                            <Accordion.Item borderColor={'#525059'} value="prato" className="AccordionItem">
                                                <Accordion.ItemTrigger
                                                    onClick={clearDishForm}
                                                    mt={4}
                                                    p={2}
                                                    pl={0}
                                                    borderRadius="md"
                                                    color="white"
                                                    fontWeight="bold"
                                                    fontSize="small"
                                                    justifyContent={'space-between'}
                                                >
                                                    ADICIONE UM PRATO
                                                    <Accordion.ItemIndicator >
                                                        <FaAngleDown color="white" />
                                                    </Accordion.ItemIndicator>
                                                </Accordion.ItemTrigger>
                                                <Accordion.ItemContent>
                                                    <Accordion.ItemBody>
                                                        <Dialog.Body>
                                                            <Input
                                                                mt={4}
                                                                p={2}
                                                                pl={0}
                                                                pb={0}
                                                                borderRadius={'none'}
                                                                placeholder="Nome do prato"
                                                                w="100%"
                                                                border={'none'}
                                                                borderBottom={'1px solid #A10808'}
                                                                value={dishName}
                                                                onChange={(e) => setDishName(e.target.value)}
                                                            />
                                                            <Input
                                                                mt={4}
                                                                p={2}
                                                                pl={0}
                                                                pb={0}
                                                                borderRadius={'none'}
                                                                w="100%"
                                                                border={'none'}
                                                                borderBottom={'1px solid #A10808'}
                                                                placeholder="Descrição do prato"
                                                                value={dishDescription}
                                                                onChange={(e) => setDishDescription(e.target.value)}
                                                            />
                                                            <Input
                                                                mt={4}
                                                                p={2}
                                                                pl={0}
                                                                pb={0}
                                                                borderRadius={'none'}
                                                                w="100%"
                                                                border={'none'}
                                                                borderBottom={'1px solid #A10808'}
                                                                placeholder="Preço (ex: 30,99)"
                                                                value={dishPrice}
                                                                onChange={handlePriceChange}
                                                                onBlur={() => setDishPrice(formatPriceForDisplay(dishPrice))}
                                                            />
                                                            <Input
                                                                mt={4}
                                                                p={2}
                                                                pl={0}
                                                                pb={0}
                                                                borderRadius={'none'}
                                                                w="100%"
                                                                border={'none'}
                                                                borderBottom={'1px solid #A10808'}
                                                                placeholder="URL da imagem"
                                                                value={dishImageUrl}
                                                                onChange={(e) => setDishImageUrl(e.target.value)}
                                                            />
                                                            <NativeSelect.Root mt={4} >
                                                                <NativeSelect.Field
                                                                    value={dishCategory}
                                                                    onChange={(e) => setDishCategory(e.target.value)}
                                                                    placeholder="Selecione a categoria"
                                                                    p={2}
                                                                    pl={0}
                                                                    pb={0}
                                                                    borderRadius={'none'}
                                                                    w="100%"
                                                                    border={'none'}
                                                                    color={'white'}
                                                                    backgroundColor={'#2D2C31'}
                                                                    borderBottom={'1px solid #A10808'}
                                                                >
                                                                    {allCategories.slice().sort((a, b) => a.name.localeCompare(b.name)).map((cat) => (
                                                                        <option key={cat.id} value={cat.id} style={{ padding: '2px', color: '#fff', backgroundColor: '#2D2C31' }}>
                                                                            {cat.name}
                                                                        </option>
                                                                    ))}
                                                                </NativeSelect.Field>
                                                            </NativeSelect.Root>

                                                            {/* Ingredientes do prato */}
                                                            <Box mt={4} display="flex" justifyContent="inline" alignItems="center">
                                                                <NativeSelect.Root variant="subtle">
                                                                    <NativeSelect.Field
                                                                        value={currentIngredient}
                                                                        onChange={(e) => setCurrentIngredient(e.target.value)}
                                                                        placeholder="Selecione os ingredientes"
                                                                        p={2}
                                                                        width="90%"
                                                                        pl={0}
                                                                        pb={0}
                                                                        borderRadius={'none'}
                                                                        w="100%"
                                                                        color={'white'}
                                                                        border={'none'}
                                                                        backgroundColor={'#2D2C31'}
                                                                        borderBottom={'1px solid #A10808'}
                                                                    >
                                                                        {allIngredients.slice().sort((a, b) => a.name.localeCompare(b.name)).map((ingredient) => (
                                                                            <option key={ingredient.id} value={ingredient.ingredientId} style={{ padding: '2px', color: '#fff', backgroundColor: '#2D2C31' }}>
                                                                                {ingredient.name}
                                                                            </option>
                                                                        ))}
                                                                    </NativeSelect.Field>
                                                                </NativeSelect.Root>

                                                                <Button
                                                                    onClick={addIngredientDish}
                                                                    position="absolute"
                                                                    right={4}
                                                                    backgroundColor={'#2D2C31'}
                                                                    color={'white'}
                                                                    size="sm"
                                                                >
                                                                    <FaCheck />
                                                                </Button>
                                                            </Box>

                                                            <VStack mt={4} mb={4} spacing={2} align="start">
                                                                {selectedIngredients.map((ing) => (
                                                                    <HStack key={ing.ingredientId}>
                                                                        <Text>{ing.ingredient}</Text>
                                                                        <FaTrash
                                                                            onClick={() =>
                                                                                setSelectedIngredients(
                                                                                    selectedIngredients.filter(
                                                                                        (i) => i.ingredientId !== ing.ingredientId
                                                                                    )
                                                                                )
                                                                            }
                                                                        />
                                                                    </HStack>
                                                                ))}
                                                            </VStack>
                                                        </Dialog.Body>

                                                        <Box mb={8} display="flex" justifyContent="center" alignItems="center">
                                                            <Button p={4} onClick={handleCreateDish}>
                                                                <Text color={'#2D2C31'} >ADICIONAR</Text>
                                                            </Button>
                                                        </Box>
                                                    </Accordion.ItemBody>
                                                </Accordion.ItemContent>
                                            </Accordion.Item>
                                        </Accordion.Root>
                                        <Accordion.Root collapsible defaultValue={[0]}>
                                            <Accordion.Item borderColor={'#525059'} value="ingrediente" className="AccordionItem">
                                                <Accordion.ItemTrigger
                                                    mt={4}
                                                    p={2}
                                                    pl={0}
                                                    borderRadius="md"
                                                    color="white"
                                                    fontWeight="bold"
                                                    fontSize="small"
                                                    justifyContent={'space-between'}
                                                >
                                                    <Text>EXCLUIR UM INGREDIENTE</Text>
                                                    <Accordion.ItemIndicator >
                                                        <FaAngleDown color="white" />
                                                    </Accordion.ItemIndicator >
                                                </Accordion.ItemTrigger>
                                                <Accordion.ItemContent>
                                                    <Accordion.ItemBody>
                                                        <Dialog.Body display="flex" justifyContent="inline" mb={4}>
                                                            <NativeSelect.Root variant="subtle">
                                                                <NativeSelect.Field
                                                                    value={currentIngredient}
                                                                    onChange={(e) => setCurrentIngredient(e.target.value)}
                                                                    placeholder="Selecione o ingrediente"
                                                                    p={2}
                                                                    width="90%"
                                                                    pl={0}
                                                                    pb={0}
                                                                    borderRadius={'none'}
                                                                    w="100%"
                                                                    color={'white'}
                                                                    border={'none'}
                                                                    backgroundColor={'#2D2C31'}
                                                                    borderBottom={'1px solid #A10808'}
                                                                >
                                                                    {allIngredients
                                                                        .filter((ingredient) => ingredient.isGlobal === false)
                                                                        .slice().sort((a, b) => a.name.localeCompare(b.name))
                                                                        .map((ingredient) => (
                                                                            <option
                                                                                key={ingredient.id}
                                                                                value={ingredient.id}
                                                                                style={{ padding: '2px', color: '#fff', backgroundColor: '#2D2C31' }}
                                                                            >
                                                                                {ingredient.name}
                                                                            </option>
                                                                        ))}

                                                                </NativeSelect.Field>
                                                            </NativeSelect.Root>
                                                            <Button
                                                                w={'4%'}
                                                                position="absolute"
                                                                right={4}
                                                                backgroundColor={'#2D2C31'}
                                                                color={'white'}
                                                                size="sm"
                                                                onClick={() => handleRemoveIngredient(currentIngredient)}
                                                            >
                                                                <FaCheck />
                                                            </Button>
                                                        </Dialog.Body>
                                                    </Accordion.ItemBody>
                                                </Accordion.ItemContent>
                                            </Accordion.Item>
                                        </Accordion.Root>
                                        <Accordion.Root collapsible defaultValue={[0]}>
                                            <Accordion.Item borderColor={'#525059'} value="ingrediente" className="AccordionItem">
                                                <Accordion.ItemTrigger
                                                    mt={4}
                                                    p={2}
                                                    pl={0}
                                                    borderRadius="md"
                                                    color="white"
                                                    fontWeight="bold"
                                                    fontSize="small"
                                                    justifyContent={'space-between'}
                                                >
                                                    <Text>EXCLUIR UMA CATEGORIA</Text>
                                                    <Accordion.ItemIndicator >
                                                        <FaAngleDown color="white" />
                                                    </Accordion.ItemIndicator >
                                                </Accordion.ItemTrigger>
                                                <Accordion.ItemContent>
                                                    <Accordion.ItemBody>
                                                        <Dialog.Body display="flex" justifyContent="inline" mb={4}>
                                                            <NativeSelect.Root variant="subtle">
                                                                <NativeSelect.Field
                                                                    value={currentCategory}
                                                                    onChange={(e) => setCurrentCategory(e.target.value)}
                                                                    placeholder="Selecione a categoria"
                                                                    p={2}
                                                                    width="90%"
                                                                    pl={0}
                                                                    pb={0}
                                                                    borderRadius={'none'}
                                                                    w="100%"
                                                                    color={'white'}
                                                                    border={'none'}
                                                                    backgroundColor={'#2D2C31'}
                                                                    borderBottom={'1px solid #A10808'}
                                                                >
                                                                    {allCategories.slice().sort((a, b) => a.name.localeCompare(b.name)).map((cat) => (
                                                                        <option key={cat.id} value={cat.id} style={{ padding: '2px', color: '#fff', backgroundColor: '#2D2C31' }}>
                                                                            {cat.name}
                                                                        </option>
                                                                    ))}
                                                                </NativeSelect.Field>
                                                            </NativeSelect.Root>
                                                            <Button
                                                                w={'4%'}
                                                                position="absolute"
                                                                right={4}
                                                                backgroundColor={'#2D2C31'}
                                                                color={'white'}
                                                                size="sm"
                                                                onClick={() => handleRemoveCategory(currentCategory)}
                                                            >
                                                                <FaCheck />
                                                            </Button>
                                                        </Dialog.Body>
                                                    </Accordion.ItemBody>
                                                </Accordion.ItemContent>
                                            </Accordion.Item>
                                        </Accordion.Root>
                                    </Dialog.Content>
                                </Dialog.Positioner>
                            </Portal>
                        </Dialog.Root>

                    </div>
                </div>

                <div className="menuSectionEdit">
                    {editedMenuData
                        .slice()
                        .sort((a, b) => a.category.localeCompare(b.category))
                        .map((category, catIndex) => (
                            <Box key={catIndex} maxW={'800px'} id={`cat-${category.categoryId}`} className="menuItem" p={4} borderWidth="1px" borderRadius="md" mb={4} bg={'#f2f5f7'} borderColor={'#A10808'}>
                                <HStack mb={2} alignItems={"center"} justifyContent="space-between">
                                    <Text fontSize='large' fontWeight={'bold'}>{category.category}</Text>
                                    <Dialog.Root>
                                        <Dialog.Trigger asChild>
                                            <Button
                                                size="md"
                                                background={'transparent'}
                                                borderRadius={'50%'}
                                                color={'#2D2C31'}
                                            >
                                                <FaEdit />
                                            </Button>
                                        </Dialog.Trigger>
                                        <Portal>
                                            <Dialog.Backdrop />
                                            <Dialog.Positioner>
                                                <Dialog.Content backgroundColor={"#2D2C31"} className="DialogContent" p={4} borderRadius="md" borderWidth="1px" borderColor="#A10808">
                                                    <Dialog.Header mt={2} className="DialogHeader" display={'flex'} justifyContent={'space-between'}>
                                                        <Dialog.Title className="DialogTitle">Editar Categoria</Dialog.Title>
                                                        <Dialog.ActionTrigger asChild position={"absolute"} top={2} right={2} mt={2}>
                                                            <Button bg={'#2D2C31'} border={'1px solid #A10808'} color={'white'}>
                                                                <AiOutlineClose />
                                                            </Button>
                                                        </Dialog.ActionTrigger>
                                                    </Dialog.Header>
                                                    <Dialog.Body mt={8} className="DialogDescription">
                                                        <Text>Digite o novo nome da Categoria:</Text>
                                                    </Dialog.Body>
                                                    <Input
                                                        placeholder={category.category}
                                                        value={categoria}
                                                        onChange={(e) => setCategoria(e.target.value)}
                                                        padding={2}
                                                        mt={2}
                                                    />
                                                    <Dialog.Footer mt={4} className="DialogFooter">
                                                        <Dialog.ActionTrigger asChild>
                                                            <Button variant="outline" size="md" p={2}>Cancel</Button>
                                                        </Dialog.ActionTrigger>
                                                        <Button variant="outline" size="md" onClick={() => handleSaveCategory(category.categoryId, categoria)}>
                                                            <FaCheck />
                                                        </Button>
                                                    </Dialog.Footer>
                                                </Dialog.Content>
                                            </Dialog.Positioner>
                                        </Portal>
                                    </Dialog.Root>
                                </HStack>

                                {category.menuItem.slice()
                                    .sort((a, b) => a.name.localeCompare(b.name)).map((dish, dishIndex) => (
                                        <Box key={dishIndex} className="dishRow" p={3} mb={3}>
                                            <Flex
                                                direction={{ base: 'column', md: 'row' }}
                                                alignItems={{ base: 'center', md: 'flex-start' }}
                                                justifyContent="space-between"
                                            >
                                                <img src={dish.imageUrl} alt={dish.name} className="dishImageEdit" />
                                                <Box ml={{ base: 0, md: 4 }} mt={{ base: 3, md: 0 }} textAlign={{ base: 'center', md: 'left' }}>
                                                    <Text fontWeight={'bold'} mt={2}>{dish.name}</Text>
                                                    <Text fontSize='small' textAlign={'justify'} color={'gray.500'}>{dish.description}</Text>
                                                    <Box display={'flex'} w={'100%'} alignItems={'center'} justifyContent={'inline'}>
                                                        <FaMoneyBillWave color="green" size={18} />
                                                        <Text fontWeight={'bold'} fontSize={'small'} color={'gray.800'} p={2}>
                                                            R${dish.price}
                                                        </Text>
                                                    </Box>
                                                </Box>
                                                <Dialog.Root>
                                                    <Box mt={{ base: 3, md: 0 }} ml={{ base: 0, md: 4 }} display="flex" gap="2">
                                                        <Dialog.Trigger asChild>
                                                            <Button size="sm" background={'none'}
                                                                onClick={() => fillDish(dish)}>
                                                                <FaEdit color="#2D2C31" />
                                                            </Button>
                                                        </Dialog.Trigger>
                                                        <Button size={'sm'} background={'none'} onClick={() => handleExcludeDish(dish.menuItemId)}>
                                                            <FaTrash color="#A10808" />
                                                        </Button>

                                                    </Box>
                                                    <Portal>
                                                        <Dialog.Backdrop />
                                                        <Dialog.Positioner>
                                                            <Dialog.Content m={20} minH={200} maxH={'auto'} backgroundColor={"#2D2C31"} className="DialogContent" p={4} borderRadius="md" borderWidth="1px" borderColor="#A10808">
                                                                <Dialog.Header className="DialogHeader" display={'flex'} justifyContent={'space-between'}>
                                                                    <Dialog.Title mt={4} className="DialogTitle">Editar Prato</Dialog.Title>
                                                                    <Dialog.ActionTrigger asChild>
                                                                        <Button bg={'#2D2C31'} border={'1px solid #A10808'} color={'white'}>
                                                                            <AiOutlineClose />
                                                                        </Button>
                                                                    </Dialog.ActionTrigger>
                                                                </Dialog.Header>
                                                                <Dialog.Body className="DialogDescription" mt={8}>
                                                                    <Text>Nome do prato:</Text>
                                                                </Dialog.Body>
                                                                <Input
                                                                    placeholder={dish.name}
                                                                    value={dishName}
                                                                    onChange={(e) => setDishName(e.target.value)}
                                                                    padding={2}
                                                                    mt={2}
                                                                />
                                                                <Input
                                                                    placeholder={dish.description}
                                                                    value={dishDescription}
                                                                    onChange={(e) => setDishDescription(e.target.value)}
                                                                    padding={2}
                                                                    mt={2}
                                                                />
                                                                <Input
                                                                    placeholder="Preço (ex: 30,99)"
                                                                    value={typeof dishPrice === 'string' ? dishPrice : String(dishPrice || '')}
                                                                    onChange={handlePriceChange}
                                                                    onBlur={() => {
                                                                        if (typeof dishPrice === 'string') {
                                                                            setDishPrice(formatPriceForDisplay(dishPrice));
                                                                        }
                                                                    }}
                                                                    padding={2}
                                                                    mt={2}
                                                                />
                                                                <Input
                                                                    placeholder={dish.imageUrl}
                                                                    value={dishImageUrl}
                                                                    onChange={(e) => setDishImageUrl(e.target.value)}
                                                                    padding={2}
                                                                    mt={2}
                                                                />
                                                                <NativeSelect.Root variant={'subtle'}>
                                                                    <NativeSelect.Field
                                                                        p={2}
                                                                        mt={2}
                                                                        placeholder="Selecione a categoria"
                                                                        value={dishCategory || category.category}
                                                                        onChange={(e) => setDishCategory(e.target.value)}
                                                                    >
                                                                        {allCategories.slice().sort((a, b) => a.name.localeCompare(b.name)).map((cat) => (
                                                                            <option key={cat.id} value={cat.id} style={{ padding: '2px', color: '#fff', backgroundColor: '#2D2C31' }}>
                                                                                {cat.name}
                                                                            </option>
                                                                        ))}
                                                                    </NativeSelect.Field>
                                                                    <NativeSelect.Indicator />
                                                                </NativeSelect.Root>
                                                                <Dialog.Footer className="DialogFooter" mt={4}>
                                                                    <Button variant="outline" size="sm" onClick={handleLocalSave} border={'1px solid #A10808'} color={'white'} style={{ padding: '2px', color: '#fff', backgroundColor: '#2D2C31' }}>
                                                                        <FaCheck />
                                                                    </Button>
                                                                    <Dialog.ActionTrigger asChild>
                                                                        <Button variant="outline" size="sm" p={2} border={'1px solid #A10808'} color={'white'}>Cancel</Button>
                                                                    </Dialog.ActionTrigger>
                                                                </Dialog.Footer>
                                                            </Dialog.Content>
                                                        </Dialog.Positioner>
                                                    </Portal>
                                                </Dialog.Root>
                                            </Flex>
                                            <Box mb={2} display={'inline-flex'} alignItems={'center'} justifyContent={'center'}>
                                                <Text fontSize='medium' fontWeight={'bold'} mb={2} mt={2}>Ingredientes: </Text>
                                                <Dialog.Root>
                                                    <Dialog.Trigger asChild>
                                                        <Button
                                                            marginLeft={2}
                                                            size={'2xs'}
                                                            bg={'#2D2C31'}
                                                            border={'1px solid #96c93d'}
                                                            color={'white'}
                                                            onClick={() => setEditingDishId(dish.menuItemId)}>
                                                            <FaPlus />
                                                        </Button>
                                                    </Dialog.Trigger>
                                                    <Portal>
                                                        <Dialog.Backdrop />
                                                        <Dialog.Positioner>
                                                            <Dialog.Content backgroundColor={"#2D2C31"} className="DialogContent" p={4} borderRadius="md" borderWidth="1px" borderColor="#A10808">
                                                                <Dialog.Header className="DialogHeader">
                                                                    <Dialog.Title className="DialogTitle">Adicionar Ingrediente</Dialog.Title>
                                                                </Dialog.Header>

                                                                <Dialog.Body className="DialogDescription">

                                                                    <Box mt={4} display="flex" alignItems="center">
                                                                        <NativeSelect.Root variant="subtle">
                                                                            <NativeSelect.Field
                                                                                value={currentIngredient}
                                                                                onChange={(e) => setCurrentIngredient(e.target.value)}
                                                                                p={2}
                                                                            >
                                                                                <option value="" style={{ padding: '2px', color: '#fff', backgroundColor: '#2D2C31' }}>Selecione um ingrediente</option>
                                                                                {allIngredients.slice().sort((a, b) => a.name.localeCompare(b.name)).map((ingredient) => (
                                                                                    <option key={ingredient.id} value={ingredient.ingredientId} style={{ padding: '2px', color: '#fff', backgroundColor: '#2D2C31' }}>
                                                                                        {ingredient.name}
                                                                                    </option>
                                                                                ))}
                                                                            </NativeSelect.Field>
                                                                        </NativeSelect.Root>

                                                                        <Button
                                                                            ml={2}
                                                                            onClick={addIngredientDish}
                                                                            size="sm"
                                                                            variant="ghost"
                                                                        >
                                                                            <FaCheck />
                                                                        </Button>
                                                                    </Box>

                                                                    <VStack mt={4} spacing={2} align="start">
                                                                        {selectedIngredients.map((ing) => (
                                                                            <HStack key={ing.ingredientId}>
                                                                                <Text>{ing.ingredient}</Text>
                                                                                <FaTrash
                                                                                    onClick={() =>
                                                                                        setSelectedIngredients(
                                                                                            selectedIngredients.filter(
                                                                                                (i) => i.ingredientId !== ing.ingredientId
                                                                                            )
                                                                                        )
                                                                                    }
                                                                                />
                                                                            </HStack>
                                                                        ))}
                                                                    </VStack>
                                                                </Dialog.Body>

                                                                <Dialog.Footer className="DialogFooter">
                                                                    <Dialog.ActionTrigger asChild>
                                                                        <Button variant="outline">Cancelar</Button>
                                                                    </Dialog.ActionTrigger>

                                                                    <Button
                                                                        variant="outline"
                                                                        size="sm"
                                                                        onClick={() => handleAddIngredientsToDish(editingDishId, selectedIngredients)}
                                                                    >
                                                                        <FaCheck />
                                                                    </Button>
                                                                </Dialog.Footer>
                                                            </Dialog.Content>

                                                        </Dialog.Positioner>
                                                    </Portal>
                                                </Dialog.Root>
                                            </Box>
                                            <VStack >
                                                {dish.ingredients.map((ing, ingIndex) => (
                                                    <HStack key={ingIndex} width="100%" justifyContent="space-between" >
                                                        <Text fontSize={14}>{ing.ingredient}</Text>
                                                        <Dialog.Root>
                                                            <Box>
                                                                <Dialog.Trigger asChild>
                                                                    <Button size="sm" background={'none'} color={'#2D2C31'} border={'none'}>
                                                                        <FaEdit />
                                                                    </Button>
                                                                </Dialog.Trigger>
                                                                <Button background={'none'} size={'sm'}>
                                                                    <FaTrash color={"#A10808"} onClick={() => RemoveIngredientToDish(dish.menuItemId, ing.ingredientId)} />
                                                                </Button>
                                                            </Box>
                                                            <Portal>
                                                                <Dialog.Backdrop />
                                                                <Dialog.Positioner>
                                                                    <Dialog.Content m={20} backgroundColor={"#2D2C31"} className="DialogContent" p={4} borderRadius="md" borderWidth="1px" borderColor="#A10808">
                                                                        <Dialog.Header className="DialogHeader" display={'flex'} justifyContent={'space-between'}>
                                                                            <Dialog.Title mt={4} className="DialogTitle">Editar Ingrediente</Dialog.Title>
                                                                            <Dialog.ActionTrigger asChild>
                                                                                <Button bg={'#2D2C31'} border={'1px solid #A10808'} color={'white'}>
                                                                                    <AiOutlineClose />
                                                                                </Button>
                                                                            </Dialog.ActionTrigger>
                                                                        </Dialog.Header>
                                                                        <Dialog.Body className="DialogDescription" mt={8}>
                                                                            <Text>Digite o novo nome do Ingrediente:</Text>
                                                                        </Dialog.Body>
                                                                        <Input
                                                                            placeholder={ing.ingredient}
                                                                            value={ingredient}
                                                                            onChange={(e) => setIngredient(e.target.value)}
                                                                            padding={2}
                                                                            mt={2}
                                                                        />
                                                                        <Dialog.Footer className="DialogFooter" mt={4}>
                                                                            <Dialog.ActionTrigger asChild>
                                                                                <Button variant="outline" size="sm" p={2} bg={'#2D2C31'} border={'1px solid #A10808'} color={'white'}>Cancel</Button>
                                                                            </Dialog.ActionTrigger>
                                                                            <Button variant="outline" size="sm" bg={'#2D2C31'} border={'1px solid #A10808'} color={'white'} onClick={() => handleSaveIngredient(ing.ingredientId, ingredient)}>
                                                                                <FaCheck />
                                                                            </Button>
                                                                        </Dialog.Footer>
                                                                    </Dialog.Content>
                                                                </Dialog.Positioner>
                                                            </Portal>
                                                        </Dialog.Root>
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

