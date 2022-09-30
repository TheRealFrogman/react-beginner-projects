import React, { useEffect, useState } from "react";
import "./index.scss";
import { Success } from "./components/Success";
import { Users } from "./components/Users";

// Тут список пользователей: https://reqres.in/api/users

function App() {
    const [userList, setUserList] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [inviteList, setInviteList] = useState([]);
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        fetch("https://reqres.in/api/users")
            .then((response) => response.json())
            .then((result) => {
                setUserList(result.data);
            })
            .catch((err) => console.warn(err))
            .finally(() => setLoading(false));
    }, []);

    const handleInvite = (id) => {
        if (inviteList.includes(id))
            setInviteList((prev) => prev.filter((_id) => _id !== id));
        else setInviteList((prev) => [...prev, id]);
    };

    const handleSuccess = (bool) => {
        if (inviteList.length) setSuccess(bool);
    };

    return (
        <div className="App">
            {success ? (
                <Success
                    count={inviteList.length}
                    handleSuccess={() => handleSuccess(false)}
                />
            ) : (
                <Users
                    isLoading={isLoading}
                    userList={userList}
                    handleInvite={handleInvite}
                    inviteList={inviteList}
                    handleSuccess={() => handleSuccess(true)}
                />
            )}
        </div>
    );
}

export default App;
