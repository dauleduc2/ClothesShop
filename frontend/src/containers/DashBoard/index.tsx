import ContentRoute from '../ContentRoute';
import AutoLoginWrapper from '../../common/Auth/AutoLoginWrapper';
import Navbar from '../Navbar';
import { routes } from '../../consts/routes';
type DashBoardProps = {};
export const DashBoard = (props: DashBoardProps) => {
    const renderContent = () => {
        let result;
        result = routes.map((route) => <ContentRoute route={route} key={route.buttonName} />);
        return result;
    };
    return (
        <div className="flex flex-col min-h-screen text-4xl">
            <Navbar />
            <AutoLoginWrapper>{renderContent()}</AutoLoginWrapper>
        </div>
    );
};
