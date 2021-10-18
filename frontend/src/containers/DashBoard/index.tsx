import AutoLoginWrapper from '../../common/Auth/AutoLoginWrapper';
import Navbar from '../Navbar';
import { routes } from '../../consts/routes';
import { Route, Switch } from 'react-router';
type DashBoardProps = {};
export const DashBoard = (props: DashBoardProps) => {
    const renderContent = () => {
        let result;
        result = routes.map((route, index) => {
            const { component: MyComponent } = route;
            return (
                <Route
                    key={route.to}
                    path={route.to}
                    exact={route.exact}
                    render={(routeProps) => {
                        return <MyComponent {...routeProps} />;
                    }}
                ></Route>
            );
        });

        return result;
    };
    return (
        <div className="flex flex-col min-h-screen text-4xl">
            <Navbar />
            <AutoLoginWrapper>
                <Switch>{renderContent()}</Switch>
            </AutoLoginWrapper>
        </div>
    );
};
