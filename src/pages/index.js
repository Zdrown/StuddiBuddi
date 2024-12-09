import Layout from "../app/components/Layout";
import AddSubjectButton from "../app/components/AddSubjectButton";

export default function Home() {
  return (
    <Layout>
      <h1>Welcome to StuddiBuddi</h1>
      <p>Get started by adding subjects to your study list.</p>
      <AddSubjectButton />
    </Layout>
  );
}
