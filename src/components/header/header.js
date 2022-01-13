import React from 'react'
import './header.css'
function Header({result}) {
    let Computer = result.computer;
    let User = result.user;
    let Equal = result.equal;
    return (
        <div className='results-box'>
            <h4>RESULT TABLE</h4>
            <div className='results'>
                <p>computer</p>
                <p>equal</p>
                <p>user</p>
                <p>{Computer}</p>
                <p>{Equal}</p>
                <p>{User}</p>
            </div>
        </div>
    )
}

export default React.memo(Header);
