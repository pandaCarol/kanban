import React, { useRef, useEffect } from "react";
import styled from "styled-components";
import { createNewList } from "./functions";
import { UseStateContext } from "./stateContext";

const InputBar = styled.input`
    font-size: 18px;
    border: 1px solie lightgray;
    min-height: 36px;
    min-width: 60%;
`;

export default function InputComponent() {
    const inputRef = useRef();
    const stateFromProvider = UseStateContext();

    useEffect(() => console.log(stateFromProvider.state));
    
    //update databank after input the value and press enter
    function pressEnter(e) {
        if(e.key === 'Enter' && inputRef.current.value !== '') {
            stateFromProvider.setState(createNewList(stateFromProvider.state, inputRef.current.value));
            inputRef.current.value = '';
        }
    }
    
    return(
        <InputBar 
            ref={inputRef} 
            type='text' 
            placeholder='   Add a task...' 
            onKeyUp={pressEnter}
        >
        </InputBar>
    )
}