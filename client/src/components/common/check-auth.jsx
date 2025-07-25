import { Navigate, useLocation } from "react-router-dom";

function CheckAuth({ isAuthenticated, user, children }) {
  const location = useLocation();

  // ✅ 如果在根路径，根据登录情况跳转
  if (location.pathname === "/") {
    if (!isAuthenticated) {
      return <Navigate to="/shop/listing" />; // 改为跳转到商品页面
    } else {
      return <Navigate to="/shop/listing" />; // ✅ 登录用户也跳转到 /shop/listing
    }
  }

  // ✅ 未登录用户只能访问购物页面和认证页面，不能访问其他页面
  if (
    !isAuthenticated &&
    !(
      location.pathname.includes("/login") ||
      location.pathname.includes("/register") ||
      location.pathname.includes("/shop") // 允许未认证用户访问购物页面
    )
  ) {
    return <Navigate to="/auth/login" />;
  }

  // ✅ 登录用户访问登录/注册页，跳转到 shop 首页
  if (
    isAuthenticated &&
    (location.pathname.includes("/login") ||
      location.pathname.includes("/register"))
  ) {
    return <Navigate to="/shop/listing" />;
  }

  // ✅ 已登录用户访问不存在权限的路径
  if (
    isAuthenticated &&
    location.pathname.includes("/admin") // ❌ 现在你不再有 admin 页面，直接不允许访问
  ) {
    return <Navigate to="/unauth-page" />;
  }

  return <>{children}</>;
}

export default CheckAuth;
