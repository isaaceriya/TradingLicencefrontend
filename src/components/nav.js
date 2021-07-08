import React from 'react';
import {useContext} from 'react';
import { Menu } from 'antd';
import { Link } from "react-router-dom";
import UserContext from '../contexts/user';


/**
 * Navigation of the site
 * @param {boolean} props - Check if user is logged in
 * @returns {object} - database information
 */
function Nav(props) {
  const context = useContext(UserContext);
  const loggedIn = context.user.loggedIn;
  console.log(context);
  let LoginNav;
  if (!loggedIn) {
    LoginNav = (
      <>
      <Menu.Item key="2">
        <Link to="/register">Register</Link>
      </Menu.Item>
      <Menu.Item key="3">
        <Link to="/login">Login</Link>
      </Menu.Item>
      </>
    )
  } else {
    LoginNav = (
      <>
      <Menu.Item key="2"><Link to="/account">Apply</Link></Menu.Item>
      <Menu.Item key="4"><Link to="/upload">ApplicationPanel</Link></Menu.Item>
      <Menu.Item key="5"><Link to="/contactadmin">AdminMessages</Link></Menu.Item>
      <Menu.Item key="6"><Link to="/post">Contact</Link></Menu.Item>
      <Menu.Item key="3" onClick={context.logout}>
        <Link to="/">Logout</Link>
      </Menu.Item>
      </>
    )
  }
  return (
    <>
    <div className="logo" />
    <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
      <Menu.Item key="1"><Link to="/">Home</Link></Menu.Item>
      {LoginNav}
    </Menu>
    </>
  );
}

export default Nav;