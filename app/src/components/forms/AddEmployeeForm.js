import React from 'react'
import { Button, Form, Input, App, Checkbox, DatePicker } from 'antd';
import axios from 'axios';
import moment from 'moment';

import config from '../../config.json';

const AddEmployeeForm = () => {
    const { message } = App.useApp();

    const dateFormat = 'YYYY-MM-DD';

    const layout = {
        labelCol: { span: 6 },
        wrapperCol: { span: 16 },
    };

    const onFinish = (values) => {
        const token = localStorage.getItem('token');
        values.dob = values.dob.format(dateFormat);
        const age = moment().diff(moment(values.dob, dateFormat), 'years');

        axios.post(config.BACKEND_URL + '/employees/', {
            email: values.email,
            firstName: values.firstName,
            lastName: values.lastName,
            dob: values.dob,
            skillLevel: values.skillLevel,
            active: values.active || false,
            age: age,
        }, {
            headers: { "Authorization": `Bearer ${token}` }, 
        }).then((res) => {
            console.log("Success!", res);
            message.success('Successfully added employee!');
        }).catch((err) => {
            message.error('Failed to create employee. ' + err.response.data.detail);
            console.log(err.response);
        });

    };

    const onFinishFailed = (errorInfo) => {
        message.error('Please input the required information!');
        console.log('Failed:', errorInfo);
    };

    return (
        <Form
            name="AddEmployeeForm"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            {...layout}
            autoComplete="off"
        >
            <Form.Item
                label="First Name"
                name="firstName"
                rules={[
                    {
                        required: true,
                        message: 'Please input a first name!',
                    },
                ]}
            >
                <Input/>
            </Form.Item>

            <Form.Item
                label="Last Name"
                name="lastName"
                rules={[
                    {
                        required: true,
                        message: 'Please input a last name!',
                    },
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Email"
                name="email"
                rules={[
                    {
                        required: true,
                        message: 'Please input a valid email!',
                        type: 'email'
                    },
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Date of Birth"
                name="dob"
                rules={[
                    {
                        required: true,
                        message: 'Please input a date!',
                    },
                ]}
            >
                <DatePicker format={dateFormat} />
            </Form.Item>

            <Form.Item
                label="Skill Level"
                name="skillLevel"
                rules={[
                    {
                        required: true,
                        message: 'Please input a skill!',
                    },
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Active: "
                name="active"
                valuePropName="checked"
            >
                <Checkbox />
            </Form.Item>

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

export default AddEmployeeForm;
