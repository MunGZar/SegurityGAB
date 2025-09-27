export interface Producto {
  id: number
  modelo: string
  descripcion: string
  precio: string
  imagen: string
}
export const USERS = [
  { id: 1, username: "admin", password: "admin123", role: "admin", name: "Administrador" },
  { id: 2, username: "usuario", password: "user123", role: "user", name: "Usuario Regular" },
];

export const INITIAL_PRODUCTS = [
  {
    id: 1,
    name: "Cámara IP Hikvision DS-2CD2043G0-I",
    category: "camera",
    price: 299.99,
    description: "Cámara IP 4MP con visión nocturna IR hasta 30m",
    stock: 15,
    image: "/images/cam1.jpg",
  },
  {
    id: 2,
    name: "Sistema DVR 8 Canales",
    category: "dvr",
    price: 459.99,
    description: "DVR 8 canales con soporte para cámaras HD",
    stock: 8,
    image: "/images/cam2.jpg",
  },
  {
    id: 3,
    name: "Sensor de Movimiento PIR",
    category: "sensor",
    price: 45.99,
    description: "Sensor PIR inalámbrico con alcance de 12m",
    stock: 25,
    image: "/images/cam3.png",
  },
];

export const productos: Producto[] = [
  {
    id: 1,
    modelo: 'HAG-PB5MP-VF-A',
    descripcion: 'Cámara tipo bala HDCVI de 5 MP con lente varifocal y audio integrado.',
    precio: "499.000",
    imagen: '/images/cam1.jpg',
  },
  {
    id: 2,
    modelo: 'HAG-PD2MP-FC-0280',
    descripcion: 'Cámara domo HDCVI de 2 MP con lente fijo y tecnología Full Color.',
    precio: "499.000",
    imagen: 'images/cam2.jpg',
  },
  {
    id: 3,
    modelo: 'HAG-T2MP-VF-LPR',
    descripcion: 'Cámara turret HDCVI de 2 MP con lente varifocal y detección de placas.',
    precio: " 499.000",
    imagen: '/images/cam3.png',
  },
  {
    id: 4,
    modelo: 'HAG-D5MP-FC-Z',
    descripcion: 'Cámara domo HDCVI de 5 MP con zoom óptico, audio y tecnología Full Color.',
    precio: "499.000",
    imagen: '/images/cam4.jpg',
  },
]