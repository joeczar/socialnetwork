import React from "react";
import { render, waitForElement, fireEvent } from "@testing-library/react";
import axios from "../src/helpers/axios";

import Streaks from "../src/components/streaks";

/* 
    - functional component
    - redux, BrowserRouter
    - The Streaks component contains the routing for all the streaks sub components
        - intro (what is a streak) - if user has created a streak, these are shown only as links
        - tutorial (how to create a streak) - if user has created a streak, these are shown only as links
        - Streak Builder (where you build streaks)
        - Search/browse Streaks
*/

jest.mock("react-router-dom", () => {
    // Require the original module to not be mocked...
    const originalModule = jest.requireActual("react-router-dom");

    return {
        __esModule: true,
        ...originalModule,
        // add your noops here
        useParams: jest.fn(),
        useHistory: jest.fn(),
    };
});

test("The Streaks component has route '/streaks/intro' which loads the Intro component", async () => {
    location.path = "/streaks";
    const { container } = render(<Streaks />);
    //
    console.log(location.path);
    expect(container.innerHTML).toContain("<h1>Streaks</h1>");
    location.path = "/streaks/intro";
    console.log(location.path);
    const introWrapper = await waitForElement(() =>
        container.querySelector("#introWrapper")
    );
    expect(introWrapper.innerHTML).toContain("<h1>Streak Intro</h1>");
});
