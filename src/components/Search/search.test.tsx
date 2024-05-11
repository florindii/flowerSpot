import React from 'react';
import renderer from 'react-test-renderer';
import SearchFlowers from './SearchFlowers';

describe('SearchFlowers Component', () => {
  it('renders correctly with provided props', () => {
    const searchTerm = 'Flowers';
    const setSearchTerm = jest.fn();

    const tree = renderer
      .create(<SearchFlowers searchTerm={searchTerm} setSearchTerm={setSearchTerm} />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('triggers setSearchTerm function on input change', () => {
    const searchTerm = 'Flowers';
    const setSearchTerm = jest.fn();

    const component = renderer.create(
      <SearchFlowers searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
    );

    // Find the input element and simulate a change event
    const inputElement = component.root.findByType('input');
    inputElement.props.onChange({ target: { value: 'New Search Term' } });

    // Check if setSearchTerm function was called with the new value
    expect(setSearchTerm).toHaveBeenCalledWith('New Search Term');
  });
});
