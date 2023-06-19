import React, { useEffect, useState } from 'react';
import { Table, Button, Modal } from 'antd';
import axios from 'axios';

const RegisterUserButton = () => {



    return (
        <>
            <Modal title="Add User" open={isAddModalOpen} onCancel={handleCancel} footer={null}>
                <AddUserForm />
            </Modal>
        </>
    )
}

export default RegisterUserButton;