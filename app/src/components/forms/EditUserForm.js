import React, { useEffect } from 'react'
import { Button, Checkbox, Form, Input, App } from 'antd';
import axios from 'axios';
import config from '../../config.json';

const EditUserForm = (req) => {
    const [form] = Form.useForm();
    const { message } = App.useApp();

    useEffect(() => {
        form.resetFields();
    }, [form, req.req])

    const onFinish = (values) => {
        console.log(req.req);
        axios.put(config.BACKEND_URL + '/users/' + req.req.id, {
            username: values.username,
            id: req.req.id,
            is_active: values.is_active || false,
        }).then((res) => {
            console.log(res);
            message.success('Successfully updated user!');
        }).catch((err) => {
            message.error('Failed to edit user. ' + err.response.data.detail);
            console.log(err);
        })
    };

    const onFinishFailed = (err) => {
        message.error('Please input the required ');
        console.log(err);
    };

    return (
        <Form
            name="EditUserForm"
            form={form}
            style={{
                maxWidth: 600,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            initialValues={ req.req }
        >
            <Form.Item
                label="Username"
                name="username"
                rules={[
                    {
                        required: true,
                        message: 'Please input a username!',
                    },
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Active: "
                name="is_active"
                valuePropName="checked"
            >
                <Checkbox />
            </Form.Item>

            <Form.Item
                wrapperCol={{
                    offset: 10,
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

export default EditUserForm;