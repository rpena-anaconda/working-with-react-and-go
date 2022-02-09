import React from 'react';

function Select(props) {
    console.log(props.options)
    return (
        <div className="mb-3">
            <label htmlFor={props.name} className='form-label'>
                {" "}
                {props.title}{" "}
            </label>
            <select
                className='form-select'
                name={props.name}
                value={props.mpaa_rating}
                onChange={props.handleChange}
            >
                <option value=''>{props.placeholder}</option>
                {props.options.map((option) => (
                    <option
                        className='form-select'
                        key={option.id}
                        value={option.id}
                        label={option.value}
                    >
                        {option.value}
                    </option>
                ))}
            </select>
        </div>
    );
}

export default Select;
