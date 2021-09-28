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
        <div className="flex w-full bg-gradient-to-t from-blue-100 to-blue-200">
            <Navigation />
            <div className="w-full h-full text-4xl text-center text-white">
                {renderContent()}
            </div>
        </div>
    );
};
