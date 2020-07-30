# Social Network

## Part One

1. Server
    - ✔️ Set Up Middlewares
        - ✔️ `express.static`
        * ✔️ `express.json`
        * ✔️ `cookie.session`
        * ✔️ `csurf will be set up later`
    - ✔️ Set up redirects to /welcome when user is logged out
    * ✔️ Create database & create db.js for queries
    * ✔️ `POST /registration`
        - ✔️ Can mostly be copied from petition
        * ✔️ However no redirects or renderings. Communication of success/failure done with either json or status codes
2. Client
    - `start.js`
        - ✔️ delete `HelloWorld`
        - ✔️ add logic to determine what to pass to `ReactDOM.render`
            - ✔️ if url is `/welcome`, render `Welcome` component.
            - ✔️ if not, render small `Logo`
        - ✔️ `Welcome` component
            - ✔️ Can be a function component
            - Spits o ut a welcome message, a big `Logo`
        - ✔️ `Registration` component
            - ✔️ uses state - should be a class
            - ✔️ renders
                - ✔️ four input fields
                - ✔️ one button
                - ✔️ error message conditionally based on `this.state.error`
        - ✔️ event handlers
            - ✔️ four form fields
                - ✔️ Puts form values into state
            * ✔️ click handler for button
                - ✔️ makes `POST` request and submits the values of the form fields
                - ✔️ on failure, sets state to show error message
                - ✔️ on success, redirects to `/` to show small `Logo`
        * Varia
            - find logo
            - ✔️ add css to `index.html`

## Part 2
