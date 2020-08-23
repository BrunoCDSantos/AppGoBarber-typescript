import React, { useCallback, useRef } from 'react';
import { Image, ScrollView, TextInput, Alert } from 'react-native';
import * as Yup from 'yup';
import Icons from 'react-native-vector-icons/Feather'
import {useNavigation} from '@react-navigation/native'
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';

import Input from '../../components/Input';
import Button from '../../components/Button';

import getValidationErrors from '../../utils/getValidationErrors';

import logoImg from '../../assets/logo.png';


import { Container, Title, ForgotPassword, ForgotPasswordText, CreateAccountButton, CreateAccountButtonText} from './styles'

interface SignInFormData {
  email: string;
  password: string;
}

const SignIn: React.FC = () => {

  const passwordRef = useRef<TextInput>(null);
  const formRef = useRef<FormHandles>(null);
  const navigation = useNavigation();

  const handleSignIn = useCallback((data:object) => {
    console.log(data)
  }, [])

  const formSubmit = useCallback(
    async (data: SignInFormData) => {
      try {
        formRef.current?.setErrors({});
        const schema = Yup.object().shape({
          email: Yup.string()
            .required('E-mail obrigatório')
            .email('Digite um e-mail válido'),
          password: Yup.string().required('Senha obrigatoria'),
        });

        await schema.validate(schema, {
          abortEarly: false,
        });

        //await signIn({
     //     email: data.email,
     //     password: data.password,
     //   });

     //   history.push('/dashbord');
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);
          formRef.current?.setErrors(errors);

          return;
        }
        Alert.alert(
        'Erro de autenticação',
        'Ocorreu um erro ao fazer login, cheque as credenciais',
        []
        )

      }
    },
    [],
  );


  return (
    <>
    <ScrollView
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={{flex: 1}}
    >



    <Container>
      <Image source={logoImg} />
      <Title> Faça seu logon </Title>
      <Form  ref={formRef} onSubmit={ handleSignIn }>

        <Input
          autoCorrect={false}
          autoCapitalize="none"
          keyboardType="email-address"
          name="email"
          icon="mail"
          placeholder="E-mail"
          returnKeyType="next"
          onSubmitEditing={() => {

          }}
        />
        <Input
          ref={passwordRef}
          secureTextEntry
          name="password"
          icon="lock"
          placeholder="Senha"
          returnKeyType="send"
          onSubmitEditing={() => {
            formRef.current?.submitForm}}
        />

      <Button onPress={ () => {
        formRef.current?.submitForm
      }}>
      Entrar </Button>
      </Form>

      <ForgotPassword >
        <ForgotPasswordText>Esqueci minha senha</ForgotPasswordText>
      </ForgotPassword>

    </Container>

    <CreateAccountButton onPress={() => navigation.navigate("SignUp")}>
      <Icons name='log-in' size={20} color="#ff9000" />
      <CreateAccountButtonText>Criar uma conta</CreateAccountButtonText>
    </CreateAccountButton>
    </ScrollView>
    </>
  )
}

export default SignIn;
