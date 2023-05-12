import React, { useState } from 'react'

export const Form = (props) => {

  const { listaAutos, setListaAutos } = props
  const { plate, setPlate } = useState('');
  const { driverName, setDriverName } = useState('');
  const { date, setDate } = useState('');


  const handleSubmit = (event) => {
    event.preventDefault();    

    //verificar que areas se llenaron en el form 
    if([driverName,date,plate].includes('')){
      alert('Llenalos jefe')
      return 
    }

    setListaAutos([...listaAutos, {
      name:driverName,
      plate:plate,
      registerDate: date,
    } ]);
  };


  return (
    <div className='md:w-1/2'>
      <h3 className='font-bold text-3xl text-center'>Control de Parqueo</h3>
      <p className='text-lg text-center mt-4'>
        Control Vehicular
      </p>
      <form className="bg-white p-10 rounded-lg shadow-lg ml-10 mr-5 mt-2"
       onSubmit={handleSubmit}>
        <label>
          Número de Placa
        </label>
        <input
          placeholder='EJ: 5719HHP'
          className="border-2 w-full mt-2 p-1 rounded-md"
          value={plate}
          onChange={(e) => setPlate(e.target.value)}
        />
        <label>
          Nombre del Conductor
        </label>
        <input
          placeholder='EJ: Paul Landaeta'
          className="border-2 w-full mt-2 p-1 rounded-md"
          value={driverName}
          onChange={(e) => setDriverName(e.target.value)}
        />
        <label>
          Fecha
        </label>
        <input
          type='date'
          placeholder='EJ: 5719HHP'
          className="border-2 w-full mt-2 p-1 rounded-md"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />

        <input
          type="submit"
          className="bg-indigo-500
          cursor-pointer 
          uppercase 
          p-3 
          text-white 
          rounded-lg mt-5 hover:bg-indigo-700"
          value="PARQUEAR"
        />
      </form>
    </div>
  )
}
