import React from "react";
import Button from "../Button/Button";
interface SearchProps {
  searchQuery: any;
  setSearchQuery: any;
  searchbarSubmit: any;
  setSearchParams: React.Dispatch<React.SetStateAction<string>>;
  setClicked: React.Dispatch<React.SetStateAction<boolean>>;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

//clicked variable is used to track button click
const AllStudentsSearch: React.FC<SearchProps> = ({
  searchQuery,
  setSearchQuery,
  searchbarSubmit,
  setSearchParams,
  setClicked,
  setPage,
}) => {
  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();

          searchbarSubmit(searchQuery);
          setSearchParams(searchQuery);

          //i am returning page back to one for search results
          setPage(1);
        }}
      >
        <input
          type="search"
          placeholder="Search for students..."
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);

            if (!e.target.value) setClicked(false);
          }}
          className="dark:bg-gray-900  p-2 border rounded"
        />
        <Button buttontype={3} onClick={() => setClicked(true)}>
          Search
        </Button>
      </form>
    </div>
  );
};

export default AllStudentsSearch;
