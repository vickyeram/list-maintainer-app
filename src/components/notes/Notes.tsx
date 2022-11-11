import React, { useCallback, useEffect, useState, useRef } from "react";

// import { Editor } from "react-draft-wysiwyg";
import { Editor } from "@tinymce/tinymce-react";

import { useDispatch, useSelector } from "react-redux";
import { addNotes } from "../../store/common/commonReducer";
import { State } from "../../store/slices";
import { v4 as uuidv4 } from "uuid";

const Notes = ({ activeContent }: any) => {
  const editorRef = useRef<any>(null);
  const [title, setTitle] = useState("");
  // const [note, setNote] = useState(EditorState.createEmpty());
  const [note, setNote] = useState("");
  const [showAdd, setShowAdd] = useState(false);
  const [noteContent, setNoteContent] = useState<any>(null);

  const dispatch = useDispatch();
  const notesData = useSelector((state: State) => state.common.notes);
  const noteToShow = useSelector((state: State) => state.common.currentContent);

  const setNotData = useCallback(() => {
    const dataToShow = notesData.filter(
      (item: any) => item.id === noteToShow
    )[0];
    setNoteContent(dataToShow);
  }, [noteToShow, notesData]);

  useEffect(() => {
    if (notesData.length > 0 && noteToShow.length > 0) setNotData();
    return () => {
      setNoteContent(null);
    };
  }, [notesData, noteToShow, setNotData]);

  const handleSubmit = () => {
    if (title.length > 0) {
      const content = editorRef.current ? editorRef.current.getContent():''
      const dataToBeSend = {
        title,
        content,
        id: uuidv4(),
      };

      dispatch(addNotes(dataToBeSend));
      setNote("");
      setTitle("");
    }
  };

  const handleChange = (editorState: any) => {
    setNote(editorState);
  };

  const initEditor = (editor: any) => {
    editorRef.current = editor;
  };

  return (
    <div className="notes-container">
      <div className="btn-cover">
      <button
        onClick={() => {
          setShowAdd(true);
        }}
        className="addBtn"
      >
        Add Note
      </button>
      </div>
      <div className="main-content-cover">
        {showAdd && (
          <div>
            <div className="titel-cover">
              <label>Title:</label>
              <input
                type="text"
                value={title}
                name="title"
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
              />
            </div>

            <div className="note-cover">
              <label>Note:</label>
              <Editor
                onInit={(evt, editor) => initEditor(editor)}
                onChange={handleChange}
                initialValue={note || ""}
                init={{
                  height: 200,
                  width: "100%",
                  menubar: false,
                  plugins: [
                    "advlist autolink lists link image charmap print preview anchor",
                    "searchreplace visualblocks code fullscreen",
                    "insertdatetime media table paste code help wordcount",
                  ],
                  toolbar:
                    "undo redo | formatselect | " +
                    "bold italic backcolor | alignleft aligncenter " +
                    "alignright alignjustify | bullist numlist outdent indent | " +
                    "removeformat | help",
                  content_style:
                    "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                }}
              />
            </div>

            <button className="add-note-button" onClick={handleSubmit}>Add Note</button>
          </div>
        )}

        {noteContent && activeContent === "notes" && (
          <div>
            <h5>{noteContent.title}</h5>
            <div
              dangerouslySetInnerHTML={{
                __html: noteContent.note?.level?.content,
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Notes;
