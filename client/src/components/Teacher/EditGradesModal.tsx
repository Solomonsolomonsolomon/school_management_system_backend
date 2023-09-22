// EditGradesModal.js
import React, { useState } from "react";
import Modal from "react-modal";

Modal.setAppElement("#root"); // Set the root element for accessibility
interface IEdit {
  isOpen: any;
  onClose: any;
  currentGrades: any;
  onSave: any;
}
const EditGradesModal: React.FC<IEdit> = ({
  isOpen,
  onClose,
  currentGrades,
  onSave,
}) => {
  const [editedGrades, setEditedGrades] = useState({ ...currentGrades });
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedGrades({ ...editedGrades, [name]: value });
  };

  const handleSubmit = () => {
    // Call onSave with editedGrades to update the grades
    onSave(editedGrades);
    onClose();
  };
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Edit Grades Modal"
    >
      <h2>Edit Grades for {currentGrades.name}</h2>

      <form>
        <div className="mb-4">
          <label htmlFor="CA1" className="block font-medium">
            CA1:
            <input
              type="number"
              id="CA1"
              defaultValue={currentGrades!.CA1}
              name="CA1"
              value={editedGrades.CA1}
              onChange={handleInputChange}
            />
          </label>
        </div>
        <div className="mb-4">
          <label htmlFor="CA2" className="block font-medium">
            CA2:
            <input
              type="number"
              id="CA2"
              name="CA2"
              value={editedGrades.CA2}
              onChange={handleInputChange}
            />
          </label>
        </div>
        <div className="mb-4">
          <label htmlFor="CA3" className="block font-medium">
            CA3:
            <input
              type="number"
              id="CA3"
              name="CA3"
              value={editedGrades.CA3}
              onChange={handleInputChange}
            />
          </label>
        </div>{" "}
        <div className="mb-4">
          <label htmlFor="EXAMS" className="block font-medium">
            EXAMS:
            <input
              type="number"
              id="examScore"
              name="examScore"
              value={editedGrades.examScore}
              onChange={handleInputChange}
            />
          </label>
        </div>
        <button
          type="button"
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={handleSubmit}
        >
          Save Grades
        </button>
        <button
          type="button"
          className="bg-gray-300 text-gray-700 px-4 py-2 rounded ml-2"
          onClick={onClose}
        >
          Cancel
        </button>
      </form>
    </Modal>
  );
};

export default EditGradesModal;
