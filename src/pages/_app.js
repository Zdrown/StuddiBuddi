import Layout from "../app/components/Layout";
 // Include global CSS for consistent styling

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
