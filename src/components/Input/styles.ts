import styles from 'styled-components/native';
import FetherIcon from 'react-native-vector-icons/Feather'

export const Container = styles.View`
  width: 100%;
  height: 60px;
  padding: 0 16px;
  background: #232129;
  border-radius: 10px;
  margin-bottom: 8px;

  flex-direction: row;
  align-items: center;
`;

export const TextInput = styles.TextInput`
  flex: 1;
  color: #fff;
  font-size: 16px;
  font-family: 'RobotoSlab-Regular';
`;

export const Icon = styles(FetherIcon)`
  margin-right: 16px;
`;
