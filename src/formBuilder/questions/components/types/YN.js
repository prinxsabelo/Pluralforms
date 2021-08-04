import { CheckIcon, XIcon } from "@heroicons/react/outline";
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
    <div className="w-full space-y-2  items-center border">
      <div className="md:pl-2 w-full md:w-1/3 flex">
        <Button className="bg-yellow-500 w-24">
          <div className="flex justify-evenly space-x-2 items-center px-2 text-lg">
            <CheckIcon className="w-6" />
            <span className="tracking-widest">Yes</span>
          </div>
        </Button>
        <Button className="bg-yellow-500 w-24">
          <div className="flex justify-evenly space-x-2 items-center px-2 text-lg">
            <XIcon className="w-6" />

            <span className="tracking-widest">No</span>
          </div>
        </Button>
      </div>
      <div className="md:p-2 pt-2 flex flex-col">
        <div className="text-lg  pl-0">
          Give Optional Reponse for question.
        </div>

        <div className="flex flex-col space-y-1 md:space-y-2 w-11/12 md:w-3/4">
          {feedback.map((feedback, index) => (
            <Feedback
              key={index}
              title={questionDetail.title}
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
