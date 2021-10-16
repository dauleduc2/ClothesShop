import { Route } from 'react-router';

interface CustomRoute {
    to: string;
    exact: boolean;
    component?: any;
}

interface ContentRouteProps {
    route: CustomRoute;
}

const ContentRoute: React.FunctionComponent<ContentRouteProps> = (props) => {
    const { component: MyComponent, to, exact } = props.route;
    return (
        <Route
            path={to}
            exact={exact}
            render={(routeProps) => {
                return <MyComponent {...routeProps} />;
            }}
        ></Route>
    );
};

export default ContentRoute;
