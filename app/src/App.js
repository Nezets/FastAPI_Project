import { App as AntDApp } from 'antd';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './components/pages/Login';
import UserList from './components/pages/UserList';
import NoPage from './components/pages/NoPage';
import EmployeeList from './components/pages/EmployeeList';

const App = () => {
    return (
        <AntDApp>
            <BrowserRouter>
                <Routes>
                    <Route index element={<Login />} />
                    <Route path="/UserList" element={<UserList />} />
                    <Route path="/EmployeeList" element={<EmployeeList/> } />
                    <Route path="*" element={<NoPage />} />
                </Routes>
            </BrowserRouter>
        </AntDApp>
    );
}

export default App;