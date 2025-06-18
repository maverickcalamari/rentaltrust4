import { useAuth } from "@/hooks/use-auth";
import { Loader2 } from "lucide-react";
import { Redirect, Route } from "wouter";
import { useLocation } from "wouter";

export function ProtectedRoute({
  path,
  component: Component,
}: {
  path: string;
  component: () => React.JSX.Element;
}) {
  const { user, isLoading } = useAuth();
  const [location] = useLocation();

  if (isLoading) {
    return (
      <Route path={path}>
        <div className="flex items-center justify-center min-h-screen">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </Route>
    );
  }

  if (!user) {
    const encodedRedirect = encodeURIComponent(location);
    return (
      <Route path={path}>
        <Redirect to={\`/auth?redirect_uri=\${encodedRedirect}\`} />
      </Route>
    );
  }

  // User type restriction
  if (user.userType === "tenant" && !location.includes("tenant-portal")) {
    return (
      <Route path={path}>
        <Redirect to="/tenant-portal" />
      </Route>
    );
  }

  if (user.userType === "landlord" && location.includes("tenant-portal")) {
    return (
      <Route path={path}>
        <Redirect to="/" />
      </Route>
    );
  }

  return <Route path={path} component={Component} />;
}
