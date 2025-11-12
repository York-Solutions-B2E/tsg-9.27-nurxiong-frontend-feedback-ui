import {useEffect, useState} from "react";
import {Card, Table, Form, InputGroup} from "react-bootstrap";
import type {FeedbackDTO} from "../interfaces/FeedbackDTO.ts";
import {getFeedback} from "../api/FeedbackAPI.ts";

const mockFeedback: FeedbackDTO[] = [
    {
        memberId: "101", providerName: "Dr. Smith", rating: 5, comment: "Excellent care " +
            "gdklfjgkl " +
            "dlsfjgkldf j" +
            "dflkgjdfk l" +
            "jdslkfgjd " +
            "fdhdfghdfhf " +
            "dfgdfg sdfg s"
    },
    {memberId: "102", providerName: "Dr. Lee", rating: 4, comment: ""},
    {memberId: "101", providerName: "Dr. Adams", rating: 3, comment: "Average experience"},
    {memberId: "103", providerName: "Dr. Brown", rating: 5, comment: "Highly recommend"},
];

// @ts-ignore
function FeedbackList({updateFeedback}) {
    const [filterId, setFilterId] = useState("");
    const [feedbacks, setFeedbacks] = useState<FeedbackDTO[]>([]);

    const filtered = feedbacks.filter(f =>
        filterId.trim() === "" || f.memberId.toString().includes(filterId.trim())
    );
    const data = async () => {
        const result: any = await getFeedback()
        console.log(result)
        setFeedbacks([...result?.FeedbackList])
    }

    useEffect(() => {
        if (feedbacks)
            data()
        if (updateFeedback) {
            setFeedbacks(prev => [...prev, updateFeedback]);
        }
    }, [updateFeedback])

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
                        maxLength={200}
                        onChange={(e) => setFilterId(e.target.value)}
                    />
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
                    {filtered.length > 0 ? (
                        filtered.map((item, index) => (
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
