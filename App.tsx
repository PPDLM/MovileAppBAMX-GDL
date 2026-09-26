import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AppDataProvider } from './src/data/AppDataContext';
import LoginScreen from './src/screens/LoginScreen';
import RecepcionScreen from './src/screens/RecepcionScreen';
import DistribucionScreen from './src/screens/DistribucionScreen';
import FormularioItemScreen from './src/screens/FormularioItemScreen';
import HistorialRecepcionScreen from './src/screens/HistorialRecepcionScreen';
import DetalleArriboScreen from './src/screens/DetalleArriboScreen';
import DetallePaqueteScreen from './src/screens/DetallePaqueteScreen';
import VoluntarioScreen from './src/screens/VoluntarioScreen';
import ChecklistFamiliasScreen from './src/screens/ChecklistFamiliasScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <AppDataProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login" screenOptions={{ headerBackButtonDisplayMode: 'minimal' }}>
          <Stack.Screen name="Login" component={LoginScreen} options={{ title: 'Banco de Alimentos', headerShown: false }} />

          {/* Recepción */}
          <Stack.Screen name="Recepcion" component={RecepcionScreen} options={{ title: 'Área de Recepción' }} />
          <Stack.Screen name="FormularioItem" component={FormularioItemScreen} options={{ title: 'Registrar Ítem', presentation: 'modal' }} />
          <Stack.Screen name="HistorialRecepcion" component={HistorialRecepcionScreen} options={{ title: 'Entregas Pasadas' }} />
          <Stack.Screen name="DetalleArribo" component={DetalleArriboScreen} options={{ title: 'Detalle de Entrega' }} />

          {/* Distribución */}
          <Stack.Screen name="Distribucion" component={DistribucionScreen} options={{ title: 'Área de Distribución' }} />
          <Stack.Screen name="DetallePaquete" component={DetallePaqueteScreen} options={{ title: 'Detalle de Paquete' }} />

          {/* Voluntario de Campo */}
          <Stack.Screen name="Voluntario" component={VoluntarioScreen} options={{ title: 'Voluntario de Campo' }} />
          <Stack.Screen name="ChecklistFamilias" component={ChecklistFamiliasScreen} options={{ title: 'Verificación de Familias' }} />
        </Stack.Navigator>
      </NavigationContainer>
    </AppDataProvider>
  );
}
