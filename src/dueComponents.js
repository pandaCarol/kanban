import React, { useState } from "react";
import styled from "styled-components";
import { UseStateContext } from "./stateContext";
import { flagClick } from "./functions";
import flagActive from "./svg/flagActive.svg";
import flagDeactive from "./svg/flagDeactive.svg"

const PlaceholderCheckbox = styled.div`
    width: 30px;
    height: 30px;
    margin: auto 3px;
`
const FlagHolder = styled.div`
    margin: auto 0px;
    width: 18px;
    height: 18px;
    background-position: center;
    background-size: cover;
    background-image: url(${props => props.isImpt ? flagActive : flagDeactive});

    &:hover {
        cursor: pointer;
        width: 24px;
        height: 24px;;
    }
`

export default function DueCompo({taskObj, colName}) {
    const stateFromProvider = UseStateContext();
    const state = stateFromProvider.state;

    const listener = state.tasks[taskObj.id].isImportant;
    function handelClick() {
        stateFromProvider.setState(flagClick(taskObj, state));
    };
    
    return(
        <>
            <PlaceholderCheckbox></PlaceholderCheckbox>
            <FlagHolder onClick={handelClick} isImpt={listener}></FlagHolder>
        </>
    )
}