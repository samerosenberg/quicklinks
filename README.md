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

-   In public/ create a manifest.json file

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
4. This should open a file explorer and you want to go to open app-name/build/
5. The extension should show up on your list now and in your extensions popup
