import React from "react";
import Button from "../Button/Button";
interface SearchProps {
  searchQuery: any;
  setSearchQuery: any;
  searchbarSubmit: any;
}
const AllStudentsSearch: React.FC<SearchProps> = ({
  searchQuery,
  setSearchQuery,
  searchbarSubmit,
}) => {
  return (
    <div>
      {" "}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          searchbarSubmit(searchQuery);
        }}
      >
        <input
          type="search"
          placeholder="Search for students..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="dark:bg-gray-900  p-2 border rounded"
        />
        <Button buttontype={3}>Search</Button>
      </form>
    </div>
  );
};

export default AllStudentsSearch;
