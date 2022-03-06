import React, { useEffect, useState } from 'react';
import { message, Modal, Form, Input, Button } from 'antd';
import 'antd/dist/antd.css';
import axios from "axios";
import './Posts.css'

const EditPosts=({
        userId,
        isModalVisible,
        handleOk,
        handleCancel,
 })=>{

    const [postToBeEdited, setpostToBeEdited] = useState({});
    const [editForm] = Form.useForm();

    useEffect(() => {
        axios
            .get("https://jsonplaceholder.typicode.com/posts?id="+userId)
            .then((res)=>{
              setpostToBeEdited(res.data)
              
            })
            .catch(function (handleError) {
                message.error(
                "OOPS!! Some error occured. Please Try again later.",
                3
                );
            }, []);
        
    },[userId])

    useEffect(() => {
      if(Object.keys(postToBeEdited).length !== 0){
        // console.log(postToBeEdited)
        // console.log(postToBeEdited[0].title)
        editForm.setFieldsValue({ 
          Title: postToBeEdited[0].title,
          Message: postToBeEdited[0].body
          });
      }
    },[postToBeEdited])


    const onFinish = (values) => {
      // console.log('Success:', values);
      let obj = {
        title: values.Title,
        body: values.Message,
        userId:userId,
        id: postToBeEdited[0].id
      }
      console.log(obj)
      axios
      .put("https://jsonplaceholder.typicode.com/posts/"+userId, JSON.stringify(obj))
      .then((response) => { 
      console.log(response)
      message.success("Your post is edited successfully ", 3);
      })
      .catch(function (handleError) {
        message.error("OOPS!! Some error occured. Please Try again later.", 3);
      }, []);
      handleCancel();
    };

    return (
        <>
        
        <Modal title="Add A New Post" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}  footer={null}>
        <Form
          name="basic"
          form= {editForm}
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

export default EditPosts;