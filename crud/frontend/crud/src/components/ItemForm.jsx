// frontend/src/components/ItemForm.jsx
import React, { useState, useEffect } from 'react';
import api from '../services/api';

const ItemForm = ({ selectedItem, onSuccess, onCancel }) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    useEffect(() => {
        if (selectedItem) {
            setName(selectedItem.name);
            setDescription(selectedItem.description);
        } else {
            setName('');
            setDescription('');
        }
    }, [selectedItem]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (selectedItem) {
                // Atualizar item
                await api.put(`/items/${selectedItem.id}`, { name, description });
            } else {
                // Criar novo item
                await api.post('/items', { name, description });
            }
            onSuccess();
        } catch (error) {
            console.error('Erro ao salvar item:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="p-4 border rounded bg-light">
            <h2 className="mb-3">{selectedItem ? 'Editar Item' : 'Adicionar Novo Item'}</h2>
            <div className="mb-3">
                <label htmlFor="name" className="form-label">Nome:</label>
                <input
                    type="text"
                    id="name"
                    className="form-control"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    required
                />
            </div>
            <div className="mb-3">
                <label htmlFor="description" className="form-label">Descrição:</label>
                <textarea
                    id="description"
                    className="form-control"
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                    required
                    rows="3"
                ></textarea>
            </div>
            <div className="d-flex justify-content-between">
                <button type="submit" className="btn btn-primary">
                    {selectedItem ? 'Atualizar' : 'Adicionar'}
                </button>
                {selectedItem && (
                    <button type="button" className="btn btn-secondary" onClick={onCancel}>
                        Cancelar
                    </button>
                )}
            </div>
        </form>
    );
};

export default ItemForm;
