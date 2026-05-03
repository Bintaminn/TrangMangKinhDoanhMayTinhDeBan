

function register() {
    let name = $("#name").val().trim();
    let email = $("#email").val().trim();
    let password = $("#password").val();
    let confirm = $("#confirm").val();

    let valid = true;

    $(".error").text("");

    if (name === "") {
        $("#errName").text("Vui lòng nhập tên");
        valid = false;
    }

    if (!email.includes("@")) {
        $("#errEmail").text("Email không hợp lệ");
        valid = false;
    }

    if (password.length < 6) {
        $("#errPass").text("Mật khẩu >= 6 ký tự");
        valid = false;
    }

    if (password !== confirm) {
        $("#errConfirm").text("Mật khẩu không khớp");
        valid = false;
    }

    if (!valid) return;

    let users = getUsers();

    let exists = users.find(u => u.email === email);
    if (exists) {
        alert("Email đã tồn tại!");
        return;
    }

    let user = { name, email, password };
    users.push(user);
    saveUsers(users);

    alert("Đăng ký thành công!");
    window.location.href = "login.html";
}

function login() {
    let email = $("#email").val().trim();
    let password = $("#password").val();

    let users = getUsers();

    let user = users.find(u => u.email === email && u.password === password);

    if (!user) {
        $("#errPass").text("Sai email hoặc mật khẩu");
        return;
    }

    setCurrentUser(user);

    alert("Đăng nhập thành công!");
    window.location.href = "index.html";
}


function showUser() {
    let user = getCurrentUser();
    if (user) {
        $("#welcome").text("Xin chào, " + user.name);
    }
}
