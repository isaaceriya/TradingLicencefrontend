import React from 'react';
import { Form, Input, Button } from 'antd';
import { status, json } from '../utilities/requestHandlers';
import UserContext from '../contexts/user';
import { Redirect } from 'react-router-dom';

/**
 * This file allows users to search by using a GET request 
 * Users can also search for data which gets filtered for the
 * 
 */


// Here we add some layout to keep the form organised on different screen sizes
const formItemLayout = {
  labelCol: { xs: { span: 24 }, sm: { span: 6 } },
  wrapperCol: { xs: { span: 24 }, sm: { span: 12 } }
};
const tailFormItemLayout = {
  wrapperCol: { xs: { span: 24, offset: 0 }, sm: { span: 16, offset: 6 } },
};

// Here we define validation rules for the form fields
const passwordRules = [
    { required: true, message: 'Please input your password!' }
];

const usernameRules = [
    { required: true, message: 'Please input your username!', whitespace: true }
]

/**
 * Login form component for app signup.
 */

class LoginForm extends React.Component {

/**
 * Collects the values from the database
 * @param {props} props - Takes the values from the database
 * @returns {boolean} - True or False
 */
    constructor(props) {
        super(props);
        this.login = this.login.bind(this);
    }

    state = {redirect: null}

    static contextType = UserContext;

  
/**
 * Collects the values from the database
 * @param {string} values - Takes the username and password and stores them in the database
 * @returns {object} - database information
 */
  // using basc auth
    login(values) {
        const {username, password} = values;
        console.log(`logging in user: ${username}`)
        fetch('https://sardine-shock-3000.codio-box.uk/api/v1/users/login', {
            method: "POST",
            headers: {
                "Authorization": "Basic " + btoa(username + ":" + password)
            }        
        })
        .then(status)
        .then(json)
        .then(user => {
            console.log('Logged in successfully');
            console.log(user);
            user.password = password;  // stores in context for future API calls
            this.context.login(user);
            this.setState({redirect:'/'});
        })
        .catch(error => {
            // shows a formatted error message
            console.log('Login failed');
        });  
    }
// returns the login form    
  render() {
    if (this.state.redirect) {
        return <Redirect to={this.state.redirect} />
    }    
    return (
        <Form {...formItemLayout} name="login" onFinish={this.login} scrollToFirstError >
            <Form.Item name="username" label="Username" rules={usernameRules} >
                <Input />
            </Form.Item>
            <Form.Item name="password" label="Password" rules={passwordRules} hasFeedback >
                <Input.Password />
            </Form.Item>
            <Form.Item {...tailFormItemLayout}>
                <Button type="primary" htmlType="submit">Login</Button>
            </Form.Item>
        </Form>
    );
  };
};

export default LoginForm;
