import React, { useState } from 'react';
import { message, Modal, Form, Input, Button } from 'antd';
import 'antd/dist/antd.css';
import axios from "axios";
import './Posts.css';
import "bootstrap/dist/css/bootstrap.min.css";
// import "bootstrap/dist/js/bootstrap";


const AddPosts=()=>{

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [addForm] = Form.useForm();

    const showModal = () => {
      setIsModalVisible(true);
    };
  
    const handleOk = () => {
      setIsModalVisible(false);
    };
  
    const handleCancel = () => {
      setIsModalVisible(false);
    };

    const onFinish = (values) => {
      // console.log('Success:', values);
      let obj = {
        title: values.Title,
        body: values.Message,
        userId:101
      }
      axios.
      post("https://jsonplaceholder.typicode.com/posts", JSON.stringify(obj))
      .then((response) => { 
      console.log(response)
      message.success("Your post is created successfully ", 3);
      })
      .catch(function (handleError) {
        message.error("OOPS!! Some error occured. Please Try again later.", 3);
      }, []);
      handleCancel();
      addForm.resetFields();
    };

    return (
        <>
        <button type="button" className="btn btn-warning" onClick={showModal} style={{marginTop: "12%",width: "67%", background: 'antiquewhite'}}>
          Add Post
        </button>
        <Modal title="Add A New Post" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}  footer={null}>
        <Form
          name="basic"
          form= {addForm}
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          
          autoComplete="off"
        >
          <Form.Item
            label="Title"
            name="Title"
            rules={[{ required: true, message: 'Please input the Title!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Message"
            name="Message"
            rules={[{ required: true, message: 'Please input Message!' }]}
          >
            <Input />
          </Form.Item>


          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
        </Modal>
      </>
    );
}

export default AddPosts;