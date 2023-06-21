import React, { useState } from 'react'
import { Button, Modal, Row, Card } from 'antd';
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
        <Row type="flex" justify="center" align="middle" style={{ minHeight: '100vh' }  }>
            <Card
                direction="vertical"
                align="middle"
                style={{ width: 400 }}
                title="Login"
            >
                <LoginForm />
                <Button type="primary" onClick={() => showModal()} >
                    Register
                </Button>
                <Modal title="Add User" open={isModalOpen} onCancel={handleCancel} footer={null}>
                    <AddUserForm />
                </Modal>
            </Card>
        </Row>

    );
};

export default Login;