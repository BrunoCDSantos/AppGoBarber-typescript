import React from 'react';
import { Image, ScrollView } from 'react-native';
import Icons from 'react-native-vector-icons/Feather'
import {useNavigation} from '@react-navigation/native'

import Input from '../../components/Input';
import Button from '../../components/Button';

import logoImg from '../../assets/logo.png';


import { Container, Title, BackToSign, BackToSignText} from './styles'


const SignUp: React.FC = () => {
  const navigation = useNavigation();

  return (
    <>
    <ScrollView
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={{flex: 1}}
    >



    <Container>
      <Image source={logoImg} />
      <Title> Crie sua conta </Title>

      <Input name="name" icon="user" placeholder="Nome"/>

      <Input name="email" icon="mail" placeholder="E-mail"/>

      <Input name="password" icon="lock" placeholder="Senha"/>

      <Button> Criar nova conta </Button>

    </Container>

    <BackToSign onPress={() => navigation.goBack()}>
      <Icons name='arrow-left' size={20} color="#fff" />
      <BackToSignText>Voltar para logon</BackToSignText>
    </BackToSign>
    </ScrollView>
    </>
  )
}

export default SignUp;
