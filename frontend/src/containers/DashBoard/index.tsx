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
        <div className="flex w-full ">
            <div className="flex flex-col w-full h-screen text-4xl text-center">
                <Navbar />
                <AutoLoginWrapper>{renderContent()}</AutoLoginWrapper>
            </div>
        </div>
    );
};
