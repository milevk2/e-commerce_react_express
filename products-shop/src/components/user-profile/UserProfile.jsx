import {useContext } from "react";
import { LoggerContext } from "../../LoggerContext.jsx";


const UserProfile = () => {

    const {userName, userEmail, userId} = useContext(LoggerContext);

    return (
        <div className="wrapper flexCenterColumn">
            <div>
                UserName: {userName} <button className="defaultButton">Change Username</button>
            </div>
            <div>
                Email: {userEmail}
            </div>
            <div>
                Password <button className="defaultButton">Change Password</button>
            </div>
        </div>
    );
};

export default UserProfile;