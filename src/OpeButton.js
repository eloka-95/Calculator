import {ACTION} from './component/Calc'

const OpertionButton= ({ dispatch, operand})=>{
    return <button onClick={()=>dispatch({type:ACTION.CHOOSE_OPERATION, payload:{operand} })}>{operand}</button>
}

export default OpertionButton;
