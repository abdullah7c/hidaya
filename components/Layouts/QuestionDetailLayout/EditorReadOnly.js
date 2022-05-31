import React, { useEffect } from "react";
import dynamic from 'next/dynamic'

const Editor = dynamic(() => import('draft-js').then(mod => mod.Editor),{ ssr: false });
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { EditorState, convertFromRaw } from "draft-js";
import { useSelector } from 'react-redux';

const EditorReadOnly = ({content}) => {

    const lang = useSelector((state) => state.language.value);

    const contentState = convertFromRaw(content);
    const editorState = EditorState.createWithContent(contentState);

    useEffect(() => {
        //console.log(content)
    }, [])
    

  return (
    <div>
        <Editor
            editorState={editorState} 
            readOnly={true} 
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

export default EditorReadOnly