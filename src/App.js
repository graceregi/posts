import React from 'react';
import ListOfPosts from './components/ListOfPosts';
import AddPosts from './components/AddPosts';
import {Row , Col } from 'antd';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import { Button } from 'antd';
// import 'antd/dist/antd.css';

const App = () => {

  return(
    <div style={{background : "linear-gradient(to right,#de7172,#9198e5)"}}>
      <div className='container'>
        <Row>
          <Col span={18} style={{textAlign:'center'}}>
            <h1 style={{fontFamily:'cursive', marginLeft:'32%',color:'beige'}}>
              All your Posts in one Page!
              </h1>
            </Col>

            <Col span={6}>
              <AddPosts></AddPosts>
              </Col>
        </Row>
        <ListOfPosts></ListOfPosts>
        </div>
      </div>
  );
};

export default App;