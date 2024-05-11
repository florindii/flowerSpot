import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import SearchFlowers, { SearchFlowersProps } from './SearchFlowers';

describe('SearchFlowers Component', () => {
  const setSearchTermMock = jest.fn(); // Mock function for setSearchTerm

  const props: SearchFlowersProps = {
    searchTerm: '',
    setSearchTerm: setSearchTermMock,
  };

  it('renders SearchFlowers component correctly', () => {
    const { getByText, getByPlaceholderText } = render(<SearchFlowers {...props} />);

    // Check if component renders the main text elements
    expect(getByText('Discover flowers around you')).toBeInTheDocument();
    expect(getByText('Explore between more than 8.427 sightings')).toBeInTheDocument();

    // Check if input field and search image are rendered
    expect(getByPlaceholderText('Looking for something specific?')).toBeInTheDocument();
    expect(document.querySelector('img')).toHaveAttribute('alt', 'search');
  });

  it('calls setSearchTerm function on input change', () => {
    const { getByPlaceholderText } = render(<SearchFlowers {...props} />);

    const inputElement = getByPlaceholderText('Looking for something specific?');

    // Simulate change event on the input field
    fireEvent.change(inputElement, { target: { value: 'rose' } });

    // Verify that setSearchTermMock was called with the correct value
    expect(setSearchTermMock).toHaveBeenCalledWith('rose');
  });
});
