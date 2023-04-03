# Quick Links Chrome Extension

## How to Build a Chrome Extension using React in Typescript

### React Setup:

1.  Create a new React project

```
npx create-react-app app-name --template typescript
```

-   Run this in a terminal replacing app-name with the name of your app
-   Feel free to clear out the contents of App.tsx and App.css to start with a clean slate

2. Build the app

-   Run this command in your terminal to build the app

```
npm run build
```

-   This should create a build folder with your compiled app

### Chrome Setup

-   In app-name/public/ create a manifest.json file

-   To start it can look something like this

```
    {
        "name": "App-Name",
        "description": "This is my app",
        "version": "1.0",
        "manifest_version": 3,
        "action": {
            "default_popup": "index.html",
            "default_title": "Open the popup"
        },
        "icons": {
            "16": "logo192.png",
            "48": "logo192.png",
            "128": "logo192.png"
        }
    }
```

-   Check out the [Chrome Developer Docs](https://developer.chrome.com/docs/extensions/mv3/manifest/) for more info on each key

### Add the Extension to your local chrome browser

1. Open a Chrome browser and open a new tab to [chrome://extensions/](chrome://extensions/)
2. If you haven't already switch on developer mode in the top right
3. Then click the "Load Unpacked" button in the top left
4. This should open a file explorer and you want to open app-name/build/
5. The extension should show up on your list now and in your extensions popup

## Building Quick Links

### UI

-   index.tsx

    -   Chrome extensions can't rely on a root element always being available so here we will create a div with our
        https://github.com/serose99/quicklinks/blob/main/src/index.tsx#L1-L15

-   index.css

    -   This defines the dimensions of the actual popup

-   App.tsx

    -   The first thing we want to do is create 2 state variables to hold the list of links and the currently copied link
        https://github.com/serose99/quicklinks/blob/88e765ddb7f8aff3c4385b87ce2264f31d67aa87/src/App.tsx#L6-L7
    -   Then we will use React's useEffect hook to load in our links. 2 things to note here 
        1. useEffect allows our app to load data on initial load and/or when a value in the dependencies is changed. For this specific case we will noy list any dependencies as we only need to run this once. Check out the [docs](https://react.dev/reference/react/useEffect) for more info. 
        2. chrome.storage.local is chrome's way of letting developers store data locally in their chrome sessions. If you'd like you can also use chrome.storage.sync to sync your links list across browsers instances. Check out the [docs](https://developer.chrome.com/docs/extensions/reference/storage/) for more info.
    https://github.com/serose99/quicklinks/blob/88e765ddb7f8aff3c4385b87ce2264f31d67aa87/src/App.tsx#L9-L15
    -   Next we will add 2 helper methods for storing our links locally once they have been entered as well as adding new rows for more links
        https://github.com/serose99/quicklinks/blob/88e765ddb7f8aff3c4385b87ce2264f31d67aa87/src/App.tsx#L17-L25
    -   Then we will declare our callbacks for the Links component which gives it access to it's parent classes links property.
    -   And finally we will declare return our component

-   App.css

-   Link.tsx

    -   interface LinkProps
        -   To pass through the link id and callbacks we will use a new interface LinkProps as the type for the parameter for this component
    -   Here each row is a simple div container with 2 buttons for the copy and launch link, an input for the link, and then another button for the delete link. Each of these onClick will call their respective callbacks so the parent can manipulate the links array as needed

-   Link.css
