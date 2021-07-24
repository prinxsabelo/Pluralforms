import { useContext, useEffect, useState } from "react";

import QTypeIcon from "../../../shared/collection/QTypeIcon";
import ToggleSwitch from "../../../shared/collection/ToggleSwitch";
import { BuildQuestionContext } from "../../../shared/contexts/build-question.context";
const Properties = (props) => {

  const { developQuestion, questionDetail, } = useContext(BuildQuestionContext);
  const [properties, setProperties] = useState(questionDetail);

  useEffect(() => {
    setProperties(questionDetail.properties);
  }, [setProperties, questionDetail.properties]);

  let { title, form_id, q_id, type, q_count, q_index } = questionDetail;

  const onToggleChange = (index, isChecked) => {
    // console.log(arr[index]);
    let name = arr[index]["name"];
    arr[index]["name"] = isChecked;
    properties[name] = isChecked;

    developQuestion({ title, q_id, properties, type, form_id, q_count, q_index, fix: "update", });

  };
  const onShapeChange = (shape) => {
    properties.shape = shape;


    developQuestion({ title, q_id, properties, type, form_id, q_count, q_index, fix: "update", });


  };
  let arr = [];
  if (properties) {
    const { randomize, allow_multiple_selection } = properties;
    arr = [
      {
        id: 1,
        label: "Randomize",
        value: randomize,
        name: "randomize",
      },
      {
        id: 2,
        label: "Multiple Selection",
        value: allow_multiple_selection,
        name: "allow_multiple_selection",
      },
    ];
  }

  const iconArr = [
    {
      shape: "star",
    },
    {
      shape: "heart",
    },
    {
      shape: "thumb",
    },
  ];
  return (
    <div className="flex w-full items-center md:space-x-2 mr-2 flex-start">
      <div className="flex-auto md:h-16 flex  items-center text-lg md:text-xl mb-2 md:mb-0">
        {questionDetail.type === "CHOICE" && properties && (
          <>
            <div className="w-full md:mt-0 flex md:text-lg text-sm justify-evenly">
              {arr.map((property, index) => (
                <ToggleSwitch
                  key={property.id}
                  index={index}
                  id={`${q_id}-${property.name}`}
                  label={property.label}
                  value={property.value}
                  onToggleChange={onToggleChange}
                />
              ))}
            </div>
          </>
        )}
        {props.type === "RATING" && properties && (
          <div className="w-full py-2 flex md:flex-auto justify-center items-center space-x-2 mr-1 md:px-4">
            <div className="md:text-xl w-1/3 flex justify-center ">
              Choose Icon
            </div>
            <div className="flex flex-auto justify-between items-center space-x-2">
              {iconArr.map((icon) => (
                <div
                  className={`
                                      w-full border-2 border-red-500  shadow cursor-pointer p-3 flex space-x-8 
                                      justify-between justify-evenly md:justify-center rounded-lg
                                      hover:bg-yellow-300
                                      ${props.properties.shape === icon.shape ? `bg-yellow-500` : `bg-white`} 
                              `
                  }
                  key={icon.shape}
                  onClick={() => onShapeChange(icon.shape)}
                >
                  {icon.shape === "star" && (
                    <QTypeIcon
                      className="w-8"
                      color="black"
                      shape="star"
                      type="RATING"
                    />
                  )}
                  {icon.shape === "heart" && (
                    <QTypeIcon
                      className="w-8"
                      color="black"
                      shape="heart"
                      type="RATING"
                    />
                  )}
                  {icon.shape === "thumb" && (
                    <QTypeIcon
                      className="w-8"
                      color="black"
                      shape="thumb"
                      type="RATING"
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default Properties;
