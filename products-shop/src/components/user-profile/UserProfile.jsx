import { useState } from "react";
import jwtParser from "../../lib/jwtParser.js";


const UserProfile = () => {

   const [userData, setUserData ]= useState (jwtParser());


    return (
        <div className="wrapper flexCenterColumn">
            <div>
                UserName: {userData.userName} <button className="defaultButton">Change Username</button>
            </div>
            <div>
                Email: {userData.email}
            </div>
            <div>
                Password <button className="defaultButton">Change Password</button>
            </div>
        </div>
    );
};

export default UserProfile;