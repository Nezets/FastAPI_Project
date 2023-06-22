import React, { useEffect, useState } from 'react';
import { Table, Button, Modal, Space, App } from 'antd';
import axios from 'axios';

import config from '../../config.json';
import "../component.css";

import AddUserForm from '../forms/AddUserForm';
import EditUserForm from '../forms/EditUserForm';
import HomeButton from '../buttons/HomeButton'; 
import EmployeeListButton from '../buttons/EmployeeListButton';

import { PlusOutlined } from '@ant-design/icons';

const UserList = () => {
    const { message } = App.useApp();

    const [users, setUsers] = useState([]);
    const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
    const [isAddModalOpen, setAddModalOpen] = useState(false);
    const [isEditModalOpen, setEditModalOpen] = useState(false);
    const [curUser, setUser] = useState([]); 

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            sorter: (a, b) => a.id - b.id,
        },
        {
            title: 'Username',
            dataIndex: 'username',
            key: 'username',
            sorter: (a, b) => a.username.localeCompare(b.username),
        },
        {
            title: 'Active',
            dataIndex: 'is_active',
            key: 'is_active',
            render: (active) => (active ? 'Yes' : 'No'),
            sorter: (a, b) => a.is_active - b.is_active,
        },
        {
            title: 'Actions',
            align: 'center',
            render: (_, record) => (
                <Space>
                    <Button onClick={() => showEditModal(record) }> Edit </Button>
                    <Button onClick={() => showDeleteModal(record)} type="primary" danger>Delete</Button>
                </Space>
            ),
        },
    ];

    //API Calls
    const fetchData = () => {
        axios.get(config.BACKEND_URL + '/users/')
            .then((res) => {
                console.log(res.data);
                setUsers(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const deleteUser = () => {
        axios.delete(config.BACKEND_URL + '/users/' + curUser.id)
            .then(() => {
                fetchData();
                message.success('Successfully deleted user!');
            })
            .catch((err) => {
                message.error('Failed to delete user. ' + err.response.data.detail);
                console.log(err);
            });
    };

    useEffect(() => {
        fetchData()
    }, [])


    //Modal Functions
    const showDeleteModal = (record) => {
        setDeleteModalOpen(true);
        setUser(record);
    };

    const showEditModal = (record) => {
        setEditModalOpen(true);
        setUser(record)
    }

    const handleOk = () => {
        setDeleteModalOpen(false);
        deleteUser();
    };

    const handleCancel = () => {
        setDeleteModalOpen(false);
        setEditModalOpen(false);
        setAddModalOpen(false);
        fetchData();
    };

    const showAddModal = () => {
        setAddModalOpen(true);
    };

    return(
        <>
            <h1 className="Title"> User List </h1>
            <Space>
                <HomeButton style={{ float: 'right' }} />
                <EmployeeListButton/>
                <Button type="primary" style={{ float: 'right' }} onClick={() => showAddModal()} >
                    <PlusOutlined/>
                </Button>
            </Space>

            <Table dataSource={users} columns={columns} />

            <Modal title="Confirm Delete" open={isDeleteModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <p>Are you sure you want to delete {curUser.username}?</p>
            </Modal>
            <Modal title="Add User" open={isAddModalOpen} onCancel={handleCancel} footer={null}>
                <AddUserForm />
            </Modal>
            <Modal title={"Edit " + curUser.username + "'s Account"} open={isEditModalOpen} onCancel={handleCancel} footer={null}>
                <EditUserForm req={curUser} />
            </Modal>
        </>
    );
}

export default UserList;