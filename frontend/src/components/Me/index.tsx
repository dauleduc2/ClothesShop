import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";

interface MePageProps {}

const MePage: React.FunctionComponent<MePageProps> = () => {
    const userInfo = {
        username: "kainesv86",
        fullname: "Kainé Phạm",
        email: "kainesv86@gmail.com",
        createDate: "19-11-2001",
        avatarUrl: "/images/avatar.png",
    };

    return (
        <div className="flex items-center justify-center overflow-y-auto shadow-md h-contentHeight">
            <div className="mr-4">
                <div className="p-10 mb-4 text-3xl font-semibold text-left bg-gray-100 rounded-t text-sky-800">
                    <p>Information</p>
                </div>

                <div className="flex">
                    <div className="flex p-20 mr-4 bg-gray-100 rounded-bl w-180">
                        <ul className="mr-4 text-lg text-right text-gray-600">
                            <li className="mb-10">
                                <div className="flex text-xl font-medium">
                                    <p className="w-32 mr-4 text-right text-blue-900">
                                        Username
                                    </p>
                                    <p className="w-auto text-left text-gray-800">
                                        {userInfo.username}
                                    </p>
                                </div>
                            </li>
                            <li className="mb-10">
                                <div className="flex text-xl font-medium">
                                    <p className="w-32 mr-4 text-right text-blue-900">
                                        Fullname
                                    </p>
                                    <p className="w-auto text-left text-gray-800">
                                        {userInfo.fullname}
                                    </p>
                                </div>
                            </li>
                            <li className="mb-10">
                                <div className="flex text-xl font-medium">
                                    <p className="w-32 mr-4 text-right text-blue-900">
                                        Email
                                    </p>
                                    <p className="w-auto text-left text-gray-800">
                                        {userInfo.email}
                                    </p>
                                </div>
                            </li>
                            <li className="mb-10">
                                <div className="flex text-xl font-medium">
                                    <p className="w-32 mr-4 text-right text-blue-900">
                                        Create Date
                                    </p>
                                    <p className="w-auto text-left text-gray-800">
                                        {userInfo.createDate}
                                    </p>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div className="flex flex-col items-center justify-center p-20 bg-gray-100 rounded-br">
                        <div className="mb-8">
                            <Avatar
                                alt={userInfo.username}
                                src={userInfo.avatarUrl}
                                sx={{ width: 160, height: 160 }}
                            />
                        </div>
                        <Button size="large">Update information</Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MePage;
