import Register from "./RegisterAndLoginForm";
import { UserContext } from "./UserContext";
import { useContext } from "react";
import Chat from "./Chat"
export default function Routes() {
  
    const {username, id} = useContext(UserContext);

    if(username){
        return (
            <Chat />
        )
    }
    return (
      <Register />
    );
}