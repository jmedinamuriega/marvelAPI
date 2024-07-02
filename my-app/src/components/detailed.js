import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CharacterDetail = ({ characterId }) => {
    const [character, setCharacter] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const PUBLIC_KEY = '2915381d746dbf70319697668b4b0362';
    const HASH = 'f6d0146af2eb4b4fd971c23fc0047fdd';

    useEffect(() => {
        const fetchCharacterDetail = async () => {
            if (!characterId) return;
            setLoading(true);
            setError(null);
            try {
                const response = await axios.get(`https://gateway.marvel.com/v1/public/characters/${characterId}?ts=1&apikey=${PUBLIC_KEY}&hash=${HASH}`);
                setCharacter(response.data.data.results[0]);
            } catch (error) {
                setError('Error fetching data');
            } finally {
                setLoading(false);
            }
        };
        fetchCharacterDetail();
    }, [characterId]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;
    if (!character) return null;

    return (
        <div className="character-detail">
            <h2>{character.name}</h2>
            <p>{character.description}</p>

            <div className="character-sections">
                <div className="character-section">
                    <h3>Comics</h3>
                    <ul>
                        {character.comics.items.map((comic, index) => (
                            <li key={index}>{comic.name}</li>
                        ))}
                    </ul>
                </div>
                <div className="character-section">
                    <h3>Series</h3>
                    <ul>
                        {character.series.items.map((series, index) => (
                            <li key={index}>{series.name}</li>
                        ))}
                    </ul>
                </div>
                <div className="character-section">
                    <h3>Stories</h3>
                    <ul>
                        {character.stories.items.map((story, index) => (
                            <li key={index}>{story.name}</li>
                        ))}
                    </ul>
                </div>
                <div className="character-section">
                    <h3>Events</h3>
                    <ul>
                        {character.events.items.map((event, index) => (
                            <li key={index}>{event.name}</li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default CharacterDetail;
