import React from 'react'
import { useNavigate } from "react-router-dom";
import { Button } from 'antd';

const UserListButton = () => {
    const navigate = useNavigate()

    const navEmployee = () => {
        navigate('/UserList');
    }

    return (
        <Button type="primary" onClick={() => { navEmployee() }}>
            Users
        </Button>
    )
}

export default UserListButton;