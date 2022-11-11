import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addCheckList, editCheckList } from "../../store/common/commonReducer";
import { v4 as uuidv4 } from "uuid";
import { State } from "../../store/slices";

const Checklist = ({ activeContent }: any) => {
  const [title, setTitle] = useState("");
  const [checklist, setChecklist] = useState<any[]>([]);
  const [checklistItem, setchecklistItem] = useState("");
  const [showAddChecklist, setShowAddChecklist] = useState(false);
  const [checklistContent, setChecklistContent] = useState<any>(null);

  const dispatch = useDispatch();
  const checklistsData = useSelector((state: State) => state.common.checklist);
  const checklistToShow = useSelector(
    (state: State) => state.common.currentContent
  );

  const setChecklistData = useCallback(() => {
    const dataToShow = checklistsData.filter(
      (item: any) => item.id === checklistToShow
    )[0];
    setChecklistContent(dataToShow);
  }, [checklistToShow, checklistsData]);

  useEffect(() => {
    if (checklistsData.length > 0 && checklistToShow.length > 0)
      setChecklistData();
    return () => {
      setChecklistContent(null);
    };
  }, [checklistToShow, checklistsData, setChecklistData]);

  const handleSubmit = () => {
    if (title.length > 0) {
      const dataToBeSend = {
        title: title,
        list: checklist,
        id: uuidv4(),
      };

      dispatch(addCheckList(dataToBeSend));

      setTitle("");
      setChecklist([]);
    }
  };

  const handleAddItem = () => {
    if (checklistItem.length > 0) {
      const dataToStore = {
        id: uuidv4(),
        name: checklistItem,
        status: false,
      };
      setChecklist([...checklist, dataToStore]);
      setchecklistItem("");
    }
  };

  const handleCheck = (e: any, checkItem: any) => {
    const tempData = checklistsData;

    const listData = tempData.filter(
      (item: any) => item.id === checklistToShow
    )[0];
    listData.list.map((check: any) => {
      if (check.id === checkItem.id) {
        // check.status = !checkItem.status
      }
    });

    dispatch(editCheckList(tempData));
  };

  return (
    <div className="checklist-container">
      <div className="btn-cover">
        <button
          onClick={() => {
            setShowAddChecklist(true);
          }}
          className="addBtn"
        >
          Add Checklist
        </button>
      </div>

      <div className="main-content-cover">
        {showAddChecklist && (
          <div>
            <div className="titel-cover">
              <label>Checklist Title:</label>
              <input
                type="text"
                value={title}
                name="title"
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
              />
            </div>

            <div className="checklist-cover-content">
              <label>Checklist Item:</label>

              <input
                type="text"
                value={checklistItem}
                name="checklistItem"
                onChange={(e) => {
                  setchecklistItem(e.target.value);
                }}
              />
              <button onClick={handleAddItem} className="add-check-btn">+</button>
            </div>
            <ul className="list-ul">
                {checklist.map((item, i) => (
                  <li key={i}>{item.name}</li>
                ))}
              </ul>

            <button onClick={handleSubmit} className="add-checklist-button">Add Checklist</button>
          </div>
        )}

        {checklistContent && activeContent === "checklist" && (
          <div>
            <h5>{checklistContent.title}</h5>

            <ul>
              {checklistContent.list.map((item: any, i: number) => (
                <li key={i}>
                  <input
                    type="checkbox"
                    // checked={item.status}
                    onChange={(e) => handleCheck(e, item)}
                  />
                  <span>{item.name}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Checklist;
