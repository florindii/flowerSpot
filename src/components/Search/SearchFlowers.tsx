import React, { ChangeEvent } from 'react';
import searchBackgroundImage from '../../assets/icons/pl-icon-search.svg';
import './Search.scss';

interface SearchFlowersProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

const SearchFlowers: React.FC<SearchFlowersProps> = ({ searchTerm, setSearchTerm }) => {
  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className='search-holder'>
        <div className="search-text-holder">
            <h2 className='discover-flowers'>Discover flowers around you</h2>
            <p className='explore-flowers'>Explore between more than 8.427 sightings</p>
        </div>
        <div className='search-input'>
        <input
            className='form-control'
            type="text"
            placeholder="Looking for something specific?"
            value={searchTerm}
            onChange={handleSearchChange}
        />
        <img src={searchBackgroundImage} alt="search" />
        </div>
    </div>
  );
};

export default SearchFlowers;
