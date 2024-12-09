import { addSubcategory, getSubjects } from "../localStorageHelpers";

export default function AddSubcategoryButton({ subjectId, onSubcategoryAdded }) {
  const handleClick = () => {
    const title = prompt("Enter subcategory title:");
    if (title) {
      addSubcategory(subjectId, title); // Save the subcategory to localStorage
      const updatedSubjects = getSubjects(); // Fetch updated subjects
      const updatedSubject = updatedSubjects.find((sub) => sub.id === subjectId);
      onSubcategoryAdded(updatedSubject); // Notify parent to update state
    }
  };

  return (
    <button type="button" onClick={handleClick}>
      Add Subcategory
    </button>
  );
}
