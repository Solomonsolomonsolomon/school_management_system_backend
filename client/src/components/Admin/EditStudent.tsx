import React from "react";
import Button from "../Button/Button";
interface EditStudentProps {
  editingStudent: any;
  setEditingStudent: any;
  closeEditModal: any;
  editStudent: any;
}
const EditStudent: React.FC<EditStudentProps> = ({
  editingStudent,
  setEditingStudent,
  closeEditModal,
  editStudent,
}) => {
  return (
    <div>
      {" "}
      <div className="dark:bg-gray-900  border-gray-200 fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
        <div className="dark:bg-gray-900  bg-white p-4 rounded-md shadow-md">
          <h2 className="dark:bg-gray-900  text-lg font-semibold mb-4">
            Edit Student
          </h2>
          {/* Here you can render the form for editing student data */}
          <div>
            <p>Edit student data here</p>
            {/* Example fields: */}
            <input
              type="text"
              placeholder="Name"
              value={editingStudent.name}
              onChange={(e) =>
                setEditingStudent({
                  ...editingStudent,
                  name: e.target.value,
                })
              }
              className="dark:bg-gray-900 ` w-full p-2 border rounded"
            />
            <input
              type="text"
              placeholder="Email"
              value={editingStudent.email}
              onChange={(e) =>
                setEditingStudent({
                  ...editingStudent,
                  email: e.target.value,
                })
              }
              className="dark:bg-gray-900  w-full p-2  border rounded"
            />
            <input
              type="password"
              placeholder="password"
              value={editingStudent.password}
              onChange={(e) =>
                setEditingStudent({
                  ...editingStudent,
                  password: e.target.value,
                })
              }
              className="dark:bg-gray-900  w-full p-2  border rounded"
            />
            {/* <input
                type="file"
                name="picture"
                id=""
                onChange={async (e) => {
                  console.log(e.target.files?.length);
                  if (e.target.files?.length) {
                    if (e.target.files[0].type.startsWith("image")) {
                      let picture = await tobase64(e.target.files[0]);
                      setEditingStudent({
                        ...editingStudent,
                        picture,
                      });
                    }
                  }
                }}
              /> */}
            {/*gender */}
            <select
              name="gender"
              className="dark:bg-gray-900 border rounded border-gray-400"
              onChange={(e) => {
                setEditingStudent({
                  ...editingStudent,
                  gender: e.target.value,
                });
              }}
            >
              <option value="M">Male</option>
              <option value="F">Female</option>
            </select>
            {/* current class Level */}
            <select
              className="dark:bg-gray-900  border rounded border-gray-400"
              defaultValue=""
              onChange={(e) => {
                setEditingStudent({
                  ...editingStudent,
                  currentClassLevel: e.target.value,
                });
              }}
            >
              <option value="">class</option>
              <option value="NUR1">NUR1</option>
              <option value="NUR2">NUR2</option>
              <option value="NUR3">NUR3</option>
              <option value="PRY1">PRY1</option>
              <option value="PRY2">PRY2</option>
              <option value="PRY3">PRY3</option>
              <option value="PRY4">PRY4</option>
              <option value="PRY5">PRY5</option>
              <option value="PRY6">PRY6</option>
              <option value="JSS1">JSS1</option>
              <option value="JSS2">JSS2</option>
              <option value="JSS3">JSS3</option>
              <option value="SSS1">SSS1</option>
              <option value="SSS2">SSS2</option>
              <option value="SSS3">SSS3</option>
            </select>
            {/*current class Arm*/}{" "}
            <select
              className="dark:bg-gray-900  border rounded border-gray-400"
              defaultValue=""
              onChange={(e) => {
                setEditingStudent({
                  ...editingStudent,
                  currentClassArm: e.target.value,
                });
              }}
            >
              {" "}
              <option value="">select</option>
              <option value="A">A</option>
              <option value="B">B</option>
              <option value="C">C</option>
              <option value="D">D</option>
              <option value="E">E</option>
              <option value="F">F</option>
              <option value="G">G</option>
              <option value="H">H</option>
              <option value="I">I</option>
              <option value="J">J</option>
              <option value="K">K</option>
              <option value="L">L</option>
              <option value="M">M</option>
              <option value="N">N</option>
              <option value="O">O</option>
              <option value="P">P</option>
            </select>
            {/* Add more input fields for other data */}
          </div>
          {/* payment information */}

          <div>
            <p className="font-bold">Financial Details</p>
            <form action="">
              <label htmlFor="payment details">Fees Status</label>
              <select
                name=""
                id=""
                className="bg-inherit border mx-2 p-1 dark:bg-gray-700"
                onChange={(e) => {
                  setEditingStudent({
                    ...editingStudent,
                    isPaid: e.target.value,
                  });
                }}
              >
                <option value="">select</option>
                <option value="true">paid</option>
                <option value="false">unpaid</option>
              </select>
            </form>
            <input
              type="number"
              placeholder="amount deposited"
              className="bg-inherit p-2 rounded mt-1 border"
              onChange={(e) => {
                setEditingStudent({
                  ...editingStudent,
                  amount: e.target.value,
                });
              }}
            />
          </div>
          <div className="dark:bg-gray-900  mt-4 flex justify-end">
            <Button
              buttontype={3}
              onClick={() => {
                // Here you can implement the update logic
                editStudent(editingStudent);
                console.log("Update student data:", editingStudent);
                closeEditModal();
              }}
            >
              Update
            </Button>
            <div className="dark:bg-gray-900  ml-2">
              {" "}
              <Button buttontype={2} onClick={closeEditModal}>
                Cancel
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditStudent;
