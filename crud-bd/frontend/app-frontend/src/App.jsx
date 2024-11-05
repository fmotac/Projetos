import { useState, useEffect } from 'react';
import AddItem from './components/AddItem';
import EditItem from './components/EditItem';
import ItemList from './components/ItemList';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
    const [items, setItems] = useState([]);
    const [editingItem, setEditingItem] = useState(null);

    // Função para carregar os itens na inicialização
    const loadItems = () => {
        axios.get('http://localhost:5000/api/items')
            .then(response => setItems(response.data))
            .catch(error => console.error('Erro ao carregar itens:', error));
    };

    useEffect(() => {
        loadItems();  // Carrega os itens na montagem do componente
    }, []);


    // Função chamada após atualização de um item
    const handleItemUpdated = (updatedItem) => {
        setItems(items.map(item => (item.id === updatedItem.id ? updatedItem : item)));
        setEditingItem(null);
    };

    // Função chamada após adição de um item
    const handleItemAdded = (item) => {
        setItems([...items, item]);  // Adiciona o novo item na lista
    };   



    // Função chamada após exclusão de um item
    const handleItemDeleted = (deletedItemId) => {
        setItems(items.filter(item => item.id !== deletedItemId));
    };

    return (
        <div className="container d-flex flex-column align-items-center mt-5">
            <h1 className="text-center mb-4">Aplicação React - CRUD</h1>
            <div className="card p-4 mb-4 w-75">
                {editingItem ? (
                    <EditItem item={editingItem} onItemUpdated={handleItemUpdated} />
                ) : (
                    <AddItem onItemAdded={handleItemAdded} />
                )}
            </div>
            <div className="w-100">
                <ItemList items={items} onEditItem={setEditingItem} onDeleteItem={handleItemDeleted} />
            </div>
        </div>
    );
};

export default App;
