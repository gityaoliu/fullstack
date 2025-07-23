import AuthForm from "@/components/common/AuthForm";
import { useDispatch } from "react-redux";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { registerUser } from "@/store/auth-slice";

function AuthRegister() {
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
    isAdmin: false,
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { toast } = useToast();

  const onSubmit = () => {
    dispatch(registerUser(formData)).then((data) => {
      const result = data?.payload;
      if (result?.success) {
        toast({
          title: "🎉 Registration successful",
          description: "You can now log in to your account.",
        });
        navigate("/auth/login");
      } else {
        toast({
          title: "❌ Registration failed",
          description: result?.message || "Please try again later.",
          variant: "destructive",
        });
      }
    });
  };

  return (
    <div className="mx-auto w-full max-w-md space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Create new account
        </h1>
      </div>

      <AuthForm
        mode="signup"
        formData={formData}
        setFormData={setFormData}
        onSubmit={onSubmit}
      />
    </div>
  );
}

export default AuthRegister;
