import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLongArrowLeft } from '@fortawesome/free-solid-svg-icons';
const ProfileModal: React.FC<{
  confirmable: React.SetStateAction<any>;
  confirmModal: React.SetStateAction<any>;
  term: any;
  year: any;
}> = ({ confirmable, confirmModal, term, year }) => {
  const getUserData = (user: any) => {
    const data = sessionStorage.getItem(user);
    if (!data) {
      return {};
    }
    return JSON.parse(data);
  };
  const user = getUserData("user");

  return (
    <>
      {/* to use pass 2 set states confirm modal and confirmable */}
      {/* const [confirmable,setConfirmable]=React.useState<boolean>(false);
    const [confirmModal,setConfirmModal]=React.useState<boolean>(false); */}

      <div className="w-full absolute z-[10]  inset-1  overflow-hidden grid bg-inherit  justify-center items-center h-[100vh]  ">
        <div className="border relative opacity-100 dark:bg-gray-800 bg-gray-200 rounded-2xl shadow-2xl h-fit box-border p-20">
          <h1 className="p-5 ">your profile details</h1>
          <section className="grid gap-5 flex-wrap-reverse justify-end">
            <h1 className="text-sm font-bold capitalize ">{user.name}</h1>
            {/* <p className="text-sm font-bold text-white">{user.role}</p>
             */}
            <h1 className="text-sm  ">
              <span className="capitalize font-xs opacity-[0.6]">school</span>:
              <span className="capitalize">{user.school}</span>
            </h1>
            <p className=" text-sm capitalize" ref={term}>
              current Term:not set
            </p>
            <p ref={year} className="text-sm capitalize">
              current Academic Year:not set
            </p>
            <p>
              <span>{user?.className ? "class:" : ""}</span>
              {user?.classNname}
            </p>
            <p>
              <span>{user?.formTeacher ? "FormTeacher:" : ""}</span>
              {user?.formTeacher}
            </p>
          </section>
          <span className="absolute left-2 top-2">
            <button
              className="bg-blue-700 p-3 z-10 text-white rounded"
              onClick={() => {
                confirmable(true);
                confirmModal(false);
              }}
            >
              <FontAwesomeIcon icon={faLongArrowLeft}></FontAwesomeIcon>
            </button>
          </span>
          {/* <span className="absolute left-2">
            {" "}
            <button
              className="bg-red-700 p-3 z-10 text-white rounded"
              onClick={() => {
                confirmable(false);
                confirmModal(false);
              }}
            >
              Cancel
            </button>
          </span> */}
        </div>
      </div>
    </>
  );
};

export default ProfileModal;