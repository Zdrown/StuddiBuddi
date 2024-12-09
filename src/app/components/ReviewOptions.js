// ReviewOptions.js: Displays checkboxes for subcategory selection.
export default function ReviewOptions({
    subjects,
    selectedSubcategories,
    toggleSubcategory,
  }) {
    return (
      <div>
        <h2>Select Subcategories</h2>
        {subjects.flatMap((subject) => subject.subcategories).map((subcategory) => (
          <div key={subcategory.id}>
            <input
              type="checkbox"
              checked={selectedSubcategories.includes(subcategory.id)}
              onChange={() => toggleSubcategory(subcategory.id)}
            />
            {subcategory.title}
          </div>
        ))}
      </div>
    );
  }
  