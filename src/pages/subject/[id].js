import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getSubjects } from "../../app/localStorageHelpers";
import AddSubcategoryButton from "../../app/components/AddSubcategoryButton";
import Link from "next/link";
import styled from "styled-components";

const StyledLink = styled.a`
  text-decoration: none;
  color: #007bff;
  &:hover {
    text-decoration: underline;
  }
`;

export default function SubjectPage() {
  const router = useRouter();
  const { id } = router.query; // Get the dynamic `id` from the URL
  const [subject, setSubject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return; // Prevent running if `id` is undefined
    const subjects = getSubjects();
    const currentSubject = subjects.find((sub) => sub.id === id);
    setSubject(currentSubject);
    setLoading(false); // Loading complete
  }, [id]);

  const handleSubcategoryAdded = (updatedSubject) => {
    setSubject(updatedSubject); // Update the subject state with the latest data
  };

  if (loading) {
    return <p>Loading subject...</p>;
  }

  if (!subject) {
    return <p>Subject not found. Please go back and select a valid subject.</p>;
  }

  return (
    <div>
      <h1>{subject.title}</h1>
      <h2>Subcategories</h2>
      {subject.subcategories && subject.subcategories.length > 0 ? (
        <ul>
          {subject.subcategories.map((subcategory) => (
            <li key={subcategory.id}>
              <Link href={`/subject/subcategory/${subcategory.id}`} passHref>
                <StyledLink>{subcategory.title}</StyledLink>
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p>No subcategories available. Add one below!</p>
      )}
      {/* Add Subcategory Button */}
      <AddSubcategoryButton
        subjectId={subject.id}
        onSubcategoryAdded={handleSubcategoryAdded}
      />
    </div>
  );
}
