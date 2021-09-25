import ContentRoute from "../../components/ContentRoute";
import Navigation from "../../components/Navbar";
import routes from "../../consts/routes";
type Props = {};
export const DashBoard = (props: Props) => {
    const renderContent = () => {
        let result;
        result = routes.map((route) => (
            <ContentRoute route={route} key={route.buttonName} />
        ));
        return result;
    };
    return (
        <div className="flex w-full bg-sky-900">
            <Navigation />
            <div className="text-4xl text-center w-full h-full">
                {renderContent()}
            </div>
        </div>
    );
};
