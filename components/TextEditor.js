import React, { useState, useEffect } from 'react';
import { EditorState, ContentState, convertToRaw, convertFromRaw } from 'draft-js';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

import { useSelector } from 'react-redux';

import dynamic from 'next/dynamic'
const Editor = dynamic(() => import('react-draft-wysiwyg').then(mod => mod.Editor),{ ssr: false })

const TextEditor = ({setQuestion}) => {

  const lang = useSelector((state) => state.language.value);

  const [editorState, setEditorState] = useState(
    () => EditorState.createEmpty(),
  );
  
  let _contentState = ContentState.createFromText('');
  const raw = convertToRaw(_contentState)
  const [contentState, setContentState] = useState(raw)

  useEffect(() => {
    //console.log(contentState);
    setQuestion(contentState);
  }, [contentState])

  return (
    <div className='editor'>
      <Editor 
        //editorState={editorState}
        //onEditorStateChange={setEditorState}
        defaultContentState={contentState}
        onContentStateChange={setContentState}
        wrapperClassName="wrapper-class"
        editorClassName="editor-class"
        toolbarClassName="toolbar-class"
        textAlignment={lang=='en'?'left':'right'}
        toolbar={{
          options: [
            "inline",
            // "blockType",
            "fontSize",
            // "fontFamily",
            "colorPicker",
            "list",
            "textAlign",
            "history",
          ],
          textAlign: { inDropdown: true },
        }}
      />
    </div>
  )
}

export default TextEditor