import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Modal, FlatList, SafeAreaView } from 'react-native';

// Catálogo simulado extraído de la base de datos
const CATALOGO_DB = [
  { id: '1', nombre: 'Arroz (Bulto 50kg)' },
  { id: '2', nombre: 'Frijol Peruano (Costal)' },
  { id: '3', nombre: 'Aceite Vegetal (Caja 12L)' },
  { id: '4', nombre: 'Lata de Atún' },
];

export default function FormularioItemScreen({ navigation }: any) {
  const [productoSeleccionado, setProductoSeleccionado] = useState('');
  const [cantidad, setCantidad] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [esOtro, setEsOtro] = useState(false);

  const handleSeleccionarProducto = (nombre: string) => {
    setProductoSeleccionado(nombre);
    setEsOtro(false);
    setModalVisible(false);
  };

  const handleSeleccionarOtro = () => {
    setProductoSeleccionado('');
    setEsOtro(true);
    setModalVisible(false);
  };

  const handleGuardar = () => {
    if (!productoSeleccionado || !cantidad) return;
    
    const nuevoItem = {
      producto: productoSeleccionado,
      cantidad: cantidad
    };

    // Retornamos a Recepción pasando el nuevo ítem como parámetro
    navigation.navigate('Recepcion', { newItem: nuevoItem });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.label}>Tipo de producto</Text>
      
      {/* Botón que simula el Dropdown */}
      <TouchableOpacity style={styles.dropdownButton} onPress={() => setModalVisible(true)}>
        <Text style={styles.dropdownText}>
          {productoSeleccionado ? productoSeleccionado : 'Seleccione un producto...'}
        </Text>
      </TouchableOpacity>

      {/* Input manual si seleccionó "Otro..." */}
      {esOtro && (
        <TextInput 
          style={styles.input} 
          placeholder="Especifique el producto no catalogado..." 
          value={productoSeleccionado}
          onChangeText={setProductoSeleccionado}
        />
      )}

      <Text style={styles.label}>Cantidad</Text>
      <TextInput 
        style={styles.input} 
        placeholder="Ej. 10" 
        keyboardType="numeric"
        value={cantidad}
        onChangeText={setCantidad}
      />

      <TouchableOpacity 
        style={[styles.submitButton, (!productoSeleccionado || !cantidad) && styles.submitButtonDisabled]} 
        onPress={handleGuardar}
        disabled={!productoSeleccionado || !cantidad}>
        <Text style={styles.submitButtonText}>Confirmar y Agregar</Text>
      </TouchableOpacity>

      {/* Modal del Dropdown */}
      <Modal visible={modalVisible} transparent={true} animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Catálogo de Productos</Text>
            
            <FlatList
              data={CATALOGO_DB}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <TouchableOpacity style={styles.modalOption} onPress={() => handleSeleccionarProducto(item.nombre)}>
                  <Text style={styles.modalOptionText}>{item.nombre}</Text>
                </TouchableOpacity>
              )}
            />
            
            {/* Botón de Excepción Permanente */}
            <TouchableOpacity style={styles.otroButton} onPress={handleSeleccionarOtro}>
              <Text style={styles.otroButtonText}>+ Otro... (No está en la lista)</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.closeModalButton} onPress={() => setModalVisible(false)}>
              <Text style={styles.closeModalText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#FFF' },
  label: { fontSize: 16, fontWeight: 'bold', color: '#333', marginBottom: 8, marginTop: 15 },
  input: { borderWidth: 1, borderColor: '#CCC', borderRadius: 8, padding: 15, fontSize: 16, backgroundColor: '#F9F9F9' },
  dropdownButton: { borderWidth: 1, borderColor: '#0033A0', borderRadius: 8, padding: 15, backgroundColor: '#F0F4F8' },
  dropdownText: { fontSize: 16, color: '#333' },
  submitButton: { backgroundColor: '#28A745', padding: 15, borderRadius: 8, alignItems: 'center', marginTop: 30 },
  submitButtonDisabled: { backgroundColor: '#A5D6A7' },
  submitButtonText: { color: 'white', fontSize: 16, fontWeight: 'bold' },
  
  // Estilos del Modal
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' },
  modalContent: { backgroundColor: '#FFF', borderTopLeftRadius: 20, borderTopRightRadius: 20, padding: 20, maxHeight: '80%' },
  modalTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 15, color: '#0033A0' },
  modalOption: { paddingVertical: 15, borderBottomWidth: 1, borderBottomColor: '#EEE' },
  modalOptionText: { fontSize: 16, color: '#333' },
  otroButton: { backgroundColor: '#0033A0', padding: 15, borderRadius: 8, alignItems: 'center', marginTop: 15 },
  otroButtonText: { color: '#FFF', fontSize: 16, fontWeight: 'bold' },
  closeModalButton: { marginTop: 15, padding: 15, alignItems: 'center' },
  closeModalText: { color: '#FF3B30', fontSize: 16, fontWeight: 'bold' }
});