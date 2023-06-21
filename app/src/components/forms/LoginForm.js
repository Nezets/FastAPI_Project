import React from 'react'
import { useNavigate } from "react-router-dom";
import { Button, Checkbox, Form, Input, App } from 'antd';
import axios from 'axios';
import config from '../../config.json';

const LoginForm = () => {
    const navigate = useNavigate()
    const [form] = Form.useForm();
    const { message } = App.useApp();

    const onFinish = (values) => {
        axios.post(config.BACKEND_URL + '/login/', {
            username: values.username,
            password: values.password,
        }).then((res) => {
            console.log("Success!", res);
            message.success('Successfully logged in!');

            localStorage.setItem("JWT", res.data);
            navigate('/EmployeeList');
        }).catch((err) => {
            message.error(err.response.data.detail);
            console.log(err.response);
        });
    };

    const onFinishFailed = (err) => {
        message.error('Please input the required information!');
        console.log('Failed:', err);
    };

    return (
        <Form
            name="LoginForm"
            form={form}
            initialValues={{
                remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
        >
            <Form.Item
                label="Username"
                name="username"
                rules={[
                    {
                        required: true,
                        message: 'Please input your username!',
                    },
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Password"
                name="password"
                rules={[
                    {
                        required: true,
                        message: 'Please input your password!',
                    },
                ]}
            >
                <Input.Password />
            </Form.Item>

            
            <Form.Item
                name="remember"
                valuePropName="checked"
            >
                <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <Form.Item
            >
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
        </Form>
    )
}

export default LoginForm;