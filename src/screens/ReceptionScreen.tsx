simport React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

export default function RecepcionScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Registrar Donación</Text>
      
      <TextInput style={styles.input} placeholder="Producto (ej. Frijol)" />
      <TextInput style={styles.input} placeholder="Cantidad" keyboardType="numeric" />
      <TextInput style={styles.input} placeholder="Procedencia" />
      
      <TouchableOpacity style={styles.camButton}>
        <Text style={styles.buttonText}>📷 Capturar Evidencia</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.submitButton}>
        <Text style={styles.buttonText}>Confirmar Registro</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, flexGrow: 1, backgroundColor: '#FFF' },
  header: { fontSize: 22, fontWeight: 'bold', marginBottom: 20, color: '#333' },
  input: { borderWidth: 1, borderColor: '#CCC', borderRadius: 8, padding: 12, marginBottom: 15, fontSize: 16 },
  camButton: { backgroundColor: '#555', padding: 15, borderRadius: 8, alignItems: 'center', marginBottom: 15 },
  submitButton: { backgroundColor: '#28A745', padding: 15, borderRadius: 8, alignItems: 'center' },
  buttonText: { color: 'white', fontSize: 16, fontWeight: 'bold' }
});