export type ReservationStatus = 'confirmada' | 'pendiente' | 'cancelada'

export type Reservation = {
  id: string
  nombre: string
  hora: string
  personas: number
  estado: ReservationStatus
  nota: string
}

export const reservations: Reservation[] = [
  {
    id: 'r1',
    nombre: 'María Fernanda Quispe',
    hora: '08:30',
    personas: 2,
    estado: 'confirmada',
    nota: 'Mesa junto a la ventana',
  },
  {
    id: 'r2',
    nombre: 'Diego Alonso Vargas',
    hora: '09:15',
    personas: 4,
    estado: 'pendiente',
    nota: 'Reunión de trabajo',
  },
  {
    id: 'r3',
    nombre: 'Lucía Camacho Ríos',
    hora: '10:00',
    personas: 3,
    estado: 'confirmada',
    nota: 'Cumpleaños, traer vela',
  },
  {
    id: 'r4',
    nombre: 'Sebastián Núñez',
    hora: '11:30',
    personas: 6,
    estado: 'pendiente',
    nota: 'Requiere mesa larga',
  },
  {
    id: 'r5',
    nombre: 'Valeria Loayza Mendoza',
    hora: '13:00',
    personas: 2,
    estado: 'cancelada',
    nota: 'Canceló por viaje',
  },
  {
    id: 'r6',
    nombre: 'Joaquín Herrera Salas',
    hora: '15:45',
    personas: 5,
    estado: 'confirmada',
    nota: 'Cata de café de origen',
  },
  {
    id: 'r7',
    nombre: 'Antonella Bustamante',
    hora: '17:20',
    personas: 2,
    estado: 'pendiente',
    nota: 'Prefiere terraza',
  },
  {
    id: 'r8',
    nombre: 'Rodrigo Palacios Chávez',
    hora: '19:00',
    personas: 8,
    estado: 'confirmada',
    nota: 'Cena de equipo, factura',
  },
]

export const weeklyRevenue = [
  { dia: 'Lun', label: 'Lunes', monto: 890 },
  { dia: 'Mar', label: 'Martes', monto: 1120 },
  { dia: 'Mié', label: 'Miércoles', monto: 980 },
  { dia: 'Jue', label: 'Jueves', monto: 1340 },
  { dia: 'Vie', label: 'Viernes', monto: 1780 },
  { dia: 'Sáb', label: 'Sábado', monto: 2150 },
  { dia: 'Dom', label: 'Domingo', monto: 1240 },
]

export type OrderStatus = 'preparando' | 'listo' | 'entregado'

export type Order = {
  id: string
  codigo: string
  cliente: string
  productos: string
  total: number
  estado: OrderStatus
  minutos: number
}

export const orders: Order[] = [
  {
    id: 'o1',
    codigo: '#1042',
    cliente: 'Camila Rojas',
    productos: '2 Cappuccino Dorado · 1 Cheesecake',
    total: 46.5,
    estado: 'preparando',
    minutos: 2,
  },
  {
    id: 'o2',
    codigo: '#1041',
    cliente: 'Andrés Villalobos',
    productos: '1 Espresso Aurora · 1 Croissant de almendras',
    total: 24,
    estado: 'listo',
    minutos: 6,
  },
  {
    id: 'o3',
    codigo: '#1040',
    cliente: 'Fiorella Zapata',
    productos: '3 Latte Lavanda',
    total: 58.5,
    estado: 'preparando',
    minutos: 11,
  },
  {
    id: 'o4',
    codigo: '#1039',
    cliente: 'Martín Escobar',
    productos: '1 Frappé Caramelo · 1 Sándwich de pavo',
    total: 39,
    estado: 'entregado',
    minutos: 18,
  },
  {
    id: 'o5',
    codigo: '#1038',
    cliente: 'Renata Ibáñez',
    productos: '2 Espresso Aurora · 1 Alfajor artesanal',
    total: 31,
    estado: 'entregado',
    minutos: 27,
  },
]

export const topProducts = [
  { nombre: 'Espresso Aurora', unidades: 68, ingreso: 748 },
  { nombre: 'Cappuccino Dorado', unidades: 54, ingreso: 702 },
  { nombre: 'Latte Lavanda', unidades: 41, ingreso: 615 },
  { nombre: 'Frappé Caramelo', unidades: 33, ingreso: 561 },
  { nombre: 'Cheesecake', unidades: 22, ingreso: 418 },
]

export type ActivityKind = 'reserva' | 'pedido' | 'cliente' | 'menu'

export type ActivityItem = {
  id: string
  kind: ActivityKind
  titulo: string
  detalle: string
  hace: string
}

export const activity: ActivityItem[] = [
  {
    id: 'a1',
    kind: 'reserva',
    titulo: 'Nueva reserva',
    detalle: 'Rodrigo Palacios · 8 personas · 19:00',
    hace: 'hace 5 min',
  },
  {
    id: 'a2',
    kind: 'pedido',
    titulo: 'Pedido completado',
    detalle: 'Pedido #1039 entregado · S/.39.00',
    hace: 'hace 12 min',
  },
  {
    id: 'a3',
    kind: 'cliente',
    titulo: 'Cliente nuevo',
    detalle: 'Renata Ibáñez se registró en el programa Aurora',
    hace: 'hace 24 min',
  },
  {
    id: 'a4',
    kind: 'menu',
    titulo: 'Menú actualizado',
    detalle: 'Latte Lavanda subió a S/.19.50',
    hace: 'hace 48 min',
  },
  {
    id: 'a5',
    kind: 'reserva',
    titulo: 'Reserva cancelada',
    detalle: 'Valeria Loayza · 2 personas · 13:00',
    hace: 'hace 1 h',
  },
  {
    id: 'a6',
    kind: 'pedido',
    titulo: 'Pedido completado',
    detalle: 'Pedido #1038 entregado · S/.31.00',
    hace: 'hace 1 h 20 min',
  },
]

