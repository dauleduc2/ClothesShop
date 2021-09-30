import Avatar from "@mui/material/Avatar";

interface MePageProps {}

const MePage: React.FunctionComponent<MePageProps> = () => {
    return (
        <div className="flex justify-center items-center h-screen">
            <div className="border-2 border-red-600 bg-white h-96 w-96">
                Hello
            </div>
            <div className="flex items-center justify-center border-2 border-red-600 bg-white h-96 w-60">
                <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
            </div>
        </div>
    );
};

export default MePage;
