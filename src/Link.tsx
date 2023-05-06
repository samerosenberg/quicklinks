import { faCopy, faTimes, faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import "./Link.css";

export function Link(linkProps: LinkProps): JSX.Element {
    return (
        <div className="linkContainer">
            <button
                title="Add to clipboard"
                className="copyButton"
                onClick={() => {
                    linkProps.copiedCallback(linkProps.id);
                }}
            >
                <FontAwesomeIcon icon={faCopy} />
            </button>
            <button
                title="Open link in new tab"
                className="launchLink"
                onClick={() => {
                    linkProps.launchCallback(linkProps.id);
                }}
            >
                <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
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
                title="Remove link"
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
    launchCallback: Function;
}
