import { useState } from "react";
import SelectUserPage from "./pages/SelectUserPage";
import WelcomePage from "./pages/Welcome";

function App() {
  const [selectedName, setSelectedName] = useState("");
  const [page, setPage] = useState("select"); // "select" | "welcome"

  return (
    <>
      {page === "select" ? (
        <SelectUserPage
          selectedName={selectedName}
          onSelectName={setSelectedName}
          onDone={() => setPage("welcome")}
        />
      ) : (
        <WelcomePage
          name={selectedName}
          onBack={() => setPage("select")}
        />
      )}
    </>
  );
}

export default App;
