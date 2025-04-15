import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";
import { upsertUser } from "../database/utils";

function LandingPage() {
  const { user } = useAuth0();

  useEffect(() => {
    const createUser = async () => {
      if (user && user.name !== undefined) {
        const stored_user = localStorage.getItem("user_id");
        if (!stored_user) {
          const data = await upsertUser(user.name);
          if (data && data[0]) {
            localStorage.setItem("user_id", data[0].id);
          }
        }
      }
    };

    createUser();
  }, [])

  return (
    <div>
    <p>Hello World</p>
    <p>{user?.name}</p>
    </div>
  );
};

export default LandingPage;