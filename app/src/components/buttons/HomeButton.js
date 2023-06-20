import React from 'react'
import { useNavigate } from "react-router-dom";
import { Button } from 'antd';

import { HomeFilled } from '@ant-design/icons';
const HomeButton = () => {
    const navigate = useNavigate()

    const returnHome = () => {
        navigate('/');
    }

    return (
        <Button type="primary" onClick={() => { returnHome() } }>
            <HomeFilled />
        </Button>
    )
}

export default HomeButton;