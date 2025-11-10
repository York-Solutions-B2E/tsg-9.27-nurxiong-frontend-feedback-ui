import './App.css'
import FeedbackCard from "./components/FeedBack.tsx";
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
