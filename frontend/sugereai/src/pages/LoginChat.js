import React from 'react';
import { Box, Input, Button, Text, Flex, VStack } from '@chakra-ui/react';
import { FormControl } from '@chakra-ui/form-control';

const Login = () => {
  return (
    <Box
      h="100vh"
      display="grid"
      gridTemplateColumns={{ base: "1fr", md: "1fr 1fr" }}
      gridTemplateRows="auto"
      justifyContent="center"
      bgColor="rgb(255,255,255)"
      padding={{ base: "0", md: "0" }}
    >
      <Flex
        bg="#A10808"
        paddingBottom={8}
        paddingRight={{ base: "8", md: "20" }}
        paddingLeft={8}
        paddingTop={8}
        display={"grid"}
        gridTemplateColumns="1fr"
        justifyContent={"center"}
        alignItems={"center"}
        w="full"
        textAlign="center"
        borderTopRightRadius={{ base: "0", md: "200px" }}
        borderBottomRightRadius={{ base: "100px", md: "200px" }}
        borderBottomLeftRadius={{ base: "100px", md: "0" }}
        position="relative"
        gridColumn={{ base: "1 / 2", md: "1 / 2" }}
      >
        <Box>
          <Text
            fontSize={{ base: "24px", md: "40px" }}
            color="white"
            fontWeight="bold"
            mt={4}
            m={2}
          >
            Olá, seja bem vindo ao SugereAI!
          </Text>
          <Text m={2} fontSize={{ base: "14px", md: "16px" }}>
            AI(Artificial Intelligence) que entende sua fome e sugere o que você ama.
          </Text>
          <Button
            mt={2}
            bg="#A10808"
            color="white"
            _hover={{ bg: "#E5E5E5", color: "#A10808" }}
            w="max-content"
            size="lg"
            rounded="md"
            border={"2px solid white"}
          >
            Fale conosco!
          </Button>
        </Box>
      </Flex>

      <Box
        justifyContent={"center"}
        alignItems={"center"}
        display={"flex"}
        w="full"
        mt={{ base: "-20"}}
        padding={{ base: "4", md: "4" }}
        gridColumn={{ base: "1 / 2", md: "2 / 3" }}
      >
        <Box
          p={8}
          rounded="lg"
          w="full"
          maxW={{ base: "100%", sm: "80%" }}
          textAlign="center"
        >
          <Text fontSize="4xl" mt={4} fontWeight="bold" color="#000000">
            Login
          </Text>
          <VStack spacing={4} mt={6} alignItems="stretch">
            <FormControl>
              <Input
                id="email"
                type="email"
                placeholder="Usuário"
                bg="#E5E5E5"
                borderColor="#E5E5E5"
                _hover={{ borderColor: "#A10808" }}
                _focus={{ borderColor: "#A10808" }}
                size="lg"
                mb={2}
              />
            </FormControl>

            <FormControl>
              <Input
                id="password"
                type="password"
                placeholder="Senha"
                bg="#E5E5E5"
                borderColor="#E5E5E5"
                _hover={{ borderColor: "#A10808" }}
                _focus={{ borderColor: "#A10808" }}
                size="lg"
                mb={2}
              />
            </FormControl>

            <Text fontSize={"sm"} fontWeight={"semibold"} color="#000000">
              Esqueceu sua senha?
            </Text>
            <Button
              mt={2}
              bg="#A10808"
              color="white"
              _hover={{ bg: "#E5E5E5", color: "#A10808" }}
              w="full"
              rounded="md"
              size="lg"
            >
              Entrar
            </Button>
          </VStack>
        </Box>
      </Box>
    </Box>
  );
};

export default Login;
