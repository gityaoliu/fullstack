import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

function AuthForm({ mode = "signin", onSubmit, formData, setFormData }) {
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};

    if (!formData.email?.trim()) {
      newErrors.email = "Email is required.";
    }

    // 开发期间暂停前端密码验证

    // if (!formData.password || formData.password.length < 1) {
    //   newErrors.password = "Password must be at least 1 characters.";
    // } else if (!/[A-Za-z]/.test(formData.password) || !/[0-9]/.test(formData.password)) {
    //   newErrors.password = "Password must include letters and numbers.";
    // }

    if (mode === "signup" || mode === "update") {
      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = "Passwords do not match.";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleCheckbox = (e) => {
    setFormData((prev) => ({ ...prev, isAdmin: e.target.checked }));
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (validate()) onSubmit(e);
      }}
      className="space-y-4"
    >
      {(mode === "signup") && (
        <div>
          <Label htmlFor="userName">Username</Label>
          <Input
            id="userName"
            name="userName"
            value={formData.userName || ""}
            onChange={handleChange}
          />
        </div>
      )}

      <div>
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          name="email"
          value={formData.email || ""}
          onChange={handleChange}
        />
        {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
      </div>

      <div>
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          name="password"
          type="password"
          value={formData.password || ""}
          onChange={handleChange}
        />
        {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
      </div>

      {(mode === "signup" || mode === "update") && (
        <div>
          <Label htmlFor="confirmPassword">Confirm Password</Label>
          <Input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            value={formData.confirmPassword || ""}
            onChange={handleChange}
          />
          {errors.confirmPassword && (
            <p className="text-red-500 text-sm">{errors.confirmPassword}</p>
          )}
        </div>
      )}

      {mode === "signup" && (
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="isAdmin"
            checked={formData.isAdmin || false}
            onChange={handleCheckbox}
          />
          <label htmlFor="isAdmin" className="text-sm">
            Register as admin
          </label>
        </div>
      )}

      <Button type="submit" className="w-full">
        {mode === "signin"
          ? "Sign In"
          : mode === "signup"
          ? "Sign Up"
          : "Update Password"}
      </Button>
    </form>
  );
}

export default AuthForm;
