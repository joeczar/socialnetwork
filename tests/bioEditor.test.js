/* eslint-disable no-undef */
import React from "react";
import { render, waitForElement, fireEvent } from "@testing-library/react";
import axios from "../src/helpers/axios";
import BioHooked from "../src/components/BioHooked";
// import Bio from "../src/components/bioEditor"

jest.mock("../src/helpers/axios");

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
    axios.get.mockResolvedValue({
        data: {
            first: "Stella",
            last: "deStroy",
            url:
                "https://www.maenner.media/downloads/53694/download/14_party_stella_destroy.jpg?cb=9bdba70576b4ab8936e571357cf374b2&w=640",
            bio: "I'm am bio don't you like me?",
        },
    });
    const { container } = render(<BioHooked />);

    const elem = await waitForElement(() => {
        return container.querySelector("#editBio");
    });
    expect(elem.innerHTML).toContain(`Edit Bio`);
});

// test( 'Clicking the "Add" button causes a textarea and a "Save" button to be rendered.', async () => {
//     const {container} =  render(<BioHooked />);
//     expect(
//         container.querySelector('div').innerHTML
//     ).toContain(<tex)
// })
/*
    
    When no bio is passed to it, an "Add" button is rendered.

    When a bio is passed to it, an "Edit" button is rendered.

    Clicking either the "Add" or "Edit" button causes a textarea and a "Save" button to be rendered.

    Clicking the "Save" button causes an ajax request. The request should not actually happen during your test. To prevent it from actually happening, you should mock axios.

    When the mock request is successful, the function that was passed as a prop to the component gets called.

*/
