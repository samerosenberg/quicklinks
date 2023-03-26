import { faCopy, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import "./Link.css";

export function Link(linkProps: LinkProps): JSX.Element {
    async function copyLink() {
        const url = (document.getElementById("url") as HTMLInputElement).value;
    }

    //TODO set url in links when focus left
    return (
        <div className="linkContainer">
            <button
                className="copyButton"
                onClick={() => {
                    linkProps.copiedCallback(linkProps.id);
                }}
            >
                <FontAwesomeIcon icon={faCopy} />
            </button>
            <input
                className="url"
                id="url"
                autoComplete="false"
                onChange={(event) => {
                    linkProps.updateCallback(event, linkProps.id);
                }}
                value={linkProps.link}
            ></input>
            <button
                className="removeLink"
                onClick={() => {
                    linkProps.removeCallback(linkProps.id);
                }}
            >
                <FontAwesomeIcon icon={faTimes} />
            </button>
        </div>
    );
}

interface LinkProps {
    id: number;
    link: string;
    copiedCallback: Function;
    removeCallback: Function;
    updateCallback: Function;
}
