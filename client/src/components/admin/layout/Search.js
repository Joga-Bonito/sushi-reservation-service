import React from "react";

const Search = ({ SearchValue, setSearchValue }) => {
  const onClick = () => {
    //이름에 search value값이 들어가는 컬럼 검색
  };
  return (
    <div>
      <input
        type="text"
        value={SearchValue}
        onChange={setSearchValue}
        placeholder="검색어를 입력하세요"
      />
    </div>
  );
};

export default Search;
