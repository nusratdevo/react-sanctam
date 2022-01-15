

import { useHistory } from "react-router-dom";
import React, {useState, useEffect } from 'react';

function Protected(props) {
    let Cmp = props.component

    let history = useHistory();
    useEffect(() => {
        if (!localStorage.getItem('token' )){
            history.push('/login');
        }
        
    }, [])
    return (
        <div>
           <Cmp/>

        </div>
    )
}

export default Protected
