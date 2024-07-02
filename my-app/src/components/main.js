import React, { useState, useEffect, useCallback } from 'react';
import { Card } from './cards';
import CharacterDetail from './detailed';
import axios from 'axios';

export const Main = () => {
    const [url, setUrl] = useState('http://gateway.marvel.com/v1/public/characters?ts=1&apikey=2915381d746dbf70319697668b4b0362&hash=f6d0146af2eb4b4fd971c23fc0047fdd');
    const [items, setItems] = useState([]);
    const [selectedCharacterId, setSelectedCharacterId] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null);
            try {
                const res = await axios.get(url);
                setItems(res.data.data.results);
            } catch (error) {
                setError('Error fetching data');
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [url]);

    const handleCharacterClick = useCallback((id) => {
        setSelectedCharacterId(id);
    }, []);

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    const filteredItems = items.filter(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="main-container">
            <input
                type="text"
                placeholder="Search characters"
                value={searchTerm}
                onChange={handleSearch}
                className="search-bar"
            />
            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}
            <Card data={filteredItems} onCharacterClick={handleCharacterClick} />
            {selectedCharacterId && <CharacterDetail characterId={selectedCharacterId} />}
        </div>
    );
};
