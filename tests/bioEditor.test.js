import React from 'react'
import {render, waitFor} from '@testing-library/react'
import axios from '../src/helpers/axios'
import Bio from '../src/components/bioEditor'

jest.mock('../src/helpers/axios')

test(
    'When no bio is passed to it, an "Add" button is rendered.',
    async () => {
        axios.get.mockResolvedValue({
            data: {
                first: 'Stella',
                last: 'deStroy',
                url: 'https://www.maenner.media/downloads/53694/download/14_party_stella_destroy.jpg?cb=9bdba70576b4ab8936e571357cf374b2&w=640',
                bio: ""
            }
        })
        const {container} = render(<Bio />);

        expect(container.innerHTML).toContain(
            `<button>Add a Bio</button>`
        )
    }
)
test(
    'When a bio is passed to it, an "Edit" button is rendered.',
    async () => {
        axios.get.mockResolvedValue({
            data: {
                first: 'Stella',
                last: 'deStroy',
                url: 'https://www.maenner.media/downloads/53694/download/14_party_stella_destroy.jpg?cb=9bdba70576b4ab8936e571357cf374b2&w=640',
                bio: "„Ich mache Kultur und nicht Politik“"
            }
        })
        const {container} = render(<Bio />)
        const elem = await waitFor(() => container.querySelector('button'))
        expect(elem.innerHTML).toContain(
            `Edit Bio`
        )
       
    }
)
/*
    
    When no bio is passed to it, an "Add" button is rendered.

    When a bio is passed to it, an "Edit" button is rendered.

    Clicking either the "Add" or "Edit" button causes a textarea and a "Save" button to be rendered.

    Clicking the "Save" button causes an ajax request. The request should not actually happen during your test. To prevent it from actually happening, you should mock axios.

    When the mock request is successful, the function that was passed as a prop to the component gets called.

*/