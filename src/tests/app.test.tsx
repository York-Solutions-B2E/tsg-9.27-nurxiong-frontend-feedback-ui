import {render, screen} from "@testing-library/react";
import App from "../App";
// Use Vitest’s mocking functions instead of Jest’s
import {vi, describe, it, beforeEach, expect} from "vitest";
import userEvent from '@testing-library/user-event';
import {postFeedback} from "../api/FeedbackAPI.ts";

// Mock the API call
vi.mock("../api/FeedbackAPI");

vi.mock("../components/FeedbackList", () => ({
    default: () => <>Mock FeedbackList</>,
}));


vi.mock('../components/FeedbackCard', () => ({
    default: ({onSubmit}: any) => {

        return (
            <button onClick={() => onSubmit({
                memberId: "120",
                providerName: "Dr. Xiong",
                rating: 5,
                comment: "Highly recommend",
            })}>
                Submit
            </button>
        );
    }
}));

describe("App component", () => {
    const mockFeedback = {
        memberId: "120",
        providerName: "Dr. Xiong",
        rating: 5,
        comment: "Highly recommend",
    };

    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("should display FeedbackCard && FeedbackList component", () => {
        // Arrange

        render(<App/>);


        expect(screen.getByText(/Submit/)).toBeInTheDocument()
        expect(screen.getByText(/Mock FeedbackList/)).toBeInTheDocument()
    });

    it("should call postFeedback API and return data", async () => {
        // Arrange
        const user = userEvent.setup();
        vi.mocked(postFeedback).mockResolvedValueOnce(mockFeedback);
        render(<App/>);

        // Act
        await user.click(screen.getByText('Submit'));

        // Assert
        expect(postFeedback).toHaveBeenCalledWith(mockFeedback);
        expect(postFeedback).toHaveBeenCalledTimes(1);
    });
});
