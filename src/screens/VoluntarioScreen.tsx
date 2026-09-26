import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useAppData } from '../data/AppDataContext';

export default function VoluntarioScreen({ navigation }: any) {
  const { paquetes, familiasPorPaquete } = useAppData();

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Entregas para Acompañar</Text>

      <FlatList
        data={paquetes}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 20 }}
        renderItem={({ item }) => {
          const familias = familiasPorPaquete[item.id] || [];
          const confirmadas = familias.filter((f) => f.asistio !== null).length;
          return (
            <TouchableOpacity
              style={styles.card}
              onPress={() => navigation.navigate('ChecklistFamilias', { paqueteId: item.id })}>
              <Text style={styles.cardTitle}>{item.comunidad}</Text>
              <Text style={styles.cardDetail}>Hora límite de salida: {item.horaLimite}</Text>
              <Text style={styles.cardDetail}>Familias verificadas: {confirmadas}/{familias.length}</Text>
            </TouchableOpacity>
          );
        }}
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
});
