import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './src/screens/LoginScreen';
import RecepcionScreen from './src/screens/RecepcionScreen';
import DistribucionScreen from './src/screens/DistribucionScreen';
import FormularioItemScreen from './src/screens/FormularioItemScreen'; // NUEVO

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} options={{ title: 'Banco de Alimentos' }} />
        <Stack.Screen name="Recepcion" component={RecepcionScreen} options={{ title: 'Área de Recepción' }} />
        <Stack.Screen name="Distribucion" component={DistribucionScreen} options={{ title: 'Área de Distribución' }} />
        {/* Nueva pantalla agregada */}
        <Stack.Screen name="FormularioItem" component={FormularioItemScreen} options={{ title: 'Registrar Ítem', presentation: 'modal' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}