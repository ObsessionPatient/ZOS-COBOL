import React from 'react'
import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import axios from 'axios'
import 'antd/dist/antd.dark.css';
import { setToken } from "../../../utils/auth"

const NormalLoginForm = () => {
  const onFinish = values => {
    console.log(values);
    axios({
      method: "post",
      url: 'http://localhost:8080/login',
      data: {
        address: "10.60.43.8:8800",
        account: values.userName,
        password: values.password,
      },
      headers: {
        "Content-Type": "application/json",
        "Authorization": ""
      }
    })
      .then((res) => {
        console.log(res)
        setToken(res.data)
        window.location.href = '#/home'
      })
  };

  return (
    <Form
      name="sign_in_form"
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
    >
      <Form.Item
        name="userName"
        rules={[
          {
            required: true,
            message: '请输入您的用户名！',
          },
        ]}
      >
        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="请输入账号" />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[
          {
            required: true,
            message: '请输入您的密码！',
          },
        ]}
      >
        <Input.Password
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="请输入密码"
        />
      </Form.Item>
      <Form.Item style={{ textAlign: 'center' }}>
        <Button htmlType="submit" className="login-form-button">
          登录
        </Button>
      </Form.Item>
    </Form>
  );
};

export default NormalLoginForm;