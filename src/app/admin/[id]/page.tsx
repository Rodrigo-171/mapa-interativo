'use client'

import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'

// Carrega o mapa com SSR desativado
const MapaDetalhado = dynamic(() => import('@/app/components/MapaDetalhado'), {
  ssr: false,
})

// Mock dos dados (poderia vir de uma API real depois)
const mockFormularios = [
  {
    id: '1',
    nomeFazenda: 'Fazenda Santa Clara',
    produtor: 'João Silva',
    localizacao: 'Uberlândia - MG',
    foto: '/fazendas/fazenda1.jpg',
    areaGeoJSON: {
      type: 'Feature',
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [-48.2861328125, -18.643205829881605],
            [-48.26690673828125, -18.660901614120156],
            [-48.23738098144531, -18.650825322492874],
            [-48.24321746826172, -18.62513522077976],
            [-48.2861328125, -18.643205829881605],
          ],
        ],
      },
      properties: {},
    },
  },
  {
    id: '2',
    nomeFazenda: 'Fazenda Boa Esperança',
    produtor: 'Maria Souza',
    localizacao: 'Patos de Minas - MG',
    foto: '/fazendas/fazenda2.jpg',
    areaGeoJSON: {
      type: 'Feature',
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [-46.51519775390625, -18.578553776584294],
            [-46.49871826171875, -18.59562594801623],
            [-46.47056579589844, -18.58203515749711],
            [-46.480865478515625, -18.559021233609747],
            [-46.51519775390625, -18.578553776584294],
          ],
        ],
      },
      properties: {},
    },
  },
]

export default function AdminDetalhesPage() {
  const { id } = useParams()
  const [fazenda, setFazenda] = useState<any>(null)

  useEffect(() => {
    const found = mockFormularios.find((f) => f.id === id)
    setFazenda(found)
  }, [id])

  if (!fazenda) return <p className="p-8">Carregando...</p>

  return (
    <div className="flex flex-col md:flex-row h-screen">
      {/* Coluna Esquerda: Dados da Fazenda */}
      <div className="md:w-1/3 p-6 bg-white shadow-md overflow-auto">
        <h1 className="text-2xl font-bold mb-4">{fazenda.nomeFazenda}</h1>
        <p className="mb-2"><strong>Produtor:</strong> {fazenda.produtor}</p>
        <p className="mb-2"><strong>Localização:</strong> {fazenda.localizacao}</p>
        <img
          src={fazenda.foto}
          alt={`Foto da ${fazenda.nomeFazenda}`}
          className="rounded-lg mt-4 w-full object-cover max-h-64"
        />
      </div>

      {/* Coluna Direita: Mapa */}
      <div className="flex-1 h-full">
        <MapaDetalhado geojson={fazenda.areaGeoJSON} />
      </div>
    </div>
  )
}
