import React, { createContext, useContext, useState } from 'react';

export type ItemRecepcion = {
  id: string;
  producto: string;
  cantidad: string;
  peso: string;
  unidad: 'gr' | 'ml';
  fechaVencimiento: string;
};

export type Arribo = {
  id: string;
  fecha: string;
  hora: string;
  items: ItemRecepcion[];
};

export type ItemPaquete = {
  id: string;
  nombre: string;
  cantidad: string;
  ubicacion: string;
};

export type Paquete = {
  id: string;
  comunidad: string;
  items: ItemPaquete[];
  horaLimite: string;
  cargado: boolean;
};

export type Familia = {
  id: string;
  nombre: string;
  asistio: boolean | null;
};

type AppDataContextType = {
  arribos: Arribo[];
  agregarArribo: (items: ItemRecepcion[]) => void;

  paquetes: Paquete[];
  marcarPaqueteCargado: (paqueteId: string) => void;

  familiasPorPaquete: Record<string, Familia[]>;
  marcarAsistenciaFamilia: (paqueteId: string, familiaId: string, asistio: boolean) => void;
};

const AppDataContext = createContext<AppDataContextType | undefined>(undefined);

const PAQUETES_INICIALES: Paquete[] = [
  {
    id: 'p1',
    comunidad: 'Comunidad San José',
    horaLimite: '14:30',
    cargado: false,
    items: [
      { id: 'i1', nombre: 'Arroz (Bulto 50kg)', cantidad: '10', ubicacion: 'Bodega A - Pasillo 2' },
      { id: 'i2', nombre: 'Frijol Peruano (Costal)', cantidad: '8', ubicacion: 'Bodega A - Pasillo 3' },
      { id: 'i3', nombre: 'Aceite Vegetal (Caja 12L)', cantidad: '5', ubicacion: 'Bodega B - Pasillo 1' },
    ],
  },
  {
    id: 'p2',
    comunidad: 'Comunidad El Progreso',
    horaLimite: '16:00',
    cargado: false,
    items: [
      { id: 'i4', nombre: 'Lata de Atún', cantidad: '40', ubicacion: 'Bodega B - Pasillo 4' },
      { id: 'i5', nombre: 'Arroz (Bulto 50kg)', cantidad: '6', ubicacion: 'Bodega A - Pasillo 2' },
    ],
  },
];

const FAMILIAS_INICIALES: Record<string, Familia[]> = {
  p1: [
    { id: 'f1', nombre: 'Familia Ramírez', asistio: null },
    { id: 'f2', nombre: 'Familia Torres', asistio: null },
    { id: 'f3', nombre: 'Familia Gómez', asistio: null },
  ],
  p2: [
    { id: 'f4', nombre: 'Familia Morales', asistio: null },
    { id: 'f5', nombre: 'Familia Castillo', asistio: null },
  ],
};

export function AppDataProvider({ children }: { children: React.ReactNode }) {
  const [arribos, setArribos] = useState<Arribo[]>([]);
  const [paquetes, setPaquetes] = useState<Paquete[]>(PAQUETES_INICIALES);
  const [familiasPorPaquete, setFamiliasPorPaquete] = useState<Record<string, Familia[]>>(FAMILIAS_INICIALES);

  const agregarArribo = (items: ItemRecepcion[]) => {
    const nuevo: Arribo = {
      id: Date.now().toString(),
      fecha: new Date().toLocaleDateString(),
      hora: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      items,
    };
    setArribos((prev) => [nuevo, ...prev]);
  };

  const marcarPaqueteCargado = (paqueteId: string) => {
    setPaquetes((prev) =>
      prev.map((p) => (p.id === paqueteId ? { ...p, cargado: true } : p)),
    );
  };

  const marcarAsistenciaFamilia = (paqueteId: string, familiaId: string, asistio: boolean) => {
    setFamiliasPorPaquete((prev) => ({
      ...prev,
      [paqueteId]: (prev[paqueteId] || []).map((f) =>
        f.id === familiaId ? { ...f, asistio } : f,
      ),
    }));
  };

  return (
    <AppDataContext.Provider
      value={{
        arribos,
        agregarArribo,
        paquetes,
        marcarPaqueteCargado,
        familiasPorPaquete,
        marcarAsistenciaFamilia,
      }}>
      {children}
    </AppDataContext.Provider>
  );
}

export function useAppData() {
  const ctx = useContext(AppDataContext);
  if (!ctx) {
    throw new Error('useAppData debe usarse dentro de un AppDataProvider');
  }
  return ctx;
}
