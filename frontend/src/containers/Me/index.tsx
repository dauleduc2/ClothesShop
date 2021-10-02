import * as React from "react";
import MePage from "../../components/Me";

interface MeProps {}

const Me: React.FunctionComponent<MeProps> = () => {
    return (
        <div className="flex flex-col items-center w-full overflow-y-auto bg-gray-100 sm:bg-sky-800 sm:justify-center h-contentHeight">
            <MePage />
        </div>
    );
};

export default Me;
