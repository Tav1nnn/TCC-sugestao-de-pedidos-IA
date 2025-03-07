import { useState, useRef, useEffect } from 'react';
import { BsFillSendFill } from 'react-icons/bs';
import { Button, Input, Box, Heading, Text, Flex, Image } from "@chakra-ui/react";
import { keyframes } from '@emotion/react';
import logo from '../images/Logo branca escrita.png'

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

  const chatEndRef = useRef(null);

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const userMessage = { type: 'request', text: inputValue };
    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    setTimeout(() => {
      const aiResponse = { type: 'response', text: `Resposta para "${userMessage.text}"` };
      setMessages((prev) => [...prev, aiResponse]);
      setIsLoading(false);
    }, 1500);
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  return (
    <Flex direction="column" minH="100vh" p="20px" bg="rgb(45, 44, 48)">
      <Flex align="center" justify="space-between" mb="20px" w={'100%'}>
        <Heading display="flex" alignItems="center" fontSize="40px">
          <Image src={logo} alt = 'Logo SugereAI' width={'40%'} h={'auto'}/>
          <a href='http://localhost:3000/home' rel='noopener noreferrer'>
            <Button>
                X
                {/*<PiOpenAiLogoBold className='icon-ia'/> */}
            </Button>
          </a>
        </Heading>
      </Flex>

      <Text mb="20px" textAlign="center">
        Fale para nós o que você deseja!
      </Text>

      <Box
        flex="1"
        overflowY="auto"
        p="20px"
        border="1px solid #ddd"
        borderRadius="8px"
        bg="white"
        mb="20px"
        display="flex"
        flexDirection="column"
      >
        {messages.map((msg, index) => (
          <Box
            key={index}
            maxW="70%"
            p="10px 15px"
            borderRadius="20px"
            mb="10px"
            alignSelf={msg.type === 'request' ? 'flex-end' : 'flex-start'}
            bg={msg.type === 'request' ? '#d1e7dd' : '#f8d7da'}
            color={msg.type === 'request' ? '#0f5132' : '#842029'}
            ml={msg.type === 'request' ? 'auto' : '0'}
          >
            {msg.text}
          </Box>
        ))}

        {isLoading && (
          <Box
            maxW="70%"
            p="10px 15px"
            borderRadius="20px"
            mb="10px"
            alignSelf="flex-start"
            bg="#f8d7da"
            color="#842029"
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

        <div ref={chatEndRef} />
      </Box>

      <Flex mt="auto" gap="10px">
        <Input
          placeholder="Você já possui um restaurante em mente?"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
          flex="1"
          p='6px'
        />
        <Button
          background="#2D2C31"
          borderRadius="50%"
          onClick={handleSendMessage}
        >
          <BsFillSendFill color="white" />
        </Button>
      </Flex>
    </Flex>
  );
}
