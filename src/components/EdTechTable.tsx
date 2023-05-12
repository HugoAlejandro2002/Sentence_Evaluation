import React from 'react';
import { useState } from 'react';

const EdTechTable = () => {
    // Estado para almacenar la información de la tabla
    const [tableData, setTableData] = useState([
        { id: 1, name: 'John Doe', email: 'johndoe@example.com', status: 'Active' },
        { id: 2, name: 'Jane Smith', email: 'janesmith@example.com', status: 'Inactive' },
        { id: 3, name: 'Bob Johnson', email: 'bobjohnson@example.com', status: 'Active' },
        { id: 4, name: 'Sarah Lee', email: 'sarahlee@example.com', status: 'Active' },
    ]);

    // Estado para almacenar la columna actualmente ordenada
    const [sortedColumn, setSortedColumn] = useState('');

    // Función para ordenar la tabla según la columna indicada
    const sortTable = (column) => {
        if (column === sortedColumn) {
            // Si la columna ya está ordenada, invertimos el orden
            setTableData((prevData) => [...prevData].reverse());
        } else {
            // Si la columna no está ordenada, la ordenamos ascendente
            setTableData((prevData) => [...prevData].sort((a, b) => a[column].localeCompare(b[column])));
            setSortedColumn(column);
        }
    };

    // Función para cambiar el estado de una fila
    const toggleRowStatus = (id) => {
        setTableData((prevData) =>
            prevData.map((row) => {
                if (row.id === id) {
                    return {
                        ...row,
                        status: row.status === 'Active' ? 'Inactive' : 'Active',
                    };
                } else {
                    return row;
                }
            })
        );
    };

    return (
        <div className="container mx-auto my-4">
            <table className="table-auto border border-gray-400">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="px-4 py-2 font-medium text-gray-700">ID</th>
                        <th className="px-4 py-2 font-medium text-gray-700 cursor-pointer" onClick={() => sortTable('name')}>
                            Name {sortedColumn === 'name' && <span className="ml-1">{tableData[0].name > tableData[tableData.length - 1].name ? '▼' : '▲'}</span>}
                        </th>
                        <th className="px-4 py-2 font-medium text-gray-700">Email</th>
                        <th className="px-4 py-2 font-medium text-gray-700 cursor-pointer" onClick={() => sortTable('status')}>
                            Status {sortedColumn === 'status' && <span className="ml-1">{tableData[0].status > tableData[tableData.length - 1].status ? '▼' : '▲'}</span>}
                        </th>
                        <th className="px-4 py-2 font-medium text-gray-700">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {tableData.map((row) => (
                        <tr key={row.id} className="border-b border-gray-400">
                            <td className="px-4 py-2 text-gray-700">{row.id}</td>
                            <td className="px-4 py-2 text-gray-700">{row.name}</td>
                            <td className="px-4 py-2 text-gray-700">{row.email}</td>
                            <td className="px-4 py-2 text-gray-700">{row.status}</td>
                            <td className="px-4 py-2">
                                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded mr-2" onClick={() => toggleRowStatus(row.id)}>
                                    {row.status === 'Active' ? 'Deactivate' : 'Activate'}
                                </button>
                                <button className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-2 rounded mr-2">
                                    Edit
                                </button>
                                <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded">
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default EdTechTable;
