import { useContext } from "react";
import ToggleSwitch from "../../shared/collection/ToggleSwitch";
import { BuildQuestionContext } from "../../shared/contexts/build-question.context";

const BuildRequired = (props) => {
    const { q_id, title, properties, type } = props;
    const { required } = properties
    const { developQuestion } = useContext(BuildQuestionContext);
    const arr = [
        {
            id: 1,
            label: "Required",
            value: required,
            name: "required"
        }
    ];
    const onToggleChange = (index, isChecked) => {

        let name = arr[index]['name'];
        arr[index]['name'] = isChecked
        properties[name] = isChecked;
        developQuestion({ title, q_id, properties, type });
    }

    return (
        <div className="py-3 px-1 bg-white" >
            {arr.map((property, index) =>
                <ToggleSwitch className="text-lg" key={property.id} index={index} id={property.name} label={property.label}
                    value={property.value} onToggleChange={onToggleChange} />

            )}
        </div>
    )
}
export default BuildRequired