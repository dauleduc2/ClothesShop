import { NavLink } from "react-router-dom";
import navigationRoutes from "../../consts/routes";
interface NavigationProps {}

const Navigation: React.FunctionComponent<NavigationProps> = () => {
    const renderSelection = () => {
        let result;
        result = navigationRoutes.map((route) => {
            const { icon: IconComponent } = route;
            return (
                <li className="mb-4 rounded-lg">
                    <NavLink
                        to={route.to}
                        exact={route.exact}
                        className="flex items-center gap-4 px-4 py-3 text-sm font-light text-gray-700 rounded-lg"
                        activeClassName="bg-gradient-to-tr from-light-blue-500 to-light-blue-700 text-white shadow-md"
                    >
                        <IconComponent />
                        {route.buttonName}
                    </NavLink>
                </li>
            );
        });

        return result;
    };
    return (
        <div
            className={`h-screen top-0 md:left-0 overflow-y-auto flex-row flex-nowrap overflow-hidden shadow-xl bg-white w-64 z-10 py-4 px-6 transition-all duration-300`}
        >
            <div className="relative flex-col items-stretch min-h-full px-0 flex-nowrap">
                <a
                    href="https://www.facebook.com/"
                    className="inline-block w-full mt-2 text-center"
                >
                    <div className="text-3xl">Clothes Shop</div>
                </a>
                <div className="flex flex-col">
                    <hr className="min-w-full my-4" />

                    <ul className="flex flex-col min-w-full list-none">
                        {renderSelection()}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Navigation;
