"use client";

import React from 'react';

interface FilterSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  cameraTypeFilter: string;
  setCameraTypeFilter: (type: string) => void;
  resolutionFilter: string;
  setResolutionFilter: (resolution: string) => void;
}

const cameraTypes = ['', 'Bala', 'Domo', 'Turret', 'Ojo de Pez'];
const resolutions = ['', '2 MP', '5 MP', '8 MP'];

export default function FilterSidebar({
  isOpen,
  onClose,
  cameraTypeFilter,
  setCameraTypeFilter,
  resolutionFilter,
  setResolutionFilter,
}: FilterSidebarProps) {
  return (
    <div
      className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
      style={{ zIndex: 1000 }}
    >
      <div className="p-4">
        <button onClick={onClose} className="text-gray-600 hover:text-gray-900 float-right">
          X
        </button>
        <h2 className="text-xl font-bold mb-4">Filtros</h2>

        <div className="mb-4">
          <label htmlFor="cameraType" className="block text-sm font-medium text-gray-700 mb-1">
            Tipo de Cámara
          </label>
          <select
            id="cameraType"
            value={cameraTypeFilter}
            onChange={(e) => setCameraTypeFilter(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
          >
            {cameraTypes.map((type) => (
              <option key={type} value={type}>
                {type === '' ? 'Todos' : type}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label htmlFor="resolution" className="block text-sm font-medium text-gray-700 mb-1">
            Resolución
          </label>
          <select
            id="resolution"
            value={resolutionFilter}
            onChange={(e) => setResolutionFilter(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
          >
            {resolutions.map((res) => (
              <option key={res} value={res}>
                {res === '' ? 'Todas' : res}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
