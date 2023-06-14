import { Button, Checkbox, Form, Input, Divider, App, Space } from 'antd';
import axios from 'axios';


const Login = () => {
    const { message } = App.useApp();

    const onFinish = (values) => {
        console.log('Success:', values);
        axios.post('http://127.0.0.1:8000/users/', {
            username: values.username,
            password: values.password,
        }).then((res) => {
            console.log(res);
            message.success('Success!');
        }).catch((err) => {
            const res = err.response;
            message.error('Failed to create account. ' + res.data.detail);
            console.log(res);
        });
    };

    const onFinishFailed = (errorInfo) => {
        message.error('Please input the required information!');
        console.log('Failed:', errorInfo);
    };

    const test = () => {
        message.success('Success!');
        console.log('Test. ');
    };

    return (
        <Space direction="vertical" style={{ width: '100%', justifyContent: 'center' }}>
            <Divider />
            <Form
                name="basic"
                labelCol={{
                    span: 8,
                }}
                wrapperCol={{
                    span: 16,
                }}
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

                <Form.Item
                    name="remember"
                    valuePropName="checked"
                    wrapperCol={{
                        offset: 8,
                        span: 16,
                    }}
                >
                    <Checkbox>Remember me</Checkbox>
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

            <Button type="primary" onClick={() => test()} >
                Test
            </Button>
        </Space>
    );
};

export default Login;