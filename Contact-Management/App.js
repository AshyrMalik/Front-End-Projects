import React, { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Dialog } from 'primereact/dialog';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

function App() {
    const [contacts, setContacts] = useState([]);
    const [contact, setContact] = useState({ name: '', email: '', phone: '' });
    const [editDialog, setEditDialog] = useState(false);
    const [selectedContact, setSelectedContact] = useState(null);

    const handleInputChange = (e) => {
        setContact({ ...contact, [e.target.name]: e.target.value });
    };

    const addContact = () => {
        if (contact.name && contact.email && contact.phone) {
            setContacts([...contacts, { ...contact, id: Math.random() }]);
            setContact({ name: '', email: '', phone: '' });
        }
    };

    const deleteContact = (contactId) => {
        setContacts(contacts.filter((c) => c.id !== contactId));
    };

    const openEditDialog = (contact) => {
        setSelectedContact(contact);
        setContact(contact);
        setEditDialog(true);
    };

    const saveEdit = () => {
        setContacts(
            contacts.map((c) => (c.id === selectedContact.id ? contact : c))
        );
        setEditDialog(false);
        setContact({ name: '', email: '', phone: '' });
    };

    return (
        <div className="container">
            <h1>Contact Management</h1>
            <div className="form">
                <InputText
                    placeholder="Name"
                    name="name"
                    value={contact.name}
                    onChange={handleInputChange}
                />
                <InputText
                    placeholder="Email"
                    name="email"
                    value={contact.email}
                    onChange={handleInputChange}
                />
                <InputText
                    placeholder="Phone"
                    name="phone"
                    value={contact.phone}
                    onChange={handleInputChange}
                />
                <Button label="Add Contact" icon="pi pi-plus" onClick={addContact} />
            </div>

            <DataTable value={contacts} paginator rows={5}>
                <Column field="name" header="Name" />
                <Column field="email" header="Email" />
                <Column field="phone" header="Phone" />
                <Column
                    body={(rowData) => (
                        <>
                            <Button
                                icon="pi pi-pencil"
                                className="p-button-rounded p-button-warning"
                                onClick={() => openEditDialog(rowData)}
                            />
                            <Button
                                icon="pi pi-trash"
                                className="p-button-rounded p-button-danger"
                                onClick={() => deleteContact(rowData.id)}
                            />
                        </>
                    )}
                    header="Actions"
                />
            </DataTable>

            <Dialog
                visible={editDialog}
                header="Edit Contact"
                onHide={() => setEditDialog(false)}
            >
                <div className="form">
                    <InputText
                        placeholder="Name"
                        name="name"
                        value={contact.name}
                        onChange={handleInputChange}
                    />
                    <InputText
                        placeholder="Email"
                        name="email"
                        value={contact.email}
                        onChange={handleInputChange}
                    />
                    <InputText
                        placeholder="Phone"
                        name="phone"
                        value={contact.phone}
                        onChange={handleInputChange}
                    />
                    <Button label="Save" icon="pi pi-save" onClick={saveEdit} />
                </div>
            </Dialog>
        </div>
    );
}

export default App;

