import styles from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';


export const Container = styles(RectButton)`
  width: 100%;
  height: 60px;
  background: #ff9000;
  border-radius: 10px;
  margin-top: 8px;

  justify-content: center;
  align-items: center;
`;

export const ButtonText = styles.Text`
  font-family: 'RobotoSlab-Medium';
  font-size: 18px;

  color: #312e38;
`;
