import * as React from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import NotFoundPage from '../../components/NotFoundPage';
import { RootState } from '../../redux';
import { UserState } from '../interfaces/Redux/user';
interface ProtectRouteWrapperProps {
    isLoginRequire?: boolean;
    isAdminRequire?: boolean;
    to?: string;
}
function getCookie(cname: string) {
    let name = cname + '=';
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) === 0) {
            return c.substring(name.length, c.length);
        }
    }
    return '';
}
const ProtectRouteWrapper: React.FunctionComponent<ProtectRouteWrapperProps> = ({
    children,
    isLoginRequire = false,
    isAdminRequire = false,
}) => {
    const userState = useSelector<RootState, UserState>((state) => state.user);
    const history = useHistory();
    const [isAccess, setIsAccess] = React.useState(true);

    React.useEffect(() => {
        //
        if (isLoginRequire && !getCookie('x-auth-token')) {
            setIsAccess(false);
            return;
        }
        if (isAdminRequire && userState.user.role === 'CUSTOMER') {
            setIsAccess(false);
            return;
        }
        setIsAccess(true);
    }, [userState.isLogin, userState.user.role, isLoginRequire, isAdminRequire, history]);

    return <> {isAccess ? children : <NotFoundPage />} </>;
};

export default ProtectRouteWrapper;
