import React from 'react'

export const Evaluation = (props) => {
  const { evaluation } = props;
  const { ResumenGeneral, Caracteristicas } = evaluation;

  const promedio = Caracteristicas.reduce((total, caracteristica) => total + caracteristica.Nota, 0) / Caracteristicas.length
  let categoria = '';
  let categoriaColor = '';

  if (promedio >= 90 && promedio <= 100) {
    categoria = 'Preparado para multinacionales: La persona muestra una excelente preparación y competencia para postularse a empleos en empresas multinacionales. Su CV refleja una combinación impresionante de habilidades, experiencia y conocimientos que cumplen o superan las expectativas de empleadores internacionales. Está listo para asumir roles desafiantes y adaptarse a entornos de trabajo globalizados.';
    categoriaColor = 'text-green-500'; // Color verde para categoría "Preparado para multinacionales"
  } else if (promedio >= 80 && promedio < 90) {
    categoria = ' Preparado para trabajos nacionales: La persona muestra un nivel adecuado de habilidades, experiencia y conocimientos para postularse a trabajos a nivel nacional. Su CV demuestra una comprensión sólida de los requisitos y expectativas laborales, y su perfil indica que está listo para asumir responsabilidades y contribuir de manera efectiva en un entorno de trabajo nacional.s';
    categoriaColor = 'text-blue-500'; // Color azul para categoría "Preparado para trabajos nacionales"
  } else if (promedio >= 61 && promedio < 80) {
    categoria = 'Necesita mejorar: La persona muestra algunas habilidades, experiencia y conocimientos relevantes para el trabajo, pero aún requiere mejorar en varios aspectos. Puede haber algunas deficiencias notables en su CV que pueden dificultar su capacidad para competir eficazmente por empleos.';
    categoriaColor = 'text-yellow-500'; // Color amarillo para categoría "Un poco mejor"
  } else {
    categoria = 'No preparado para trabajos: La persona muestra una falta significativa de preparación para desempeñar un trabajo. Sus habilidades, experiencia y conocimientos son insuficientes o no cumplen con los requisitos mínimos.';
    categoriaColor = 'text-blue-500'; // Color rojo para categoría "No preparado para trabajos"
  }

  return (
    <>
      <div className='bg-white p-4 md:p-10 rounded-lg shadow-lg ml-10 mr-5 mt-2'>
        <h1 className="font-bold text-3xl text-center">Nota: {promedio}/100</h1>
        <h3 className={`font-bold text-center ${categoriaColor} mt-3`}>{categoria}</h3>
      </div>
    </>
  )
}
