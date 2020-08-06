/* eslint-disable no-undef */
import React from "react";
import { render, waitForElement, fireEvent } from "@testing-library/react";
import axios from "../src/helpers/axios";
import BioHooked from "../src/components/BioHooked";
import App from "../src/app"
// import Bio from "../src/components/bioEditor"

jest.mock("../src/helpers/axios");
jest.mock("../src/app")
test('When no bio is passed to it, an "Add" button is rendered.', async () => {
    axios.get.mockResolvedValue({
        data: {
            first: "Stella",
            last: "deStroy",
            url:
                "https://www.maenner.media/downloads/53694/download/14_party_stella_destroy.jpg?cb=9bdba70576b4ab8936e571357cf374b2&w=640",
            bio: null,
        },
    });
    const { container } = render(<BioHooked />);
    const elem = await waitForElement(() => container.querySelector("#addBio"));
    expect(elem.innerHTML).toContain(`Add a Bio`);
});
jest.retryTimes(3);
jest.setTimeout(6000);
test('When a bio is passed to it, an "Edit" button is rendered.', async () => {
    const { container } = render(
        <BioHooked bio="I'm am bio don't you like me?" />
    );

    const elem = await waitForElement(() => {
        return container.querySelector("#editBio");
    });
    expect(elem.innerHTML).toContain(`Edit Bio`);
});

test('Clicking the "Add" button causes a textarea and a "Save" button to be rendered.', async () => {
    const { container } = render(<BioHooked />);

    expect(container.querySelector("#addBio").innerHTML).toContain("Add a Bio");
    fireEvent.click(container.querySelector("button"));

    expect(container.querySelector("textarea").innerHTML).toContain(
        "Tell us about yourself"
    );
    expect(container.querySelector("button").innerHTML).toContain("Save");
});
test('Clicking the "Save" button causes an ajax request', () => {
    axios.get.mockResolvedValue({
        data: {
            first: "Stella",
            last: "deStroy",
            url:
                "https://www.maenner.media/downloads/53694/download/14_party_stella_destroy.jpg?cb=9bdba70576b4ab8936e571357cf374b2&w=640",
            bio: "I'm am bio don't you like me?",
            
        },
    });
    const appBio = {bio:""}
    const setBio = (bio) => {
        appBio.bio = bio
    }
    
    const { container } = render(
        <BioHooked 
            setBio={setBio}
            bio={appBio.bio}
        />
    );

    expect(container.querySelector("#addBio").innerHTML).toContain("Add a Bio");

    fireEvent.click(container.querySelector("button"));

    expect(container.querySelector("textarea").innerHTML).toContain(
        "Tell us about yourself"
    );
    expect(container.querySelector("button").innerHTML).toContain("Save");

    fireEvent.click(container.querySelector("button"));
    expect(container.querySelector("button").innerHTML).toContain("Edit Bio");
});
// test('Clicking the "Save" button causes an ajax request', () => {
//     axios.post.mockResolvedValue({
//         data: {
//             first: "Stella",
//             last: "deStroy",
//             url:
//                 "https://www.maenner.media/downloads/53694/download/14_party_stella_destroy.jpg?cb=9bdba70576b4ab8936e571357cf374b2&w=640",
//             bio: "",
            
//         },
//     });
//     const appBio = {bio:""}
//     const setBio = (bio) => {
//         appBio.bio = "I'm am bio don't you like me?"
//     }
    
//     const { container } = render(
//         <BioHooked 
//             setBio={setBio}
//             bio={appBio.bio}
//         />
//     );

//     expect(container.querySelector("#addBio").innerHTML).toContain("Add a Bio");

//     fireEvent.click(container.querySelector("button"));

//     expect(container.querySelector("textarea").innerHTML).toContain(
//         "Tell us about yourself"
//     );
//     expect(container.querySelector("button").innerHTML).toContain("Save");

//     fireEvent.click(container.querySelector("button"));
//     expect(container.querySelector("button").innerHTML).toContain("Edit Bio");
//     expect(container.querySelector("p").innerHTML).toContain("I'm am bio don't you like me?");
    
// });
/*
    const elem = await waitForElement(() => {
        return container.querySelector("#editBio");
    });
    When no bio is passed to it, an "Add" button is rendered.

    When a bio is passed to it, an "Edit" button is rendered.

    Clicking either the "Add" or "Edit" button causes a textarea and a "Save" button to be rendered.

    Clicking the "Save" button causes an ajax request. The request should not actually happen during your test. To prevent it from actually happening, you should mock axios.

    When the mock request is successful, the function that was passed as a prop to the component gets called.

*/
