/* eslint-disable react/no-array-index-key */
/* eslint-disable global-require */
/* eslint-disable react/prop-types */
import React from 'react';
import styled from 'styled-components';
import { Nav, Accordion } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import { connect } from 'react-redux';
import get from 'lodash/get';

const Brand = styled.div`
  display: flex;
  text-align: center;
  justify-content: center;
  h3 {
    margin: 0;
    padding: 0;
    align-self: center;
    font-size: 14pt;
    margin-left: 5px;
  }
`;

const Navigation = styled.div`
  & {
    .nav {
      padding-left: 15px;
      a.nav-link {
        color: #cccccc;
        font-weight: bold;
      }
      a.nav-link.active {
        /* background: rgba(104, 24, 219, 0.3); */
        color: #6818db;
        border-radius: 3px 0px 0px 3px;
      }
    }
  }
`;

const NavigationDropdown = styled.div`
  padding-left: 15px;
`;

const SidebarContent = ({ isAuthenticated, menus, role }) => {
  // eslint-disable-next-line prefer-const
  let location = useLocation();

  const isActive = (menu) => {
    const path = menu.to;
    return location.pathname.includes(path) || menu.active;
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <Navigation>
      <Brand className="p-3">
        <img
          style={{ maxHeight: 95 }}
          src={'/logo.jpg'}
          alt="App Logo"
        />
      </Brand>
      <Nav defaultActiveKey="/home" className="flex-column">
        <Accordion>
          {menus &&
            menus.map((menu, key) => {
              if (menu.menus && menu.menus.length > 0) {
                if (!menu.role.includes(parseInt(role))) {
                  return null;
                }
                return (
                  <>
                    <Accordion.Toggle key={key} as={Nav.Link} eventKey={key}>
                      {
                        menu.icon && (
                          <i className={`${menu.icon}`}></i>
                        )
                      }
                      &nbsp;
                      {menu.title}
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey={key}>
                      <NavigationDropdown>
                        {menu.menus.map((m, k) => {
                          if (!m.role.includes(parseInt(role))) {
                            return null;
                          }
                          return (
                            <Nav.Link
                              key={k}
                              as={Link}
                              active={isActive(m)}
                              to={m.to}
                              className="text-capitalize">
                              {
                                m.icon && (
                                  <i className={`${m.icon}`}></i>
                                )
                              }
                              &nbsp;
                              {m.title}
                            </Nav.Link>
                          );
                        })}
                      </NavigationDropdown>
                    </Accordion.Collapse>
                  </>
                );
              } else {
                if (!menu.role.includes(parseInt(role))) {
                  return null;
                }
                return (
                  <Nav.Link
                    key={key}
                    as={Link}
                    active={isActive(menu)}
                    to={menu.to}
                    className="text-capitaliz">
                    {
                      menu.icon && (
                        <i className={`${menu.icon}`}></i>
                      )
                    }
                    &nbsp;
                    {menu.title}
                  </Nav.Link>
                );
              }
            })}
        </Accordion>
      </Nav>
    </Navigation>
  );
};

const mapStateToProps = ({ app }) => {
  return app;
};

export default connect(mapStateToProps, null)(SidebarContent);
