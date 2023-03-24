import { faCopy } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import "./Link.css";

export function Link(): JSX.Element {
    async function copyLink() {
        const url = (document.getElementById("url") as HTMLInputElement).value;
        if ("clipboard" in navigator) {
            return await navigator.clipboard.writeText(url);
        } else {
            return document.execCommand("copy", true, url);
        }
    }

    return (
        <div className="linkContainer">
            <button className="copyButton" onClick={copyLink}>
                <FontAwesomeIcon icon={faCopy} />
            </button>
            <input className="url" id="url"></input>
        </div>
    );
}
