import React from 'react'
import { Card } from './Card'

export const Cars = (props) => {

  const { listaAutos } = props;

  return (
    <div className='md:w-1/2 overflow-y-scroll'>
      <h3 className="font-bold text-3xl text-center"> Lista de Autos </h3>
      <p className="text-lg text-center mt-4">Autos Registrado</p>
      {listaAutos.map((driver) => (
        <Card person={driver} key={driver.plate} />
      ))}
    </div>
  )
}
