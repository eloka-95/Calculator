import React, { useReducer } from "react";
import Bdigits from "../GetDigit";
import OpertionButton from "../OpeButton";
// import OperatorButton from "../OpeButton";

// reducer function 
const reducer =(nState, {type, payload})=>{
    switch(type){
        case ACTION.ADD_DIGIT:
            if (nState.overwrite) {
              return {
                ...nState,
                currentOperand: payload.digit,
                overwrite: false,
              }
            }
            if (payload.digit === "0" && nState.currentOperand === "0") {
              return nState
            }
            if (payload.digit === "." && nState.currentOperand.includes(".")) {
              return nState
            }
      
            return {
              ...nState,
              currentOperand: `${nState.currentOperand || ""}${payload.digit}`,
            }
            case ACTION.CHOOSE_OPERATION:
                if(nState.currentOperand == null && nState.previousOperand == null){
                    return nState
                }
                // this control change of operator incase of mistake 
                if (nState.currentOperand == null) {
                    return {
                      ...nState,
                      Operator:payload.operand,
                    }
                  }
                if(nState.previousOperand == null){
                    return{
                        ...nState,
                        Operator: payload.operand,
                        previousOperand: nState.currentOperand,
                        currentOperand: null,
                    }
                }
                return {
                    ...nState,
                    previousOperand:evaluate(nState),
                    Operator:payload.operand,
                    currentOperand:null
                }

            case ACTION.CLEAR:
                return {}

                case ACTION.DELETE_DIGIT:
                    if (nState.overwrite) {
                      return {
                        ...nState,
                        overwrite: false,
                        currentOperand: null,
                      }
                    }

                    if (nState.currentOperand == null) return nState
                        if (nState.currentOperand.length === 1) {
                            return { ...nState, currentOperand: null }
                        }

                        return {
                            ...nState,
                            currentOperand: nState.currentOperand.slice(0, -1),
                        }

                case ACTION.EVALUATE:
                    if(nState.Operator == null || nState.currentOperand == null || nState.previousOperand == null){
                        return nState
                    }
                    return{
                        ...nState,
                        overwrite:true,
                        previousOperand:null,
                        Operator:null,
                        currentOperand:evaluate(nState)
                    }
    }
} 
// end of reducer function 

// Action decleration here 
export const ACTION={
    ADD_DIGIT: 'add-digit',
    CHOOSE_OPERATION: 'choose-operation',
    CLEAR : 'clear',
    DELETE_DIGIT: 'delete-digit',
    EVALUATE: 'eveluate'
}
// INTEGER_FORMATTER
const INTEGER_FORMATTER = new Intl.NumberFormat("en-us", {
    maximumFractionDigits: 0,
  })
  function formatOperand(operand) {
    if (operand == null) return
    const [integer, decimal] = operand.split(".")
    if (decimal == null) return INTEGER_FORMATTER.format(integer)
    return `${INTEGER_FORMATTER.format(integer)}.${decimal}`
  }

function evaluate({ currentOperand, previousOperand, Operator }) {
    const prev = parseFloat(previousOperand)
    const current = parseFloat(currentOperand)
    if (isNaN(prev) || isNaN(current)) return ""
    let computation = ""
    switch (Operator) {
      case "+":
        computation = prev + current
        break
      case "-":
        computation = prev - current
        break
      case "*":
        computation = prev * current
        break
      case "÷":
        computation = prev / current
        break

      case "%":
        computation = prev % current
        break
    }
  
    return computation.toString()
  }

// calc function 
const Calcmad = ()=>{
    // creating a useReducer to manage my states
    const [{currentOperand, previousOperand, Operator}, dispatch]= useReducer(reducer, {})
return (
            <div className="cal_main">
                <div className="screen">
                <div className="output_1">{previousOperand}{Operator}</div>
                <div className="output_2">{formatOperand(currentOperand)}</div>
                </div>
                <div className="main_button">
                    <div className="button_1">
                        <button>P</button>
                        <button onClick={()=> dispatch({type:ACTION.DELETE_DIGIT})}>C</button>
                        <button onClick={()=>dispatch({type:ACTION.CLEAR})}>AC</button>
                        <Bdigits digit='1' dispatch={dispatch} />
                        <Bdigits digit='2' dispatch={dispatch} />
                        <Bdigits digit='3' dispatch={dispatch} />
                        <Bdigits digit='4' dispatch={dispatch} />
                        <Bdigits digit='5' dispatch={dispatch} />
                        <Bdigits digit='6' dispatch={dispatch} />
                        <Bdigits digit='7' dispatch={dispatch} />
                        <Bdigits digit='8' dispatch={dispatch} />
                        <Bdigits digit='9' dispatch={dispatch} />
                        <Bdigits digit='0' dispatch={dispatch} />
                        <Bdigits digit='.' dispatch={dispatch} />
                        <OpertionButton operand="%" dispatch={dispatch} />
                    </div>
                    <div className="button_2">
                        <OpertionButton operand="÷" dispatch={dispatch} />
                        <OpertionButton operand="*" dispatch={dispatch} />
                        <OpertionButton operand="-" dispatch={dispatch} />
                        <OpertionButton operand="+" dispatch={dispatch} />
                        <button className="equal" onClick={()=>dispatch({type:ACTION.EVALUATE})}>=</button>
                    </div>
                </div>
            </div>

    )
    
}

export default Calcmad