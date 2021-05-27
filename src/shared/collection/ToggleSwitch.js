
import { useEffect, useState } from 'react';
import { Switch } from "@headlessui/react";


const ToggleSwitch = (props) => {
    const [enabled, setEnabled] = useState(false);
    useEffect(() => {

        if (props.value) {
            setEnabled(props.value)
        } else {
            setEnabled(false);
        }

    }, [setEnabled, props.value]);
    const handleChange = (e) => {
        
        setEnabled(!enabled);

        props.onToggleChange(index, e);
    }
    const { id, index, label} = props;
    return   (
              <Switch.Group>
                <div className="flex items-center">
                  <Switch.Label className="mr-1 text-sm md:text-xl">{label}</Switch.Label>
                  <Switch
                    checked={enabled}
                    onChange={(event) => handleChange(event)}
                    className={`${
                      enabled ? "bg-red-900" : "bg-gray-200"
                    } relative inline-flex items-center h-5 rounded-full w-9 transition-colors focus:outline-none focus:ring-0 focus:ring-offset-0 focus:ring-indigo-500`}
                  >
                    <span
                      className={`${
                        enabled ? "translate-x-4" : "translate-x-1"
                      } inline-block w-4 h-4 transform bg-white rounded-full transition-transform`}
                    />
                  </Switch>
                </div>
              </Switch.Group>
    );
}

export default ToggleSwitch;
