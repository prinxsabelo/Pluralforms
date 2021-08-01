import { useContext, useEffect, useState } from "react";

import Button from "../../../../shared/collection/Button";
import { BuildQuestionContext } from "../../../../shared/contexts/build-question.context";
import Choice from "./Choice";

const OwnChoice = (props) => {

  const { developQuestion, questionDetail } = useContext(BuildQuestionContext);

  const [properties, setProperties] = useState();
  const [choices, setChoices] = useState([]);

  useEffect(() => {
    if (questionDetail) {
      setProperties(questionDetail.properties);

      if (questionDetail.properties.choices.length > 0) {
        setChoices(questionDetail.properties.choices);
      } else {
        setChoices([{ label: "", c_index: 0 }]);
      }
    }

  }, [questionDetail]);
  const handleChoice = (event, c_index) => {
    const { q_id, title, form_id, type, q_index, q_count } = questionDetail;
    const { value } = event.target;
    choices[c_index].label = value;
    properties.choices = choices;
    developQuestion({ title, q_id, properties, form_id, type, fix: "update", q_count, q_index });

  };
  const addChoice = () => {
    const { q_id, title, form_id, type, q_index, q_count } = questionDetail;
    const newChoice = { label: "", c_index: choices.length };
    const newChoices = [...choices, newChoice]
    setChoices(newChoices);
    properties.choices = newChoices;
    developQuestion({ title, q_id, properties, form_id, type, fix: "update", q_count, q_index });
  };
  const deleteChoice = (choice) => {
    const { q_id, title, form_id, type, q_index, q_count } = questionDetail;
    let i = 0;
    const newChoices = choices
      .filter((c) => c.c_index !== choice.c_index)
      .map((el) => {

        el.c_index = i;
        i++;
        return el;
      });
    setChoices(newChoices);
    properties.choices = newChoices;

    developQuestion({ title, q_id, properties, form_id, type, fix: "update", q_count, q_index });
  };
  if (choices.length === 0) {
    setChoices([{ label: "", c_index: 0 }]);
  }
  return (
    <>
      <div className="w-full h-full  flex flex-col space-y-2 h-4/5 choice-auto mb-2">
        {choices.map((choice, c_index) => (
          <Choice
            key={c_index}
            c_index={c_index}
            name={`c${c_index}`}
            addChoice={addChoice}
            choicesLength={choices.length}
            deleteChoice={deleteChoice}
            label={choice.label}
            onChange={(event, c_index) => handleChoice(event, c_index)}
            {...choice}
          />
        ))}
        <div className="flex md:pb-1">
          {choices.length <= 4 && (
            <Button
              className="w-1/3 h-12 md:w-auto bg-gray-900 uppercase"
              onClick={addChoice}
              style={{ transition: "all .30s ease" }}
            >
              Add Choice
            </Button>
          )}
        </div>
      </div>
    </>
  );
};
export default OwnChoice;
