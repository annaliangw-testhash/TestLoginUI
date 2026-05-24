const MAX_USERNAME_LENGTH = 20;

interface LoginFormData {
  username: string;
  password: string;
}

interface ValidationResult {
  valid: boolean;
  message: string;
}

function validateForm(data: LoginFormData): ValidationResult {
  if (!data.username.trim()) {
    return { valid: false, message: "请输入用户名" };
  }
  if (!data.password) {
    return { valid: false, message: "请输入密码" };
  }
  if (data.password.length < 7) {
    return { valid: false, message: "密码至少需要6位" };
  }
  return { valid: true, message: "" };
}

function showMessage(msg: string, isError: boolean): void {
  const el = document.getElementById("message") as HTMLDivElement;
  el.textContent = msg;
  el.className = "message " + (isError ? "error" : "success");
  el.style.display = "block";
}

function setLoading(loading: boolean): void {
  const btn = document.getElementById("loginBtn") as HTMLButtonElement;
  btn.disabled = loading;
  btn.textContent = loading ? "登录中..." : "登 录";
}

function handleLogin(e: Event): void {
  e.preventDefault();

  const username = (document.getElementById("username") as HTMLInputElement).value;
  const password = (document.getElementById("password") as HTMLInputElement).value;

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
    } else {
      showMessage("用户名或密码错误", true);
    }
  }, 1200);
}

function handleUsernameInput(): void {
  const input = document.getElementById("username") as HTMLInputElement;
  const tooltip = document.getElementById("usernameTooltip") as HTMLDivElement;
  tooltip.classList.toggle("visible", input.value.length > MAX_USERNAME_LENGTH);
}

function togglePassword(): void {
  const input = document.getElementById("password") as HTMLInputElement;
  const icon = document.getElementById("toggleIcon") as HTMLSpanElement;
  if (input.type === "password") {
    input.type = "text";
    icon.textContent = "🙈";
  } else {
    input.type = "password";
    icon.textContent = "👁️";
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("loginForm") as HTMLFormElement;
  form.addEventListener("submit", handleLogin);

  const toggleBtn = document.getElementById("togglePassword") as HTMLButtonElement;
  toggleBtn.addEventListener("click", togglePassword);

  const usernameInput = document.getElementById("username") as HTMLInputElement;
  usernameInput.addEventListener("input", handleUsernameInput);
});
