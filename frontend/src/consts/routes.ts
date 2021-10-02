import CategoryPage from "../components/Category";
import HomePage from "../components/HomePage";

import MePage from "../containers/Me";
import LoginPage from "../containers/Login";
import HomeIcon from "@mui/icons-material/Home";
import CategoryIcon from "@mui/icons-material/Category";
import PersonIcon from "@mui/icons-material/Person";
import Register from "../containers/Register";
interface Route {
    to: string;
    exact: boolean;
    buttonName: string;
    component?: any;
    icon?: any;
}
type routeList = Route[];

export const navigationRoutes: routeList = [
    {
        to: "/",
        exact: true,
        buttonName: "Home page",
        component: HomePage,
        icon: HomeIcon,
    },
    {
        to: "/category",
        exact: true,
        buttonName: "Category",
        component: CategoryPage,
        icon: CategoryIcon,
    },
    {
        to: "/user/me",
        exact: true,
        buttonName: "Me",
        component: MePage,
        icon: PersonIcon,
    },
    {
        to: "/user/login",
        exact: true,
        buttonName: "Login",
        component: LoginPage,
        icon: PersonIcon,
    },
];

const anotherRoute: routeList = [
    {
        to: "/user/register",
        exact: true,
        buttonName: "Register",
        component: Register,
    },
];

export const finalRoute: routeList = [...anotherRoute, ...navigationRoutes];
