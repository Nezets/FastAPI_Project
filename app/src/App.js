import { App as AntDApp } from 'antd';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './components/Login';
import UserList from './components/UserList';
import NoPage from './components/NoPage';

const App = () => {
    return (
        <AntDApp>
            <BrowserRouter>
                <Routes>
                    <Route index element={<Login />} />
                    <Route path="/UserList" element={<UserList />} />
                    <Route path="*" element={<NoPage />} />
                </Routes>
            </BrowserRouter>
        </AntDApp>
    );
}

export default App;