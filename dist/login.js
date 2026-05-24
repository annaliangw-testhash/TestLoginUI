"use strict";
const MAX_USERNAME_LENGTH = 20;
function validateForm(data) {
    if (!data.username.trim()) {
        return { valid: false, message: "请输入用户名" };
    }
    if (!data.password) {
        return { valid: false, message: "请输入密码" };
    }
    if (data.password.length < 6) {
        return { valid: false, message: "密码至少需要6位" };
    }
    return { valid: true, message: "" };
}
function showMessage(msg, isError) {
    const el = document.getElementById("message");
    el.textContent = msg;
    el.className = "message " + (isError ? "error" : "success");
    el.style.display = "block";
}
function setLoading(loading) {
    const btn = document.getElementById("loginBtn");
    btn.disabled = loading;
    btn.textContent = loading ? "登录中..." : "登 录";
}
function handleLogin(e) {
    e.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const result = validateForm({ username, password });
    if (!result.valid) {
        showMessage(result.message, true);
        return;
    }
    setLoading(true);
    // 模拟登录请求
    setTimeout(() => {
        setLoading(false);
        if (username === "admin" && password === "123456") {
            showMessage("登录成功！欢迎回来，" + username, false);
        }
        else {
            showMessage("用户名或密码错误", true);
        }
    }, 1200);
}
function handleUsernameInput() {
    const input = document.getElementById("username");
    const tooltip = document.getElementById("usernameTooltip");
    tooltip.classList.toggle("visible", input.value.length > MAX_USERNAME_LENGTH);
}
function togglePassword() {
    const input = document.getElementById("password");
    const icon = document.getElementById("toggleIcon");
    if (input.type === "password") {
        input.type = "text";
        icon.textContent = "🙈";
    }
    else {
        input.type = "password";
        icon.textContent = "👁️";
    }
}
document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("loginForm");
    form.addEventListener("submit", handleLogin);
    const toggleBtn = document.getElementById("togglePassword");
    toggleBtn.addEventListener("click", togglePassword);
    const usernameInput = document.getElementById("username");
    usernameInput.addEventListener("input", handleUsernameInput);
});
//# sourceMappingURL=login.js.map