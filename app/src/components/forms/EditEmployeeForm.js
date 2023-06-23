import React, { useEffect } from 'react'
import { Button, Form, Input, App, Checkbox, DatePicker } from 'antd';
import axios from 'axios';
import moment from 'moment';
import dayjs from 'dayjs'

import config from '../../config.json';

const EditEmployeeForm = (data) => {
    const { message } = App.useApp();
    const [form] = Form.useForm();

    const layout = {
        labelCol: { span: 6 },
        wrapperCol: { span: 16 },
    };

    useEffect(() => {
        data.data.dob = dayjs(data.data.dob);
        form.resetFields();
    }, [form, data.data])

    //DatePicker variables
    const dateFormat = 'YYYY-MM-DD';
    const disabledDate = (current) => {
        const futureDate = moment().add(-1, 'days') < current;
        return futureDate;
    }

    //Submit Form and make API call to create new employee in Database
    const onFinish = (values) => {
        const id = data.data.id;
        values.dob = values.dob.format(dateFormat);
        const age = moment().diff(moment(values.dob, dateFormat), 'years');
        axios.put(config.BACKEND_URL + '/employees/'+id, {
            id: id,
            email: values.email,
            firstName: values.firstName,
            lastName: values.lastName,
            dob: values.dob,
            skillLevel: values.skillLevel,
            active: values.active || false,
            age: age,
        }).then((res) => {
            console.log("Success!", res);
            message.success('Successfully updated employee!');
        }).catch((err) => {
            message.error('Failed to create account. ' + err.response.data.detail);
            console.log(err.response);
        });
    };

    const onFinishFailed = (errorInfo) => {
        console.log(data.data);
        message.error('Please input the required information!');
        console.log('Failed:', errorInfo);
    };

    return (
        <Form
            form={form }
            name="EditEmployeeForm"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            {...layout}
            autoComplete="off"
            initialValues={data.data }
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
                <Input />
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
                <DatePicker format={dateFormat} disabledDate={disabledDate} defaultValue={dayjs()} />
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


export default EditEmployeeForm;