import useUserRole from "../../../Hooks/useUserRole";
import Forbidden from "../../Forbidden/Forbidden";
import AdminDashboard from "./AdminDashboard";
import LeaderDashboard from "./LeaderDashboard";
import UserDashboard from "./UserDashboard";



export default function DashboardHome() {
  const { role, roleLoading } = useUserRole();

  switch (role) {
    case "admin":
      return <AdminDashboard />;

    case "leader":
      return <LeaderDashboard />;

    case "user":
      return <UserDashboard />;

    default:
      return (
        <Forbidden />
      );
  }
}
