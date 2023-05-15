import React, { useState } from "react";
import axios from "axios";

export default function ChatGPT() {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const handleSubmit = async (e) => {
    e.preventDefault();

    const API_URL = "https://api.openai.com/v1/completions";
    const API_KEY = import.meta.env.VITE_OPENAI_API_KEY;
    try {
      const res = await axios.post(
        API_URL,
        {
          prompt: `Actua como un sistema ATS: \n\nUna oración sigue la siguiente estructura acción(verbo)--mediante-->palabras de industria-->resultados\nEjemplo: Incrementé la base de datos de nuevos clientes en un 25% mediante un crawler de extracción de datos automatizado por Python.\n\nRecuerda que para una buena oración de CV tiene las siguientes características:\nA) Verbos (acciones)\nB) Herramientas y palabras de industrias\nC) Impacto\nD) Prestigio de la empresa\nE) Habilidades blandas demostradas\nF) Estructura de las oraciones\n\nRúbrica para la característica A):\n-La oración es mala si no empieza con un verbo o usa verbos débiles (ejemplos: participé, encargado de, gracias). Le quitas 70-100 puntos.\n-Es una oración de nivel medio si empieza con un verbo, usa verbos moderados(logré, utilicé, participé), no están siempre en primera persona. Le quitas 40-70 puntos. \n-Es una oración buena si empieza con un verbo, usa verbos fuertes en pasado y primera persona (entrené, construí), mucho mejor si son verbos de listas de Career Services de Harvard. \n\nRúbrica para la característica B):\n- La oración es mala si no menciona herramientas, software o palabras clave de la industria. Le quitas 70-100 puntos.\n- Es una oración de nivel medio si menciona algunas herramientas o palabras clave de la industria, pero de forma limitada. Le quitas 40-70 puntos.\n- Es una oración buena si demuestra el uso de herramientas, software o conocimientos de palabras clave de la industria\n\nRúbrica para la característica C):\n- La oración es mala si no muestra resultados numéricos (%,$,#). Le quitas 70-100 puntos.\n- Es una oración de nivel medio si muestra algunos resultados numéricos, pero de forma limitada. Le quitas 40-70 puntos.\n- Es una oración buena si muestra resultados numéricos (%,$,#) de equipos, empleados, cargos importantes, etc.\n\nRúbrica para la característica D):\n- La oración es mala si no menciona el nombre o el tamaño de la empresa. Le quitas 70-100 puntos.\n- Es una oración de nivel medio si menciona el nombre de la empresa, pero no su tamaño o importancia. Le quitas 40-70 puntos.\n- Es una oración buena si muestra el tamaño e importancia de la empresa si no es F500 (ej: Empresa X - Private company in the fuel management sector: 60% global market share, $80m yearly net income, 270 employees, presence in 120+ countries)\n\nRúbrica para la característica E):\n- La oración es mala si no valida habilidades blandas. Le quitas 70-100 puntos.\n- Es una oración de nivel medio si valida algunas habilidades blandas de forma limitada. Le quitas 40-70 puntos.\n- Es una oración buena si valida habilidades como pensamiento creativo, resolución de problemas o las top 20 habilidades blandas más buscadas\n\nRúbrica para la característica F):\n- La oración es mala si es difícil de entender, no concisa, da vueltas, lenguaje inapropiado para un ATS. No sigue la estructura acción(verbo)--mediante-->palabras de industria-->resultados. Le quitas 70-100 puntos.\n- Es una oración de nivel medio si es moderadamente clara y concisa, pero podría mejorarse. Le quitas 40-70 puntos.\n- Es una oración buena si es clara y concisa, facil de entender, sin dar vueltas y utiliza un lenguaje apto para un ATS\n\nComo ATS  lee el siguiente texto desde << hasta >>:\n\n<<${prompt}>>\n\nCalifica todo el texto /100 por cada caraterística y agrega sugerencías de mejora:\n`,
          max_tokens: 450,
          model: 'text-davinci-003',
          temperature: 0.7,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${API_KEY}`,
          },
        }
      );
      await delay(1000);
      setResponse(res.data.choices[0].text.trim());
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="bg-white p-10 rounded-lg shadow-lg ml-10 mr-5 mt-2">
      {" "}
      <h1 className="font-bold text-3xl text-center">ChatGPT API</h1>
      <form className="bg-white p-10 rounded-lg shadow-lg ml-10 mr-5 mt-2" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="">Oracion a Evaluar </label>
          <input
            className="border-2 w-full mt-2 p-1 rounded-md"
            type="text"
            placeholder="Enter your sentence"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />
        </div>{" "}
        <button className="bg-indigo-500
          cursor-pointer 
          uppercase 
          p-3 
          text-white 
          rounded-lg mt-5 hover:bg-indigo-700" type="submit">
          Evaluar
        </button>
      </form>
      <div className="bg-white p-10 rounded-lg shadow-lg ml-10 mr-5 mt-2">
        <p className="text-light">
          {response ? response : "Ask me anything..."}
        </p>
      </div>
    </div>
  );
}
