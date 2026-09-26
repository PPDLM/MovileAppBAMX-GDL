import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useAppData } from '../data/AppDataContext';

export default function HistorialRecepcionScreen({ navigation }: any) {
  const { arribos } = useAppData();

  return (
    <View style={styles.container}>
      <FlatList
        data={arribos}
        keyExtractor={(item) => item.id}
        contentContainerStyle={arribos.length === 0 ? styles.emptyList : styles.list}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Todavía no se ha enviado ningún registro</Text>
          </View>
        }
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate('DetalleArribo', { arriboId: item.id })}>
            <Text style={styles.cardTitle}>{item.fecha} · {item.hora}</Text>
            <Text style={styles.cardSubtitle}>{item.items.length} ítem(s) recibido(s)</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F5F5' },
  list: { padding: 20 },
  emptyList: { flex: 1 },
  emptyContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  emptyText: { fontSize: 16, color: '#888', fontStyle: 'italic' },
  card: { backgroundColor: '#FFF', padding: 15, borderRadius: 8, marginBottom: 10, borderWidth: 1, borderColor: '#E0E0E0' },
  cardTitle: { fontSize: 16, fontWeight: 'bold', color: '#0033A0' },
  cardSubtitle: { fontSize: 14, color: '#666', marginTop: 4 },
});
