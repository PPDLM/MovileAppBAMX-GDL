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
  const [peso, setPeso] = useState('');
  const [unidad, setUnidad] = useState<'gr' | 'ml'>('gr');
  const [fechaVencimiento, setFechaVencimiento] = useState('');
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

  const formularioValido = productoSeleccionado && cantidad && peso && fechaVencimiento;

  const handleGuardar = () => {
    if (!formularioValido) return;

    const nuevoItem = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      producto: productoSeleccionado,
      cantidad,
      peso,
      unidad,
      fechaVencimiento,
    };

    // Retornamos a Recepción pasando el nuevo ítem como parámetro.
    // Recepcion lo agrega bajo los ítems ya existentes en la sesión.
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

      <Text style={styles.label}>Cantidad (unidades)</Text>
      <TextInput
        style={styles.input}
        placeholder="Ej. 10"
        keyboardType="numeric"
        value={cantidad}
        onChangeText={setCantidad}
      />

      <Text style={styles.label}>Tamaño por unidad</Text>
      <View style={styles.rowGroup}>
        <TextInput
          style={[styles.input, styles.pesoInput]}
          placeholder="Ej. 500"
          keyboardType="numeric"
          value={peso}
          onChangeText={setPeso}
        />
        <TouchableOpacity
          style={[styles.unidadButton, unidad === 'gr' && styles.unidadButtonActive]}
          onPress={() => setUnidad('gr')}>
          <Text style={[styles.unidadText, unidad === 'gr' && styles.unidadTextActive]}>gr</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.unidadButton, unidad === 'ml' && styles.unidadButtonActive]}
          onPress={() => setUnidad('ml')}>
          <Text style={[styles.unidadText, unidad === 'ml' && styles.unidadTextActive]}>ml</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.label}>Fecha de vencimiento</Text>
      <TextInput
        style={styles.input}
        placeholder="DD/MM/AAAA"
        value={fechaVencimiento}
        onChangeText={setFechaVencimiento}
      />

      <TouchableOpacity
        style={[styles.submitButton, !formularioValido && styles.submitButtonDisabled]}
        onPress={handleGuardar}
        disabled={!formularioValido}>
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
  rowGroup: { flexDirection: 'row', alignItems: 'center' },
  pesoInput: { flex: 1, marginRight: 10 },
  unidadButton: { borderWidth: 1, borderColor: '#CCC', borderRadius: 8, paddingVertical: 15, paddingHorizontal: 18, marginLeft: 8, backgroundColor: '#F9F9F9' },
  unidadButtonActive: { backgroundColor: '#0033A0', borderColor: '#0033A0' },
  unidadText: { fontSize: 16, color: '#333', fontWeight: 'bold' },
  unidadTextActive: { color: '#FFF' },
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
