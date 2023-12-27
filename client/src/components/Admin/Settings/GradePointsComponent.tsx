import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import axios from "./../../../api/axios";
const schoolUrl = "/school";

interface IGradesComponent {
  setGeneralSettingsState: any;
  GeneralSettingsState: any;
  gradePoints: any;
  setLoading: any;
  setGradePoints: any;
  setGradeTracker: any;
  setMsg: any;
}
const GradePointsComponent: React.FC<IGradesComponent> = ({
  setGeneralSettingsState,
  GeneralSettingsState,
  gradePoints,
  setLoading,
  setGradePoints,
  setGradeTracker,
  setMsg,
}) => {
  let [gradeStyle, setGradeStyle] = React.useState<string>("");
  React.useEffect(() => {
    (async () => {
      try {
        let res = await axios.get(`${schoolUrl}/get/gradestyle`);

        setGradeStyle(res?.data?.gradeStyle);
      } catch (error) {
      } finally {
        console.log(gradeStyle);
      }
    })();
  }, []);
  async function changeGradeStyle(data: object) {
    try {
      setLoading(true);
      let res = await axios.put(`${schoolUrl}/set/gradestyle`, data);
      setGradeTracker(Date.now());
      setMsg(res?.data?.msg);
    } catch (error: any) {
      setMsg(error?.response?.data?.msg || error?.message);
    } finally {
      setLoading(false);
    }
  }
  const handleGradePoints = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGradePoints({ ...gradePoints, [e.target.name]: +e.target.value });
  };
  const updateGradePoints = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setLoading(true);
      let res = await axios.put(`${schoolUrl}/set/gradePoint`, gradePoints);
      setMsg(res.data?.msg);
      console.log(gradePoints);
      setGeneralSettingsState({
        ...GeneralSettingsState,
        showGradePoints: false,
      });
      setGradeTracker(Date.now());
    } catch (error: any) {
      setMsg(error?.response?.data?.msg || error?.message);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="mt-2">
      <span>
        grade points
        <button
          className="capitalize bg-gray-900 w-[100px] text-white p-2 rounded border"
          onClick={() => {
            setGeneralSettingsState({
              ...GeneralSettingsState,
              showGradePoints: !GeneralSettingsState.showGradePoints,
            });

            setMsg("");
          }}
        >
          SET
        </button>
      </span>
      <form
        onSubmit={updateGradePoints}
        className={`${
          GeneralSettingsState.showGradePoints ? "block" : "hidden"
        }`}
      >
        {Object.entries(gradePoints).map((grade: any[]) => {
          if (grade[0] === "_id") return;
          return (
            <p>
              {grade[0]}:{" "}
              <input
                type="number"
                value={+gradePoints[grade["0"]]}
                name={grade[0]}
                onChange={handleGradePoints}
              />
            </p>
          );
        })}

        <span className="cursor-pointer">
          <FontAwesomeIcon icon={faPlus} color="green" size="xl" />
        </span>
        <button className=" ml-3 p-2 bg-green-800 mb-4 text-white rounded w-fit">
          SET
        </button>
      </form>
      <form action="">
        <label htmlFor=""> grade style</label>
        <select
          name="gradeStyle"
          id=""
          value={gradeStyle}
          onChange={(e) => changeGradeStyle({ gradeStyle: e.target.value })}
        >
          <option value="Tertiary">Tertiary</option>
          <option value="US">US</option>
          <option value="WAEC">WAEC</option>
          <button>select</button>
        </select>
      </form>
    </div>
  );
};

export default GradePointsComponent;
