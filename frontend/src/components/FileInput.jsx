import React from "react";

function FileInput({ name, onChange: setFile, placeholder }) {
  const [fileName, setFileName] = React.useState("");

  const handleOnChange = (e) => {
    setFile(e.target.files[0]);
    setFileName(e.target.files[0]?.name);
  };
  return (
    <div className="w-full">
      <label
        htmlFor={name}
        className="border-b-dotted flex cursor-pointer flex-col justify-center border-b border-l-2 border-white border-b-slate-200 px-1 py-4 tracking-tight transition-all duration-200 hover:border-l-2 hover:border-l-slate-700 hover:bg-neutral-100"
      >
        {fileName ? (
          <p className="text-sm text-emerald-600 font-medium">Selected: {fileName}</p>
        ) : (
          <span className="text-sm text-neutral-800 font-medium">
            {placeholder}
          </span>
        )}

        <span className="mt-1 text-xs text-gray-500">JPG, JPEG(Max 5MB)</span>
      </label>

      <input
        type="file"
        id={name}
        name={name}
        onChange={handleOnChange}
        className="hidden"
      />
    </div>
  );
}

export default FileInput;
