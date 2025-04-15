'use client'

import 'leaflet/dist/leaflet.css'
import 'leaflet-draw/dist/leaflet.draw.css'

import dynamic from 'next/dynamic'

// Carrega o componente dinamicamente desativando SSR
const Mapa = dynamic(() => import('../components/Mapa'), {
  ssr: false,
})

export default function MapaPage() {
  return (
    <div style={{ height: '100vh', width: '100%' }}>
      <Mapa />
    </div>
  )
}
