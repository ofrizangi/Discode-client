import { forwardRef } from 'react';
import React from 'react';
import './form.css'

const Field = forwardRef(function Field(props, ref) {
    return (
        <div className="form-floating">
            <input type={props.type} className="form-control" placeholder={props.field_name} ref={ref}></input>
            <label htmlFor='lname'> {props.field_name} </label>
        </div>
    );
});
export default Field;