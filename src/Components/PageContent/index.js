import AppRoutes from "../AppRoutes";
import "./style.css";

function PageContent({ isAuthenticated, setIsAuthenticated }) {
  return (
    <div className="PageContent">
      <AppRoutes
        isAuthenticated={isAuthenticated}
        setIsAuthenticated={setIsAuthenticated}
      />
    </div>
  );
}
export default PageContent;
