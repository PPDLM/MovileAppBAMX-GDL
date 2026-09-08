import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert } from 'react-native';

export default function RecepcionScreen({ navigation, route }: any) {
  const [sessionItems, setSessionItems] = useState<any[]>([]);
  const [history, setHistory] = useState<any[]>([
    // Datos simulados de historial previo
    { id: 'h1', date: '07/09/2026', totalItems: 12, status: 'Enviado' },
  ]);

  // Escuchar cuando el formulario devuelve un nuevo ítem
  useEffect(() => {
    if (route.params?.newItem) {
      setSessionItems((prev) => [...prev, route.params.newItem]);
      // Limpiar el parámetro para evitar duplicados si la pantalla se vuelve a renderizar
      navigation.setParams({ newItem: undefined });
    }
  }, [route.params?.newItem]);

  const handleEnviarRegistro = () => {
    if (sessionItems.length === 0) {
      Alert.alert('Atención', 'No hay ítems en la sesión para enviar.');
      return;
    }
    // Aquí irá la lógica de conexión a Supabase/PostgreSQL
    Alert.alert('Éxito', 'Registro enviado a la base de datos PostgreSQL.');
    setSessionItems([]); // Limpiar sesión actual
  };

  const renderEmptyComponent = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyText}>No se han agregado ítems</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Sección Superior: Lista Dinámica de Sesión */}
      <View style={styles.sessionSection}>
        <Text style={styles.sectionTitle}>Sesión Actual</Text>
        <FlatList
          data={sessionItems}
          keyExtractor={(item, index) => index.toString()}
          ListEmptyComponent={renderEmptyComponent}
          renderItem={({ item }) => (
            <View style={styles.itemCard}>
              <Text style={styles.itemTitle}>{item.producto}</Text>
              <Text style={styles.itemDetail}>Cantidad: {item.cantidad}</Text>
            </View>
          )}
          contentContainerStyle={sessionItems.length === 0 ? { flex: 1 } : { paddingBottom: 20 }}
        />
      </View>

      {/* Sección Inferior: Historial y Botones de Acción */}
      <View style={styles.bottomSection}>
        <Text style={styles.sectionTitle}>Historial de Envíos</Text>
        {history.map((h) => (
          <View key={h.id} style={styles.historyCard}>
            <Text style={styles.historyText}>{h.date} - {h.totalItems} ítems ({h.status})</Text>
          </View>
        ))}

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
  historyCard: { backgroundColor: '#F0F4F8', padding: 10, borderRadius: 6, marginBottom: 15 },
  historyText: { fontSize: 14, color: '#333' },
  actionContainer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end' },
  primaryButton: { backgroundColor: '#0033A0', paddingVertical: 15, paddingHorizontal: 25, borderRadius: 8, flex: 1, marginRight: 15, alignItems: 'center' },
  primaryButtonText: { color: 'white', fontSize: 16, fontWeight: 'bold' },
  secondaryButton: { backgroundColor: '#E0E0E0', paddingVertical: 10, paddingHorizontal: 15, borderRadius: 6, justifyContent: 'center' },
  secondaryButtonText: { color: '#333', fontSize: 12, fontWeight: 'bold' }
});