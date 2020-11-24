/* eslint-disable react/prop-types */
/* eslint-disable */
import React, { useState, useEffect } from 'react';
import Sidebar from 'react-sidebar';
import { isMobile } from 'react-device-detect';
import { connect } from 'react-redux';
import { Navbar, Nav, NavDropdown, Button } from 'react-bootstrap';
import Avatar from 'react-avatar';
import { bindActionCreators } from 'redux';
import Swal from 'sweetalert2';
import SidebarContent from './SidebarContent';
import { getOut, getMe } from './action';
import { getMe as getMeAdmin } from './adminAction';
import { GET_ME } from './constants';
import { Link } from 'react-router-dom';

// eslint-disable-next-line no-shadow
const AppWrapper = ({
  children,
  isAuthenticated,
  me,
  getMe,
  getMeAdmin,
  role,
  getOut,
  title,
}) => {
  const [open, setopen] = useState(true);
  const [docked, setdocked] = useState(true);

  const sidebarStyle = {
    background: 'white',
    minWidth: 280,
  };

  useEffect(() => {
    if (isMobile) {
      setopen(false);
      setdocked(false);
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      console.log('the role is', role);
      if( role == 1) {
        //getOut();
        getMeAdmin().then((res) => {
          console.log(res)
          if (
            res.type === `${GET_ME}_FAIL` &&
            res.error &&
            (res.error.response.status === 403 ||
              res.error.response.status === 401)
          ) {
            Swal.fire(
              'Admin Session Expired!',
              'Your session is up, please sign in again.',
              'info',
            );
            getOut();
          }
        });
      }else{

        getMe().then((res) => {
          console.log(res)
          if (
            res.type === `${GET_ME}_FAIL` &&
            res.error &&
            (res.error.response.status === 403 ||
              res.error.response.status === 401)
          ) {
            Swal.fire(
              'Session Expired!',
              'Your session is up, please sign in again.',
              'info',
            );
            //getOut();
          }
        });

      }


    }
  }, [getMe, isAuthenticated, getOut]);

  if (!isAuthenticated) {
    return children;
  }

  return (
    <Sidebar
      sidebar={<SidebarContent />}
      open={open}
      docked={docked}
      sidebarClassName="sidebar-wrapper"
      contentClassName="sidebar-content"
      styles={{ sidebar: sidebarStyle }}
      shadow={false}
      onSetOpen={setopen}>
      <Navbar bg="light" fixed className="text-light">
        <Navbar.Brand className="text-primary font-weight-bold">
          {title}
        </Navbar.Brand>
        <Nav className="mr-auto" />
        <Nav>
          <NavDropdown
            title={
              <>
                <Avatar
                  size="50"
                  name={me && me.email}
                  round
                  className="mr-2"
                  src=''
                />
                {me && me.email}
              </>
            }
            id="basic-nav-dropdown"
            alignRight={true}>
            {
              role==0 && (
                <>
                  <NavDropdown.Item  as={Link} to='/profile'>My account</NavDropdown.Item>
                  <NavDropdown.Divider />
                </>
              )
            }

            <NavDropdown.Item as={Button} onClick={() => getOut()}>
              Logout
            </NavDropdown.Item>
          </NavDropdown>
        </Nav>
        {/* <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">

        </Navbar.Collapse> */}
      </Navbar>
      <div className="pb-3">{children}</div>
    </Sidebar>
  );
};

const mapStateToProps = ({ app: { isAuthenticated, me, title,role } }) => {
  return {
    isAuthenticated,
    me: me,
    role,
    title,
  };
};
const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ getOut, getMe,getMeAdmin}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(AppWrapper);
