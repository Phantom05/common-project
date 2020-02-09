import React from 'react';
import styled from 'styled-components';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';


const editorConfiguration = {
  toolbar: [],
  width: '100%'
};

function CaseMemo(props) {
  const { content, onChange } = props;
  return (
    <Styled.CaseMemo>
      <CKEditor
        editor={ClassicEditor}
        config={editorConfiguration}
        data={`${content}`}
        // onInit={editor => {
        //   // console.log('Editor is ready to use!', editor);
        // }}
        onChange={(event, editor) => {
          const data = editor.getData();
          onChange({ event, editor, data })
        }}
        onBlur={(event, editor) => {
          // console.log('Blur.', editor);
        }}
        onFocus={(event, editor) => {
          // console.log('Focus.', editor);
        }}
      />
    </Styled.CaseMemo>
  );
}

export default CaseMemo;


const Styled = {
  CaseMemo: styled.div`
      width: 100%;
    .ck.ck-editor{
      width:100%;
    }
    .ck.ck-editor__top.ck-reset_all{
      display:none;
    }
  `
}

