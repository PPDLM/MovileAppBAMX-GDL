import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useAppData } from '../data/AppDataContext';

export default function ChecklistFamiliasScreen({ route }: any) {
  const { paqueteId } = route.params;
  const { paquetes, familiasPorPaquete, marcarAsistenciaFamilia } = useAppData();
  const paquete = paquetes.find((p) => p.id === paqueteId);
  const familias = familiasPorPaquete[paqueteId] || [];

  return (
    <View style={styles.container}>
      {paquete && (
        <View style={styles.summary}>
          <Text style={styles.summaryTitle}>{paquete.comunidad}</Text>
          <Text style={styles.summaryDetail}>Marca si la familia se presentó a recibir su entrega</Text>
        </View>
      )}

      <FlatList
        data={familias}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 20 }}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No hay familias registradas para esta entrega</Text>
        }
        renderItem={({ item }) => (
          <View style={styles.familyCard}>
            <Text style={styles.familyName}>{item.nombre}</Text>
            <View style={styles.buttonRow}>
              <TouchableOpacity
                style={[styles.choiceButton, item.asistio === true && styles.presentButtonActive]}
                onPress={() => marcarAsistenciaFamilia(paqueteId, item.id, true)}>
                <Text style={[styles.choiceText, item.asistio === true && styles.choiceTextActive]}>
                  Se presentó
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.choiceButton, item.asistio === false && styles.absentButtonActive]}
                onPress={() => marcarAsistenciaFamilia(paqueteId, item.id, false)}>
                <Text style={[styles.choiceText, item.asistio === false && styles.choiceTextActive]}>
                  No se presentó
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#FFF' },
  emptyText: { fontSize: 16, color: '#888', fontStyle: 'italic', textAlign: 'center', marginTop: 40 },
  summary: { borderWidth: 1, borderColor: '#EEE', padding: 15, borderRadius: 8, backgroundColor: '#F9F9F9', marginBottom: 20 },
  summaryTitle: { fontSize: 18, fontWeight: 'bold', color: '#333' },
  summaryDetail: { fontSize: 14, color: '#555', marginTop: 6 },
  familyCard: { backgroundColor: '#F9F9F9', padding: 15, borderRadius: 8, marginBottom: 12, borderWidth: 1, borderColor: '#EEE' },
  familyName: { fontSize: 16, fontWeight: 'bold', color: '#333', marginBottom: 10 },
  buttonRow: { flexDirection: 'row' },
  choiceButton: { flex: 1, borderWidth: 1, borderColor: '#CCC', borderRadius: 8, paddingVertical: 12, alignItems: 'center', marginRight: 8, backgroundColor: '#FFF' },
  presentButtonActive: { backgroundColor: '#28A745', borderColor: '#28A745' },
  absentButtonActive: { backgroundColor: '#DC3545', borderColor: '#DC3545' },
  choiceText: { fontSize: 13, fontWeight: 'bold', color: '#333' },
  choiceTextActive: { color: '#FFF' },
});
