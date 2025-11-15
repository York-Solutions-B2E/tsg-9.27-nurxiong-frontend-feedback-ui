import FeedbackCard from "../components/FeedbackCard.tsx";
import {vi, describe, it, beforeEach, expect} from "vitest";
import {render, screen, waitFor} from "@testing-library/react";
import userEvent from "@testing-library/user-event";

describe("FeedbackCard component", () => {

    const mockFn = vi.fn()
    let user: any;

    beforeEach(() => {
        vi.clearAllMocks()
        user = userEvent.setup()

    });

    it('should display a Feedback submit card form', () => {
        // Arrange

        //Act
        render(<FeedbackCard onSubmit={mockFn}/>);

        //Assert
        expect(screen.getAllByText("★")[0]).toBeInTheDocument()
        expect(screen.getByLabelText('Member ID')).toBeInTheDocument()
        expect(screen.getByLabelText('Provider Name')).toBeInTheDocument()
        expect(screen.getByText('Rating')).toBeInTheDocument()
        expect(screen.getByLabelText('Comment (optional)')).toBeInTheDocument()
        expect(screen.getByRole("button", {name: /reset/i})).toBeInTheDocument();
        expect(screen.getByRole("button", {name: /submit feedback/i})).toBeInTheDocument();
        expect(screen.getByText(/Rating scale/i)).toBeInTheDocument()

    });

    it('should reset comment value when reset button is clicked', async () => {
        // Arrange
        render(<FeedbackCard onSubmit={mockFn}/>)

        const comment = screen.getByLabelText('Comment (optional)')
        const reset = screen.getByRole("button", {name: /reset/i})

        // Act
        await user.type(comment, 'comment is set')
        expect(comment).toHaveValue('comment is set')
        await user.click(reset)

        // Assert
        expect(comment).toHaveValue('')

    })

    it('should validate if memberId input field is empty, display error message', async () => {

        // Arrange
        render(<FeedbackCard onSubmit={mockFn}/>)
        const submit = screen.getByRole("button", {name: /submit feedback/i})

        // Act
        expect(screen.queryByText('Member ID is required.')).not.toBeInTheDocument()
        await user.click(submit)

        // Assert
        expect(screen.queryByText('Member ID is required.')).toBeInTheDocument()

    });

    it('should validate if providerName input field is empty, display error message', async () => {

        // Arrange
        render(<FeedbackCard onSubmit={mockFn}/>)
        const memberId = screen.getByLabelText('Member ID')
        const submit = screen.getByRole("button", {name: /submit feedback/i})

        // Act
        expect(screen.queryByText('Provider name is required.')).not.toBeInTheDocument()
        await user.type(memberId, 'memberId is set')
        await user.click(submit)

        // Assert
        expect(screen.queryByText('Provider name is required.')).toBeInTheDocument()

    });

    it('should validate if Rating input field is empty, display error message', async () => {

        // Arrange
        render(<FeedbackCard onSubmit={mockFn}/>)
        const memberId = screen.getByLabelText('Member ID')
        const providerName = screen.getByLabelText('Provider Name')
        const submit = screen.getByRole("button", {name: /submit feedback/i})

        // Act
        expect(screen.queryByText('Rating must be between 1 and 5.')).not.toBeInTheDocument()
        await user.type(memberId, 'memberId is set')
        await user.type(providerName, 'providerName is set')
        await user.click(submit)

        // Assert
        expect(screen.queryByText('Rating must be between 1 and 5.')).toBeInTheDocument()

    });

    it('should validate if Comment over 200 character, display error message', async () => {

        // Arrange
        render(<FeedbackCard onSubmit={mockFn}/>)
        const memberId = screen.getByLabelText('Member ID')
        const providerName = screen.getByLabelText('Provider Name')
        const submit = screen.getByRole("button", {name: /submit feedback/i})
        const rating = screen.getAllByText("★")
        const comment = screen.getByLabelText('Comment (optional)')
        const commentString = 'a'.repeat(222)


        // Act
        expect(screen.queryByText('Comment must be under 200 characters.')).not.toBeInTheDocument()
        await user.type(memberId, 'memberId is set')
        await user.type(providerName, 'providerName is set')
        await user.click(rating[2])
        await user.type(comment, commentString)
        await user.click(submit)

        // Assert
        expect(screen.queryByText('Comment must be under 200 characters.')).toBeInTheDocument()

    });

    // happy path first for mock API call success
    it('should display success message', async () => {

        // Arrange
        const anyThing = 'anything here really, this just a mock returnValue'
        mockFn.mockResolvedValueOnce(anyThing)

        render(<FeedbackCard onSubmit={mockFn}/>)
        const memberId = screen.getByLabelText('Member ID')
        const providerName = screen.getByLabelText('Provider Name')
        const submit = screen.getByRole("button", {name: /submit feedback/i})
        const rating = screen.getAllByText("★")
        const comment = screen.getByLabelText('Comment (optional)')

        const payload = {
            memberId: "memberId is set",
            providerName: "providerName is set",
            rating: 3,
            comment: "aaa",
        }

        // Act
        await user.type(memberId, payload.memberId)
        await user.type(providerName, payload.providerName)
        await user.click(rating[2])
        await user.type(comment, payload.comment)

        expect(screen.queryByText('Feedback submitted. Thank you!')).not.toBeInTheDocument()
        await user.click(submit)

        // Assert
        await waitFor(() => {
            expect(mockFn).toHaveBeenCalledWith(payload)
            expect(mockFn).toHaveResolvedWith(anyThing)
        })
        expect(screen.queryByText('Feedback submitted. Thank you!')).toBeInTheDocument()

    });
    it('should display error message when failed/throw error', async () => {

        // Arrange
        const error = 'some error'
        // mockFn.mockRejectedValueOnce({message: error})
        // mockFn.mockRejectedValueOnce(new Error(error))
        mockFn.mockRejectedValueOnce(new Error())

        render(<FeedbackCard onSubmit={mockFn}/>)
        const memberId = screen.getByLabelText('Member ID')
        const providerName = screen.getByLabelText('Provider Name')
        const submit = screen.getByRole("button", {name: /submit feedback/i})
        const rating = screen.getAllByText("★")
        const comment = screen.getByLabelText('Comment (optional)')

        const payload = {
            memberId: "memberId is set",
            providerName: "providerName is set",
            rating: 3,
            comment: "aaa",
        }

        // Act
        await user.type(memberId, payload.memberId)
        await user.type(providerName, payload.providerName)
        await user.click(rating[2])
        await user.type(comment, payload.comment)

        expect(screen.queryByText(error)).not.toBeInTheDocument()
        await user.click(submit)

        // Assert
        await waitFor(() => {
            // expect(screen.queryByText(error)).toBeInTheDocument()
            expect(screen.queryByText('Failed to submit feedback.')).toBeInTheDocument()
        })

    });

})