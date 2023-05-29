import React, { useState } from "react";
import axios from "axios";
import { Evaluation } from "./Evaluation";

export default function ChatGPT() {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [finResponse, setFinResponse] = useState(false);
  const [evaluation, setEvaluation] = useState({
    ResumenGeneral: "",
    Caracteristicas: [
      {
        Titulo: "Verbos (acciones)",
        Nota: 0,
        Consejo: ""
      },
      {
        Titulo: "Herramientas y palabras de industrias",
        Nota: 0,
        Consejo: ""
      },
      {
        Titulo: "Impacto",
        Nota: 0,
        Consejo: ""
      },
      {
        Titulo: "Habilidades blandas demostradas",
        Nota: 0,
        Consejo: ""
      },
      {
        Titulo: "Estructura de las oraciones",
        Nota: 0,
        Consejo: ""
      }
    ]
  });

  const API_URL = "https://api.openai.com/v1/completions";
  const API_KEY = import.meta.env.VITE_OPENAI_API_KEY;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await axios.post(
        API_URL,
        {
          prompt: `Actua como un sistema ATS: \n\nUna oración sigue la siguiente estructura acción(verbo)--mediante-->palabras de industria-->resultados\nEjemplo: Incrementé la base de datos de nuevos clientes en un 25% mediante un crawler de extracción de datos automatizado por Python.\n\nRecuerda que para una buena oración de CV tiene las siguientes características:\nA) Verbos (acciones)\nB) Herramientas y palabras de industrias\nC) Impacto\nD) Habilidades blandas demostradas\nE) Estructura de las oraciones\n\nRúbrica para la característica A):\n-La oración es mala si no empieza con un verbo o usa verbos débiles (ejemplos: participé, encargado de, gracias). Le quitas 70-100 puntos.\n-Es una oración de nivel medio si empieza con un verbo, usa verbos moderados(logré, utilicé, participé), no están siempre en primera persona. Le quitas 40-70 puntos. \n-Es una oración buena si empieza con un verbo, usa verbos fuertes en pasado y primera persona (entrené, construí), mucho mejor si son verbos de listas de Career Services de Harvard. \n\nRúbrica para la característica B):\n- La oración es mala si no menciona herramientas, software o palabras clave de la industria. Le quitas 70-100 puntos.\n- Es una oración de nivel medio si menciona algunas herramientas o palabras clave de la industria, pero de forma limitada. Le quitas 40-70 puntos.\n- Es una oración buena si demuestra el uso de herramientas, software o conocimientos de palabras clave de la industria\n\nRúbrica para la característica C):\n- La oración es mala si no muestra resultados numéricos (%,$,#). Le quitas 70-100 puntos.\n- Es una oración de nivel medio si muestra algunos resultados numéricos, pero de forma limitada. Le quitas 40-70 puntos.\n- Es una oración buena si muestra resultados numéricos (%,$,#) de equipos, empleados, cargos importantes, etc.\n\nRúbrica para la característica D):\n- La oración es mala si no valida habilidades blandas. Le quitas 70-100 puntos.\n- Es una oración de nivel medio si valida algunas habilidades blandas de forma limitada. Le quitas 40-70 puntos.\n- Es una oración buena si valida habilidades como pensamiento creativo, resolución de problemas o las top 20 habilidades blandas más buscadas\n\nRúbrica para la característica E):\n- La oración es mala si es difícil de entender, no concisa, da vueltas, lenguaje inapropiado para un ATS. No sigue la estructura acción(verbo)--mediante-->palabras de industria-->resultados. Le quitas 70-100 puntos.\n- Es una oración de nivel medio si es moderadamente clara y concisa, pero podría mejorarse. Le quitas 40-70 puntos.\n- Es una oración buena si es clara y concisa, facil de entender, sin dar vueltas y utiliza un lenguaje apto para un ATS\n\nComo ATS  lee el siguiente texto desde << hasta >>:\n\n<<${prompt}>>\n\nCalifica todo el texto /100 por cada caraterística y agrega sugerencías de mejora(Los consejos ser deben lo más detallados en una oración clara y simple con buena ortografía). Finalmente agrega un resumen general que indique si es una buena oración:\n`,
          max_tokens: 550,
          model: "text-davinci-003",
          temperature: 0.7
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${API_KEY}`
          }
        }
      );
      await delay(1000);
      const responseText = res.data.choices[0].text.trim().replace(/\n\n/g, "\n");
      setResponse(responseText);
      console.log(responseText); // Asegúrate de imprimir el texto aquí

      const resJSON = await axios.post(
        API_URL,
        {
          prompt: `Actua como un parser de texto a JSON\n\nEl JSON debe seguir la siguiente estructura\n\n{\n  "ResumenGeneral": "",\n  "Caracteristicas": [\n    {\n      "Titulo": "Verbos (acciones)",\n      "Nota": ,\n      "Consejo": ""\n    },\n    {\n      "Titulo": "Herramientas y palabras de industrias",\n      "Nota": ,\n      "Consejo": ""\n    },\n    {\n      "Titulo": "Impacto",\n      "Nota": ,\n      "Consejo": ""\n    },\n    {\n      "Titulo": "Habilidades blandas demostradas",\n      "Nota": ,\n      "Consejo": ""\n    },\n    {\n      "Titulo": "Estructura de las oraciones",\n      "Nota": ,\n      "Consejo": ""\n    }\n  ]\n}\n\nPasa el siguiente texto a un JSON basandote en la estructura de arriba. Acomoda la informacion del texto donde corresponda:\n\n<<${responseText}>>\n\nEl JSON es:`,
          max_tokens: 1500,
          model: "text-davinci-003",
          temperature: 1
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${API_KEY}`
          }
        }
      );
      const responseJSON = resJSON.data.choices[0].text.trim();
      const parsedEvaluation = JSON.parse(responseJSON);
      console.log(parsedEvaluation)
      setEvaluation(parsedEvaluation);
      setFinResponse(true);

    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }


  };

  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  return (
    <div className="bg-white p-4 md:p-10 rounded-lg shadow-lg ml-10 mr-5 mt-2">
      
      <form className="bg-white p-4 md:p-10 rounded-lg shadow-lg mt-2" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="">Oración a Evaluar</label>
          <input
            className="border-2 w-full mt-2 p-1 rounded-md whitespace-normal break-words"
            type="text"
            placeholder="Ingresa tu Oración"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />
        </div>
        <button
          className={`bg-indigo-500 cursor-pointer uppercase p-3 text-white rounded-lg mt-5 hover:bg-indigo-700 ${isLoading || prompt.trim().length === 0 ? "opacity-50 pointer-events-none cursor-not-allowed" : ""
            }`}
          type="submit"
          disabled={isLoading || prompt.trim().length === 0}
        >
          Evaluar
        </button>
      </form>

      {(finResponse && !isLoading) && <Evaluation evaluation={evaluation} />}

      <div className="bg-white p-4 md:p-10 rounded-lg shadow-lg mt-2">
        {isLoading ? (
          <p className="text-light">Cargando...</p>
        ) : (
          <>
            {(finResponse && !isLoading) &&  <h2 className="text-3xl text-center mb-5" >Consejos:</h2>}
            <p className="text-light whitespace-pre-line">
              {response ? response : "Aquí va tu evaluación"}
            </p>
          </>
        )}
      </div>
    </div>
  );
}
