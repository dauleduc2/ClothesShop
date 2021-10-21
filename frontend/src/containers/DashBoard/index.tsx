import AutoLoginWrapper from '../../common/HOC/AutoLoginWrapper';
import Navbar from '../Navbar';
import { routes } from '../../consts/routes';
import { Route, Switch } from 'react-router';
import ProtectRouteWrapper from '../../common/HOC/ProtectRouteWrapper';
type DashBoardProps = {};
export const DashBoard = (props: DashBoardProps) => {
    const renderContent = () => {
        let result;
        result = routes.map((route) => {
            const { component: MyComponent, isAdminRequire, isLoginRequire } = route;
            return (
                <Route
                    key={route.to}
                    path={route.to}
                    exact={route.exact}
                    render={(routeProps) => {
                        return (
                            <ProtectRouteWrapper isAdminRequire={isAdminRequire} isLoginRequire={isLoginRequire}>
                                <MyComponent {...routeProps} />
                            </ProtectRouteWrapper>
                        );
                    }}
                ></Route>
            );
        });

        return result;
    };
    return (
        <div className="flex flex-col flex-1 min-h-screen text-4xl">
            <AutoLoginWrapper>
                <Navbar />
                <Switch>{renderContent()}</Switch>
            </AutoLoginWrapper>
        </div>
    );
};
