"use client"

import { useState,useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import { Button,message,Modal, Form,Input } from "antd";
import { PlusOutlined,DeleteOutlined,EditOutlined,EyeOutlined,LoadingOutlined} from "@ant-design/icons"

export default function Admin() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const [updateId,setUpdateId] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    content:'',
    author: '',
  })
  const success = (msg) => {
    messageApi.open({
      type: 'success',
      content: msg,
    });
  };
  const [ blog,setBlog ] = useState([]);
  const [pagination,setPagination] = useState(null);
  const pages = Array.from({ length: pagination }, (_, index) => `Item ${index + 1}`);

  const getBlog = async ()=>{
    const {data} = await axios.get("/api/blogs");
    const {totalPages} = (data.data);
    console.log(totalPages);
    setBlog(data.data.blogs);
    setPagination(totalPages);
    
  }
  const onDelete = async (data) => {
    try{
        const {data:datas} = await axios.delete("/api/blogs", { data: { id:data } });
        if(datas.success){
          success(datas.message);
          const array = blog;
        const newArray = array.filter(item => item._id !== data);
        setBlog(newArray);

        }

    }
    catch(err){
      console.log(err);
    }
  }

  const onEdit = (id,title,content,author) => {
    setIsModalOpen(true);
    setUpdateId(id);
    
    console.log(formData);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onLogout = async () => {
    const {data} = await axios.post("/api/logout");
    if(data.success) {
      window.location.href = "/";
    }
  }

  const onFinish = async (values) => {
    if(updateId){
      const data = {
        id : updateId,
        title: values.title,
        content: values.content,
        author: values.author
      }

    const {data:datas} = await axios.put("/api/blogs", { data })
    if(datas.success){
      setIsModalOpen(false);
      success();
      console.log(datas.updatedData);
      window.location.reload();
    }
    }
    else{
      
      const createPost = {
        title : values.title,
        content : values.content,
        author : values.author
      }
      const {data} = await axios.post("/api/blogs", createPost);
      if(data.success){
        setIsModalOpen(false);
         success();
      }
    }
  };
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  useEffect(()=>{
    getBlog();
    setFormData({
      title: '',
      content: '',
      author: ''
    })
  },[])
  return (
    <>
    {contextHolder}
      <div className="w-[70%] border-1  mx-auto p-4">
        <div className="w-full flex justify-between items-center">
          <Button type="primary" onClick={()=>(setIsModalOpen(true),setUpdateId(null))} className="m-4" shape="round" icon={<PlusOutlined />}>
            Create Post
            </Button>

          <Button type="primary"  onClick={()=>onLogout()}>
            Logout
            </Button>

          </div>
        {
          blog.map((items,index)=>(
            <>
              
                <div key={index} className="border border-2 p-4 m-4 hover:bg-[#DAF7A6] cursor-pointer">
                <h1>{items.title}</h1>
                <hr />
                <p>{items.content}</p>
                <hr />
                <p>{items.author}</p>
                   <div className="gap-4 flex">
                   <Button type="primary" icon={<DeleteOutlined />} onClick={()=>onDelete(items._id)}>Delete</Button>
                   <Button type="primary" icon={<EditOutlined />} onClick={()=>onEdit(items._id,items.title,items.content,items.author)}>Edit</Button>
                   <Link href={`/posts/${items._id}`}>
                   <Button type="primary" icon={<EyeOutlined />}>View</Button>
                   </Link>
                   </div>

                </div>
              
            </>
          ))
          
        
          
        }
        <Modal title="Edit Post" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
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
                title : formData.title,
                content : formData.content,
                author : formData.author  
              }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
            >
              <Form.Item
                label="Title"
                name="title"
                value= {formData.title}
                rules={[
                  {
                    required: true,
                    message: 'Please input title!',
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Content"
                name="content"
                rules={[
                  {
                    required: true,
                    message: 'Please input Content!',
                  },
                ]}
              >
                <Input.TextArea />
              </Form.Item>

              <Form.Item
                label="Author"
                name="author"
                
              >
                <Input />
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
        </Modal>
        
        
        
      </div>
    </>
  );
}
