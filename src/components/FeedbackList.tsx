import {useState} from "react";
import {Card, Table, Form, InputGroup, Button} from "react-bootstrap";
import type {FeedbackDTO} from "../interfaces/FeedbackDTO.ts";
import {getFeedback} from "../api/FeedbackAPI.ts";

// @ts-ignore
function FeedbackList() {
    const [filterId, setFilterId] = useState("");
    const [feedbacks, setFeedbacks] = useState<FeedbackDTO[]>([]);

    // const filtered = feedbacks.filter(f =>
    //     filterId.trim() === "" || f.memberId.toString().includes(filterId.trim())
    // );
    const data = async (id: any) => {
        try {
            const result: any = await getFeedback(id)
            setFeedbacks([...result?.FeedbackList])
        }catch(err) {
            console.log(err)
        }
    }

    return (
        <Card className="shadow-sm mt-4" style={{maxWidth: "900px", margin: "auto"}}>
            <Card.Body>
                <Card.Title className="text-center mb-3">My Feedback List</Card.Title>

                <InputGroup className="mb-3">
                    <InputGroup.Text>Filter by Member ID</InputGroup.Text>
                    <Form.Control
                        type="text"
                        placeholder="Enter member ID"
                        value={filterId}
                        maxLength={36}
                        onChange={(e) => setFilterId(e.target.value)}
                    />
                    <Button onClick={() => data(filterId)}>Filter</Button>
                </InputGroup>

                <Table bordered hover responsive className="align-middle text-center">
                    <thead className="table-light">
                    <tr>
                        <th>Item #</th>
                        <th>Member ID</th>
                        <th>Provider Name</th>
                        <th>Rating</th>
                        <th>Comment</th>
                    </tr>
                    </thead>
                    <tbody>
                    {feedbacks.length > 0 ? (
                        feedbacks.map((item, index) => (
                            <tr key={index + 1}>
                                <td>{index + 1}</td>
                                <td>{item.memberId}</td>
                                <td>{item.providerName}</td>
                                <td>{"★".repeat(item.rating)}</td>
                                <td>{item.comment}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={5} className="text-muted">
                                No feedback found for this Member ID
                            </td>
                        </tr>
                    )}
                    </tbody>
                </Table>
            </Card.Body>
        </Card>
    );
}

export default FeedbackList;
