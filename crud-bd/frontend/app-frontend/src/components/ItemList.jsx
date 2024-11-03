import React from 'react';
import axios from 'axios';

const ItemList = ({ items, onEditItem, onDeleteItem }) => {

    const deleteItem = (id) => {
        axios.delete(`http://localhost:5000/api/items/${id}`)
            .then(() => {
                onDeleteItem(id);  // Remove o item do estado do App
            })
            .catch((error) => console.error('Erro ao deletar item:', error));
    };

    return (
        <div className="container">
            <h2 className="text-center mb-3">Lista de Itens</h2>
            <ul className="list-group">
                {items.map(item => (
                    <li key={item.id} className="list-group-item d-flex justify-content-between align-items-center">
                        <div>
                            <h5>{item.name}</h5>
                            <p>{item.description}</p>
                        </div>
                        <div>
                            <button className="btn btn-warning btn-sm me-2" onClick={() => onEditItem(item)}>Editar</button>
                            <button className="btn btn-danger btn-sm" onClick={() => deleteItem(item.id)}>Excluir</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ItemList;

