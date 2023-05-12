import React, { useState, useEffect } from "react";
import openai from "openai";


const Content = () => {
  const [oracion, setOracion] = useState("");
  const [oracionEvaluada, setOracionEvaluada] = useState("");

  useEffect(() => {
    const ai = async () => {
      const response = await openai.completions.create(
        {
          prompt,
          temperature,
          max_tokens: 450,
        }
      );
      return response.choices[0].text.trim();
    };

    setOracionEvaluada(ai(oracion));
  }, [oracion]);


  const handleSubmit = (event) => {
    event.preventDefault();    

    
  };


  return (
    <div className='mt-10 md:flex'>
      <div className='md:w-1/2 bg-gray-400'>
        <h3 className='font-bold text-3xl text-center'>Escribe tu Oracion de CV </h3>
        <form className="bg-white p-10 rounded-lg shadow-lg ml-10 mr-5 mt-2"
          onSubmit={handleSubmit}>
          <label>
            Tu oración va acá
          </label>
          <input
            placeholder=''
            className="border-2 w-full mt-2 p-1 rounded-md"
            value={oracion}
            onChange={(e) => setOracion(e.target.value)}
          />

          <input
            type="submit"
            className="bg-indigo-500
          cursor-pointer 
          uppercase 
          p-3 
          text-white 
          rounded-lg mt-5 hover:bg-indigo-700"
            value="EVALUAR"
          />
        </form>
      </div>
      <div className='md:w-1/2 bg-slate-400'>
        {oracionEvaluada}
      </div>

    </div>
  )
}

export default Content;
