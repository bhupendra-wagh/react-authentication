import React from 'react';

export const GlobalFilter = ({ filter, setFilter}) => {

    return (
        <div className="filter">
            Search : { ' '}
            <input value={filter} onChange={e => setFilter(e.target.value)} />
        </div>    
    )
}