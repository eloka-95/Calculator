import {ACTION} from './component/Calc'

const Bdigits= ({ dispatch, digit})=>{
    return <button onClick={()=>dispatch({type:ACTION.ADD_DIGIT, payload:{digit} })}>{digit}</button>
}

export default Bdigits;
