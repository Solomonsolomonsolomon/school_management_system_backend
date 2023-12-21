import React from "react";

const AddGradePointModal: React.FC = () => {
  return (
    <div>
      <p>Add Grade Point</p>
      <form action="">
        <input placeholder="enter grade e.g A" />
        <input type="number" placeholder="enter max score in grade" />
        <button>Add Grade</button>
      </form>
    </div>
  );
};

export default AddGradePointModal;
