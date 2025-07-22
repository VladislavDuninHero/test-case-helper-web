import React, {useEffect, useRef} from 'react';
import styled from "styled-components";

const StyledTextArea = styled.textarea`
    width: 100%;
    resize: none;
    padding: 5px;
    min-height: 40px;
    border-radius: 5px;
    overflow: hidden;
`;

const CustomTextArea = ({value, onChange}) => {
    const textAreaRef = useRef(null);

    useEffect(() => {
        if (textAreaRef.current) {
            textAreaRef.current.style.height = "auto";

            const lines = value.split("\n").length;
            textAreaRef.current.rows = Math.max(2, lines);

            textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
        }
    }, [value]);

    return (
        <StyledTextArea
            rows={2}
            value={value}
            onChange={onChange}
            ref={textAreaRef}
        />
    );
};

export default CustomTextArea;