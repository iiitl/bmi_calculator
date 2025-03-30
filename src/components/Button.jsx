import React from 'react';

const Button=({height,weight})=>{
    return(
        <button className='btn' type='submit' disabled={!weight && !height}>Submit</button>
    );
};
export default Button;