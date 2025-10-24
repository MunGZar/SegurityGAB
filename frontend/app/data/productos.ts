export interface Producto {
  id: number
  modelo: string
  descripcion: string
  precio: number | string
  imagen: string
}
export const USERS = [
  { id: 1, username: "admin", password: "admin123", role: "admin", name: "Administrador" },
  { id: 2, username: "usuario", password: "user123", role: "user", name: "Usuario Regular" },
];

export const productos: Producto[] = [
  {
    id: 1,
    modelo: 'HAG-PB5MP-VF-A',
    descripcion: 'Cámara tipo bala HDCVI de 5 MP con lente varifocal y audio integrado.',
    precio: "499000",
    imagen: '/images/cam1.jpg',
  },
  
  {
    id: 2,
    modelo: 'HAG-PD2MP-FC-0280',
    descripcion: 'Cámara domo HDCVI de 2 MP con lente fijo y tecnología Full Color.',

    precio: "499000",
    imagen: '/images/cam2.jpg',

  },
  {
    id: 3,
    modelo: 'HAG-T2MP-VF-LPR',
    descripcion: 'Cámara turret HDCVI de 2 MP con lente varifocal y detección de placas.',
    precio: " 499000",
    imagen: '/images/cam3.png',
  },
  {
    id: 4,
    modelo: 'HAG-D5MP-FC-Z',
    descripcion: 'Cámara domo HDCVI de 5 MP con zoom óptico, audio y tecnología Full Color.',
    precio: "499000",
    imagen: '/images/cam4.jpg',
  },
  {
    id: 5,
    modelo: 'DH-HAC-HFW1800TN-0280B',
    descripcion: 'Cámara análoga HD-CVI tipo viñeta, resolución 8 MP (4K), montaje fijo.',
    precio: "499000",
    imagen: '/images/cam5.webp',
  },
  {
    id: 6,
    modelo: 'HAC-EW2501N-0140B',
    descripcion: 'Cámara análoga HD-CVI tipo ojo de pez, resolución 5 MP, montaje fijo.',
    precio: "499000",
    imagen: '/images/cam6.jpg',
  },
  {
    id: 7,
    modelo: 'HAC-B4A21N-VF',
    descripcion: 'Cámara análoga HD-CVI tipo viñeta, resolución 2 MP (1080p), montaje vertical.',
    precio: "499000",
    imagen: '/images/cam7.png',
  },
  {
    id: 8,
    modelo: 'HAC-ME1509TQN-PV',
    descripcion: 'Cámara análoga HD-CVI tipo turret, resolución 5 MP, montaje fijo.',
    precio: "499000",
    imagen: '/images/cam8.png',
  }
]