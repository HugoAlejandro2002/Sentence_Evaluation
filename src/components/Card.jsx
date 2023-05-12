import React from 'react'
import { ButtonTypeOne } from './ButtonTypeOne';

export const Card = (props) => {

  const mensajeEditar = () => {
    alert("EDITANDO");
  };

  const mensajeEliminando = () => {
    alert("ELIMINANDO");
  };

  const { name, plate, registerDate } = props.person;


  return (
    <div className='bg-white rounded-lg p-5 mt-2 ml-5 mr-10 mb-5'>
      <p className='font-bold uppercase text-gray-600'> Conductor:
        <span className='font-normal normal-case'>{" " + name}</span>
      </p>
      <p className='font-bold uppercase text-gray-600'> placa:
        <span className='font-normal normal-case'>{" " + plate}</span>
      </p>
      <p className='font-bold uppercase text-gray-600'> Fecha:
        <span className='font-normal normal-case'>{" " + registerDate}</span>
      </p>
      <div  className="flex flex-row-reverse">
        <ButtonTypeOne 
          tipoSimbolo="editar"
          accion={mensajeEditar}
        />

        <ButtonTypeOne 
          tipoSimbolo="eliminar"
          accion={mensajeEliminando}
        />
      </div>
    </div>
  )
}
