// src/components/UserAdminCard.jsx
import React from "react";

const UserCard = ({ user }) => {
    return (
        <div className="bg-white rounded shadow p-4 flex flex-col items-center">
            <img
                src={user.image ? user.image : "/avatar.jpg"}
                alt={user.name}
                className="w-full h-64 object-cover mb-4 rounded"
            />
            <h2 className="text-xl font-bold mb-2 text-center">
                {user.name}
            </h2>
            <p className="text-gray-700 mb-2 text-center">{user.email}</p>
        </div>
    );
};

export default UserCard;