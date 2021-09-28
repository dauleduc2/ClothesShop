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
        <div className="flex w-full text-white bg-gradient-to-bl from-light-blue-500 to-light-blue-700">
            <Navigation />
            <div className="text-4xl text-center ">{renderContent()}</div>
        </div>
    );
};
