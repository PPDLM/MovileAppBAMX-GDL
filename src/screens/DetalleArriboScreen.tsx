import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useAppData } from '../data/AppDataContext';

export default function DetalleArriboScreen({ route }: any) {
  const { arriboId } = route.params;
  const { arribos } = useAppData();
  const arribo = arribos.find((a) => a.id === arriboId);

  if (!arribo) {
    return (
      <View style={styles.container}>
        <Text style={styles.emptyText}>No se encontró información de este registro.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.summary}>
        <Text style={styles.summaryLabel}>Fecha</Text>
        <Text style={styles.summaryValue}>{arribo.fecha}</Text>
        <Text style={styles.summaryLabel}>Hora</Text>
        <Text style={styles.summaryValue}>{arribo.hora}</Text>
        <Text style={styles.summaryLabel}>Total de ítems</Text>
        <Text style={styles.summaryValue}>{arribo.items.length}</Text>
      </View>

      <Text style={styles.sectionTitle}>Ítems recibidos</Text>
      <FlatList
        data={arribo.items}
        keyExtractor={(item, index) => item.id ?? index.toString()}
        contentContainerStyle={{ paddingBottom: 20 }}
        renderItem={({ item }) => (
          <View style={styles.itemCard}>
            <Text style={styles.itemTitle}>{item.producto}</Text>
            <Text style={styles.itemDetail}>Cantidad: {item.cantidad} unidades</Text>
            <Text style={styles.itemDetail}>Tamaño: {item.peso} {item.unidad} c/u</Text>
            <Text style={styles.itemDetail}>Vence: {item.fechaVencimiento}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F5F5', padding: 20 },
  emptyText: { fontSize: 16, color: '#888', fontStyle: 'italic', textAlign: 'center', marginTop: 40 },
  summary: { backgroundColor: '#FFF', borderRadius: 8, padding: 15, marginBottom: 20, borderWidth: 1, borderColor: '#E0E0E0' },
  summaryLabel: { fontSize: 12, color: '#888', marginTop: 8 },
  summaryValue: { fontSize: 16, fontWeight: 'bold', color: '#333' },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#0033A0', marginBottom: 10 },
  itemCard: { backgroundColor: '#FFF', padding: 15, borderRadius: 8, marginBottom: 10, borderWidth: 1, borderColor: '#E0E0E0' },
  itemTitle: { fontSize: 16, fontWeight: 'bold', color: '#333' },
  itemDetail: { fontSize: 14, color: '#666', marginTop: 4 },
});
