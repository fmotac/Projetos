// frontend/src/components/ItemList.jsx
import React, { useEffect, useState } from 'react';
import api from '../services/api';
import Item from './Item';

const ItemList = ({ onEdit }) => {
    const [items, setItems] = useState([]);

    const fetchItems = async () => {
        try {
            const response = await api.get('/items');
            setItems(response.data);
        } catch (error) {
            console.error('Erro ao buscar itens:', error);
        }
    };

    useEffect(() => {
        fetchItems();
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm('Tem certeza que deseja deletar este item?')) {
            try {
                await api.delete(`/items/${id}`);
                setItems(items.filter(item => item.id !== id));
            } catch (error) {
                console.error('Erro ao deletar item:', error);
            }
        }
    };

    return (
        <div className="mt-4">
            <h2 className="text-center mb-3">Lista de Itens</h2>
            {items.length === 0 ? (
                <p className="text-center">Nenhum item encontrado.</p>
            ) : (
                <ul className="list-group">
                    {items.map(item => (
                        <Item key={item.id} item={item} onEdit={onEdit} onDelete={handleDelete} />
                    ))}
                </ul>
            )}
        </div>
    );
};

export default ItemList;
