import {describe, it, expect, vi, beforeEach} from "vitest";
import {getFeedback, postFeedback} from "../api/FeedbackAPI.ts";

describe("feedback API", () => {
    const mockFetch = vi.fn()

    beforeEach(() => {
        vi.restoreAllMocks();
    });

    it("postFeedback should POST and return response json", async () => {

        // Arrange
        const mockResponse = {
            memberId: "120",
            providerName: "Dr. Xiong",
            rating: 5,
            comment: "Highly recommend",
        };
        // mock fetch return
        mockFetch.mockResolvedValue({
            ok: true,
            json: vi.fn().mockResolvedValue(mockResponse)
        });

        // Act
        const result = await postFeedback(mockResponse, mockFetch);

        // Assert
        expect(mockFetch).toHaveBeenCalledWith(
            "http://localhost:8080/api/v1/feedback",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(mockResponse)
            }
        );
        expect(result).toEqual(mockResponse);

    });

    it("getFeedback should GET and return response json", async () => {

        // Arrange
        const mockResponse = {
        };

        mockFetch.mockResolvedValue({
            ok: true,
            json: vi.fn().mockResolvedValue(mockResponse)
        });

        // Act
        const result = await getFeedback("mk", mockFetch);

        // Assert
        expect(mockFetch).toHaveBeenCalledWith("http://localhost:8080/api/v1/feedback?memberId=mk");
        expect(result).toEqual(mockResponse);

    });
});
