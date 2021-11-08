import React, { useCallback, useState } from 'react';

import { Editor } from 'react-draft-wysiwyg';
import { EditorState } from 'draft-js';
import 'react-draft-w```ysiwyg/dist/react-draft-wysiwyg.css';

function Upload() {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const onEditorStateChange = (editorState) => {
    // editorState에 값 설정
    setEditorState(editorState);
  };
  const [tagInput, setTagInput] = useState('');
  const [tagList, setTagList] = useState([]);

  const onChange = useCallback((e) => {
    setTagInput(e.target.value);
  }, []);

  const createTag = (e) => {
    if (e.key === 'Enter') {
      if (!tagInput) return;
      if (tagList.includes(tagInput)) return;
      setTagList([...tagList, tagInput]);
    }
  };

  const deleteTag = (i) => {
    let tagArr = [...tagList];
    tagArr.splice(i, 1);
    setTagList(tagArr);
  };

  return (
    <div className="upload-wrap">
      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <header>
          <input
            type="text"
            className="upload-title title"
            placeholder="제목을 입력하세요"
          />
          <div className="tag-wrap">
            {tagList.map((tagText, i) => (
              <span
                key={i}
                className="tag"
                id={'tag-' + i}
                onClick={() => {
                  deleteTag(i);
                }}
              >
                {tagText} &nbsp; 𝗑
              </span>
            ))}
            <input
              type="text"
              className="upload-tag"
              value={tagInput}
              onChange={onChange}
              onKeyDown={(e) => {
                createTag(e);
              }}
              placeholder="# 태그를 입력하세요"
            />
          </div>
        </header>
        <section className="upload-content">
          <Editor
            editorState={editorState}
            wrapperClassName="wrapper"
            toolbarClassName="toolbar"
            editorClassName="editor"
            onEditorStateChange={onEditorStateChange}
            localization={{ locale: 'ko' }}
            placeholder="내용을 작성해주세요."
          />
        </section>
        <footer>
          <button className="temporary-storage-btn">임시저장</button>
          <button className="storage-btn">완료</button>
        </footer>
      </form>
    </div>
  );
}

export default Upload;
