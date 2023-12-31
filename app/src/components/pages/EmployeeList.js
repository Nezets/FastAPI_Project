import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Table, Button, Modal, Space, App } from 'antd';
import axios from 'axios';
import dayjs from 'dayjs';

import config from '../../config.json';
import "../component.css";

import AddEmployeeForm from '../forms/AddEmployeeForm';
import EditEmployeeForm from '../forms/EditEmployeeForm';

import HomeButton from '../buttons/HomeButton'; 
import { PlusOutlined } from '@ant-design/icons';
import UserListButton from '../buttons/UserListButton';

const EmployeeList = () => {
    const navigate = useNavigate()
    const { message } = App.useApp();
    const [employees, setEmployees] = useState([]);
    const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
    const [isAddModalOpen, setAddModalOpen] = useState(false);
    const [isEditModalOpen, setEditModalOpen] = useState(false);
    const [curEmployee, setEmployee] = useState([]);
    const dateFormat = 'YYYY-MM-DD';

    const fetchEmployees = () => {
        const token = localStorage.getItem('token');
        axios.get(config.BACKEND_URL + '/employees/', {
            headers: { "Authorization": `Bearer ${token}` },
        })
            .then((res) => {
                setEmployees(res.data);
            })
            .catch((err) => {
                console.log(err);
                message.error('Please login to access this page. ');
                navigate('/');
            });
    };

    const deleteEmployee = () => {
        const token = localStorage.getItem('token');
        axios.delete(config.BACKEND_URL + '/employees/' + curEmployee.id, { headers: { "Authorization": `Bearer ${token}` } })
            .then(() => {
                fetchEmployees();
                message.success('Successfully deleted employee!');
            })
            .catch((err) => {
                console.log(err);

                message.error('Failed to delete employee. ' + err.response.data.detail);
            });
    }

    useEffect(() => {
        fetchEmployees()

        //Removing warning from eslint
        // eslint-disable-next-line react-hooks/exhaustive-deps 
    }, [])

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            sorter: (a, b) => a.id - b.id,
        },
        {
            title: 'First Name',
            dataIndex: 'firstName',
            key: 'firstName',
            sorter: (a, b) => a.firstName.localeCompare(b.firstName),
        },
        {
            title: 'Last Name',
            dataIndex: 'lastName',
            key: 'lastName',
            sorter: (a, b) => a.lastName.localeCompare(b.lastName),
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            sorter: (a, b) => a.email.localeCompare(b.email),
        },
        {
            title: 'Age',
            dataIndex: 'age',
            key: 'age',
            sorter: (a, b) => a.age - b.age,
        },
        {
            title: 'Date of Birth',
            dataIndex: 'dob',
            key: 'dob',
        },
        {
            title: 'Skill Level',
            dataIndex: 'skillLevel',
            key: 'skillLevel',
        },
        {
            title: 'Active',
            dataIndex: 'active',
            key: 'active',
            render: (active) => (active ? 'Yes' : 'No'),
            sorter: (a, b) => a.active - b.active,
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
        record.dob = dayjs(record.dob, dateFormat);
        setEmployee(record);
        setEditModalOpen(true);
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
            <h1 className="Title"> Employee List </h1>
            <Space>
                <HomeButton style={{ float: 'right' }} />
                <UserListButton/>
                <Button type="primary" style={{ float: 'right' }} onClick={() => showAddModal()} >
                    <PlusOutlined />
                </Button>
            </Space>
            <Table dataSource={employees} columns={columns} />

            <Modal
                title="Confirm Delete"
                open={isDeleteModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                okText='Confirm'
                okButtonProps={{ style: { backgroundColor: 'red' } }} 
            >
                <p>Are you sure you want to delete {curEmployee.firstName + " " + curEmployee.lastName}?</p>
            </Modal>

            <Modal
                title="Add Employee"
                open={isAddModalOpen}
                onCancel={handleCancel}
                footer={null}
            >
                <AddEmployeeForm/>
            </Modal>

            <Modal
                title={"Edit " + curEmployee.firstName + " " + curEmployee.lastName + "'s info"}
                open={isEditModalOpen}
                onCancel={handleCancel}
                footer={null}
            >
                <EditEmployeeForm data={curEmployee} />
            </Modal>
        </>
    )
}

export default EmployeeList;