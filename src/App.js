import React, { useEffect, useReducer, useState } from "react";
import "./index.scss";
import { Success } from "./components/Success";
import { Users } from "./components/Users";
import { fetchConditions, fetchReducer, INITIAL_STATE } from "./reducer";
// Тут список пользователей: https://reqres.in/api/users

function App() {
    // const [userList, setUserList] = useState([]);
    // const [isLoading, setLoading] = useState(true);
    const [inviteList, setInviteList] = useState([]);
    const [success, setSuccess] = useState(false);

    const [state, dispatch] = useReducer(fetchReducer, INITIAL_STATE);

    useEffect(() => {
        dispatch({ type: fetchConditions.fetch_start });
        fetch("https://reqres.in/api/users")
            .then((response) => response.json())
            .then((result) => {
                dispatch({
                    type: fetchConditions.fetch_success,
                    payload: result.data,
                });
            })
            .catch((err) => {
                dispatch({ type: fetchConditions.fetch_fail });
                console.warn(err);
            })
            .finally(() => {
                dispatch({ type: fetchConditions.fetch_final });
            });
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
                    isLoading={state.isLoading}
                    userList={state.userList}
                    handleInvite={handleInvite}
                    inviteList={inviteList}
                    handleSuccess={() => handleSuccess(true)}
                />
            )}
        </div>
    );
}

export default App;
