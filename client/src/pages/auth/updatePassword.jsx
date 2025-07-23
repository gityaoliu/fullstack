import AuthForm from "@/components/common/AuthForm.jsx"
import { useDispatch, useSelector } from "react-redux";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function UpdatePassword() {
  const { user } = useSelector((state) => state.auth);
  const { toast } = useToast();
  const navigate = useNavigate();

  const initialState = {
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  };

  const dispatch = useDispatch();

  const onSubmit = async (e, formData) => {
    e.preventDefault();

    if (formData.newPassword !== formData.confirmPassword) {
      return toast({
        title: "❌ New passwords do not match",
        variant: "destructive",
      });
    }

    try {
      const res = await axios.put(
        `http://localhost:8000/api/auth/update-password/${user.id}`,
        {
          currentPassword: formData.currentPassword,
          newPassword: formData.newPassword,
        },
        { withCredentials: true }
      );

      if (res.data.success) {
        toast({ title: res.data.message });
        navigate("/shop/home");
      } else {
        toast({
          title: res.data.message || "Password update failed",
          variant: "destructive",
        });
      }
    } catch (err) {
      toast({
        title: "Something went wrong",
        description: err.response?.data?.message || err.message,
        variant: "destructive",
      });
    }
  };

  const fields = [
    {
      name: "currentPassword",
      label: "Current Password",
      type: "password",
      componentType: "input",
      placeholder: "Enter current password",
    },
    {
      name: "newPassword",
      label: "New Password",
      type: "password",
      componentType: "input",
      placeholder: "Enter new password",
    },
    {
      name: "confirmPassword",
      label: "Confirm New Password",
      type: "password",
      componentType: "input",
      placeholder: "Confirm new password",
    },
  ];

  return (
    <div className="mx-auto w-full max-w-md space-y-6 mt-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Update Password
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Change your account password securely
        </p>
      </div>
      <AuthForm
        mode="update"
        fields={fields}
        initialState={initialState}
        onSubmit={onSubmit}
        buttonText="Update Password"
      />
    </div>
  );
}

export default UpdatePassword;
