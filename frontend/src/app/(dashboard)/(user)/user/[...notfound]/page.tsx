import { redirect } from "next/navigation";

const UserNotFoundRedirect = () => {
  redirect("/user/dashboard");
};

export default UserNotFoundRedirect;
