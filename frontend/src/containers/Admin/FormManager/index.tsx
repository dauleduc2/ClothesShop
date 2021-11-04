import { Link } from 'react-router-dom';
import DetailIcon from '../../../components/common/icon/Detail';
import { AdminFormRoute } from '../../../consts/routes';
import { Route, Switch } from 'react-router';
import * as React from 'react';
import { store } from '../../../redux';
import { sizeThunk } from '../../../redux/size/sizeThunk';
import { typeThunk } from '../../../redux/type/typeThunk';
import { colorThunk } from '../../../redux/color/colorThunk';
import { featureList } from '../../../consts/UI';

interface FormManagerProps {}

const FormManager: React.FunctionComponent<FormManagerProps> = () => {
    console.log('rerendered');
    //calling api to get all size, color, type
    React.useLayoutEffect(() => {
        store.dispatch(sizeThunk.adminGetAllSize());
        store.dispatch(typeThunk.adminGetAllType());
        store.dispatch(colorThunk.adminGetAllColor());
        return () => {};
    }, []);
    return (
        <div className="flex flex-1 min-h-0 overflow-hidden">
            {/* Main area */}
            <main className="flex-1 min-w-0 border-t border-gray-200 lg:flex">
                <section
                    aria-labelledby="primary-heading"
                    className="flex flex-col flex-1 h-full min-w-0 lg:order-last"
                >
                    <Switch>
                        {AdminFormRoute.map((route) => {
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
                        })}
                    </Switch>
                </section>

                {/* Secondary column (hidden on smaller screens) */}
                <aside className="hidden lg:block lg:flex-shrink-0 lg:order-first">
                    <div className="relative flex flex-col h-full p-4 overflow-y-auto bg-gray-100 border-r border-gray-200 w-96">
                        {/* Your content */}
                        <ul className="flex flex-col justify-start w-full h-full max-h-44">
                            {featureList.map((feature, index) => {
                                const { icon: IconComponent } = feature;
                                return (
                                    <li
                                        key={feature.title}
                                        className={`col-span-1 ${
                                            index !== 0 && 'mt-5'
                                        } bg-white divide-y divide-gray-200 rounded-lg shadow-lg intro-y`}
                                    >
                                        <div className="flex items-center justify-between w-full p-6 space-x-6">
                                            <div className="flex-1 ">
                                                <p className="mt-1 text-base font-bold text-gray-700 ">
                                                    {feature.title}
                                                </p>
                                                <p className="mt-1 text-sm text-gray-500 ">{feature.description}</p>
                                            </div>

                                            <div
                                                className={`p-1 text-white bg-${
                                                    feature.isDanger ? 'red' : 'green'
                                                }-400 rounded-full`}
                                            >
                                                <IconComponent />
                                            </div>
                                        </div>
                                        <div>
                                            <div className="flex -mt-px divide-x divide-gray-200">
                                                <div className="flex flex-1 w-0">
                                                    <Link
                                                        to={feature.to}
                                                        className="relative inline-flex items-center justify-center flex-1 w-0 py-4 -mr-px text-sm font-medium text-gray-700 border border-transparent rounded-bl-lg hover:text-gray-500"
                                                    >
                                                        <div className="">
                                                            <DetailIcon />
                                                        </div>
                                                        <span className="ml-3">ADD</span>
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                </aside>
            </main>
        </div>
    );
};

export default FormManager;
