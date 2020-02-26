import * as React from "react";

const userContext = React.createContext({
  user: {},
  updateUser: () => {}
});

export default userContext;