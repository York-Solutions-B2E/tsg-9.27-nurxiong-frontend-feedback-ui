// FeedbackCard.js
import {useState, type SetStateAction} from 'react';
import {Card, Form, Button, InputGroup, Alert} from 'react-bootstrap';
import {StarRating} from "./StarRating.tsx";


// @ts-ignore
export default function FeedbackCard({defaultMemberId = '', defaultProviderName = '', onSubmit}) {
    const [memberId, setMemberId] = useState(defaultMemberId);
    const [providerName, setProviderName] = useState(defaultProviderName);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');
    const [error, setError] = useState('');
    const [successMsg, setSuccessMsg] = useState('');
    const [submitting, setSubmitting] = useState(false);

    function validate() {
        if (!memberId?.trim() || memberId?.length > 36 || memberId?.length < 1) return 'Member ID is required.';
        if (!providerName?.trim() || providerName?.length > 80 || providerName?.length < 1) return 'Provider name is required.';
        if (!rating || rating < 1 || rating > 5) return 'Rating must be between 1 and 5.';
        if (comment.length > 200 || comment.length < 1) return 'Comment is required and must be under 200 characters.';
        return null;
    }

    // @ts-ignore
    async function handleSubmit(e) {
        e.preventDefault();
        setError('');
        setSuccessMsg('');
        const v = validate();
        if (v) {
            setError(v);
            return;
        }

        const payload = {memberId: memberId.trim(), providerName: providerName.trim(), rating, comment: comment.trim()};

        try {
            setSubmitting(true);
            const result = await onSubmit(payload);
            // const result: FeedbackDTO = await postFeedback(payload)
            // console.log(payload)
            console.log(result)

            setSuccessMsg('Feedback submitted. Thank you!');
            // reset lightly but keep member/provider for convenience
            setRating(0);
            setComment('');
        } catch (err) {
            console.error(err);
            // @ts-ignore
            setError(err?.message || 'Failed to submit feedback.');
        } finally {
            setSubmitting(false);
        }
    }

    return (
        <Card style={{minWidth: '35rem'}}>
            <Card.Body>
                <Card.Title>Submit Feedback</Card.Title>
                <Card.Subtitle className="mb-3 text-muted">Share your rating and comments</Card.Subtitle>

                {error && <Alert variant="danger">{error}</Alert>}
                {successMsg && <Alert variant="success">{successMsg}</Alert>}

                <Form onSubmit={handleSubmit} noValidate>
                    <Form.Group className="mb-3" controlId="memberId">
                        <Form.Label>Member ID</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter member ID"
                            value={memberId}
                            onChange={(e) => setMemberId(e.target.value)}
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="providerName">
                        <Form.Label>Provider Name</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter provider name"
                            value={providerName}
                            onChange={(e) => setProviderName(e.target.value)}
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="rating">
                        <Form.Label>Rating</Form.Label>
                        <div className="mb-2">
                            <StarRating value={rating} onChange={(val: SetStateAction<number>) => setRating(val)}/>
                        </div>
                        <Form.Text muted>{rating ? `You rated ${rating} / 5` : 'Click a star to rate (1–5)'}</Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="comment">
                        <Form.Label>Comment (optional)</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            placeholder="Write any additional details..."
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            maxLength={200}
                        />
                        <Form.Text muted>{comment.length}/200</Form.Text>
                    </Form.Group>

                    <InputGroup className="d-flex justify-content-end">
                        <Button variant="secondary" className="me-2" type="button" onClick={() => {
                            setRating(0);
                            setComment('');
                            setError('');
                            setSuccessMsg('');
                        }}>
                            Reset
                        </Button>
                        <Button variant="primary" type="submit" disabled={submitting}>
                            {submitting ? 'Submitting…' : 'Submit Feedback'}
                        </Button>
                    </InputGroup>
                </Form>
            </Card.Body>
            <Card.Footer className="text-muted small">
                Rating scale: 1 (poor) — 5 (excellent)
            </Card.Footer>
        </Card>
    );
}
