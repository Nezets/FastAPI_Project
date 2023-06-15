import { Outlet} from "react-router-dom";
import { Anchor} from 'antd';

const Layout = () => {
    return (
        <>
            <Anchor
                direction="horizontal"
                items={[
                    {
                        key: 'login',
                        href: '/',
                        title: 'Login',
                    },
                    {
                        key: 'userlist',
                        href: '/UserList',
                        title: 'UserList'
                    },
                    {
                        key: 'nopage',
                        href: '/random',
                        title: 'NoPage'
                    },
                ]}
            />

            <Outlet />
        </>
    )
};

export default Layout;