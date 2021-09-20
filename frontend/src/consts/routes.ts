import CategoryPage from "../components/Category";
import HomePage from "../components/HomePage";
import MePage from "../components/Me";

interface Route {
    to: string;
    exact: boolean;
    buttonName: string;
    component?: any;
}

type routeList = Route[];

const routes: routeList = [
    {
        to: "/",
        exact: true,
        buttonName: "Home page",
        component: HomePage,
    },
    {
        to: "/category",
        exact: true,
        buttonName: "Category",
        component: CategoryPage,
    },
    {
        to: "/me",
        exact: true,
        buttonName: "Me",
        component: MePage,
    },
];

export default routes;
