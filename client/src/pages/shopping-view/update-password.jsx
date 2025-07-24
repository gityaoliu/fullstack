import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { updatePassword } from "@/store/auth-slice";
import { ArrowLeft, Eye, EyeOff } from "lucide-react";

const initialState = {
  oldPassword: "",
  newPassword: "",
  confirmPassword: "",
};

function UpdatePassword() {
  const [formData, setFormData] = useState(initialState);
  const [showPasswords, setShowPasswords] = useState({
    old: false,
    new: false,
    confirm: false,
  });
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { toast } = useToast();

  function handleInputChange(event) {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  }

  function togglePasswordVisibility(field) {
    setShowPasswords(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  }

  function validateForm() {
    if (!formData.oldPassword) {
      toast({
        title: "Please enter your current password",
        variant: "destructive",
      });
      return false;
    }

    if (!formData.newPassword) {
      toast({
        title: "Please enter a new password",
        variant: "destructive",
      });
      return false;
    }

    if (formData.newPassword.length < 6) {
      toast({
        title: "New password must be at least 6 characters long",
        variant: "destructive",
      });
      return false;
    }

    if (formData.newPassword !== formData.confirmPassword) {
      toast({
        title: "New passwords do not match",
        variant: "destructive",
      });
      return false;
    }

    if (formData.oldPassword === formData.newPassword) {
      toast({
        title: "New password must be different from current password",
        variant: "destructive",
      });
      return false;
    }

    return true;
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);

    try {
      const result = await dispatch(updatePassword({
        oldPassword: formData.oldPassword,
        newPassword: formData.newPassword,
      }));

      if (result.payload?.success) {
        toast({
          title: result.payload.message || "Password updated successfully",
        });
        setFormData(initialState);
        // 移除页面跳转，留在当前页面
        // navigate("/shop/home");
      } else {
        toast({
          title: result.payload?.message || "Failed to update password",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "An error occurred while updating password",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-md mx-auto">
          <Button
            variant="ghost"
            onClick={() => navigate(-1)}
            className="mb-6 flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </Button>

          <Card>
            <CardHeader>
              <CardTitle className="text-center text-2xl font-bold">
                Update Password
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="oldPassword">Current Password</Label>
                  <div className="relative">
                    <Input
                      id="oldPassword"
                      name="oldPassword"
                      type={showPasswords.old ? "text" : "password"}
                      value={formData.oldPassword}
                      onChange={handleInputChange}
                      placeholder="Enter current password"
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => togglePasswordVisibility('old')}
                    >
                      {showPasswords.old ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="newPassword">New Password</Label>
                  <div className="relative">
                    <Input
                      id="newPassword"
                      name="newPassword"
                      type={showPasswords.new ? "text" : "password"}
                      value={formData.newPassword}
                      onChange={handleInputChange}
                      placeholder="Enter new password (min. 6 characters)"
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => togglePasswordVisibility('new')}
                    >
                      {showPasswords.new ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm New Password</Label>
                  <div className="relative">
                    <Input
                      id="confirmPassword"
                      name="confirmPassword"
                      type={showPasswords.confirm ? "text" : "password"}
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      placeholder="Confirm new password"
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => togglePasswordVisibility('confirm')}
                    >
                      {showPasswords.confirm ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-[#EF4DA2] hover:bg-[#D63D90] text-white"
                  disabled={isLoading}
                >
                  {isLoading ? "Updating..." : "Update Password"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default UpdatePassword; 