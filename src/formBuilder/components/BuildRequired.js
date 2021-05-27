
import ToggleSwitch from "../../shared/collection/ToggleSwitch";

const BuildRequired = ({ properties }) => {

    const { required } = properties
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