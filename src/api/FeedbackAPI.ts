import type {FeedbackDTO} from "../interfaces/FeedbackDTO.ts";

const baseURL = "http://localhost:8080/api/v1"

export async function postFeedback(feedback: FeedbackDTO, _fetch = fetch): Promise<FeedbackDTO> {
    const data = await _fetch(baseURL + "/feedback", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(feedback)
    })
    return await data.json()
}

export async function getFeedback(_fetch = fetch): Promise<FeedbackDTO> {
    const data = await _fetch(baseURL + "/feedbacks"+ "?memberId=123k")
    return await data.json()
}