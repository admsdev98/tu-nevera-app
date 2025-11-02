import { useRef } from 'react';

export const FileUpload = ({ 
  accept, 
  onChange, 
  children,
  multiple = false,
  className = '',
}) => {
  const inputRef = useRef(null);

  const handleClick = () => {
    inputRef.current?.click();
  };

  const handleChange = (e) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      onChange(multiple ? Array.from(files) : files[0]);
    }
  };

  return (
    <>
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        onChange={handleChange}
        multiple={multiple}
        className="hidden"
      />
      <div onClick={handleClick} className={className}>
        {children}
      </div>
    </>
  );
};
