import { Fragment, createContext, useEffect, useState } from "react";
import { getAllUsers } from "app/queries/user-queries";

import Header from "app/UI/Header";
import UserGrid from "app/UI/UserGrid";

export const UsersContext = createContext();

const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    loadAllUsers();
  }, []);

  const loadAllUsers = async () => {
    const allUsers = await getAllUsers();
    setUsers(allUsers);
  };

  return (
    <Fragment>
      <Header />
      <UsersContext.Provider value={{ users }}>
        <div className="w-full h-full bg-[#121212] flex justify-center">
          <div className="flex flex-col w-full h-fit max-h-full max-w-[1920px] overflow-y-scroll no-scrollbar text-white px-6">
            <div className="text-4xl mb-6">All Users</div>
            <UserGrid reloadUsers={loadAllUsers} />
          </div>
        </div>
      </UsersContext.Provider>
    </Fragment>
  );
};

export default Users;
