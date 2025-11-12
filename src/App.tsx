import './App.css'
import FeedbackCard from "./components/FeedbackCard.tsx";
import FeedbackList from "./components/FeedbackList.tsx";
import {postFeedback} from "./api/FeedbackAPI.ts";
import {useState} from "react";
import type {FeedbackDTO} from "./interfaces/FeedbackDTO.ts";

function App() {
    const [feedback, setFeedback] = useState<FeedbackDTO>();

    // const fakeData : FeedbackDTO = {memberId: "120", providerName: "Dr. xiong", rating: 5, comment: "Highly recommend"}
    async function handlePostFeedback(feedbackData: FeedbackDTO){
        const result = await postFeedback(feedbackData);
        setFeedback(result);
        return result;
    }

    return (
        <>
            <FeedbackCard onSubmit={handlePostFeedback}/>
            <FeedbackList updateFeedback={feedback}/>
        </>
    )
}

export default App
