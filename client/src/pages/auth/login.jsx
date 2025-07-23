import AuthForm from "@/components/common/AuthForm";
import { useDispatch } from "react-redux";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";
import { loginUser } from "@/store/auth-slice";
import { Link } from "react-router-dom"; 


function AuthLogin() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const dispatch = useDispatch();
  const { toast } = useToast();

  const onSubmit = () => {
    dispatch(loginUser(formData)).then((data) => {
      if (data?.payload?.success) {
        toast({ title: data?.payload?.message });
      } else {
        toast({
          title: data?.payload?.message || "Login failed",
          variant: "destructive",
        });
      }
    });
  };

  return (
    <div className="mx-auto w-full max-w-md space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Sign in to your account
        </h1>

                {/* 注册入口 */}
        <p className="mt-2 text-sm text-muted-foreground">
          Don’t have an account?{" "}
          <Link
            to="/auth/register"
            className="font-medium text-primary hover:underline"
          >
            Register here
          </Link>
        </p>

      </div>

      <AuthForm
        mode="signin"
        formData={formData}
        setFormData={setFormData}
        onSubmit={onSubmit}
      />
    </div>
  );
}

export default AuthLogin;
