import { useContext, useEffect, useState } from "react";
import Button from "../../../../shared/collection/Button";

import { QuestionContext } from "../../../../shared/contexts/question-context";

import Response from "./Response";

const YN = (props) => {
  const { q_id, properties } = props;
  const { developQuestion } = useContext(QuestionContext);
  const [responses, setResponses] = useState([]);
  useEffect(() => {
    if (properties.responses.length > 0) {
      setResponses(properties.responses);
    } else {
      setResponses([
        { label: "", occupy: "YES", index: 0 },
        { label: "", occupy: "NO", index: 1 },
      ]);
    }
  }, [setResponses, properties.responses]);
  const handleResponse = (event, index) => {
    const { value } = event.target;
    responses[index].label = value;
    properties.responses = responses;
    let { title, type } = props;
    developQuestion({ title, q_id, properties, type });
  };
  return (
    <div className="w-full space-y-2 pl-2 p-5 items-center border">
      <div className="md:pl-2 w-10/12 md:w-1/3 flex">
        <Button className="bg-yellow-400">
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
        <Button className="bg-yellow-400">
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

        <div className="flex flex-col space-y-2 w-11/12 md:w-3/4">
          {responses.map((response, index) => (
            <Response
              key={index}
              index={index}
              label={response.label}
              {...response}
              onChange={(event, index) => handleResponse(event, index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
export default YN;
