import React from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

export const Evaluation = (props) => {
  const { evaluation } = props;
  const { ResumenGeneral, Caracteristicas } = evaluation;

  const promedio = Caracteristicas.reduce((total, caracteristica) => total + caracteristica.Nota, 0) / Caracteristicas.length;
  // const promedio = 95

  let categoria = '';
  let progressColor = '';

  if (promedio >= 90 && promedio <= 100) {
    categoria = 'Preparado para multinacionales: La persona muestra una excelente preparación y competencia para postularse a empleos en empresas multinacionales. Su CV refleja una combinación impresionante de habilidades, experiencia y conocimientos que cumplen o superan las expectativas de empleadores internacionales. Está listo para asumir roles desafiantes y adaptarse a entornos de trabajo globalizados.';
    progressColor = '#00CC00'; // Verde para promedio de 90 a 100
  } else if (promedio >= 80 && promedio < 90) {
    categoria = 'Preparado para trabajos nacionales: La persona muestra un nivel adecuado de habilidades, experiencia y conocimientos para postularse a trabajos a nivel nacional. Su CV demuestra una comprensión sólida de los requisitos y expectativas laborales, y su perfil indica que está listo para asumir responsabilidades y contribuir de manera efectiva en un entorno de trabajo nacional.';
    progressColor = '#7FFF00'; // Amarillo verdoso para promedio de 80 a 89
  } else if (promedio >= 61 && promedio < 80) {
    categoria = 'Necesita mejorar: La persona muestra algunas habilidades, experiencia y conocimientos relevantes para el trabajo, pero aún requiere mejorar en varios aspectos. Puede haber algunas deficiencias notables en su CV que pueden dificultar su capacidad para competir eficazmente por empleos.';
    progressColor = '#FFCC00'; // Amarillo para promedio de 61 a 80
  } else {
    categoria = 'No preparado para trabajos: La persona muestra una falta significativa de preparación para desempeñar un trabajo. Sus habilidades, experiencia y conocimientos son insuficientes o no cumplen con los requisitos mínimos.';
    progressColor = '#FF0000'; // Rojo para promedio menor a 61
  }

  return (
    <>
      <div className='bg-white p-4 md:p-10 rounded-lg shadow-lg mt-2'>
        <div className='flex flex-col md:flex-row items-center justify-center'>
          <div className='md:w-64 w-32'>
            <CircularProgressbar
              value={promedio}
              text={`${promedio}/100`}
              strokeWidth={10}
              styles={buildStyles({
                textColor: '#000',
                pathColor: progressColor,
                trailColor: '#d6d6d6',
              })}
            />
          </div>
          <div className='md:ml-10 mt-3'>
            <h2 className='font-semibold text-black'>{categoria}</h2>
          </div>
        </div>
      </div>
    </>
  );
};
