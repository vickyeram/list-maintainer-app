import React, { useState, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { setReminders } from "../../store/common/commonReducer";
import { State } from "../../store/slices";

const Reminders = ({ activeContent }: any) => {
  const [title, setTitle] = useState("");
  const [reminderDate, setreminderDate] = useState<any>(new Date());
  const [showAddReminder, setshowAddReminder] = useState(false);
  const [reminderContent, setReminderContent] = useState<any>(null);

  const dispatch = useDispatch();
  const remindersData = useSelector((state: State) => state.common.reminders);
  const remindersToShow = useSelector(
    (state: State) => state.common.currentContent
  );


  const setReminderListData = useCallback(() => {
    const dataToShow = remindersData.filter(
      (item: any) => item.id === remindersToShow
    )[0];
    setReminderContent(dataToShow);
  }, [remindersToShow, remindersData]);

  useEffect(() => {
    if (remindersData.length > 0 && remindersToShow.length > 0)
      setReminderListData();
    return () => {
      setReminderContent(null);
    };
  }, [remindersToShow, remindersData, setReminderListData]);

  const handleSubmit = () => {
    if (title.length > 0) {
      const dataToBeSend = {
        title,
        date: reminderDate,
        id: uuidv4(),
      };

      dispatch(setReminders(dataToBeSend));
      setreminderDate("");
      setTitle("");
    }
  };

  return (
    <div className="reminders-container">
      <div className="btn-cover">
        <button
          onClick={() => {
            setshowAddReminder(true);
          }}
          className="addBtn"
        >
          Add Reminder
        </button>
      </div>
      {showAddReminder && (
        <div className="main-content-cover">
          <div className="titel-cover">
            <label>Reminder Title:</label>
            <input
              type="text"
              value={title}
              name="title"
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />
          </div>

          <div>
            <label>Add Reminder Date:</label>

            <input
              type="date"
              value={reminderDate}
              name="reminderDate"
              onChange={(e) => {
                setreminderDate(e.target.value);
              }}
            />
          </div>

          <button onClick={handleSubmit} className="add-reminder-button">Add Reminder</button>
        </div>
      )}

{reminderContent && activeContent === "reminders" && (
          <div>
            <h5>{reminderContent.title}</h5>
            <h5>{reminderContent.date}</h5>
          </div>
        )}

    </div>
  );
};

export default Reminders;
