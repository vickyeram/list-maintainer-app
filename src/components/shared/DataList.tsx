import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentContent } from "../../store/common/commonReducer";
import { State } from "../../store/slices";

interface IProps {
  activeContent: string;
}

const DataList = (props: IProps) => {
  const { activeContent } = props;
  const [dataList, setDataList] = useState<any>(null);

  const checklistData = useSelector((state: State) => state.common.checklist);
  const notesData = useSelector((state: State) => state.common.notes);

  const remindersData = useSelector((state: State) => state.common.reminders);
  const dispatch = useDispatch();
  const [itemSelected,setItemSelected] = useState<any>([]);

  useEffect(() => {
    const setCurrentDataList = () => {
      let list;
      if (activeContent === "checklist") {
        list = checklistData;
      } else if (activeContent === "reminders") {
        list = remindersData;
      } else {
        list = notesData;
      }
      setDataList(list);
    };

    setCurrentDataList();
    return () => {
      setDataList([]);
    };
  }, [activeContent, checklistData, notesData, remindersData]);

  const handleClick = (id: string) => {
    let selectedItem=[...itemSelected]
    selectedItem=[]
    dispatch(setCurrentContent(id));
    selectedItem.push(id)
    setItemSelected(id)
    
  };

  return (
    <div className="data-list-cover">
      <h2>All {activeContent}</h2>
      <ul>
        {dataList?.map((item: any, i: number) => (
          <li className={`currentItem ${itemSelected.includes(item.id) && "active"}`} key={i} onClick={() => handleClick(item.id)}>
            {item.title}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DataList;
