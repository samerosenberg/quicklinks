import React, { useCallback, useEffect, useState } from "react";
import "./App.css";
import { Link } from "./Link";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

/**
 * Main App component
 *
 * @return {*}
 */
function App() {
    /** List of links @type {*} */
    const [links, setLinks] = useState<string[]>([]);

    /** Currently copied link @type {*} */
    const [copiedLink, setCopiedLink] = useState("");

    /** Dark mode flag @type {*} */
    const [darkMode, setDarkMode] = useState(true);

    useEffect(() => {
        chrome.storage.local.get("links", (results) => {
            if (results.links) {
                setLinks([...results.links]);
            }
        });
        chrome.storage.local.get("darkMode", (results) => {
            setDarkMode(results.darkMode);
            const root = document.querySelector(":root") as HTMLElement;
            if (root) {
                if (results.darkMode) {
                    setDarkModeEffect(root);
                } else {
                    setLightModeEffect(root);
                }
            }
        });
    });

    /**
     * Set links state variable as well as in chrome storage
     *
     * @param {string[]} links
     */
    function setNewLinks(links: string[]): void {
        setLinks(links);
        chrome.storage.local.set({ links: links });
    }

    /**
     * Set dark mode state variable as well as in chrome storage
     *
     * @param {boolean} darkMode
     */
    function setNewDarkMode(darkMode: boolean): void {
        setDarkMode(darkMode);
        chrome.storage.local.set({ darkMode: darkMode });
    }

    /**
     * Add empty link row
     *
     */
    function addLink(): void {
        const newLinks = [...links, ""];
        setNewLinks(newLinks);
    }

    /**
     * Quick add the current tabs url in a new row
     *
     * @return {*}  {Promise<void>}
     */
    async function quickAdd(): Promise<void> {
        const [curTab] = await chrome.tabs.query({ active: true, lastFocusedWindow: true });
        const newLinks = [...links, curTab.url!];
        setNewLinks(newLinks);
    }

    /**
     * Copy link to clipboard
     * - Callback for Link copy button
     *
     * @param {number} id
     * @return {*}  {Promise<void>}
     */
    async function copiedCallback(id: number): Promise<void> {
        const url = links[id];
        setCopiedLink(url);
        if ("clipboard" in navigator) {
            await navigator.clipboard.writeText(url);
        } else {
            document.execCommand("copy", true, url);
        }

        const copiedLinkDiv = document.getElementById("copiedLink");
        if (copiedLinkDiv) {
            copiedLinkDiv.style.visibility = "visible";
            setTimeout(() => {
                copiedLinkDiv.style.visibility = "hidden";
            }, 5000);
        }
    }

    /**
     * Remove link row
     * - Callback for Link remove button
     *
     * @param {number} linkId
     */
    function removeCallback(linkId: number): void {
        const newLinks = links.filter((val, index) => {
            return index !== linkId;
        });
        setNewLinks(newLinks);
    }

    /**
     * Update the current rows link
     * - Callback for Link input field
     *
     * @param {React.ChangeEvent<HTMLInputElement>} e
     * @param {number} index
     */
    function updateCallback(e: React.ChangeEvent<HTMLInputElement>, index: number) {
        const newLinks = links.map((link, i) => {
            if (i === index) {
                return e.currentTarget.value;
            }
            return link;
        });
        setNewLinks(newLinks);
    }

    /** Callback function for Link launch url button @type {*} */
    const launchCallback = useCallback(
        (linkId: number) => {
            chrome.tabs.create({ url: links[linkId] });
        },
        [links]
    );

    /**
     * Toggle dark mode
     *
     * @param {React.MouseEvent<HTMLElement>} e
     * @return {*}
     */
    function toggleDarkMode(e: React.MouseEvent<HTMLElement>) {
        const root = document.querySelector(":root") as HTMLElement;
        if (!root) {
            return;
        }
        if (!darkMode) {
            setNewDarkMode(true);
            setDarkModeEffect(root);
        } else {
            setNewDarkMode(false);
            setLightModeEffect(root);
        }
    }

    /**
     * Handle setting dark mode css properties
     *
     * @param {HTMLElement} root
     */
    function setDarkModeEffect(root: HTMLElement) {
        root.style.setProperty("--background", "black");
        root.style.setProperty("--primary", "white");
        root.style.setProperty("--toggle-left", "5px");
    }

    /**
     * Handle setting light mode css properties
     *
     * @param {HTMLElement} root
     */
    function setLightModeEffect(root: HTMLElement) {
        root.style.setProperty("--background", "white");
        root.style.setProperty("--primary", "black");
        root.style.setProperty("--toggle-left", "25px");
    }

    return (
        <>
            <header>
                <div className="darkModeContainer" onClick={toggleDarkMode}>
                    <div className="darkModeToggle"></div>
                </div>
                <button className="quickAdd" title="Quick add current url" onClick={quickAdd}>
                    <FontAwesomeIcon icon={faPlus} />
                </button>
            </header>
            <main>
                <div className="header">
                    <h1>Quick Links</h1>
                </div>
                <div>
                    <p id="copiedLink" className="copiedLink">
                        Copied {copiedLink}
                    </p>
                </div>
                <div className="linkList">
                    {links.map((link, index) => {
                        return (
                            <Link key={index} id={index} link={link} copiedCallback={copiedCallback} launchCallback={launchCallback} removeCallback={removeCallback} updateCallback={updateCallback} />
                        );
                    })}
                </div>
                <div className="addContainer">
                    <button className="addButton" onClick={addLink}>
                        Add Link!
                    </button>
                </div>
            </main>
        </>
    );
}

export default App;
