import React from "react";

const SearchBar = (props) => {
  const onInputChange = (e) => {
    props.onTermSubmit(e.target.value);
  };

  return (
    <div className="ui action input">
      <form className="ui form">
        <div className="field">
          <label>{props.label}</label>
          <input
            placeholder="search..."
            value={props.searched}
            onChange={onInputChange}
            type="text"
          />
        </div>
      </form>
    </div>
  );
};

export default SearchBar;
