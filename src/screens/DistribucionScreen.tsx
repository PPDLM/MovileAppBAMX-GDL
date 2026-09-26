import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useAppData } from '../data/AppDataContext';

export default function DistribucionScreen({ navigation }: any) {
  const { paquetes } = useAppData();

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Entregas Asignadas</Text>

      <FlatList
        data={paquetes}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 20 }}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate('DetallePaquete', { paqueteId: item.id })}>
            <Text style={styles.cardTitle}>{item.comunidad}</Text>
            <Text style={styles.cardDetail}>Productos: {item.items.length} tipo(s)</Text>
            <Text style={styles.cardDetail}>Hora límite de salida: {item.horaLimite}</Text>
            <Text style={[styles.status, item.cargado ? styles.statusCargado : styles.statusPendiente]}>
              {item.cargado ? 'Cargado' : 'Pendiente de carga'}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#FFF' },
  header: { fontSize: 22, fontWeight: 'bold', marginBottom: 20, color: '#333' },
  card: { borderWidth: 1, borderColor: '#EEE', padding: 15, borderRadius: 8, backgroundColor: '#F9F9F9', marginBottom: 15 },
  cardTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 6, color: '#333' },
  cardDetail: { fontSize: 14, color: '#555', marginTop: 2 },
  status: { marginTop: 10, fontSize: 13, fontWeight: 'bold' },
  statusPendiente: { color: '#B8860B' },
  statusCargado: { color: '#28A745' },
});
