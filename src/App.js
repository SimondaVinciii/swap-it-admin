// App.js
import React, { useState } from "react";
import AppHeader from "./Components/AppHeader";
import AppFooter from "./Components/AppFooter";
import SideMenu from "./Components/SideMenu";
import PageContent from "./Components/PageContent";
import "./Pages/style.css";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <div className="App">
      {isAuthenticated && <AppHeader />}
      <div className="MainContent">
        {isAuthenticated && <SideMenu />}
        <div
          style={{
            width: "100%",
            display: "flex",
            flex: 1,
            flexDirection: "column",
            ...(!isAuthenticated && {
              justifyContent: "center",
              alignItems: "center",
            }),
          }}
        >
          <PageContent
            isAuthenticated={isAuthenticated}
            setIsAuthenticated={setIsAuthenticated}
          />
        </div>
      </div>
      {isAuthenticated && <AppFooter />}
    </div>
  );
}

export default App;
