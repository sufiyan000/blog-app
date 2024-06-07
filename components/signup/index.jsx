"use client"
import React from 'react';
import axios from 'axios';  
import { Button, message, Form, Input } from 'antd';



const Signups = ()=>{
  const [messageApi, contextHolder] = message.useMessage();
  const success = (msg) => {
    messageApi.open({
      type: 'success',
      content: msg,
    });
  };
  const onFinish = async (values) => {
    const data = {
      email : values.email,
      password : values.password
    }
    const {data:response} = await axios.post("/api/signup", data);
    if(response.success) {
      success(response.message)
  
    }
  };
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
    return(
       <> 
       {contextHolder}
        <div className="w-[50%] mx-auto mt-16">
            <h1 className="text-xl font-bold text-center mb-8">Sign Up</h1>
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
      label="Email"
      name="email"
      rules={[
        {
          required: true,
          type : 'email',
          message: 'Please input your Email!',
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
            </div>  
       </>
    )
}
export default Signups