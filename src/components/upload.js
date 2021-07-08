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
const baseUrl="https://sardine-shock-3000.codio-box.uk/api/v1/articles";
// Layout
const layout={
  labelCol:{
    span: 8
  },
  wrapperCol:{
    span: 16
  }
};

function Upload() {
// authorization to make sure that the user is logged in 
  const context = useContext(UserContext);
  const user = context.user;
  console.log("current user in UserContext is", user);
  
  const [profile, setProfile] = React.useState({});
  
  

// Presents the Headers
  const [data, setData]=useState([]);
  const [editArticles, setEditArticles]=useState(false);
  const [deleteArticles, setDeleteArticles]=useState(false);
  const [articles, setArticles]=useState({
    ID: '',
    title: '',
    summary: '',
    imageURL: '',
    status: ''
    
  })

// if edit is clicked do this 
  const openeditArticles=()=>{
    setEditArticles(!editArticles);
  }
// if delete is clicked do this 
  const opendeleteArticles=()=>{
    setDeleteArticles(!deleteArticles);
  }

  const handleChange=e=>{
    const {name, value}=e.target;
    setArticles({...articles,
    [name]: value});
    console.log(articles);
  }

  const selectArticles=(articles, cases)=>{
    setArticles(articles);
    (cases==="Edit")?openeditArticles():opendeleteArticles()
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
      title: "Company Address",
      dataIndex: "summary",
      key: "summary",
    }, 
    {
      title: "Company Number",
      dataIndex: "imageURL",
      key: "imageURL",
    },
    {
      title: "status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Actions",
      key: "actions",
      render: (row) => (
        <>
          <Button type="primary" onClick={()=>selectArticles(row, "Edit")}>Edit</Button> {"   "}
          <Button type="primary" danger onClick={()=>selectArticles(row, "Delete")}>
            Delete
          </Button>
        </>
      ),
    },
  ];
// This is used to receive the data by using a GET call
  const articlesGet=async()=>{
    await axios.get(baseUrl)
      .then(response=>{
      setData(response.data);
    }).catch(error=>{
      console.log(error);
    })
  }
// This is used to update the data by using a PUT call  
  const articlesPut=async()=>{
    const id = articles.ID
    await axios.put(baseUrl+"/"+ id, articles,{
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
        if(element.id===articles.ID){
          const {ID: id, title, summary, imageURL: imageurl} = articles
          return ({ id, title, summary, imageurl });
        } else {
          return element
        }
      });

      dataAuxiliar.map(element=>{
        if(element.id===articles.ID){
          element.title=articles.title;
          element.summary=articles.summary;
          element.imageurl = articles.imageURL;
        }
      });
      setData(dataAuxiliar);
      */
      openeditArticles();
      })
      .catch(error=>{
      console.log(error);
    })
  }

// This is used to delete the data by using a DELETE call          
      const articlesDelete=async()=>{
        await axios.delete(baseUrl+"/"+articles.ID,{
          headers: {
            authorization: 'Basic ' + btoa(user.username + ":" + user.password)  // allow authorization if user credentials is authorised
      },
        })
        .then(response=>{
          setData(data.filter(element=>element.test!==articles.title));
          opendeleteArticles();
        }).catch(error=>{
          console.log(error);
        })
          }

  useEffect(()=>{
    articlesGet();
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
    <h1 className='my-h1-landing'>Application Admin panel</h1>
         <br />
      <br />
      <br />
      <br />
      <Table columns={columns} dataSource={data}/>



      
      <Modal
      visible={editArticles}
      title="Edit Article"
      onCancel={openeditArticles}
      centered
      footer={[
        <Button onClick={openeditArticles}>Cancel</Button>,
        <Button type="primary" onClick={articlesPut}>Edit</Button>,
      ]}
      >
<Form {...layout}>
  <Item label="Company Name">
    <Input name="title" onChange={handleChange} value={articles.title}/>
  </Item>


  <Item label="Company Address">
    <Input name="summary" onChange={handleChange} value={articles && articles.summary}/>
  </Item>



  <Item label="Company Number">
    <Input name="imageURL" onChange={handleChange} value={articles && articles.imageURL}/>
  </Item>


  <Item label="status">
    <Input name="status" onChange={handleChange} value={articles && articles.status}/>
  </Item>
</Form>
      </Modal>


          
      <Modal
      visible={deleteArticles}
      onCancel={opendeleteArticles}
      centered
      footer={[
        <Button onClick={opendeleteArticles}>No</Button>,
        <Button type="primary" danger onClick={articlesDelete}>Yes</Button>,
      ]}
      >
Are you sure you want to Delete the Article? <b>{articles && articles.articles}</b>?
      </Modal>
    </div>
  );
}

export default Upload;