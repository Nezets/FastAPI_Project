import { App as AntdApp } from 'antd';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './components/Login';
import Layout from './components/Layout';
import UserList from './components/UserList';
import NoPage from './components/NoPage';

const App = () => {
    return (
        <AntdApp>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Layout />}>
                        <Route index element={<Login />} />
                        <Route path="/UserList" element={<UserList />} />
                        <Route path="*" element={<NoPage />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </AntdApp>
    );
}

export default App;