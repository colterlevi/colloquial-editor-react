import React, { useState } from "react";
// import Trix from "trix";
import { ReactTrixRTEInput, ReactTrixRTEToolbar } from "react-trix-rte";

export default function TrixColEditor() {
    const [value, setValue] = useState("");

    function handleChange(event, newValue) {
        setValue(newValue); // OR custom on change listener.
    }

    return (
        <div className="h-4/5 w-4/5 bg-slate">
            <ReactTrixRTEToolbar toolbarId="react-trix-rte-editor" />
            <ReactTrixRTEInput
                toolbarId="react-trix-rte-editor"
                defaultValue={<div>React Trix Rich Text Editor</div>}
                onChange={handleChange}
            />
        </div>
    )
}