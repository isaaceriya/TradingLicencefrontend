import React from 'react';
import { Form, Input, Button } from 'antd';
import { status, json } from '../utilities/requestHandlers';


/**
 * This file allows volunteers to add new dogs by using a POST request 
 * Users can also search for data which gets filtered for the
 * 
 */


// add some layout to keep the form organised on different screen sizes
const formItemLayout = {
  labelCol: { xs: { span: 24 }, sm: { span: 6 } },
  wrapperCol: { xs: { span: 24 }, sm: { span: 12 } }
};
const tailFormItemLayout = {
  wrapperCol: { xs: { span: 24, offset: 0 }, sm: { span: 16, offset: 6 } },
};

// define validation rules for the form fields
const titlesRules = [
    {required: true, message: 'Please Enter a title' }
];


const summaryRules = [
    { required: true, message: 'Enter a summary' }   
];


const imageurlRules = [
    { required: true, message: 'Enter number' }   
];



/**
 * Registration form component for app signup.
 * this is done by posting the data
 */
class DogForm extends React.Component {

/**
 * Allows the user to click on a button
 * @param {number} props- Takes in the integer props
 * @returns {object} - Returns true or false
 */
  constructor(props) {
      super(props);
      this.onFinish = this.onFinish.bind(this);
  }

/**
 * Collects the values from the database
 * @param {number} values - Takes the values from the database
 * @returns {object} - database information
 */
  onFinish = (values) => {
    console.log('Received values of form: ', values);
    const { confirm, ...data } = values;  // ignore the 'confirm' value in data sent
    fetch('https://sardine-shock-3000.codio-box.uk/api/v1/articles', {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json"
        }        
    })
    .then(status)
    .then(json)
    .then(data => {
        console.log(data);
        alert("Application sent")
    })
    .catch(err => {
        alert("Error Sending application");
    });  
  };
  
  
  
// The function below is what shows the form and allows it to be presented which each having a name which is what is used to 
// To store in the database, a label to show and rules to validate
  render() {
    return (
      <Form {...formItemLayout} name="dogregister" onFinish={this.onFinish} scrollToFirstError >
      <h1 className='my-h1-landing'>Trade Licence Application</h1>
        
        <Form.Item name="title" label="Company Name" rules={titlesRules} >
            <Input />
        </Form.Item>


        <Form.Item name="summary" label="Company Address" rules={summaryRules} >
            <Input />
        </Form.Item>

        <Form.Item name="imageURL" label="Company Number" rules={imageurlRules} >
            <Input />
        </Form.Item>




        <Form.Item {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit">
                Submit
            </Button>
        </Form.Item>
      </Form>
    );
  };
};

export default DogForm;