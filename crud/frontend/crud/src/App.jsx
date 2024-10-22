// frontend/src/App.jsx
import { useState } from 'react';
import ItemList from './components/ItemList';
import ItemForm from './components/ItemForm';

const App = () => {
    const [editingItem, setEditingItem] = useState(null);
    const [refresh, setRefresh] = useState(false);

    const handleEdit = (item) => {
        setEditingItem(item);
    };

    const handleSuccess = () => {
        setEditingItem(null);
        setRefresh(!refresh); // Forçar recarregamento
    };

    const handleCancel = () => {
        setEditingItem(null);
    };

    return (
        <div className="container my-5">
            <h1 className="text-center mb-4">Aplicação CRUD com React e Node.js</h1>
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <ItemForm selectedItem={editingItem} onSuccess={handleSuccess} onCancel={handleCancel} />
                </div>
            </div>
            <hr />
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <ItemList onEdit={handleEdit} key={refresh} />
                </div>
            </div>
        </div>
    );
};

export default App;
