import React, { useState } from "react";
import "./App.css";
import { Link } from "./Link";

function App() {
    const [links, setLinks] = useState<string[]>([]);

    function addLink(): void {
        setLinks([...links, ""]);
    }

    return (
        <>
            <div className="header">
                <h1>Quick links</h1>
            </div>
            <div className="linkList">
                {links.map((link) => {
                    return <Link key={link} />;
                })}
            </div>
            <div className="addContainer">
                <button className="addButton" onClick={addLink}>
                    Add Link!
                </button>
            </div>
        </>
    );
}

export default App;
