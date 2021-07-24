import { useContext, useEffect, useState } from "react";
import Button from "../../../../shared/collection/Button";

import { BuildQuestionContext } from "../../../../shared/contexts/build-question.context";

import Feedback from "./Feedback";

const YN = (props) => {
  const { developQuestion, questionDetail } = useContext(BuildQuestionContext);

  const { q_id, title, properties, form_id, type, q_index, q_count } = questionDetail;

  const [feedback, setFeedback] = useState([]);
  useEffect(() => {
    if (properties.feedback && properties.feedback.length > 0) {
      setFeedback(properties.feedback);
    } else {
      setFeedback([
        { label: "", occupy: "Yes", index: 0 },
        { label: "", occupy: "No", index: 1 },
      ]);
    }
  }, [setFeedback, properties.feedback]);
  const handleFeedback = (event, index) => {
    const { value } = event.target;
    feedback[index].label = value;
    properties.feedback = feedback;
    developQuestion({ title, q_id, form_id, properties, type, fix: "update", q_index, q_count });
  };
  return (
    <div className="w-full space-y-2 pl-2 p-5 items-center border">
      <div className="md:pl-2 w-10/12 md:w-1/3 flex">
        <Button className="bg-yellow-500">
          <div className="flex justify-evenly space-x-2 items-center px-2 md:text-lg">
            <span>
              <svg
                className="w-8"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </span>
            <span>Yes</span>
          </div>
        </Button>
        <Button className="bg-yellow-500">
          <div className="flex justify-evenly space-x-2 items-center px-2  md:text-lg">
            <span>
              <svg
                className="w-8"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </span>
            <span>No</span>
          </div>
        </Button>
      </div>
      <div className="md:p-2 flex flex-col">
        <div className="text-lg p-2 pl-0">
          Give Optional Reponse for question.
        </div>

        <div className="flex flex-col space-y-4 w-11/12 md:w-3/4">
          {feedback.map((feedback, index) => (
            <Feedback
              key={index}
              index={index}
              label={feedback.label}
              {...feedback}
              onChange={(event, index) => handleFeedback(event, index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
export default YN;
