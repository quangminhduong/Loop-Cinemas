import React, { useEffect, useRef, useState } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";

const QuillEditor = ({ value, onChange, maxMessageLength, error, helperText }) => {
  const quillRef = useRef(null);
  const [editor, setEditor] = useState(null);

  useEffect(() => {
    if (!editor) {
      if (quillRef.current) {
        const quill = new Quill(quillRef.current, {
          theme: "snow",
          modules: {
            toolbar: [
              [{ header: "2" }, { font: [] }],
              [{ list: "ordered" }, { list: "bullet" }],
              ["bold", "italic", "underline"],
              ["link"],
              [{ align: [] }],
            ],
          },
        });

        // Update message length when the content changes
        quill.on("text-change", (delta, oldDelta, source) => {
          const content = quill.root.innerHTML;
          const plainTextLength = calculatePlainTextLength(content);

          // If message length exceeds the maximum, delete the excess characters
          if (plainTextLength > maxMessageLength) {
            const excessLength = plainTextLength - maxMessageLength;
            const selection = quill.getSelection();
            const startIndex = selection ? selection.index - excessLength : quill.getLength() - excessLength;
            quill.deleteText(startIndex, excessLength);
          }

          onChange && onChange(quill.root.innerHTML);
        });

        // Set Quill instance in the state
        setEditor(quill);
      }
    } else {
      if (value !== editor.root.innerHTML) {
        editor.clipboard.dangerouslyPasteHTML(value);
      }
    }
  }, [value, editor, onChange, maxMessageLength]);

  const calculatePlainTextLength = (content) => {
    // Strip HTML tags to calculate the plain text length
    const plainText = content.replace(/<\/?[^>]+(>|$)/g, "");
    return plainText.length;
  };

  return (
    <div>
      <div data-testid = "password-input" ref={quillRef} style={{ height: "200px" } } />
      {error && <div className="text-sm text-red-500">{helperText}</div>}
      <div className="text-sm mt-2">
        {maxMessageLength - calculatePlainTextLength(value)} characters remaining
      </div>
    </div>
  );
};

export default QuillEditor;
