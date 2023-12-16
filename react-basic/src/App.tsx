import React, {useState} from "react";
import styled from "styled-components";
import Title from "@components/Title";

const Layout = styled.div`
    display: flex;
    justiyf-content: center;
    align-items: center;
    gap: 10px;
    background-color: gray;
    padding: 20px;
    border-radius: 10px;

`

function App(){
    
    const [count, setCount] = useState<number>(0);
    return(
        <Layout>
            <Title/>
            <span className="test">Count: {count}</span>
            <button onClick={()=> setCount( count + 1)}> + </button>
            <button onClick={()=> setCount( count - 1)}> - </button>
        </Layout>
    );
}

export default App;