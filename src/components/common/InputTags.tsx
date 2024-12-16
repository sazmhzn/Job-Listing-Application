import { CrossIcon } from "lucide-react";
import { useState, useRef } from "react";
import { Input } from "../ui/input";

const InputTag = ({ tags, setTags, field }) => {
  const tagInput = useRef(null);

  const removeTag = (i) => {
    setTags(tags.filter((_, index) => index !== i));
  };

  const inputKeyDown = (e) => {
    const val = e.target.value;
    if (e.key === "Tab" && val) {
      // Prevent duplicate tags
      if (tags.find((tag) => tag.toLowerCase() === val.toLowerCase())) {
        return;
      }
      setTags([...tags, val]);
      tagInput.current.value = ""; // Clear input field
    } else if (e.key === "Backspace" && !val) {
      removeTag(tags.length - 1);
    }
  };

  return (
    <div className="input-tag w-full">
      <ul className="flex flex-col m-0 p-0 gap-3 input-tag__tags">
        <li className="input-tag__tags__input  w-full">
          <Input
            type="text"
            onKeyDown={inputKeyDown}
            ref={tagInput}
            placeholder="Add a tag"
            {...field}
            className="w-full shadow-none rounded border-[1.5px] border-stroke bg-transparent py-4 px-3 text-black outline-none transition focus:border-blue-600 active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
          />
        </li>
        <div className="flex gap-2">
          {tags.map((tag, i) => (
            <li
              key={tag}
              className="w-fit m-0 p-0 flex items-center tag px-2 py-1 bg-blue-400 text-white rounded-full"
            >
              {tag}
              <button type="button" onClick={() => removeTag(i)}>
                <CrossIcon className="w-4 aspect-square" />
              </button>
            </li>
          ))}
        </div>
      </ul>
    </div>
  );
};

export default InputTag;
