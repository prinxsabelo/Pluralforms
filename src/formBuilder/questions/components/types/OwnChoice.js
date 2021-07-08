import { useContext, useEffect, useState } from "react";

import Button from "../../../../shared/collection/Button";
import { BuildQuestionContext } from "../../../../shared/contexts/build-question.context";
import Choice from "./Choice";

const OwnChoice = (props) => {
  const { q_id, title, type, properties } = props;
  const { developQuestion } = useContext(BuildQuestionContext);

  const [choices, setChoices] = useState([]);
  useEffect(() => {
    if (properties.choices.length > 0) {
      setChoices(properties.choices);
    } else {
      setChoices([{ label: "", index: 0 }]);
    }
  }, [setChoices, properties.choices, properties.choices.length]);
  const handleChoice = (event, index) => {
    const { value } = event.target;

    choices[index].label = value;
    properties.choices = choices;

    developQuestion({ title, q_id, properties, type });
  };
  const addChoice = () => {
    const newChoice = { label: "", index: choices.length };
    const newChoices = [...choices, newChoice]
    setChoices(newChoices);
    properties.choices = newChoices;
    developQuestion({ title, q_id, properties, type });
  };
  const deleteChoice = (choice) => {
    let i = 0;
    const newChoices = choices
      .filter((c) => c.index !== choice.index)
      .map((el) => {
        console.log(el.index);
        el.index = i;
        i++;
        return el;
      });
    console.log(newChoices);
    setChoices(newChoices);
    properties.choices = newChoices;

    developQuestion({ title, q_id, properties, type });
  };
  if (choices.length === 0) {
    setChoices([{ label: "", index: 0 }]);
  }
  return (
    <>
      <div className="w-full h-full  flex flex-col space-y-2 h-4/5 choice-auto">
        {choices.map((choice, index) => (
          <Choice
            key={index}
            index={index}
            name={`c${index}`}
            addChoice={addChoice}
            choicesLength={choices.length}
            deleteChoice={deleteChoice}
            label={choice.label}
            onChange={(event, index) => handleChoice(event, index)}
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
