// import { FaUbuntu, FaTwitter } from "react-icons/fa";
import { FiEdit2 } from "react-icons/fi";
import { AiFillDelete } from "react-icons/ai";
import React from "react";

export const ButtonTypeOne = (props) => {
    const tipoSimbolo = props.tipoSimbolo.toLowerCase();
    const accion = props.accion;
    return (
    <button
    className="
    relative
        border-black
        border-2
        rounded-lg
        p-2
        pb-2
        font-bold
        mt-3
        ml-2
        mr-2
    "
    onClick={accion}
    >
        {tipoSimbolo === "editar" && <FiEdit2/>}
        {tipoSimbolo === "eliminar" && <AiFillDelete/>}
    </button>
  )
}