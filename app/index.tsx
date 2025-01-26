import { Redirect } from "expo-router";

export default function Index() {
  // Reindirizza automaticamente alla pagina "HomePage"
  return <Redirect href="/HomePage" />;
}
