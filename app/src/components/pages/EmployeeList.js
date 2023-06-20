import React, { useEffect, useState } from 'react';
import { Table, Button, Modal, Space} from 'antd';
import axios from 'axios';

import AddEmployeeForm from '../forms/AddEmployeeForm';
import EditEmployeeForm from '../forms/EditEmployeeForm';

import HomeButton from '../buttons/HomeButton'; 
import { PlusOutlined } from '@ant-design/icons';
import UserListButton from '../buttons/UserListButton';

const EmployeeList = () => {
    const [employees, setEmployees] = useState([]);
    const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
    const [isAddModalOpen, setAddModalOpen] = useState(false);
    const [isEditModalOpen, setEditModalOpen] = useState(false);
    const [curEmployee, setEmployee] = useState([]); 

    const fetchEmployees = () => {
        axios.get('http://127.0.0.1:8000/employees/')
            .then((res) => {
                console.log(res.data);
                setEmployees(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const deleteEmployee = () => {
        axios.delete('http://127.0.0.1:8000/employees/' + curEmployee.id)
            .then(() => {
                fetchEmployees();
            })
            .catch((err) => {
                console.log(err);
            });
    }

    useEffect(() => {
        fetchEmployees()
    }, [])

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id'
        },
        {
            title: 'First Name',
            dataIndex: 'firstName',
            key: 'firstName',
        },
        {
            title: 'Last Name',
            dataIndex: 'lastName',
            key: 'lastName',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Age',
            dataIndex: 'age',
            key: 'age',
        },
        {
            title: 'Date of Birth',
            dataIndex: 'dob',
            key: 'dob',
        },
        {
            title: 'Skills',
            dataIndex: 'skillLevel',
            key: 'skillLevel',
        },
        {
            title: 'Active',
            dataIndex: 'active',
            key: 'active',
            render: (active) => (active ? 'Yes' : 'No'),
        },
        {
            title: 'Actions',
            dataIndex: '',
            key: 'action',
            align: 'center',
            render: (_, record) => (
                <Space>
                    <Button onClick={() => showEditModal(record)}> Edit </Button>
                    <Button onClick={() => showDeleteModal(record)} type="primary" danger>Delete</Button>
                </Space>
            ),
        },
    ]

    const showAddModal = () => {
        setAddModalOpen(true);
    };

    const showDeleteModal = (record) => {
        setDeleteModalOpen(true);
        setEmployee(record);
    };

    const showEditModal = (record) => {
        setEditModalOpen(true);
        setEmployee(record)
    };

    const handleCancel = () => {
        setDeleteModalOpen(false);
        setEditModalOpen(false);
        setAddModalOpen(false);
        fetchEmployees();
    };

    const handleOk = () => {
        setDeleteModalOpen(false);
        deleteEmployee();
    };

    return (
        <>
            <Space>
                <HomeButton style={{ float: 'right' }} />
                <UserListButton/>
                <Button type="primary" style={{ float: 'right' }} onClick={() => showAddModal()} >
                    <PlusOutlined />
                </Button>
            </Space>
            <Table dataSource={employees} columns={columns} />
            <Modal title="Confirm Delete" open={isDeleteModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <p>Are you sure you want to delete {curEmployee.firstName + " " + curEmployee.lastName}?</p>
            </Modal>
            <Modal title="Add Employee" open={isAddModalOpen} onCancel={handleCancel} footer={null}>
                <AddEmployeeForm/>
            </Modal>
            <Modal title={"Edit " + curEmployee.firstName + " " + curEmployee.lastName + "'s info"} open={isEditModalOpen} onCancel={handleCancel} footer={null}>
                <EditEmployeeForm data={curEmployee.id} />
            </Modal>
        </>
    )
}

export default EmployeeList;