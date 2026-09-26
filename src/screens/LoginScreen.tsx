import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function LoginScreen({ navigation }: any) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sistema de Gestión Integral</Text>
      <Text style={styles.subtitle}>Selecciona un rol para la demo:</Text>
      
      <TouchableOpacity 
        style={styles.button} 
        onPress={() => navigation.navigate('Recepcion')}>
        <Text style={styles.buttonText}>Ingresar como Recepción</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, styles.distButton]}
        onPress={() => navigation.navigate('Distribucion')}>
        <Text style={styles.buttonText}>Ingresar como Distribución</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, styles.volButton]}
        onPress={() => navigation.navigate('Voluntario')}>
        <Text style={styles.buttonText}>Ingresar como Voluntario de Campo</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20, backgroundColor: '#F5F5F5' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10, textAlign: 'center', color: '#0033A0' },
  subtitle: { fontSize: 16, marginBottom: 30, color: '#333' },
  button: { backgroundColor: '#0033A0', padding: 15, borderRadius: 8, width: '100%', alignItems: 'center', marginBottom: 15 },
  distButton: { backgroundColor: '#0085CA' },
  volButton: { backgroundColor: '#28A745' },
  buttonText: { color: 'white', fontSize: 16, fontWeight: 'bold' }
});