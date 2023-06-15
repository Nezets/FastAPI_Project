import React from 'react'
import { Button, App, Space } from 'antd';
import UserForm from './UserForm';

const Login = () => {
    const { message } = App.useApp();

    const test = () => {
        message.success('Success!');
        console.log('Test. ');
    };

    return (
        <Space direction="vertical" style={{ width: '100%', justifyContent: 'center' }}>
            <UserForm/>
            <Button type="primary" onClick={() => test()} >
                Test
            </Button>
        </Space>
    );
};

export default Login;