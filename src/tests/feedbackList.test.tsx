import {beforeEach, describe, expect, it, vi} from "vitest";
import {render, screen, waitFor} from "@testing-library/react";
import FeedbackList from "../components/FeedbackList.tsx";
import {getFeedback} from "../api/FeedbackAPI.ts";
import userEvent from "@testing-library/user-event";

vi.mock("../../src/api/FeedbackAPI");

describe("FeedbackList", () => {

    beforeEach(() => {
        vi.clearAllMocks()
    })

    it("should render FeedbackList with no feedback list", () => {
        // Arrange
        // Act
        render(<FeedbackList/>);

        // Assert
        expect(screen.getByText("My Feedback List")).toBeInTheDocument()
        expect(screen.getByText("Filter by Member ID")).toBeInTheDocument()
        expect(screen.queryByText("No feedback found for this Member ID")).toBeInTheDocument()

    })

    it("should render FeedbackList with feedback list", async () => {
        // Arrange
        const mockFeedback = [{
            memberId: "120",
            providerName: "Dr. Xiong",
            rating: 5,
            comment: "Highly recommend",
        }];
        // @ts-ignore
        vi.mocked(getFeedback).mockResolvedValueOnce({FeedbackList: mockFeedback})
        const user = userEvent.setup()

        // Act
        render(<FeedbackList/>)
        const filter = screen.getByRole('button', {name: "Filter"})
        const inputText = screen.getByPlaceholderText("Enter member ID")
        await user.type(inputText, 'something')
        await user.click(filter)

        // Assert
        await waitFor(() => {
            expect(screen.queryByText("No feedback found for this Member ID")).not.toBeInTheDocument()
            expect(getFeedback).toHaveBeenCalledWith('something')
            expect(screen.getByText("Dr. Xiong")).toBeInTheDocument()
        })

    })


})