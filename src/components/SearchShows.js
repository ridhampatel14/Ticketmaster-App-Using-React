import React from 'react';

const SearchShows = (props) => {
  const handleChange = (e) => {
    props.searchValue(e.target.value);
  };
  return (
    <form
      method='POST '
      onSubmit={(e) => {
        e.preventDefault();
      }}
      name='formName'
      className='center'
    >
      <label className='search_fonts'>
        <span>Search:  </span>
        <input
          autoComplete='off'
          type='text'
          name='searchTerm'
          onChange={handleChange}
          className='searchbox_fonts'
        />
      </label>
    </form>
  );
};

export default SearchShows;
