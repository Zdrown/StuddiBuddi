import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getSubjects } from "../../app/localStorageHelpers";
import AddSubcategoryButton from "../../app/components/AddSubcategoryButton";
import Link from "next/link";
import styled from "styled-components";

const SubjectContainer = styled.div`
  max-width: 800px;
  margin: 40px auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const SubjectTitle = styled.h1`
  font-size: 32px;
  font-weight: bold;
  color: #333;
  font-family: "Poppins", sans-serif;
  margin-bottom: 16px;
`;

const SubcategoryHeading = styled.h2`
  font-size: 24px;
  font-weight: 600;
  color: #555;
  margin-bottom: 16px;
`;

const SubcategoryList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const SubcategoryItem = styled.li`
  padding: 12px 16px;
  margin-bottom: 8px;
  background-color: #ffffff;
  border-radius: 6px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: scale(1.02);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  }
`;

const StyledLink = styled.a`
  text-decoration: none;
  color: #0070f3;
  font-size: 16px;
  font-family: "Poppins", sans-serif;
  font-weight: 500;

  &:hover {
    text-decoration: underline;
  }
`;

const NoSubcategoriesText = styled.p`
  font-size: 16px;
  color: #777;
  font-family: "Poppins", sans-serif;
  margin-top: 16px;
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
    <SubjectContainer>
      <SubjectTitle>{subject.title}</SubjectTitle>
      <SubcategoryHeading>Subcategories</SubcategoryHeading>
      {subject.subcategories && subject.subcategories.length > 0 ? (
        <SubcategoryList>
          {subject.subcategories.map((subcategory) => (
            <SubcategoryItem key={subcategory.id}>
              <Link href={`/subject/subcategory/${subcategory.id}`} passHref>
                <StyledLink>{subcategory.title}</StyledLink>
              </Link>
            </SubcategoryItem>
          ))}
        </SubcategoryList>
      ) : (
        <NoSubcategoriesText>No subcategories available. Add one below!</NoSubcategoriesText>
      )}
      {/* Add Subcategory Button */}
      <AddSubcategoryButton
        subjectId={subject.id}
        onSubcategoryAdded={handleSubcategoryAdded}
      />
    </SubjectContainer>
  );
}
