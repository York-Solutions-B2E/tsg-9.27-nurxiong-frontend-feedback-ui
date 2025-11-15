import FeedbackCard from "../components/FeedbackCard.tsx";

vi.mock("../components/StarRating", () => ({
    StarRating: () => <>Mock StarRating</>
}));

import {vi, describe, it, beforeEach, expect} from "vitest";
import {render, screen} from "@testing-library/react";
import userEvent from "@testing-library/user-event";

describe("FeedbackCard component", () => {
    const mockFeedback = {
        memberId: "120",
        providerName: "Dr. Xiong",
        rating: 5,
        comment: "Highly recommend",
    };
    beforeEach(() => {
        vi.clearAllMocks()
    });

    it('should display a Feedback submit card form', () => {
        // Arrange
        const mockFn = vi.fn()

        //Act
        render(<FeedbackCard onSubmit={mockFn}/>);

        //Assert
        expect(screen.getByText(/mock starrating/i)).toBeInTheDocument()
        expect(screen.getByLabelText('Member ID')).toBeInTheDocument()
        expect(screen.getByLabelText('Provider Name')).toBeInTheDocument()
        expect(screen.getByText('Rating')).toBeInTheDocument()
        expect(screen.getByLabelText('Comment (optional)')).toBeInTheDocument()
        expect(screen.getByRole("button", {name: /reset/i})).toBeInTheDocument();
        expect(screen.getByRole("button", {name: /submit feedback/i})).toBeInTheDocument();
        expect(screen.getByText(/Rating scale/i)).toBeInTheDocument()

    });

    it('should reset value will reset button is clicked', async () => {
        // Arrange
        const mockFn = vi.fn()
        const user = userEvent.setup()
        render(<FeedbackCard onSubmit={mockFn}/>)

        const comment = screen.getByLabelText('Comment (optional)')
        const reset = screen.getByRole("button", {name: /reset/i})

        // Act
        await user.type(comment, 'comment')
        expect(comment).toHaveValue('comment')
        await userEvent.click(reset)

        //Assert
        expect(comment).toHaveValue('')



    })

})