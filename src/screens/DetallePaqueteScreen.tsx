import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useAppData } from '../data/AppDataContext';

export default function DetallePaqueteScreen({ route, navigation }: any) {
  const { paqueteId } = route.params;
  const { paquetes, marcarPaqueteCargado } = useAppData();
  const paquete = paquetes.find((p) => p.id === paqueteId);

  if (!paquete) {
    return (
      <View style={styles.container}>
        <Text style={styles.emptyText}>No se encontró información de este paquete.</Text>
      </View>
    );
  }

  const handleCargado = () => {
    marcarPaqueteCargado(paquete.id);
    Alert.alert('Listo', 'El paquete fue marcado como cargado en el camión.', [
      { text: 'OK', onPress: () => navigation.goBack() },
    ]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.summary}>
        <Text style={styles.summaryTitle}>{paquete.comunidad}</Text>
        <Text style={styles.summaryDetail}>Hora límite de salida: {paquete.horaLimite}</Text>
        <Text style={[styles.status, paquete.cargado ? styles.statusCargado : styles.statusPendiente]}>
          {paquete.cargado ? 'Cargado' : 'Pendiente de carga'}
        </Text>
      </View>

      <Text style={styles.sectionTitle}>Ítems a cargar</Text>
      <FlatList
        data={paquete.items}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 20 }}
        renderItem={({ item }) => (
          <View style={styles.itemCard}>
            <Text style={styles.itemTitle}>{item.nombre}</Text>
            <Text style={styles.itemDetail}>Cantidad: {item.cantidad}</Text>
            <Text style={styles.itemDetail}>Ubicación en bodega: {item.ubicacion}</Text>
          </View>
        )}
      />

      <TouchableOpacity
        style={[styles.submitButton, paquete.cargado && styles.submitButtonDisabled]}
        onPress={handleCargado}
        disabled={paquete.cargado}>
        <Text style={styles.submitButtonText}>
          {paquete.cargado ? 'Paquete ya cargado' : 'Marcar como cargado'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#FFF' },
  emptyText: { fontSize: 16, color: '#888', fontStyle: 'italic', textAlign: 'center', marginTop: 40 },
  summary: { borderWidth: 1, borderColor: '#EEE', padding: 15, borderRadius: 8, backgroundColor: '#F9F9F9', marginBottom: 20 },
  summaryTitle: { fontSize: 18, fontWeight: 'bold', color: '#333' },
  summaryDetail: { fontSize: 14, color: '#555', marginTop: 6 },
  status: { marginTop: 10, fontSize: 13, fontWeight: 'bold' },
  statusPendiente: { color: '#B8860B' },
  statusCargado: { color: '#28A745' },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#0033A0', marginBottom: 10 },
  itemCard: { backgroundColor: '#F9F9F9', padding: 15, borderRadius: 8, marginBottom: 10, borderWidth: 1, borderColor: '#EEE' },
  itemTitle: { fontSize: 16, fontWeight: 'bold', color: '#333' },
  itemDetail: { fontSize: 14, color: '#666', marginTop: 4 },
  submitButton: { backgroundColor: '#0033A0', padding: 15, borderRadius: 8, alignItems: 'center', marginTop: 10 },
  submitButtonDisabled: { backgroundColor: '#A5B4D6' },
  submitButtonText: { color: 'white', fontSize: 16, fontWeight: 'bold' },
});
