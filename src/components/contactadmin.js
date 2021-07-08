import React, { useEffect, useState } from "react";
import { Table, Button, Modal, Input, Form } from "antd";
import "antd/dist/antd.css";
import axios from "axios";
import {useContext} from 'react';
import UserContext from '../contexts/user';


/**
 * This file is what allows volunteers to delete and edit current files in the database which show up on the main page
 * 
 * 
 */

const { Item } = Form;
const baseUrl="https://sardine-shock-3000.codio-box.uk/api/v1/messages";
// Layout
const layout={
  labelCol:{
    span: 8
  },
  wrapperCol:{
    span: 16
  }
};

function Contact() {
// authorization to make sure that the user is logged in 
  const context = useContext(UserContext);
  const user = context.user;
  console.log("current user in UserContext is", user);
  
  const [profile, setProfile] = React.useState({});
  
  

// Presents the Headers
  const [data, setData]=useState([]);
  const [editMessages, setEditMessages]=useState(false);
  const [deleteMessages, setDeleteMessages]=useState(false);
  const [messages, setMessages]=useState({
    ID: '',
    title: '',
    summary: '',
    imageURL: '',
    
  })

// if edit is clicked do this 
  const openeditMessages=()=>{
    setEditMessages(!editMessages);
  }
// if delete is clicked do this 
  const opendeleteMessages=()=>{
    setDeleteMessages(!deleteMessages);
  }

  const handleChange=e=>{
    const {name, value}=e.target;
    setMessages({...messages,
    [name]: value});
    console.log(messages);
  }

  const selectMessages=(messages, cases)=>{
    setMessages(messages);
    (cases==="Edit")?openeditMessages():opendeleteMessages()
  }

// Shows headers/columns
  const columns = [
    {
      title: "ID",
      dataIndex: "ID",
      key: "ID",
    },
    {
      title: "Company Name",
      dataIndex: "title",
      key: "title",
    },    
    {
      title: "Email",
      dataIndex: "imageURL",
      key: "imageURL",
    },
    {
      title: "Type of issue",
      dataIndex: "summary",
      key: "summary",
    },     
    {
      title: "Actions",
      key: "actions",
      render: (row) => (
        <>
          <Button type="primary" onClick={()=>selectMessages(row, "Edit")}>Edit</Button> {"   "}
          <Button type="primary" danger onClick={()=>selectMessages(row, "Delete")}>
            Delete
          </Button>
        </>
      ),
    },
  ];
// This is used to receive the data by using a GET call
  const messagesGet=async()=>{
    await axios.get(baseUrl)
      .then(response=>{
      setData(response.data);
    }).catch(error=>{
      console.log(error);
    })
  }
// This is used to update the data by using a PUT call  
  const messagesPut=async()=>{
    const id = messages.ID
    await axios.put(baseUrl+"/"+ id, messages,{
      headers: {
        authorization: 'Basic ' + btoa(user.username + ":" + user.password) // allow authorization if user credentials is authorised
      },
    })
      .then(response=>{
      console.log('--- response.data', response.data)
        setData(response.data)

      // eslint-disable-next-line
      /*
      dataAuxiliar = data.map(element=>{
        if(element.id===messages.ID){
          const {ID: id, title, summary, imageURL: imageurl} = messages
          return ({ id, title, summary, imageurl });
        } else {
          return element
        }
      });

      dataAuxiliar.map(element=>{
        if(element.id===messages.ID){
          element.title=messages.title;
          element.summary=messages.summary;
          element.imageurl = messages.imageURL;
        }
      });
      setData(dataAuxiliar);
      */
      openeditMessages();
      })
      .catch(error=>{
      console.log(error);
    })
  }

// This is used to delete the data by using a DELETE call          
      const messagesDelete=async()=>{
        await axios.delete(baseUrl+"/"+messages.ID,{
          headers: {
            authorization: 'Basic ' + btoa(user.username + ":" + user.password)  // allow authorization if user credentials is authorised
      },
        })
        .then(response=>{
          setData(data.filter(element=>element.test!==messages.title));
          opendeleteMessages();
        }).catch(error=>{
          console.log(error);
        })
          }

  useEffect(()=>{
    messagesGet();
  },[])



// Validates that only a logged in volunteers is logged in
  if (!user.loggedIn) {
    return "Please log in"
  }

  if (!profile.username) {
    let headers = new Headers();
    headers.append('Authorization', 'Basic ' + btoa(user.username + ":" + user.password));

    fetch(user.links.self, {headers:headers})
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error(response.text());
      }
    })
    .then(data => {
      console.log(data);
      setProfile(data);
    })
    .catch(err => console.error(err));  
  }
// if validated return everything below
  return (
    <div className="App">
    <h1 className='my-h1-landing'>Admin Messages</h1>
         <br />
      <br />
      <br />
      <br />
      <Table columns={columns} dataSource={data}/>



      
      <Modal
      visible={editMessages}
      title="Edit Messages"
      onCancel={openeditMessages}
      centered
      footer={[
        <Button onClick={openeditMessages}>Cancel</Button>,
        <Button type="primary" onClick={messagesPut}>Edit</Button>,
      ]}
      >
<Form {...layout}>
  <Item label="Company Name">
    <Input name="title" onChange={handleChange} value={messages.title}/>
  </Item>



  <Item label="Email">
    <Input name="imageURL" onChange={handleChange} value={messages && messages.imageURL}/>
  </Item>


  <Item label="Type of Issue">
    <Input name="summary" onChange={handleChange} value={messages && messages.summary}/>
  </Item>


</Form>
      </Modal>


          
      <Modal
      visible={deleteMessages}
      onCancel={opendeleteMessages}
      centered
      footer={[
        <Button onClick={opendeleteMessages}>No</Button>,
        <Button type="primary" danger onClick={messagesDelete}>Yes</Button>,
      ]}
      >
Are you sure you want to Delete the Message? <b>{messages && messages.Messages}</b>?
      </Modal>
    </div>
  );
}

export default Contact;