import { isLoggedIn } from "@/lib/auth";
import { readStore, storageMode } from "@/lib/store";
import LoginForm from "./LoginForm";
import Dashboard from "./Dashboard";

export const dynamic = "force-dynamic";

export const metadata = { title: "Backend — SHADOWLEGEND", robots: "noindex" };

export default async function BackendPage() {
  if (!(await isLoggedIn())) {
    return <LoginForm />;
  }

  const { products, updatedAt } = await readStore();

  return (
    <Dashboard
      initialProducts={products}
      updatedAt={updatedAt}
      storage={storageMode()}
    />
  );
}
