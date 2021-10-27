import { NavLink } from 'react-router-dom';
import { adminRoute } from '../../consts/routes';
interface AdminPageProps {}

const AdminPage: React.FunctionComponent<AdminPageProps> = ({ children }) => {
    return (
        <>
            <div className="flex flex-col flex-1">
                {/* Bottom section */}
                <div className="flex flex-1 min-h-0 pt-16 overflow-hidden">
                    {/* Narrow sidebar*/}
                    <nav
                        aria-label="Sidebar"
                        className="hidden md:block md:flex-shrink-0 md:bg-gray-800 md:overflow-y-auto"
                    >
                        <div className="relative flex flex-col w-20 p-3 space-y-3">
                            {adminRoute.map((item) => (
                                <NavLink
                                    key={item.to}
                                    to={item.to}
                                    className="inline-flex items-center justify-center flex-shrink-0 text-gray-400 rounded-lg h-14 w-14 hover:bg-gray-700"
                                    activeClassName="flex-shrink-0 inline-flex items-center justify-center h-14 w-14 rounded-lg bg-gray-900 text-white"
                                >
                                    <item.icon className="w-6 h-6 " aria-hidden="true" />
                                </NavLink>
                            ))}
                        </div>
                    </nav>

                    {/* Main area */}
                    <main className="flex-1 min-w-0 p-10 border-t border-gray-200 lg:flex">{children}</main>
                </div>
            </div>
        </>
    );
};

export default AdminPage;
