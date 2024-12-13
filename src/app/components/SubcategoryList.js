import Link from "next/link";
import { getSubjects } from "../localStorageHelpers";

export default function SubcategoryList({ subjectId }) {
  const subjects = getSubjects();
  const subject = subjects.find((sub) => sub.id === subjectId);
  const subcategories = subject ? subject.subcategories : [];

  return (
    <ul>
      {subcategories.map((subcategory) => (
        <li key={subcategory.id}>
          <Link href={`/subject/${subjectId}/subcategory/${subcategory.id}`} scroll={false}>
            {subcategory.title}
          </Link>
        </li>
      ))}
    </ul>
  );
}
