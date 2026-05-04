function fieldValue(id) {
  var el = document.getElementById(id);
  return el ? el.value.trim() : '';
}
function fieldRaw(id) {
  var el = document.getElementById(id);
  return el ? el.value : '';
}
function setError(id, message) {
  var el = document.getElementById(id);
  if (el) el.textContent = message || '';
}
function clearErrors() {
  ['errName', 'errEmail', 'errPass', 'errConfirm'].forEach(function (id) { setError(id, ''); });
}
function sameFolderLoginPath() { return 'login.html'; }
function sameFolderRegisterPath() { return 'register.html'; }
function homePath() { return window.location.pathname.includes('/pages/') ? '../index.html' : 'index.html'; }

function register() {
  var name = fieldValue('name');
  var email = fieldValue('email');
  var password = fieldRaw('password');
  var confirm = fieldRaw('confirm');
  var valid = true;
  clearErrors();
  if (name.length < 2) { setError('errName', 'Vui lòng nhập họ tên hợp lệ'); valid = false; }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { setError('errEmail', 'Email không hợp lệ'); valid = false; }
  if (password.length < 6) { setError('errPass', 'Mật khẩu phải có ít nhất 6 ký tự'); valid = false; }
  if (password !== confirm) { setError('errConfirm', 'Mật khẩu không khớp'); valid = false; }
  if (!valid) return;
  var users = getUsers();
  if (users.some(function (u) { return u.email.toLowerCase() === email.toLowerCase(); })) {
    setError('errEmail', 'Email đã tồn tại');
    return;
  }
  var user = { name: name, email: email, password: password };
  users.push(user);
  saveUsers(users);
  alert('Đăng ký thành công!');
  window.location.href = sameFolderLoginPath();
}

function login() {
  var email = fieldValue('email');
  var password = fieldRaw('password');
  clearErrors();
  var user = getUsers().find(function (u) { return u.email.toLowerCase() === email.toLowerCase() && u.password === password; });
  if (!user) { setError('errPass', 'Sai email hoặc mật khẩu'); return; }
  setCurrentUser({ name: user.name, email: user.email });
  alert('Đăng nhập thành công!');
  window.location.href = homePath();
}

function showUser() {
  var user = getCurrentUser();
  var box = document.getElementById('welcome');
  if (box) box.textContent = user ? ('Xin chào, ' + user.name) : '';
  var accountLinks = document.querySelectorAll('[data-account-link]');
  accountLinks.forEach(function (link) {
    if (user) { link.textContent = 'Đăng xuất'; link.href = 'javascript:logout()'; }
  });
}

document.addEventListener('DOMContentLoaded', showUser);
