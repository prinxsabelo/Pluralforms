import { useContext } from "react";
import Button from "../../shared/collection/Button";
import QDrawer from "../../shared/collection/QDrawer";
import QTypeIcon from "../../shared/collection/QTypeIcon";
import { useHistory } from "react-router-dom";
import ToggleSwitch from "../../shared/collection/ToggleSwitch";
import {
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
} from "@heroicons/react/outline";
import Backdrop from "../../shared/collection/Backdrop";
import { BuildQuestionContext } from "../../shared/contexts/build-question.context";

const BuildHeader = ({ q_id, properties, type, children }) => {
  const history = useHistory();
  const {
    form,
    drawerIsOpen,
    setDrawerIsOpen,
    setTypeAction,
    questionTypes,
    currentType,
    setCurrentType,
    setQDrawerPosition,
  } = useContext(BuildQuestionContext);
  const qType = questionTypes.find((qt) => qt.type === type);
  const { required } = properties;
  const arr = [
    {
      id: 1,
      label: "Required",
      value: required,
      name: "required",
    },
  ];
  const onToggleChange = (index, isChecked) => {
    let name = arr[index]["name"];
    arr[index]["name"] = isChecked;
    properties[name] = isChecked;
  };
  const openDrawer = () => {
    if (!currentType && qType.type) {
      setCurrentType(qType.type);
    }
    setQDrawerPosition("right");
    setDrawerIsOpen(true);
    setTypeAction("edit");
  };
  const closeDrawer = () => {
    setDrawerIsOpen(false);
  };
  let index = 0;
  if (form.questions) {
    index = form.questions.findIndex((q) => q.q_id === q_id);
  }
  const goto = (checker) => {
    let new_q_id = -1;
    if (checker === "backward") {
      if (form.questions[index - 1]) {
        new_q_id = form.questions[index - 1].q_id;
      }
    } else if (checker === "forward") {
      if (form.questions[index + 1]) {
        new_q_id = form.questions[index + 1].q_id;
      }
    }
    setTypeAction("..");
    history.push(`/user/form/${form.form_id}/questions/${new_q_id}`);
  }



  return (
    <>
      {form.questions &&
        <div className="flex  justify-between justify-end  p-1 bg-gray-100 w-full md:w-3/4 text-right">
          <div className="md:hidden flex w-44 items-center">
            <Button className="text-gray-800 w-10 bg-white flex items-center justify-center">
              {index > 0 ? (
                <ChevronDoubleLeftIcon
                  className="w-6"
                  onClick={() => goto("backward")}
                />
              ) : (
                <span className="w-5">.</span>
              )}
            </Button>
            <Button className="text-gray-800 w-10 bg-white flex items-center justify-center">
              {form.questions.length > index + 1 ? (
                <ChevronDoubleRightIcon
                  className="w-6"
                  onClick={() => goto("forward")}
                />
              ) : (
                <span className="w-5">.</span>
              )}
            </Button>
            <div className="py-3 px-1 bg-white">
              {arr.map((property, index) => (
                <ToggleSwitch
                  className="text-sm font-bold"
                  key={property.id}
                  index={index}
                  id={`${q_id}-${property.name}`}
                  label={property.label}
                  value={property.value}
                  onToggleChange={onToggleChange}
                />
              ))}
            </div>
          </div>
          <div className="flex w-full justify-end md:space-x-4 ">
            <div className="flex space-x-5">{children}</div>
            <div>
              {qType && (
                <Button className="bg-gray-900 uppercase" onClick={openDrawer}>
                  <span className="flex items-center">
                    <div className="px-1 ">
                      <QTypeIcon
                        color="yellow"
                        className="w-8 text-gray-100"
                        type={qType.type}
                        shape={properties.shape}
                      />
                    </div>
                    {qType.label}
                  </span>
                </Button>
              )}
            </div>
          </div>

          <QDrawer show={drawerIsOpen} />
          {drawerIsOpen && <Backdrop onClick={closeDrawer} />}
        </div>
      }
    </>
  )
};
export default BuildHeader;
