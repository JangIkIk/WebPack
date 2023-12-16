import {useState} from "react";

function Counter(){
    const [counter, setCounter] = useState(0);

    return(
        <div>
            counter: {counter}
            <button onClick={()=> setCounter(counter + 1)}>up</button>
            <button onClick={()=> setCounter(counter - 1)}>down</button>
        </div>
    );
}

export default Counter;