import React, { useEffect, useState } from 'react';
import { Table, Button, Modal } from 'antd';
import axios from 'axios';
import UserForm from './UserForm';

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
    const [isAddModalOpen, setAddModalOpen] = useState(false);
    const [curUser, setUser] = useState([]); 

    const fetchData = () => {
        axios.get('http://127.0.0.1:8000/users/')
            .then((res) => {
                console.log(res.data);
                setUsers(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    useEffect(() => {
        fetchData()
    }, [])

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Username',
            dataIndex: 'username',
            key: 'username',
        },
        {
            title: 'Active',
            dataIndex: 'is_active',
            key: 'is_active',
            render: (active) => (active ? 'Yes' : 'No'),
        },
        {
            title: 'Actions',
            dataIndex: '',
            key: 'action',
            render: (_, record) => (
                <>
                    <Button> Edit </Button>
                    <Button onClick={() => showDeleteModal(record)} type="primary" danger>Delete</Button>
                </>
            ),
        },
    ];

    const deleteUser = () => {
        axios.delete('http://127.0.0.1:8000/users/' + curUser.id)
            .then(() => {
                fetchData();
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const showDeleteModal = (record) => {
        setDeleteModalOpen(true);
        setUser(record);
    };

    const handleOk = () => {
        setDeleteModalOpen(false);
        deleteUser();
    };

    const handleCancel = () => {
        setDeleteModalOpen(false);
    };

    const showAddModal = () => {
        setAddModalOpen(true);
    };

    const handleAddCancel = () => {
        setAddModalOpen(false);
        fetchData();
    };


    return(
        <>
            <Button type="primary" style={{ float: 'right' }} onClick={() => showAddModal() } >Add New User</Button>
            <Table dataSource={users} columns={columns} />
            <Modal title="Confirm Delete" open={isDeleteModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <p>Are you sure you want to delete {curUser.username}?</p>
            </Modal>
            <Modal title="Add User" open={isAddModalOpen} onCancel={handleAddCancel} footer={null}>
                <UserForm/>
            </Modal>
        </>
    );
}

export default UserList;