import React from "react";
import { render, waitForElement, fireEvent } from "@testing-library/react";
import axios from "../src/helpers/axios";

import FriendButton from "../src/components/friendButton"

jest.mock("../src/helpers/axios");


test('When button is mounted an axios request is made. If successfull, button will show "Add"', async () => {
    axios.get.mockResolvedValue({
        data: {
            success: true,
            rows:undefined
        },
    });

    const {container} = render(<FriendButton id="3" />);
    const elem = await waitForElement(() => container.querySelector('button'));
    expect(elem.innerHTML).toBe('Add');
}
)
test('When button is mounted an axios request is made. If unsuccessfull, button will not show', async () => {
    axios.get.mockResolvedValue({
        data: {
            success: false,
            
           
        },
    });

    const {container} = render(<FriendButton id="3" />);
    const elem = await waitForElement(() => container.querySelector('div'));
    expect(elem.innerHTML).toBe("");
}
)
test('When accepted is true, button shows "End', async () => {
    axios.get.mockResolvedValue({
        data: {
            success: true,
            rows: [{
                accepted: true
            }]
        }
    })
    const {container} = render(<FriendButton id="3" />);
    const elem = await waitForElement(() => container.querySelector('button'));
    expect(elem.innerHTML).toBe('End');
}
)
test('When accepted is false and sender_id === userId, button shows "Cancel"', async () => {
    axios.get.mockResolvedValue({
        data: {
            success: true,
            userId:1,
            rows: [{
                accepted: false,
                sender_id: 1,
                recipient_id: 3,
            }]
        }
    })
    const {container} = render(<FriendButton id="3" />);
    const elem = await waitForElement(() => container.querySelector('button'));
    expect(elem.innerHTML).toBe('Cancel');
}
)
test('When accepted is false and recipient_id === userId, button shows "Accept"', async () => {
    axios.get.mockResolvedValue({
        data: {
            success: true,
            userId:1,
            rows: [{
                accepted: false,
                sender_id: 3,
                recipient_id: 1,
            }]
        }
    })
    const {container} = render(<FriendButton id="3" />);
    const elem = await waitForElement(() => container.querySelector('button'));
    expect(elem.innerHTML).toBe('Accept');
}
)
test('when user clicks on add button, an axios post request is fired and button text changes to "Cancel"', async () => {
    axios.get.mockResolvedValue({
        data: {
            success: true,
            userId:1,
            rows: [{
                accepted: false,
                sender_id: 1,
                recipient_id: 3,
            }]
        }
    })
    axios.post.mockResolvedValue({
        response:200,
        data: {
            success: true,
            userId:1,
            rows: [{
                accepted: false,
                sender_id: 1,
                recipient_id: 3,
            }]
        }
        
    })
    const {container} = render(<FriendButton id="3" />);
    const elem = await waitForElement(() => container.querySelector('button'));
    fireEvent.click(container.querySelector("button"));
    expect(elem.innerHTML).toBe('Cancel');
}
)
test('when user clicks on accept button, an axios post request is fired and button text changes to "End"', async () => {
    axios.get.mockResolvedValue({
        data: {
            success: true,
            userId:1,
            rows: [{
                accepted: false,
                sender_id: 3,
                recipient_id: 1,
            }]
        }
    })
    axios.post.mockResolvedValue({
        response:200,
        data: {
            success: true,
            userId:1,
            rows: [{
                accepted: true,
                sender_id: 3,
                recipient_id: 1,
            }]
        }
        
    })
    const {container} = render(<FriendButton id="3" />);
    const accept = await waitForElement(() => container.querySelector('button'));
    expect(accept.innerHTML).toBe('Accept');
    fireEvent.click(container.querySelector("button"));
    const end = await waitForElement(() => container.querySelector('button'));
    expect(end.innerHTML).toBe('End');
    
}
)
test('when accepted is true, and user clicks on "End" button, an axios post request is fired and button text changes to "Add"', async () => {
    axios.get.mockResolvedValue({
        data: {
            success: true,
            userId:1,
            rows: [{
                accepted: true,
                // sender_id: 1,
                // recipient_id: 3,
            }]
        }
    })
    axios.post.mockResolvedValue({
        response:200,
        data: {
            success: true,
            rows: undefined
        }
        
    })
    const {container} = render(<FriendButton id="3" />);
    const end = await waitForElement(() => container.querySelector('button'));
    expect(end.innerHTML).toBe('End');
    fireEvent.click(container.querySelector("button"));
    const add = await waitForElement(() => container.querySelector('button'));
    expect(add.innerHTML).toBe('Add');
}
)