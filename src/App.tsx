import './App.css'
import FeedbackCard from "./components/FeedbackCard.tsx";
import FeedbackList from "./components/FeedbackList.tsx";
import {postFeedback} from "./api/FeedbackAPI.ts";
import type {FeedbackDTO} from "./interfaces/FeedbackDTO.ts";

function App() {

    async function handlePostFeedback(feedbackData: FeedbackDTO){
        await postFeedback(feedbackData);
    }

    return (
        <>
            <FeedbackCard onSubmit={handlePostFeedback}/>
            <FeedbackList/>
        </>
    )
}

export default App