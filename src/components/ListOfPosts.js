import React, { useEffect, useState } from 'react';
import { Modal, Card ,Row, Col, message, Input} from 'antd';
import 'antd/dist/antd.css';
import axios from "axios";
import './Posts.css';
import {
    DeleteOutlined,
    EditOutlined,
  } from "@ant-design/icons";
import EditPosts from './EditPosts';

const ListOfPosts=()=>{

const [listOfAllPosts, setlistOfAllPosts] = useState([]);
const [IsUploadModalVisible,setIsUploadModalVisible] = useState(false);
const [userId,setuserId] = useState(0)

useEffect( () => {
    toFetchListOfAllPosts();
},[]);

const handleEditOk = () => {
    setIsUploadModalVisible(false);
  };

const handleEditCancel = () => {
    setIsUploadModalVisible(false);
};

const toFetchListOfAllPosts = () => {
    axios.
    get("https://jsonplaceholder.typicode.com/posts")
    .then((res)=>{
        setlistOfAllPosts(res.data)
    })
    .catch(function (handleError) {
        message.error(
          "OOPS!! Some error occured. Please Try again later.",
          3
        );
      }, []);
};

const showEditModel = (userId) => {
    setuserId(userId);
    setIsUploadModalVisible(true)
    
}

const showDeleteModel = (userId) => {
    // console.log(userId)
    Modal.confirm({
        title: "Are you sure, you want to delete this post?",
        okType: "danger",
        okText: "Yes",
        onOk: () => {
          axios
          .delete("https://jsonplaceholder.typicode.com/posts/"+userId)
          .then((res)=>{
              console.log(res);
              message.success("Your post is deleted successfully ", 3);
              toFetchListOfAllPosts();
          })
          .catch(function (handleError) {
            message.error("OOPS!! Some error occured. Please Try again later.", 3);
          }, []);
        }
      });
}

const { Search } = Input;

const onSearch = value => {
    // console.log(value);
    if(value != ""){
        axios.
    get("https://jsonplaceholder.typicode.com/users/"+ value +"/posts")
    .then((res)=>{
        
        // console.log(res.data)
        if(res.data.length === 0){
            message.error(
                "OOPS!!There are no posts in this userId.",
                3
              );
        }else{
            setlistOfAllPosts(res.data)
        }
    })
    .catch(function (handleError) {
        message.error(
          "OOPS!! Some error occured. Please Try again later.",
          3
        );
      }, []);
    }
    else{
        toFetchListOfAllPosts();
    }
}

    return (
        <>
        <div>
            
            <h1 style={{fontFamily: 'cursive',textAlign:'center', color:'beige'}}>List of Posts</h1>
            <Search placeholder="Search with userId" enterButton onSearch={onSearch} style={{width:'23%', marginLeft:'73%'}}></Search>
            <div className='container'>
            
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
            {listOfAllPosts.map((item, index)=>{
                if (((index) % 2) === 1) {
                return(<Col gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} span={12} style={{marginTop:'23px' , paddingLeft: '1%', paddingRight:'33%'}} key={index}>
                    <Card size="default" title={item.title}  style={{ width: 500 , marginLeft:'13%',fontFamily: 'cursive',}}>
                        <Row>
                            <Col span={20}>
                                <p className='textStyle' style={{fontFamily: 'cursive',}} >{item.body}</p>
                            </Col>
                            <Col span={2}>
                                <div onClick={() => {showEditModel(item.id)}}><EditOutlined /></div>
                            </Col>
                            <Col span={2}>
                                <div onClick={() => {showDeleteModel(item.id)}}><DeleteOutlined /></div>
                            </Col>
                        </Row>
                    </Card>
                </Col>
                );
                
            }else if (((index) % 2) === 0) {
                
                return(<Col gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} span={12} style={{marginTop:'23px', paddingRight:'43%'}} key={index}>
                    <Card size="default" title={item.title}  style={{ width: 500 , marginLeft:'23%' ,fontFamily: 'cursive'}}>
                    <Row>
                            <Col span={20}>
                                <p className='textStyle' style={{fontFamily: 'cursive',}} >{item.body}</p>
                            </Col>
                            <Col span={2}>
                                <div onClick={() => {showEditModel(item.id)}}><EditOutlined /></div>
                            </Col>
                            <Col span={2}>
                                <div onClick={() => {showDeleteModel(item.id)}}><DeleteOutlined /></div>
                            </Col>
                        </Row>
                    </Card>
                </Col>
                );
            }  
            })}
            
                </Row>
                
                
            </div>
        </div>

        <EditPosts 
            userId={userId}
            isModalVisible={IsUploadModalVisible}
            handleOk={handleEditOk}
            handleCancel={handleEditCancel}
        />
        </>
    );
}

export default ListOfPosts;