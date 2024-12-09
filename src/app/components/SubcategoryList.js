// SubcategoryList.js: Lists all subcategories for a given subject.
import { getSubjects } from "../localStorageHelpers";

export default function SubcategoryList({ subjectId }) {
  const subjects = getSubjects();
  const subject = subjects.find((sub) => sub.id === subjectId);
  const subcategories = subject ? subject.subcategories : [];

  return (
    <ul>
      {/* Loop through and display all subcategories */}
      {subcategories.map((subcategory) => (
        <li key={subcategory.id}>
          {/* Link to individual subcategory page */}
          <a href={`/subject/${subjectId}/subcategory/${subcategory.id}`}>
            {subcategory.title}
          </a>
        </li>
      ))}
    </ul>
  );
}
