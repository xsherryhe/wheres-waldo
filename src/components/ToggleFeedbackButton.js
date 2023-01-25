export default function ToggleFeedbackButton({ feedbackOn, setFeedbackOn }) {
  function toggleFeedback() {
    setFeedbackOn((feedbackOn) => !feedbackOn);
  }

  return (
    <button onClick={toggleFeedback}>
      {feedbackOn ? 'Hide' : 'Show'} Location Markers
    </button>
  );
}
