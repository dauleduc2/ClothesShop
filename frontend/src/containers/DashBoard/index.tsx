// @flow
import * as React from "react";
import ContentRoute from "../../components/ContentRoute";
import Navigation from "../../components/Navbar";
import routes from "../../consts/routes";
type Props = {};
export const DashBoard = (props: Props) => {
    const renderContent = () => {
        let result;
        result = routes.map((route) => <ContentRoute route={route} />);
        return result;
    };
    return (
        <div className="flex">
            <Navigation />
            <div className="text-4xl">{renderContent()}</div>
        </div>
    );
};
