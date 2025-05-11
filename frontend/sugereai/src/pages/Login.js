import React, { useState, useEffect } from 'react';
import '../styles/Login.css';
import { Button, Input, VStack } from '@chakra-ui/react';
import { FormControl, FormErrorMessage } from '@chakra-ui/form-control';
import LoadingAnimation from '../components/LoadingAnimation';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import logo from '../images/Logo branca escrita.png';

function Login() {
  const [isLoading, setIsLoading] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [isInputFocused, setIsInputFocused] = useState(false);

  const isMobile = window.innerWidth <= 768;

  const handleFocus = () => {
    if (isMobile) {
      setIsInputFocused(true);
    }
  };

  const handleBlur = () => {
    if (isMobile) {
      setIsInputFocused(false);
    }
  };

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      setEmailError('E-mail é obrigatório.');
      return false;
    } else if (!regex.test(email)) {
      setEmailError('Por favor, insira um e-mail válido.');
      return false;
    } else {
      setEmailError('');
      return true;
    }
  };

  const validatePassword = (password) => {
    if (!password) {
      setPasswordError('Senha é obrigatória.');
      return false;
    } else if (password.length < 3) {
      setPasswordError('A senha deve ter pelo menos 3 caracteres.');
      return false;
    } else {
      setPasswordError('');
      return true;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isEmailValid = validateEmail(email);
    const isPasswordValid = validatePassword(password);

    if (isEmailValid && isPasswordValid) {
      try {
        const response = await axios.post('http://localhost:8080/api/users/login', {
          email,
          password
        });

        const authorization = response.data.token;

        if (authorization) {
          localStorage.setItem('authToken', authorization);
          navigate('/home', { replace: true });
        } else {
          throw new Error('Dados de autenticação incompletos');
        }
      } catch (error) {
        const msg = error.response?.data?.message || 'Erro ao fazer login';
        console.error('Erro durante o login:', msg);
        alert(msg);
      }
    }
  };


  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <LoadingAnimation />;
  }

  return (
    <div className="box-geral">
      {!isInputFocused && (
        <div className="box-fale-conosco">
          <div className="content">
            <h1>Olá, seja bem-vindo ao SugereAI!</h1>
            <img src={logo} className='logo-login' />
            <p>AI (Artificial Intelligence) que entende sua fome e sugere o que você ama.</p>
          </div>
        </div>
      )}

      <div className="box-login">
        <div className="form-box">
          <h2>Login</h2>
          <form onSubmit={handleSubmit}>
            <VStack spacing={4} mt={6} alignItems="stretch">
              <FormControl isInvalid={emailError}>
                <Input
                  id="email"
                  type="email"
                  placeholder="Usuário"
                  onFocus={handleFocus}
                  onBlur={() => validateEmail(email) && handleBlur()}
                  bg="#E5E5E5"
                  borderColor="#E5E5E5"
                  _hover={{ borderColor: "#A10808" }}
                  _focus={{ borderColor: "#A10808" }}
                  size="lg"
                  p={4}
                  mb={2}
                  color={"black"}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <FormErrorMessage color='black' marginLeft={4} fontSize={10}>{emailError}</FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={passwordError}>
                <Input
                  id="password"
                  type="password"
                  placeholder="Senha"
                  onFocus={handleFocus}
                  onBlur={() => validatePassword(password) && handleBlur()}
                  bg="#E5E5E5"
                  borderColor="#E5E5E5"
                  _hover={{ borderColor: "#A10808" }}
                  _focus={{ borderColor: "#A10808" }}
                  size="lg"
                  p={4}
                  mb={2}
                  color={"black"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <FormErrorMessage color='black' marginLeft={4} fontSize={10}>{passwordError}</FormErrorMessage>
              </FormControl>

              <a href="https://www.google.com.br/" target="_blank" rel='noopener noreferrer' className="senha-esquecida">Esqueceu sua senha?</a>
              <Button
                mt={2}
                bg="#A10808"
                color="white"
                _hover={{ bg: "#E5E5E5", color: "#A10808", border: "2px solid #A10808" }}
                w="full"
                rounded="md"
                size="lg"
                type='submit'
              >
                Entrar
              </Button>
              <a onClick={() => navigate(`/register`)} target="_blank" rel='noopener noreferrer' className="criar-conta">Não possui uma conta? Crie agora!</a>
            </VStack>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
