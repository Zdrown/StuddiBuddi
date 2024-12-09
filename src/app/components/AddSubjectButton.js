// AddSubjectButton.js: Provides a button to add a new subject.
import { addSubject, } from "../localStorageHelpers";

export default function AddSubjectButton() {
  const handleClick = () => {
    // Prompt user for subject title
    const title = prompt("Enter subject title:");
    if (title) {
      addSubject(title); // Save the subject
      window.location.reload(); // Refresh the page to show updates
    }
  };

  return (
    <button type="button" onClick={handleClick}>
      Add Subject
    </button>
  );
}
