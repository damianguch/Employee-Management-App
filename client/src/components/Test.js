import { useState } from 'react';

export function ModeToggler() {
  // let darkMode = false;
  const [darkMode, setDarkMode] = useState(false);

  function handleClick() {
    setDarkMode((prevMode) => !prevMode);
    // darkMode = !darkMode;

    if (!darkMode) {
      console.log('Dark Mode is on');
    } else {
      console.log('Light mode is on');
    }
  }

  return (
    <div>
      <button className="btn btn-dark mx-4 mt-4" onClick={handleClick}>
        Click Me
      </button>
      {darkMode ? (
        <h4 className="mx-5 mt-4">Dark Mode is on</h4>
      ) : (
        <h4 className="mx-5 mt-4">Light mode is on</h4>
      )}
    </div>
  );
}
