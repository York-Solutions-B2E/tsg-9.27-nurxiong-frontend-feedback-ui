
const baseURL = "http://localhost:8080/api/v1"

export async function postFeedback(feedback :any, _fetch = fetch){
    const data = await _fetch(baseURL + "/feedback", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(feedback)
    })
    return await data.json()
}

export async function getFeedback(id: any, _fetch = fetch) {
    const data = await _fetch(baseURL + "/feedback?memberId=" + id)
    return await data.json()
}