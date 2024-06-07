"use client"
import React from 'react';
import { Button, Checkbox,message, Form, Input } from 'antd';
import axios from 'axios';
import Link from 'next/link';



const Logins = ()=>{
  const [messageApi, contextHolder] = message.useMessage();
  const success = (msg) => {
    messageApi.open({
      type: 'success',
      content: msg,
    });
  };
  const onFinish = async (values) => {
    try{
      const data = {
        email : values.email,
        password : values.password
      }
      const {data:datas} = await axios.post("/api/login",data);
      if(datas.success) {
        window.location.href = "/admin"
      }
      
    }
    catch(err){
      success(err.response.data.message);
      console.log(err.response.data.message);
    };
  };
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

    return(
       <> 
        {contextHolder}
        <div className="w-[50%] mx-auto mt-16">
            <h1 className="text-xl font-bold text-center mb-8">Login</h1>
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
      name="email"
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
      wrapperCol={{
        offset: 8,
        span: 16,
      }}
    >
      <Button type="primary" className="mr-4" htmlType="submit">
        Submit
      </Button>
      <Link href={"/signup"}>signup</Link>

    </Form.Item>
  </Form>
            </div>  
       </>
    )
}
export default Logins