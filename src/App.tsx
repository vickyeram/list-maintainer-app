import React, { useState } from "react";
import "./App.css";
import Checklist from "./components/checklist/Checklist";
import DataList from "./components/shared/DataList";
import Notes from "./components/notes/Notes";
import Reminders from "./components/reminders/Reminders";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

function App() {
  const [activeContent, setActiveContent] = useState("notes");

  const handleButtonClick = (name: string) => {
    setActiveContent(name);
  };

  return (
    <>
      <h1 className="main-title">List Maintainer App</h1>

      <div className="app-container">
        <DataList activeContent={activeContent} />
        <div className="right-container">
          <div className="action-buttons">
            <button
              className={`action-btn ${activeContent === "notes" && "active"}`}
              onClick={() => handleButtonClick("notes")}
            >
              NOTES
            </button>
            <button
              className={`action-btn ${activeContent === "checklist" &&
                "active"}`}
              onClick={() => handleButtonClick("checklist")}
            >
              CHECKLIST
            </button>
            <button
              className={`action-btn ${activeContent === "reminders" &&
                "active"}`}
              onClick={() => handleButtonClick("reminders")}
            >
              REMINDER
            </button>
          </div>

          <div className="page-content">
            {activeContent === "notes" && (
              <Notes activeContent={activeContent} />
            )}
            {activeContent === "checklist" && (
              <Checklist activeContent={activeContent} />
            )}
            {activeContent === "reminders" && (
              <Reminders activeContent={activeContent} />
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
