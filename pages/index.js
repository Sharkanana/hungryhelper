import React, {useState} from "react";
import Layout from "../components/HHLayout";
import userContext from "../contexts/user";

export default function Index() {

  const [user, updateUser] = useState({ username: '', email: '', loggedIn: false });

  return (
    <userContext.Provider value={{user, updateUser}}>
      <Layout currentTab="home">
        Home
      </Layout>
    </userContext.Provider>
  )
}