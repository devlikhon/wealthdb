import { redirect } from "next/navigation";

const AdminNotFoundRedirect = () => {
  redirect("/admin/dashboard");
};

export default AdminNotFoundRedirect;
