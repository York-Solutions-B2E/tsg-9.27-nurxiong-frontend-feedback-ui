import './App.css'
import FeedbackCard from "./components/FeedbackCard.tsx";
import FeedbackList from "./components/FeedbackList.tsx";

function App() {

  return (
    <>
        <FeedbackCard onSubmit={()=>{}}/>
        <FeedbackList/>
    </>
  )
}

export default App
