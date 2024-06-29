import React, {useContext, useEffect, useState} from "react";
import { UserContext } from "../App";
import axios from "axios"; //JS Library for making HTTP requests from a web browser or Node.js
import "../assests/css/userProfile.css";
import Navbar from "../components/Navbar";

function UserProfile() {
    const {user} = useContext(UserContext);
    const [profile, setProfile] = useState(null);

    useEffect(() => {
        if (user) {
            axios
            .get(`/profile/${user._id}`, {
                headers: {Authorization: `Bearer ${localStorage.getItem("token")}`},
            })
            .then((response) => {
                setProfile(response.data.user);
            })
            .catch((error) => {
                console.error("Error fetching profile data", error);
            });
        }
    }, [user]);

    if(!user) {
        return <p>Please log in to view your profile</p>
    }

    return (
        <>
        <Navbar />
        <div className="profile-container">
            <h2>User Profile</h2>
            {profile ? (
                <div>
                    <p><strong>Name:</strong> {profile.name}</p>
                    <p><strong>Email:</strong> {profile.email}</p>
                    <p><strong>Bio:</strong> {profile.bio}</p>
                </div>
            ) : (
                <p>Loading profile...</p>
            )}
        </div>
        </>
        
    );
}

export default UserProfile;