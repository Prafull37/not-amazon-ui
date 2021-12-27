import styled from 'styled-components';

export default function MessageBox(props){
    console.log(props.children);
    return (
        <div className={`alert alert-${props.variant || `info`}`}>
            {props.children}
        </div>
    )
}

