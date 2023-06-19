import React from 'react'
import { Button, /*Checkbox,*/ Form, Input, App } from 'antd';
import axios from 'axios';

const UserForm = () => {
    const [form] = Form.useForm();
    const { message } = App.useApp();

    const onFinish = (values) => {
        axios.post('http://127.0.0.1:8000/users/', {
            username: values.username,
            password: values.password,
        }).then((res) => {
            console.log("Success!", res);
            message.success('Success!');
        }).catch((err) => {
            message.error('Failed to create account. ' + err.response.data.detail);
            console.log(err.response);
        });
        //form.resetFields();

    };

    const onFinishFailed = (errorInfo) => {
        message.error('Please input the required information!');
        console.log('Failed:', errorInfo);
    };

    return (
        <Form
            name="LoginForm"
            form={form }
            style={{
                maxWidth: 600,
            }}
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

            {/* 
            <Form.Item
                name="remember"
                valuePropName="checked"
                wrapperCol={{
                    offset: 8,
                    span: 16,
                }}
            >
                <Checkbox>Remember me</Checkbox>
            </Form.Item>*/ }

            <Form.Item
                wrapperCol={{
                    offset: 8,
                    span: 16,
                }}
            >
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
        </Form>
    )
}

export default UserForm;