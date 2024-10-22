// frontend/src/components/Item.jsx
import React from 'react';

const Item = ({ item, onEdit, onDelete }) => {
    return (
        <li className="list-group-item d-flex justify-content-between align-items-center">
            <div>
                <h5 className="mb-1">{item.name}</h5>
                <p className="mb-1">{item.description}</p>
            </div>
            <div>
                <button className="btn btn-sm btn-warning me-2" onClick={() => onEdit(item)}>
                    Editar
                </button>
                <button className="btn btn-sm btn-danger" onClick={() => onDelete(item.id)}>
                    Deletar
                </button>
            </div>
        </li>
    );
};

export default Item;
