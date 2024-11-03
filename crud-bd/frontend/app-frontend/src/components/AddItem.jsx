import { useState } from 'react';
import axios from 'axios';

const AddItem = ({ onItemAdded }) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:5000/api/items', { name, description })
            .then((response) => {
                onItemAdded(response.data);  // Adiciona o novo item ao estado do App
                setName('');
                setDescription('');
            })
            .catch((error) => console.error('Erro ao adicionar item:', error));
    };

    return (
        <div>
            <h2 className="text-center mb-3">Adicionar novo Item</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Nome do Item"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <textarea
                        className="form-control"
                        placeholder="Descrição do Item"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    ></textarea>
                </div>
                <button type="submit" className="btn btn-primary w-100">Adicionar Item</button>
            </form>
        </div>
    );
};

export default AddItem;
