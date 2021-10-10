import Notification from '../../components/common/Notification';
import { DashBoard } from '../DashBoard';

function App() {
    return (
        <div className="flex">
            <DashBoard />
            <Notification />
        </div>
    );
}

export default App;
