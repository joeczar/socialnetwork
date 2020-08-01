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

## Part 4 Profile Pic

1. App

    - Main container component for the entire logged in experience It is the keeper of information about the logged in user.
    - It fetches this info when it mounts and keeps user info in its state
    - Renders a `Logo`, `ProfilePic` and `Uploader`
    - Passes functions to `ProfilePic` and `Uploader` for making changes to its state
    - MUST be a `class` since it needs both state and lifecycle methods

2. ProfilePic

    - Its job is to display a profile pic (can use first and last name for the `alt` tag of the image)
    - Is passed down props that tell it the first and last name of the urser and the url of the image.
    - Is also passed down a prop that is a function that it must call when the image is clicked. When user clicks the pic, the uploader needs to become visible.
        - props -- `toggleUploader`, `name`, `url`
    - Can be a `function` or a `class`.

3. Uploader

    - needs to be a `class` based component as it will have state
    - you need to conditionally render uploader. It starts off as hidden but when you click on the `profilePic`, you will make it visible. The conditional rendering of `Uploader` depends on the current state. Make it look like a modal.
    - When visible, it needs to render a file input to make image upload possible
    - handles the change event on the file input and uploads the selected file
    - when the upload is done, you should know the url of the uploaded file and you must pass the url to a function in App
      for image upload, refer to what you did in IB. (formData, multer, s3, etc)
    - The function we pass the url to will update the state in APP when there is a new image and will also close the modal afterwards.
    - Maybe uploader has a button or x for closing. This too must call a function that was passed down as a prop to make the uploader disappear.
    - You'll need to add a new column to your user's table for teh imageUrl - make it text
    - Make sure you do an UPDATE for the image in the users table rather than an insert
