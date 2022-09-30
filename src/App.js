import React, { useEffect, useState } from "react";
import "./index.scss";
import { Success } from "./components/Success";
import { Users } from "./components/Users";

// Тут список пользователей: https://reqres.in/api/users

function App() {
   const [userList, setUserList] = useState(null);
   const [isLoading, setLoading] = useState(true);

   // async function getUsers() {
   //    await fetch("https://reqres.in/api/users")
   //       .then((response) => response.json())
   //       .then((result) => {
   //          setUserList(result.data);

   //          setLoading(false);
   //       })
   //       .catch((err) => console.warn(err));
   // }
   useEffect(() => {
      fetch("https://reqres.in/api/users")
         .then((response) => response.json())
         .then((result) => {
            setUserList(result.data);
         })
         .catch((err) => console.warn(err))
         .finally(() => setLoading(false));
   }, []);

   return (
      <div className="App">
         <Users isLoading={isLoading} userList={userList} />
         {/* <Success /> */}
      </div>
   );
}

export default App;
