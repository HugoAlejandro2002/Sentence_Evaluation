import React from 'react'

export const Evaluation = (props) => {
  const { evaluation } = props;
  const { NotaGeneral,Caracteristicas } = evaluation;
  const { Consejo, Puntuacion } = NotaGeneral;

  return (
    <>
      <div className='bg-white p-4 md:p-10 rounded-lg shadow-lg ml-10 mr-5 mt-2'>
        <h1 className="font-bold text-3xl text-center">Nota: {Puntuacion}/100</h1>
        <h2 className="font-bold text-center">{Consejo}</h2>
      </div>

    </>
  )
}
