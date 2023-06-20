import React from 'react'
import { useNavigate } from "react-router-dom";
import { Button } from 'antd';

const EmployeeListButton = () => {
    const navigate = useNavigate()

    const navEmployee = () => {
        navigate('/EmployeeList');
    }

    return (
        <Button type="primary" onClick={() => { navEmployee() }}>
            Employees
        </Button>
    )
}

export default EmployeeListButton;