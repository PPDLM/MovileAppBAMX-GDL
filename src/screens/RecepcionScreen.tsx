import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useAppData, ItemRecepcion } from '../data/AppDataContext';

export default function RecepcionScreen({ navigation, route }: any) {
  const [sessionItems, setSessionItems] = useState<ItemRecepcion[]>([]);
  const { arribos, agregarArribo } = useAppData();

  // Cada ítem nuevo se agrega bajo los que ya existen en la sesión actual,
  // nunca reemplaza al anterior: la lista solo crece.
  useEffect(() => {
    if (route.params?.newItem) {
      const nuevoItem: ItemRecepcion = route.params.newItem;
      setSessionItems((prevItems) => [...prevItems, nuevoItem]);
      // Limpiar el parámetro para no volver a agregarlo en un re-render posterior
      navigation.setParams({ newItem: undefined });
    }
  }, [route.params?.newItem, navigation]);

  const handleEnviarRegistro = () => {
    if (sessionItems.length === 0) {
      Alert.alert('Atención', 'No hay ítems en la sesión para enviar.');
      return;
    }

    // Guarda el arribo completo (con todos sus ítems) en el historial compartido
    agregarArribo(sessionItems);

    Alert.alert('Éxito', 'Registro enviado correctamente a la base de datos.');

    // Limpiar la sesión actual
    setSessionItems([]);
  };

  const renderEmptyComponent = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyText}>No se han agregado ítems</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Sección Superior: Lista Dinámica de Sesión (cada ítem se apila bajo el anterior) */}
      <View style={styles.sessionSection}>
        <Text style={styles.sectionTitle}>Sesión Actual</Text>
        <FlatList
          data={sessionItems}
          keyExtractor={(item, index) => item.id ?? index.toString()}
          ListEmptyComponent={renderEmptyComponent}
          renderItem={({ item }) => (
            <View style={styles.itemCard}>
              <Text style={styles.itemTitle}>{item.producto}</Text>
              <Text style={styles.itemDetail}>Cantidad: {item.cantidad} unidades</Text>
              <Text style={styles.itemDetail}>Tamaño: {item.peso} {item.unidad} c/u</Text>
              <Text style={styles.itemDetail}>Vence: {item.fechaVencimiento}</Text>
            </View>
          )}
          contentContainerStyle={sessionItems.length === 0 ? { flex: 1 } : { paddingBottom: 20 }}
        />
      </View>

      {/* Sección Inferior: Acciones */}
      <View style={styles.bottomSection}>
        <TouchableOpacity
          style={styles.historyButton}
          onPress={() => navigation.navigate('HistorialRecepcion')}>
          <Text style={styles.historyButtonText}>📋 Ver entregas pasadas ({arribos.length})</Text>
        </TouchableOpacity>

        <View style={styles.actionContainer}>
          <TouchableOpacity
            style={styles.primaryButton}
            onPress={() => navigation.navigate('FormularioItem')}>
            <Text style={styles.primaryButtonText}>+ Agregar ítem</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.secondaryButton}
            onPress={handleEnviarRegistro}>
            <Text style={styles.secondaryButtonText}>Enviar registro</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F5F5' },
  sessionSection: { flex: 1, padding: 20 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#0033A0', marginBottom: 10 },
  emptyContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  emptyText: { fontSize: 16, color: '#888', fontStyle: 'italic' },
  itemCard: { backgroundColor: '#FFF', padding: 15, borderRadius: 8, marginBottom: 10, borderWidth: 1, borderColor: '#E0E0E0' },
  itemTitle: { fontSize: 16, fontWeight: 'bold', color: '#333' },
  itemDetail: { fontSize: 14, color: '#666', marginTop: 4 },
  bottomSection: { padding: 20, backgroundColor: '#FFF', borderTopWidth: 1, borderColor: '#E0E0E0' },
  historyButton: { backgroundColor: '#F0F4F8', padding: 12, borderRadius: 8, alignItems: 'center', marginBottom: 15, borderWidth: 1, borderColor: '#D0DCE5' },
  historyButtonText: { fontSize: 14, fontWeight: 'bold', color: '#0033A0' },
  actionContainer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  primaryButton: { backgroundColor: '#0033A0', paddingVertical: 15, paddingHorizontal: 25, borderRadius: 8, flex: 1, marginRight: 15, alignItems: 'center' },
  primaryButtonText: { color: 'white', fontSize: 16, fontWeight: 'bold' },
  secondaryButton: { backgroundColor: '#E0E0E0', paddingVertical: 15, paddingHorizontal: 15, borderRadius: 8, justifyContent: 'center', alignItems: 'center' },
  secondaryButtonText: { color: '#333', fontSize: 14, fontWeight: 'bold' }
});
