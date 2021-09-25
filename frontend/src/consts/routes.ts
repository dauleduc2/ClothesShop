import CategoryPage from "../components/Category";
import HomePage from "../components/HomePage";
import MePage from "../components/Me";
import LoginPage from "../components/Login";
import HomeIcon from "@mui/icons-material/Home";
import CategoryIcon from "@mui/icons-material/Category";
import PersonIcon from "@mui/icons-material/Person";
interface Route {
    to: string;
    exact: boolean;
    buttonName: string;
    component?: any;
    icon?: any;
}
type routeList = Route[];

const navigationRoutes: routeList = [
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
        to: "/me",
        exact: true,
        buttonName: "Me",
        component: MePage,
        icon: PersonIcon,
    },
    {
        to: "/login",
        exact: true,
        buttonName: "Login",
        component: LoginPage,
        icon: PersonIcon,
    },
];

export default navigationRoutes;
