// src/app/admin/page.tsx

'use client'

import Link from 'next/link'

const mockFormularios = [
  {
    id: '1',
    nomeFazenda: 'Fazenda Santa Clara',
    produtor: 'João Silva',
    localizacao: 'Uberlândia - MG',
    foto: '/fazendas/fazenda1.jpg',
  },
  {
    id: '2',
    nomeFazenda: 'Fazenda Boa Esperança',
    produtor: 'Maria Souza',
    localizacao: 'Patos de Minas - MG',
    foto: '/fazendas/fazenda2.jpg',
  },
]

export default function AdminPage() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Painel Administrativo</h1>

      <div className="space-y-4">
        {mockFormularios.map((form) => (
          <div
            key={form.id}
            className="border p-4 rounded-lg shadow-sm flex items-center justify-between bg-white"
          >
            <div>
              <h2 className="text-lg font-semibold">{form.nomeFazenda}</h2>
              <p className="text-sm text-gray-600">Produtor: {form.produtor}</p>
              <p className="text-sm text-gray-600">Local: {form.localizacao}</p>
            </div>

            <Link
              href={`/admin/${form.id}`}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Ver detalhes
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}
