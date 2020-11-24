import React from 'react';
import {ListGroup} from 'react-bootstrap';
import {Link} from 'react-router-dom';

const SidebarProfile = ({isActive}) =>{

    //alert(isActive)
    return(
       <ListGroup>
        <ListGroup.Item active={isActive=='profile'?true:false}  as={Link} to={'/profile'} >Account Information</ListGroup.Item>
        <ListGroup.Item active={isActive=='password'?true:false} as={Link} to={'/profile/change-password'}>Change Password</ListGroup.Item>
       </ListGroup>
    )

}

export default SidebarProfile;
