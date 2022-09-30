import React, { useState } from "react";
import { Skeleton } from "./Skeleton";
import { User } from "./User";

export const Users = ({
    userList,
    isLoading,
    handleInvite,
    inviteList,
    handleSuccess,
}) => {
    const [searchValue, setSearchValue] = useState("");

    function handleSearch(event) {
        setSearchValue(event.target.value);
    }

    return (
        <>
            <div className="search">
                <svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12.9 14.32a8 8 0 1 1 1.41-1.41l5.35 5.33-1.42 1.42-5.33-5.34zM8 14A6 6 0 1 0 8 2a6 6 0 0 0 0 12z" />
                </svg>
                <input
                    type="text"
                    placeholder="Найти пользователя..."
                    onChange={handleSearch}
                    value={searchValue}
                />
            </div>
            {isLoading ? (
                <div className="skeleton-list">
                    <Skeleton />
                    <Skeleton />
                    <Skeleton />
                </div>
            ) : (
                <ul className="users-list">
                    {userList.map((person) => {
                        const regex = new RegExp(searchValue, "i");
                        const fullName = `${person.first_name} ${person.last_name}`;
                        return (
                            (regex.test(person.email) ||
                                regex.test(fullName)) && (
                                <User
                                    handleInvite={() => handleInvite(person.id)}
                                    isInvited={inviteList.includes(person.id)}
                                    key={person.id}
                                    userInfo={person}
                                />
                            )
                        );
                    })}
                </ul>
            )}
            {!!inviteList.length && (
                <button className="send-invite-btn" onClick={handleSuccess}>
                    Отправить приглашение
                </button>
            )}
        </>
    );
};
