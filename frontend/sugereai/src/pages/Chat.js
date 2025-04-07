import { useState, useRef, useEffect } from 'react';
import { BsFillSendFill } from 'react-icons/bs';
import { Button, Input, Box, Text, Flex, Image } from "@chakra-ui/react";
import { keyframes } from '@emotion/react';
import logo from '../images/Logo preta escrita.png';
import { BiSolidFoodMenu } from "react-icons/bi";
import { AiOutlineClose } from "react-icons/ai";
import axios from "axios";

const dotsAnimation = keyframes`
  0% { content: ''; }
  33% { content: '.'; }
  66% { content: '..'; }
  100% { content: '...'; }
`;

export default function ChatPage() {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [chatHistory, setChatHistory] = useState([]);

  const chatEndRef = useRef(null);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage = { type: 'request', text: inputValue };
    setMessages((prev) => [...prev, userMessage]);

    const updatedHistory = [
      ...chatHistory,
      { message: { role: "user", content: inputValue, refusal: null }, restaurantResponseDto: null }
    ];

    setChatHistory(updatedHistory);
    setInputValue('');
    setIsLoading(true);

    try {
      const response = await getResult(updatedHistory);

      if (!response) return;

      const latestAssistantResponse = response[response.length - 1];

      if (latestAssistantResponse?.message?.role === "assistant") {
        const parsedContent = JSON.parse(latestAssistantResponse.message.content);

        let assistantMessage = {
          type: "response",
          text: `SugereAI: ${parsedContent.title} \n ${parsedContent.restaurantName} \n ${parsedContent.message}`,
          imageUrl: null,
          action: null
        };

        if (latestAssistantResponse?.restaurantResponseDto) {
          const restaurant = latestAssistantResponse.restaurantResponseDto;
          assistantMessage.imageUrl = latestAssistantResponse.restaurantResponseDto.imageUrl;

          assistantMessage.action = {
            label: "PROSSEGUIR",
            restaurantId: restaurant.id,
            restaurantName: restaurant.name
          };
        }

        setMessages((prev) => [...prev, assistantMessage]);

        setChatHistory([
          ...updatedHistory,
          { message: latestAssistantResponse.message, restaurantResponseDto: latestAssistantResponse.restaurantResponseDto }
        ]);
      }



    } catch (error) {
      console.error('Erro ao buscar resposta:', error);
      setMessages((prev) => [...prev, { type: 'response', text: "Erro ao obter resposta do servidor." }]);
    } finally {
      setIsLoading(false);
    }
  };

  const getResult = async (updatedHistory) => {
    try {
      console.log("Envia o histórico para o back:", JSON.stringify(updatedHistory, null, 2));
      const token = localStorage.getItem('authToken');
      /*const userId = localStorage.getItem('userId');*/

      const response = await axios.post(
        `http://localhost:8080/api/ai/chat`,
        updatedHistory,
        {
          headers: {
            /*'UserId': userId,*/
            'UserId': '57768dfb-0752-11f0-94fc-74563c7c997c',
            Authorization: `Bearer ${token}`
          }
        }
      );

      console.log("Retorno do back:", JSON.stringify(response.data, null, 2));

      return response.data;
    } catch (error) {
      console.log(error);
    }
    return null;
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  const handleProceed = async (restaurantId) => {
    console.log("Usuário quer prosseguir para o restaurante:", restaurantId);
    
    try {
      const response = await axios.post(
        `http://localhost:8080/api/ai/profile`,
        chatHistory,
        {
          headers: {
            'UserId': '57768dfb-0752-11f0-94fc-74563c7c997c',
            /*'UserId': '40d48940-090c-11f0-bc90-fc4596fb5bc5' NOT*/
          },
        }
      )

      console.log(response.data);
      window.location.href = `/restaurant/${restaurantId}`;
    } catch (error) {
      console.error(error);
    }
  };
  

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  return (
    <Flex direction="column" minH="100vh" p="20px">
      <Flex mb="10px" w={'100%'} justify={'space-between'}>
        <Image src={logo} alt='Logo SugereAI' width={'40%'} h={'auto'} color={'#2D2C31'} />
        <a href='http://localhost:3000/home' rel='noopener noreferrer'>
          <Button bg={'#2D2C31'} border={'2px solid #A10808'} borderRadius={'50%'} color={'white'}>
            <AiOutlineClose />
          </Button>
        </a>
      </Flex>

      <Text mb="10px" textAlign="center" color={'black'}>
        Fale para nós o que você deseja!
      </Text>

      <Box
        minHeight="400px" // Quebrar a cabeça para o responsivo.
        maxHeight="calc(90vh - 100px)" // Define o uso máximo da tela em 90% retirando 100px para não ultrapassar outras BOX
        overflowY="auto"
        p="20px"
        border="1px solid #A10808"
        borderRadius="8px"
        bg="#2D2C31"
        mb="4px"
        display="flex"
        flexDirection="column"
        flexGrow={1}
      >
        {messages.map((msg, index) => (
          <Box
            key={index}
            maxW="70%"
            p="10px 15px"
            borderRadius="20px"
            fontSize={'12px'}
            mb="10px"
            alignSelf={msg.type === 'request' ? 'flex-end' : 'flex-start'}
            bg={msg.type === 'request' ? '#A10808' : '#f7bb75'}
            color={msg.type === 'request' ? '#FFFFFF' : '#FFFFFF'}
            ml={msg.type === 'request' ? 'auto' : '0'}
          >
            <Box style={{ whiteSpace: 'pre-line' }}>
              {msg.text}
            </Box>
            <Box justifyItems={'center'} style={msg.imageUrl ? { marginTop: '10px' } : { display: 'none' }}>
              {msg.imageUrl && <img src={msg.imageUrl} alt="Imagem do Restaurante" width="100"/>}
            </Box>
            <Box justifyItems={'center'} >
              {msg.action && (
                <Button 
                  onClick={() => handleProceed(msg.action.restaurantId)} 
                  color={'white'} 
                  bg= '#A10808' 
                  p={'10px'}
                  marginTop={'10px'}
                  fontSize={'10px'}
                  maxW={'80%'}
                  display={'flex'}
                  alignItems={'center'}
                >
                  {msg.action.label} <BiSolidFoodMenu color='white'/>
                </Button>
              )}
            </Box>
          </Box>
        ))}

        {isLoading && (
          <Box
            maxW="70%"
            p="10px 15px"
            borderRadius="20px"
            mb="10px"
            alignSelf="flex-start"
            bg="#f7bb75"
            color="#FFFFFF"
            _after={{
              content: '""',
              display: 'inline-block',
              width: '1em',
              animation: `${dotsAnimation} 1.5s infinite steps(4, end)`,
            }}
          >
            Digitando
          </Box>
        )}
        <Box></Box>
        <div ref={chatEndRef} />
      </Box>

      <Flex mt="auto" gap="10px">
        <Input
          placeholder="Você já possui um restaurante em mente?"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          flex="1"
          p='6px'
          bg={'#2D2C31'}
          border={'2px solid #A10808'}
        />
        <Button
          background="#2D2C31"
          borderRadius="50%"
          border={'2px solid #A10808'}
          onClick={handleSendMessage}
        >
          <BsFillSendFill color="white" />
        </Button>
      </Flex>
    </Flex>
  );
}
