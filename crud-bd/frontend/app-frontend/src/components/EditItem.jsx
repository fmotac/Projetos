import { useState, useEffect } from 'react';
import axios from 'axios';

const EditItem = ({ item, onItemUpdated }) => {
    const [name, setName] = useState(item.name || '');
    const [description, setDescription] = useState(item.description || '');

    useEffect(() => {
        setName(item.name);
        setDescription(item.description);
    }, [item]);

    const handleUpdate = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:5000/api/items/${item.id}`, { name, description })
            .then(() => {
                onItemUpdated({ id: item.id, name, description });
            })
            .catch((error) => console.error('Erro ao atualizar item:', error));
    };

    return (
        <div>
            <h2 className="text-center mb-3">Editar Item</h2>
            <form onSubmit={handleUpdate}>
                <div className="mb-3">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Item Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <textarea
                        className="form-control"
                        placeholder="Item Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    ></textarea>
                </div>
                <button type="submit" className="btn btn-success w-100">Atualizar Item</button>
            </form>
        </div>
    );
};

export default EditItem;
