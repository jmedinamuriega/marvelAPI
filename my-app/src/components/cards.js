import React from 'react';

export const Card = ({ data, onCharacterClick }) => {
    if (!data || data.length === 0) {
        return <p>No characters found.</p>;
    }

    return (
        <>
            {data.map(item => (
                <div className='card' key={item.id} onClick={() => onCharacterClick(item.id)}>
                    <img src={`${item.thumbnail.path}.${item.thumbnail.extension}`} alt={item.name} />
                    <div className='title'>
                        <h3>{item.name}</h3>
                    </div>
                </div>
            ))}
        </>
    );
};
