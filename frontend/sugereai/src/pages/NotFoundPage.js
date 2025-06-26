import React from 'react';
import { Box, Text, Image, VStack, Button } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import Logo from '../images/Logo preta escrita.png';

function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <VStack
      minH="100vh"
      justifyContent="center"
      alignItems="center"
      bg="white"
      p={4}
    >
      <Image src={Logo} alt="Logo da Marca" width={300} mb={6} /> 
      <Text fontSize="6xl" fontWeight="bold" color="gray.700">
        404
      </Text>
      <Text fontSize="2xl" color="gray.600">
        Página Não Encontrada
      </Text>
      <Image
        src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExZWtibnF3NTZpbmRpcXozMTNrMDZreG83OTluZjhwYzZqMnFtZmYyZiZlcD12MV9naWZzX3NlYXJjaCZjdD1n/vuP4lZB1bpTq2FY5WF/giphy.gif"
        alt="Página não encontrada GIF"
        boxSize={{ base: "100px", md: "200px" }}
        objectFit="contain"
      />
      <Button
        size="lg"
        onClick={() => navigate('/home')}
        variant="solid"
        bg="gray.300"        
        color="gray.600"
        _hover={{ bg: "gray.400", color: "white" }}
        padding={4}
      >
        Voltar para a Home
      </Button>
    </VStack>
  );
}

export default NotFoundPage;