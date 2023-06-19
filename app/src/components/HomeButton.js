import React from 'react'
import { useNavigate } from "react-router-dom";
import { Button } from 'antd';

const HomeButton = () => {
    const navigate = useNavigate()

    const returnHome = () => {
        navigate('/');
    }

    return (
        <Button type="primary" onClick={() => { returnHome() } }>
            Return Home
        </Button>
    )
}

export default HomeButton;