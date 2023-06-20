import React, { useState } from 'react'
import { Button, Space, Modal } from 'antd';
import LoginForm from '../forms/LoginForm';
import AddUserForm from '../forms/AddUserForm';

const Login = () => {
    const [isModalOpen, setModalOpen] = useState(false);

    const showModal = (record) => {
        setModalOpen(true);
    };

    const handleCancel = () => {
        setModalOpen(false);
    };

    return (
        <Space direction="vertical" style={{ width: '100%', justify: 'center' , align:'middle'}}>
            <LoginForm />
            <Button type="primary" onClick={() => showModal()} >
                Register
            </Button>
            <Modal title="Add User" open={isModalOpen} onCancel={handleCancel} footer={null}>
                <AddUserForm />
            </Modal>
        </Space>
    );
};

export default Login;