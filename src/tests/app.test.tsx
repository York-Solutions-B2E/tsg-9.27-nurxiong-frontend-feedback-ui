import { render, screen, waitFor } from "@testing-library/react";
import App from "../App";
import { postFeedback } from "../api/FeedbackAPI";

// Use Vitest’s mocking functions instead of Jest’s
import { vi, describe, it, beforeEach, expect } from "vitest";

// Mock the API call
vi.mock("../api/FeedbackAPI", () => ({
    postFeedback: vi.fn(),
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

    it("calls postFeedback when submitting feedback", async () => {
        (postFeedback as unknown as ReturnType<typeof vi.fn>).mockResolvedValueOnce(mockFeedback);

        const mock = ()=><>mock test data</>
        render(<App _FeedbackCard={mock}/>);

        // Locate your FeedbackCard or trigger submit manually
        const feedbackCard = screen.getByTestId("feedback-card");
        const onSubmit = (feedbackCard as any).props?.onSubmit;

        await onSubmit(mockFeedback);

        expect(postFeedback).toHaveBeenCalledWith(mockFeedback);
    });

    it("updates FeedbackList when feedback is returned", async () => {
        (postFeedback as unknown as ReturnType<typeof vi.fn>).mockResolvedValueOnce(mockFeedback);

        render(<App />);

        const feedbackCard = screen.getByTestId("feedback-card");
        const onSubmit = (feedbackCard as any).props?.onSubmit;
        await onSubmit(mockFeedback);

        await waitFor(() => {
            expect(screen.getByText("Dr. Xiong")).toBeInTheDocument();
        });
    });
});
