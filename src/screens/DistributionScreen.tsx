import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function DistribucionScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Entregas Asignadas</Text>
      
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Comunidad San José</Text>
        <Text>Productos: 50 Despensas</Text>
        <Text>Estado: Pendiente</Text>
        
        <TouchableOpacity style={styles.submitButton}>
          <Text style={styles.buttonText}>Confirmar Entrega</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#FFF' },
  header: { fontSize: 22, fontWeight: 'bold', marginBottom: 20, color: '#333' },
  card: { borderWidth: 1, borderColor: '#EEE', padding: 15, borderRadius: 8, backgroundColor: '#F9F9F9' },
  cardTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
  submitButton: { backgroundColor: '#0033A0', padding: 12, borderRadius: 8, alignItems: 'center', marginTop: 15 },
  buttonText: { color: 'white', fontSize: 16, fontWeight: 'bold' }
});