const encoder = new TextEncoder();
const SESSION_COOKIE = "__Host-n7_session";
const SESSION_DAYS = 30;
const PASSWORD_ITERATIONS = 100000;
const PASSWORD_RESET_MINUTES = 60;
const PASSWORD_RESET_FROM = "accounts@n7technologies.org";
const OAUTH_ORIGIN = "https://www.n7technologies.org";
const ADMIN_VERIFICATION_HOURS = 24;
const SELF_SIGNUP_ADMIN_EMAILS = new Set([
  "n7kpierce@gmail.com",
  "n7dpagan@gmail.com"
]);
const INVITE_ONLY_ADMIN_EMAILS = new Set([
  "founder@n7technologies.com"
]);
const ADMIN_EMAILS = new Set([
  ...INVITE_ONLY_ADMIN_EMAILS,
  ...SELF_SIGNUP_ADMIN_EMAILS
]);

function escapeHtml(value = "") {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function base64Url(bytes) {
  let binary = "";
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary).replaceAll("+", "-").replaceAll("/", "_").replace(/=+$/g, "");
}

function fromBase64Url(value) {
  const normalized = value.replaceAll("-", "+").replaceAll("_", "/");
  const binary = atob(normalized + "=".repeat((4 - normalized.length % 4) % 4));
  return Uint8Array.from(binary, character => character.charCodeAt(0));
}

function randomToken(size = 32) {
  const bytes = new Uint8Array(size);
  crypto.getRandomValues(bytes);
  return base64Url(bytes);
}

async function sha256(value) {
  return base64Url(new Uint8Array(await crypto.subtle.digest("SHA-256", encoder.encode(value))));
}

async function passwordDigest(password, salt) {
  const key = await crypto.subtle.importKey("raw", encoder.encode(password), "PBKDF2", false, ["deriveBits"]);
  const bits = await crypto.subtle.deriveBits({
    name: "PBKDF2",
    hash: "SHA-256",
    salt: fromBase64Url(salt),
    iterations: PASSWORD_ITERATIONS
  }, key, 256);
  return base64Url(new Uint8Array(bits));
}

async function passwordRecord(password) {
  const salt = randomToken(16);
  return { salt, hash: await passwordDigest(password, salt) };
}

function constantTimeEqual(left, right) {
  if (!left || !right || left.length !== right.length) return false;
  let difference = 0;
  for (let index = 0; index < left.length; index += 1) {
    difference |= left.charCodeAt(index) ^ right.charCodeAt(index);
  }
  return difference === 0;
}

function normalizeEmail(value) {
  return String(value || "").trim().toLowerCase();
}

function isEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) && value.length <= 254;
}

function safeReturnTo(value, fallback = "/account") {
  return typeof value === "string" && value.startsWith("/") && !value.startsWith("//") ? value : fallback;
}

function nowIso() {
  return new Date().toISOString();
}

function futureIso(milliseconds) {
  return new Date(Date.now() + milliseconds).toISOString();
}

function cookieValue(request, name) {
  const cookies = request.headers.get("cookie") || "";
  for (const part of cookies.split(";")) {
    const [key, ...value] = part.trim().split("=");
    if (key === name) return decodeURIComponent(value.join("="));
  }
  return null;
}

function sessionCookie(token) {
  return `${SESSION_COOKIE}=${encodeURIComponent(token)}; Path=/; Max-Age=${SESSION_DAYS * 86400}; HttpOnly; Secure; SameSite=Lax`;
}

function clearSessionCookie() {
  return `${SESSION_COOKIE}=; Path=/; Max-Age=0; HttpOnly; Secure; SameSite=Lax`;
}

function redirect(location, cookie) {
  const headers = new Headers({ location, "cache-control": "no-store" });
  if (cookie) headers.append("set-cookie", cookie);
  return new Response(null, { status: 303, headers });
}

function json(data, status = 200, cookie) {
  const headers = new Headers({
    "content-type": "application/json; charset=utf-8",
    "cache-control": "no-store"
  });
  if (cookie) headers.append("set-cookie", cookie);
  return new Response(JSON.stringify(data), { status, headers });
}

function securityHeaders(contentType = "text/html; charset=utf-8") {
  return {
    "content-type": contentType,
    "cache-control": "no-store",
    "content-security-policy": "default-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; form-action 'self'; frame-ancestors 'none'; base-uri 'self'",
    "referrer-policy": "strict-origin-when-cross-origin",
    "x-content-type-options": "nosniff",
    "x-frame-options": "DENY"
  };
}

function page(title, content, status = 200) {
  return new Response(`<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${escapeHtml(title)} | N7 Technologies</title>
  <style>
    :root { color-scheme: dark; font-family: Inter, ui-sans-serif, system-ui, sans-serif; background:#05060a; color:#f7f7f8; }
    * { box-sizing:border-box; }
    body { margin:0; min-height:100vh; background:radial-gradient(circle at 15% 10%,rgba(224,0,8,.18),transparent 32rem),linear-gradient(145deg,#05060a,#101116 60%,#05060a); }
    a { color:#ff555b; }
    .shell { width:min(1120px,calc(100% - 2rem)); margin:0 auto; padding:1rem 0 4rem; }
    .topbar { display:flex; align-items:center; justify-content:space-between; gap:1rem; min-height:4.5rem; }
    .brand { color:#fff; text-decoration:none; font-size:1.25rem; font-weight:900; letter-spacing:.06em; }
    .brand span { color:#e00008; }
    .toplinks { display:flex; align-items:center; gap:.7rem; flex-wrap:wrap; }
    .toplinks a,.link-button { border:1px solid #34353d; border-radius:.55rem; background:#111218; color:#fff; padding:.65rem .9rem; text-decoration:none; font-weight:700; }
    .card { border:1px solid #292a31; border-radius:1rem; background:rgba(13,14,19,.94); padding:clamp(1.25rem,4vw,2.5rem); box-shadow:0 24px 70px rgba(0,0,0,.38); }
    .auth-card { width:min(650px,100%); margin:4vh auto 0; }
    h1,h2 { margin-top:0; letter-spacing:-.025em; }
    .muted { color:#aaaeb8; line-height:1.6; }
    .grid { display:grid; grid-template-columns:repeat(2,minmax(0,1fr)); gap:1rem; }
    .full { grid-column:1/-1; }
    label { display:grid; gap:.4rem; color:#d9dae0; font-size:.9rem; font-weight:700; }
    input,select { width:100%; border:1px solid #383942; border-radius:.55rem; background:#090a0e; color:#fff; padding:.8rem .85rem; font:inherit; }
    input:focus,select:focus { border-color:#e00008; outline:2px solid rgba(224,0,8,.2); }
    button,.button { display:inline-flex; align-items:center; justify-content:center; border:0; border-radius:.6rem; background:#e00008; color:#fff; padding:.82rem 1.05rem; font:inherit; font-weight:900; cursor:pointer; text-decoration:none; }
    button:hover,.button:hover { background:#ff1f27; }
    .secondary { border:1px solid #383942; background:#17181e; }
    .oauth { display:grid; grid-template-columns:1fr 1fr; gap:.8rem; margin:1.2rem 0; }
    .notice,.error,.success { margin:1rem 0; border-radius:.6rem; padding:.8rem 1rem; line-height:1.5; }
    .notice { border:1px solid #34353d; background:#111218; color:#c8cad1; }
    .error { border:1px solid #85242a; background:#2a0c0f; color:#ffb1b4; }
    .success { border:1px solid #27663d; background:#0d2817; color:#aff0c3; }
    .stats { display:grid; grid-template-columns:repeat(4,minmax(0,1fr)); gap:1rem; margin-bottom:1rem; }
    .stat { border:1px solid #292a31; border-radius:.75rem; background:#0d0e13; padding:1rem; }
    .stat strong { display:block; margin-top:.3rem; font-size:1.8rem; }
    .table-wrap { overflow:auto; border:1px solid #292a31; border-radius:.75rem; }
    table { width:100%; border-collapse:collapse; min-width:900px; }
    th,td { border-bottom:1px solid #292a31; padding:.75rem; text-align:left; vertical-align:top; }
    th { background:#111218; color:#c6c8ce; font-size:.75rem; text-transform:uppercase; letter-spacing:.06em; }
    td { font-size:.88rem; }
    .pill { display:inline-block; border:1px solid #3b3d46; border-radius:99px; padding:.2rem .55rem; font-size:.72rem; font-weight:800; text-transform:capitalize; }
    .pill.active { border-color:#287a45; color:#8ff0ad; }
    .pill.suspended { border-color:#8b3035; color:#ff9ea3; }
    .row-form { display:flex; gap:.4rem; }
    .row-form select,.row-form button { padding:.45rem .55rem; font-size:.78rem; }
    @media (max-width:760px) { .grid,.oauth,.stats { grid-template-columns:1fr; } .topbar { align-items:flex-start; } }
  </style>
</head>
<body><div class="shell">
  <header class="topbar"><a class="brand" href="/"><span>N7</span> TECHNOLOGIES</a><nav class="toplinks"><a href="/products">Products</a><a href="/contact">Contact</a></nav></header>
  ${content}
</div></body></html>`, { status, headers: securityHeaders() });
}

async function bodyData(request) {
  const contentType = request.headers.get("content-type") || "";
  if (contentType.includes("application/json")) return request.json();
  const form = await request.formData();
  return Object.fromEntries(form.entries());
}

function formError(url, message, route) {
  const target = new URL(route, url);
  target.searchParams.set("error", message);
  return redirect(target.pathname + target.search);
}

function validateProfile(data) {
  const name = String(data.name || "").trim();
  const phone = String(data.phone || "").trim();
  const birthday = String(data.birthday || "").trim();
  const occupation = String(data.occupation || "").trim();
  const accountType = String(data.account_type || "").toLowerCase();
  const birthdayDate = new Date(`${birthday}T00:00:00Z`);

  if (name.length < 2 || name.length > 100) return { error: "Enter your full name." };
  if (!/^[0-9+().\-\s]{7,24}$/.test(phone)) return { error: "Enter a valid phone number." };
  if (!/^\d{4}-\d{2}-\d{2}$/.test(birthday) || Number.isNaN(birthdayDate.getTime()) || birthdayDate > new Date()) {
    return { error: "Enter a valid birthday." };
  }
  if (occupation.length > 120) return { error: "Occupation must be 120 characters or fewer." };
  if (!["homeowner", "contractor"].includes(accountType)) return { error: "Select Homeowner or Contractor." };
  return { name, phone, birthday, occupation: occupation || null, accountType };
}

function validatePassword(password) {
  if (typeof password !== "string" || password.length < 12) return "Password must be at least 12 characters.";
  if (password.length > 200) return "Password is too long.";
  return null;
}

function assertSameOrigin(request) {
  const origin = request.headers.get("origin");
  return !origin || origin === new URL(request.url).origin;
}

async function createSession(env, request, userId) {
  const token = randomToken();
  await env.DB.prepare(`
    INSERT INTO sessions (token_hash, user_id, created_at, expires_at, user_agent)
    VALUES (?, ?, ?, ?, ?)
  `).bind(
    await sha256(token),
    userId,
    nowIso(),
    futureIso(SESSION_DAYS * 86400000),
    (request.headers.get("user-agent") || "").slice(0, 300)
  ).run();
  return token;
}

async function currentUser(env, request) {
  if (!env.DB) return null;
  const token = cookieValue(request, SESSION_COOKIE);
  if (!token) return null;
  const user = await env.DB.prepare(`
    SELECT users.* FROM sessions
    JOIN users ON users.id = sessions.user_id
    WHERE sessions.token_hash = ? AND sessions.expires_at > ?
    LIMIT 1
  `).bind(await sha256(token), nowIso()).first();
  return user && user.status === "active" ? user : null;
}

async function audit(env, actorId, action, targetId = null, details = null) {
  await env.DB.prepare(`
    INSERT INTO audit_logs (actor_user_id, action, target_user_id, details, created_at)
    VALUES (?, ?, ?, ?, ?)
  `).bind(actorId, action, targetId, details ? JSON.stringify(details) : null, nowIso()).run();
}

async function sendPasswordResetEmail(env, user, token, requestUrl) {
  if (!env.EMAIL) throw new Error("The EMAIL binding is unavailable.");
  const resetUrl = new URL("/reset-password", requestUrl);
  resetUrl.searchParams.set("token", token);
  const name = String(user.name || "there").trim();
  const safeName = escapeHtml(name);
  const safeResetUrl = escapeHtml(resetUrl.href);
  await env.EMAIL.send({
    to: user.email,
    from: { email: PASSWORD_RESET_FROM, name: "N7 Technologies" },
    subject: "Reset your N7 Technologies password",
    text: `Hi ${name},\n\nUse this secure link to reset your N7 Technologies password:\n${resetUrl.href}\n\nThis link expires in ${PASSWORD_RESET_MINUTES} minutes and can only be used once. If you did not request this reset, you can ignore this email.`,
    html: `<p>Hi ${safeName},</p><p>Use the button below to reset your N7 Technologies password.</p><p><a href="${safeResetUrl}" style="display:inline-block;background:#e00008;color:#fff;padding:12px 18px;border-radius:8px;text-decoration:none;font-weight:700">Reset password</a></p><p>This link expires in ${PASSWORD_RESET_MINUTES} minutes and can only be used once. If you did not request this reset, you can ignore this email.</p>`
  });
}

async function issueAdminVerification(env, user, requestUrl) {
  if (!env.EMAIL) throw new Error("The EMAIL binding is unavailable.");
  const token = randomToken();
  const tokenHash = await sha256(token);
  const timestamp = nowIso();
  const verificationUrl = new URL("/verify-admin", requestUrl);
  verificationUrl.searchParams.set("token", token);
  await env.DB.batch([
    env.DB.prepare("UPDATE admin_verifications SET used_at = ? WHERE user_id = ? AND used_at IS NULL").bind(timestamp, user.id),
    env.DB.prepare(`
      INSERT INTO admin_verifications (token_hash, user_id, created_at, expires_at)
      VALUES (?, ?, ?, ?)
    `).bind(tokenHash, user.id, timestamp, futureIso(ADMIN_VERIFICATION_HOURS * 3600000))
  ]);

  const name = String(user.name || "Founder").trim();
  try {
    await env.EMAIL.send({
      to: user.email,
      from: { email: PASSWORD_RESET_FROM, name: "N7 Technologies" },
      subject: "Verify your N7 administrator access",
      text: `Hi ${name},\n\nVerify this email address to activate your N7 Technologies administrator access:\n${verificationUrl.href}\n\nThis link expires in ${ADMIN_VERIFICATION_HOURS} hours and can only be used once.`,
      html: `<p>Hi ${escapeHtml(name)},</p><p>Verify this email address to activate your N7 Technologies administrator access.</p><p><a href="${escapeHtml(verificationUrl.href)}" style="display:inline-block;background:#e00008;color:#fff;padding:12px 18px;border-radius:8px;text-decoration:none;font-weight:700">Verify administrator access</a></p><p>This link expires in ${ADMIN_VERIFICATION_HOURS} hours and can only be used once.</p>`
    });
  } catch (error) {
    await env.DB.prepare("DELETE FROM admin_verifications WHERE token_hash = ?").bind(tokenHash).run();
    throw error;
  }
}

function authMessage(url) {
  const error = url.searchParams.get("error");
  const success = url.searchParams.get("success");
  return `${error ? `<div class="error">${escapeHtml(error)}</div>` : ""}${success ? `<div class="success">${escapeHtml(success)}</div>` : ""}`;
}

function profileFields(values = {}) {
  return `<div class="grid">
    <label>Name<input name="name" autocomplete="name" required minlength="2" maxlength="100" value="${escapeHtml(values.name)}"></label>
    <label>Phone number<input name="phone" autocomplete="tel" required maxlength="24" value="${escapeHtml(values.phone)}"></label>
    <label>Birthday<input type="date" name="birthday" autocomplete="bday" required value="${escapeHtml(values.birthday)}"></label>
    <label>Occupation <span class="muted">(optional)</span><input name="occupation" autocomplete="organization-title" maxlength="120" value="${escapeHtml(values.occupation)}"></label>
    <label class="full">I am a
      <select name="account_type" required>
        <option value="">Select one</option>
        <option value="homeowner"${values.account_type === "homeowner" ? " selected" : ""}>Homeowner</option>
        <option value="contractor"${values.account_type === "contractor" ? " selected" : ""}>Contractor</option>
      </select>
    </label>
  </div>`;
}

async function loginPage(request, env) {
  const user = await currentUser(env, request);
  if (user) return redirect(user.profile_complete ? "/account" : "/complete-profile");
  const url = new URL(request.url);
  const returnTo = safeReturnTo(url.searchParams.get("returnTo"));
  return page("Log in", `<main class="card auth-card">
    <h1>Log in to N7</h1>
    <p class="muted">Access your N7 account using email, Google, or GitHub.</p>
    ${authMessage(url)}
    <div class="oauth">
      <a class="button secondary" href="/api/auth/oauth/google?returnTo=${encodeURIComponent(returnTo)}">Continue with Gmail</a>
      <a class="button secondary" href="/api/auth/oauth/github?returnTo=${encodeURIComponent(returnTo)}">Continue with GitHub</a>
    </div>
    <form method="post" action="/api/auth/login">
      <input type="hidden" name="return_to" value="${escapeHtml(returnTo)}">
      <div class="grid">
        <label class="full">Email<input type="email" name="email" autocomplete="email" required></label>
        <label class="full">Password<input type="password" name="password" autocomplete="current-password" required></label>
        <button class="full" type="submit">Log in</button>
      </div>
    </form>
    <p class="muted"><a href="/forgot-password">Forgot your password?</a></p>
    <p class="muted">New to N7? <a href="/signup">Create an account</a>.</p>
  </main>`);
}

async function forgotPasswordPage(request, env) {
  const user = await currentUser(env, request);
  if (user) return redirect("/account");
  const url = new URL(request.url);
  return page("Reset password", `<main class="card auth-card">
    <h1>Reset your password</h1>
    <p class="muted">Enter the email address used for your N7 account. We will send a secure, single-use reset link.</p>
    ${authMessage(url)}
    <form method="post" action="/api/auth/forgot-password">
      <div class="grid">
        <label class="full">Email<input type="email" name="email" autocomplete="email" required maxlength="254"></label>
        <button class="full" type="submit">Send reset link</button>
      </div>
    </form>
    <p class="muted"><a href="/login">Return to login</a>.</p>
  </main>`);
}

async function resetPasswordPage(request, env) {
  const url = new URL(request.url);
  const token = url.searchParams.get("token") || "";
  const reset = token ? await env.DB.prepare(`
    SELECT password_resets.user_id, users.email
    FROM password_resets
    JOIN users ON users.id = password_resets.user_id
    WHERE password_resets.token_hash = ? AND password_resets.used_at IS NULL
      AND password_resets.expires_at > ? AND users.status = 'active'
    LIMIT 1
  `).bind(await sha256(token), nowIso()).first() : null;

  if (!reset) {
    return page("Reset password", `<main class="card auth-card">
      <h1>Reset link unavailable</h1>
      <p class="error">This password reset link is invalid, expired, or already used.</p>
      <a class="button" href="/forgot-password">Request a new reset link</a>
    </main>`, 400);
  }

  return page("Choose a new password", `<main class="card auth-card">
    <h1>Choose a new password</h1>
    <p class="muted">Set a new password for ${escapeHtml(reset.email)}. Using this link will sign the account out on every device.</p>
    ${authMessage(url)}
    <form method="post" action="/api/auth/reset-password">
      <input type="hidden" name="token" value="${escapeHtml(token)}">
      <div class="grid">
        <label class="full">New password<input type="password" name="password" autocomplete="new-password" required minlength="12" maxlength="200"><span class="muted">At least 12 characters.</span></label>
        <label class="full">Confirm new password<input type="password" name="password_confirm" autocomplete="new-password" required minlength="12" maxlength="200"></label>
        <button class="full" type="submit">Reset password</button>
      </div>
    </form>
  </main>`);
}

async function signupPage(request, env) {
  const user = await currentUser(env, request);
  if (user) return redirect(user.profile_complete ? "/account" : "/complete-profile");
  const url = new URL(request.url);
  return page("Sign up", `<main class="card auth-card">
    <h1>Create your N7 account</h1>
    <p class="muted">Required fields help N7 tailor products for homeowners and contractors. Occupation is optional.</p>
    ${authMessage(url)}
    <div class="oauth">
      <a class="button secondary" href="/api/auth/oauth/google">Sign up with Gmail</a>
      <a class="button secondary" href="/api/auth/oauth/github">Sign up with GitHub</a>
    </div>
    <form method="post" action="/api/auth/signup">
      ${profileFields()}
      <div class="grid" style="margin-top:1rem">
        <label class="full">Email<input type="email" name="email" autocomplete="email" required maxlength="254"></label>
        <label class="full">Password<input type="password" name="password" autocomplete="new-password" required minlength="12" maxlength="200"><span class="muted">At least 12 characters.</span></label>
        <button class="full" type="submit">Create account</button>
      </div>
    </form>
    <p class="notice">By creating an account, you consent to N7 storing the profile information submitted here for account administration and service delivery.</p>
    <p class="muted">Already registered? <a href="/login">Log in</a>.</p>
  </main>`);
}

async function completeProfilePage(request, env) {
  const user = await currentUser(env, request);
  if (!user) return redirect("/login?returnTo=/complete-profile");
  if (user.profile_complete) return redirect("/account");
  const url = new URL(request.url);
  return page("Complete profile", `<main class="card auth-card">
    <h1>Complete your profile</h1>
    <p class="muted">Your ${escapeHtml(user.auth_provider)} login is connected. Add the remaining required account details.</p>
    ${authMessage(url)}
    <form method="post" action="/api/auth/profile">
      ${profileFields(user)}
      <button style="margin-top:1rem;width:100%" type="submit">Save profile</button>
    </form>
  </main>`);
}

async function accountPage(request, env) {
  const user = await currentUser(env, request);
  if (!user) return redirect("/login?returnTo=/account");
  if (!user.profile_complete) return redirect("/complete-profile");
  const url = new URL(request.url);
  const pendingAdmin = SELF_SIGNUP_ADMIN_EMAILS.has(normalizeEmail(user.email)) && user.role !== "admin";
  return page("Account", `<main class="card auth-card">
    <h1>Your N7 account</h1>
    <p class="muted">Signed in as ${escapeHtml(user.email)}.</p>
    ${authMessage(url)}
    ${pendingAdmin ? `<div class="notice"><strong>Administrator verification required</strong><p>Check ${escapeHtml(user.email)} for the verification link. No private invitation is required.</p><form method="post" action="/api/auth/admin-verification"><button type="submit" class="secondary">Resend verification email</button></form></div>` : ""}
    <div class="grid">
      <div><strong>Name</strong><p>${escapeHtml(user.name)}</p></div>
      <div><strong>Phone</strong><p>${escapeHtml(user.phone)}</p></div>
      <div><strong>Birthday</strong><p>${escapeHtml(user.birthday)}</p></div>
      <div><strong>Occupation</strong><p>${escapeHtml(user.occupation || "Not provided")}</p></div>
      <div><strong>Account type</strong><p class="pill">${escapeHtml(user.account_type)}</p></div>
      <div><strong>Login method</strong><p class="pill">${escapeHtml(user.auth_provider)}</p></div>
    </div>
    <div class="toplinks" style="margin-top:1.5rem">
      ${user.role === "admin" ? '<a href="/admin">Admin panel</a>' : ""}
      <form method="post" action="/api/auth/logout"><button type="submit" class="secondary">Log out</button></form>
    </div>
  </main>`);
}

async function signup(request, env) {
  if (!assertSameOrigin(request)) return json({ error: "Invalid request origin." }, 403);
  const data = await bodyData(request);
  const email = normalizeEmail(data.email);
  const profile = validateProfile(data);
  const passwordError = validatePassword(data.password);
  if (!isEmail(email)) return formError(request.url, "Enter a valid email address.", "/signup");
  if (INVITE_ONLY_ADMIN_EMAILS.has(email)) return formError(request.url, "This administrator address requires a private invitation or verified social login.", "/signup");
  if (profile.error) return formError(request.url, profile.error, "/signup");
  if (passwordError) return formError(request.url, passwordError, "/signup");

  const existing = await env.DB.prepare("SELECT id FROM users WHERE email = ?").bind(email).first();
  if (existing) return formError(request.url, "An account already exists for that email.", "/login");

  const password = await passwordRecord(String(data.password));
  const id = crypto.randomUUID();
  const timestamp = nowIso();
  await env.DB.prepare(`
    INSERT INTO users (
      id, email, password_hash, password_salt, name, phone, birthday, occupation,
      account_type, auth_provider, email_verified, role, profile_complete, created_at, updated_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 'email', 0, 'user', 1, ?, ?)
  `).bind(
    id, email, password.hash, password.salt, profile.name, profile.phone, profile.birthday,
    profile.occupation, profile.accountType, timestamp, timestamp
  ).run();
  const token = await createSession(env, request, id);
  await audit(env, id, "user.signup", id, { provider: "email" });
  if (SELF_SIGNUP_ADMIN_EMAILS.has(email)) {
    try {
      await issueAdminVerification(env, { id, email, name: profile.name }, request.url);
      await audit(env, id, "admin.verification_sent", id);
      return redirect("/account?success=Account%20created.%20Check%20your%20email%20to%20activate%20administrator%20access.", sessionCookie(token));
    } catch (error) {
      console.error("Administrator verification email failed", error);
      return redirect("/account?error=Account%20created%2C%20but%20the%20verification%20email%20could%20not%20be%20sent.%20Use%20the%20resend%20button.", sessionCookie(token));
    }
  }
  return redirect("/account", sessionCookie(token));
}

async function resendAdminVerification(request, env) {
  if (!assertSameOrigin(request)) return json({ error: "Invalid request origin." }, 403);
  const user = await currentUser(env, request);
  if (!user) return redirect("/login?returnTo=/account");
  if (!SELF_SIGNUP_ADMIN_EMAILS.has(normalizeEmail(user.email))) return json({ error: "Forbidden" }, 403);
  if (user.role === "admin") return redirect("/admin");

  const recent = await env.DB.prepare("SELECT COUNT(*) AS total FROM admin_verifications WHERE user_id = ? AND created_at > ?")
    .bind(user.id, futureIso(-60 * 60000)).first();
  if (Number(recent?.total || 0) >= 3) {
    return formError(request.url, "Too many verification emails were requested. Try again later.", "/account");
  }

  try {
    await issueAdminVerification(env, user, request.url);
    await audit(env, user.id, "admin.verification_sent", user.id);
    return redirect("/account?success=A%20new%20administrator%20verification%20email%20was%20sent.");
  } catch (error) {
    console.error("Administrator verification email failed", error);
    return formError(request.url, "The verification email could not be sent. Try again later.", "/account");
  }
}

async function verifyAdmin(request, env) {
  const url = new URL(request.url);
  const token = url.searchParams.get("token") || "";
  const tokenHash = token ? await sha256(token) : "";
  const verification = token ? await env.DB.prepare(`
    SELECT admin_verifications.user_id, users.email
    FROM admin_verifications
    JOIN users ON users.id = admin_verifications.user_id
    WHERE admin_verifications.token_hash = ? AND admin_verifications.used_at IS NULL
      AND admin_verifications.expires_at > ? AND users.status = 'active'
    LIMIT 1
  `).bind(tokenHash, nowIso()).first() : null;

  if (!verification || !SELF_SIGNUP_ADMIN_EMAILS.has(normalizeEmail(verification.email))) {
    return page("Administrator verification", `<main class="card auth-card"><h1>Verification link unavailable</h1><p class="error">This administrator verification link is invalid, expired, or already used.</p><a class="button secondary" href="/account">Return to account</a></main>`, 400);
  }

  const timestamp = nowIso();
  await env.DB.batch([
    env.DB.prepare("UPDATE users SET role = 'admin', email_verified = 1, updated_at = ? WHERE id = ?").bind(timestamp, verification.user_id),
    env.DB.prepare("UPDATE admin_verifications SET used_at = ? WHERE user_id = ? AND used_at IS NULL").bind(timestamp, verification.user_id),
    env.DB.prepare("DELETE FROM admin_invites WHERE email = ? AND used_at IS NULL").bind(normalizeEmail(verification.email))
  ]);
  await audit(env, verification.user_id, "admin.email_verified", verification.user_id);
  const signedInUser = await currentUser(env, request);
  return redirect(signedInUser?.id === verification.user_id
    ? "/admin"
    : "/login?success=Administrator%20email%20verified.%20Log%20in%20to%20open%20the%20admin%20panel.");
}

async function login(request, env) {
  if (!assertSameOrigin(request)) return json({ error: "Invalid request origin." }, 403);
  const data = await bodyData(request);
  const email = normalizeEmail(data.email);
  const returnTo = safeReturnTo(data.return_to);
  const user = isEmail(email)
    ? await env.DB.prepare("SELECT * FROM users WHERE email = ?").bind(email).first()
    : null;

  if (user?.locked_until && user.locked_until > nowIso()) {
    return formError(request.url, "Too many failed attempts. Try again later.", `/login?returnTo=${encodeURIComponent(returnTo)}`);
  }

  const attemptedHash = user?.password_salt
    ? await passwordDigest(String(data.password || ""), user.password_salt)
    : await passwordDigest(String(data.password || ""), randomToken(16));
  const valid = user?.password_hash && constantTimeEqual(attemptedHash, user.password_hash);

  if (!valid) {
    if (user) {
      const attempts = Number(user.failed_login_attempts || 0) + 1;
      const lockUntil = attempts >= 5 ? futureIso(15 * 60000) : null;
      await env.DB.prepare("UPDATE users SET failed_login_attempts = ?, locked_until = ?, updated_at = ? WHERE id = ?")
        .bind(attempts >= 5 ? 0 : attempts, lockUntil, nowIso(), user.id).run();
    }
    return formError(request.url, "Invalid email or password.", `/login?returnTo=${encodeURIComponent(returnTo)}`);
  }

  if (user.status !== "active") return formError(request.url, "This account is suspended.", "/login");
  await env.DB.prepare("UPDATE users SET failed_login_attempts = 0, locked_until = NULL, last_login_at = ?, updated_at = ? WHERE id = ?")
    .bind(nowIso(), nowIso(), user.id).run();
  const token = await createSession(env, request, user.id);
  await audit(env, user.id, "user.login", user.id, { provider: "email" });
  return redirect(user.profile_complete ? returnTo : "/complete-profile", sessionCookie(token));
}

async function requestPasswordReset(request, env) {
  if (!assertSameOrigin(request)) return json({ error: "Invalid request origin." }, 403);
  const data = await bodyData(request);
  const email = normalizeEmail(data.email);
  const successRoute = "/forgot-password?success=If%20an%20active%20account%20matches%20that%20email%2C%20a%20reset%20link%20has%20been%20sent.";
  if (!isEmail(email)) return redirect(successRoute);

  const user = await env.DB.prepare("SELECT id, email, name, status FROM users WHERE email = ?").bind(email).first();
  if (!user || user.status !== "active") return redirect(successRoute);

  const ip = request.headers.get("cf-connecting-ip") || "unknown";
  const ipHash = await sha256(ip);
  const since = futureIso(-60 * 60000);
  const [userRequests, ipRequests] = await Promise.all([
    env.DB.prepare("SELECT COUNT(*) AS total FROM password_resets WHERE user_id = ? AND created_at > ?").bind(user.id, since).first(),
    env.DB.prepare("SELECT COUNT(*) AS total FROM password_resets WHERE requested_ip_hash = ? AND created_at > ?").bind(ipHash, since).first()
  ]);
  if (Number(userRequests?.total || 0) >= 3 || Number(ipRequests?.total || 0) >= 10) {
    await audit(env, user.id, "user.password_reset_rate_limited", user.id);
    return redirect(successRoute);
  }

  const token = randomToken();
  const tokenHash = await sha256(token);
  const timestamp = nowIso();
  await env.DB.batch([
    env.DB.prepare("UPDATE password_resets SET used_at = ? WHERE user_id = ? AND used_at IS NULL").bind(timestamp, user.id),
    env.DB.prepare(`
      INSERT INTO password_resets (token_hash, user_id, created_at, expires_at, requested_ip_hash)
      VALUES (?, ?, ?, ?, ?)
    `).bind(tokenHash, user.id, timestamp, futureIso(PASSWORD_RESET_MINUTES * 60000), ipHash)
  ]);

  try {
    await sendPasswordResetEmail(env, user, token, request.url);
    await audit(env, user.id, "user.password_reset_requested", user.id);
  } catch (error) {
    await env.DB.prepare("DELETE FROM password_resets WHERE token_hash = ?").bind(tokenHash).run();
    console.error("Password reset email failed", error);
  }
  return redirect(successRoute);
}

async function resetPassword(request, env) {
  if (!assertSameOrigin(request)) return json({ error: "Invalid request origin." }, 403);
  const data = await bodyData(request);
  const token = String(data.token || "");
  const password = String(data.password || "");
  const passwordError = validatePassword(password);
  const errorRoute = `/reset-password?token=${encodeURIComponent(token)}`;
  if (!token) return formError(request.url, "Request a new password reset link.", "/forgot-password");
  if (passwordError) return formError(request.url, passwordError, errorRoute);
  if (password !== String(data.password_confirm || "")) return formError(request.url, "The passwords do not match.", errorRoute);

  const tokenHash = await sha256(token);
  const timestamp = nowIso();
  const reset = await env.DB.prepare(`
    SELECT password_resets.user_id
    FROM password_resets
    JOIN users ON users.id = password_resets.user_id
    WHERE password_resets.token_hash = ? AND password_resets.used_at IS NULL
      AND password_resets.expires_at > ? AND users.status = 'active'
    LIMIT 1
  `).bind(tokenHash, timestamp).first();
  if (!reset) return formError(request.url, "This reset link is invalid, expired, or already used.", "/forgot-password");

  const record = await passwordRecord(password);
  const results = await env.DB.batch([
    env.DB.prepare(`
      UPDATE users SET password_hash = ?, password_salt = ?, email_verified = 1,
        failed_login_attempts = 0, locked_until = NULL, updated_at = ?
      WHERE id = ? AND EXISTS (
        SELECT 1 FROM password_resets WHERE token_hash = ? AND user_id = ?
          AND used_at IS NULL AND expires_at > ?
      )
    `).bind(record.hash, record.salt, timestamp, reset.user_id, tokenHash, reset.user_id, timestamp),
    env.DB.prepare("UPDATE password_resets SET used_at = ? WHERE token_hash = ? AND used_at IS NULL").bind(timestamp, tokenHash),
    env.DB.prepare("DELETE FROM sessions WHERE user_id = ?").bind(reset.user_id),
    env.DB.prepare("UPDATE password_resets SET used_at = COALESCE(used_at, ?) WHERE user_id = ?").bind(timestamp, reset.user_id)
  ]);
  if (!results[0]?.meta?.changes) return formError(request.url, "This reset link is invalid, expired, or already used.", "/forgot-password");

  await audit(env, reset.user_id, "user.password_reset_completed", reset.user_id);
  return redirect("/login?success=Your%20password%20has%20been%20reset.%20Log%20in%20with%20your%20new%20password.", clearSessionCookie());
}

async function updateProfile(request, env) {
  if (!assertSameOrigin(request)) return json({ error: "Invalid request origin." }, 403);
  const user = await currentUser(env, request);
  if (!user) return redirect("/login?returnTo=/complete-profile");
  const profile = validateProfile(await bodyData(request));
  if (profile.error) return formError(request.url, profile.error, "/complete-profile");
  await env.DB.prepare(`
    UPDATE users SET name = ?, phone = ?, birthday = ?, occupation = ?, account_type = ?,
      profile_complete = 1, updated_at = ? WHERE id = ?
  `).bind(profile.name, profile.phone, profile.birthday, profile.occupation, profile.accountType, nowIso(), user.id).run();
  await audit(env, user.id, "user.profile_completed", user.id);
  return redirect("/account");
}

async function logout(request, env) {
  if (!assertSameOrigin(request)) return json({ error: "Invalid request origin." }, 403);
  const token = cookieValue(request, SESSION_COOKIE);
  if (token) await env.DB.prepare("DELETE FROM sessions WHERE token_hash = ?").bind(await sha256(token)).run();
  return redirect("/login?success=You%20have%20been%20logged%20out.", clearSessionCookie());
}

function oauthConfig(env, provider) {
  if (provider === "google" && env.GOOGLE_CLIENT_ID && env.GOOGLE_CLIENT_SECRET) {
    return { clientId: env.GOOGLE_CLIENT_ID, clientSecret: env.GOOGLE_CLIENT_SECRET };
  }
  if (provider === "github" && env.GITHUB_CLIENT_ID && env.GITHUB_CLIENT_SECRET) {
    return { clientId: env.GITHUB_CLIENT_ID, clientSecret: env.GITHUB_CLIENT_SECRET };
  }
  return null;
}

async function startOauth(request, env, provider) {
  const config = oauthConfig(env, provider);
  if (!config) return redirect(`/login?error=${encodeURIComponent(`${provider === "google" ? "Gmail" : "GitHub"} login is awaiting OAuth credentials.`)}`);
  const url = new URL(request.url);
  const state = randomToken();
  const redirectUri = `${OAUTH_ORIGIN}/api/auth/oauth/${provider}/callback`;
  await env.DB.prepare(`INSERT INTO oauth_states (state_hash, provider, return_to, created_at, expires_at) VALUES (?, ?, ?, ?, ?)`)
    .bind(await sha256(state), provider, safeReturnTo(url.searchParams.get("returnTo")), nowIso(), futureIso(10 * 60000)).run();

  const authorization = provider === "google"
    ? new URL("https://accounts.google.com/o/oauth2/v2/auth")
    : new URL("https://github.com/login/oauth/authorize");
  authorization.searchParams.set("client_id", config.clientId);
  authorization.searchParams.set("redirect_uri", redirectUri);
  authorization.searchParams.set("state", state);
  authorization.searchParams.set("scope", provider === "google" ? "openid email profile" : "read:user user:email");
  if (provider === "google") {
    authorization.searchParams.set("response_type", "code");
    authorization.searchParams.set("prompt", "select_account");
  }
  return redirect(authorization.href);
}

async function oauthIdentity(provider, config, code, redirectUri) {
  if (provider === "google") {
    const tokenResponse = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "content-type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ code, client_id: config.clientId, client_secret: config.clientSecret, redirect_uri: redirectUri, grant_type: "authorization_code" })
    });
    if (!tokenResponse.ok) return null;
    const tokens = await tokenResponse.json();
    const response = await fetch("https://openidconnect.googleapis.com/v1/userinfo", { headers: { authorization: `Bearer ${tokens.access_token}` } });
    if (!response.ok) return null;
    const identity = await response.json();
    if (!identity.email_verified) return null;
    return { id: identity.sub, email: identity.email, name: identity.name || "" };
  }

  const tokenResponse = await fetch("https://github.com/login/oauth/access_token", {
    method: "POST",
    headers: { accept: "application/json", "content-type": "application/x-www-form-urlencoded", "user-agent": "N7-Technologies" },
    body: new URLSearchParams({ code, client_id: config.clientId, client_secret: config.clientSecret, redirect_uri: redirectUri })
  });
  if (!tokenResponse.ok) return null;
  const tokens = await tokenResponse.json();
  if (!tokens.access_token) return null;
  const headers = { authorization: `Bearer ${tokens.access_token}`, accept: "application/vnd.github+json", "user-agent": "N7-Technologies" };
  const [profileResponse, emailResponse] = await Promise.all([
    fetch("https://api.github.com/user", { headers }),
    fetch("https://api.github.com/user/emails", { headers })
  ]);
  if (!profileResponse.ok || !emailResponse.ok) return null;
  const profile = await profileResponse.json();
  const emails = await emailResponse.json();
  const email = emails.find(item => item.primary && item.verified)?.email || emails.find(item => item.verified)?.email;
  if (!email) return null;
  return { id: String(profile.id), email, name: profile.name || profile.login || "" };
}

async function finishOauth(request, env, provider) {
  const url = new URL(request.url);
  const stateValue = url.searchParams.get("state");
  const code = url.searchParams.get("code");
  if (!stateValue || !code) return redirect("/login?error=OAuth%20login%20was%20cancelled.");
  const stateHash = await sha256(stateValue);
  const state = await env.DB.prepare("SELECT * FROM oauth_states WHERE state_hash = ? AND provider = ? AND expires_at > ?")
    .bind(stateHash, provider, nowIso()).first();
  await env.DB.prepare("DELETE FROM oauth_states WHERE state_hash = ?").bind(stateHash).run();
  if (!state) return redirect("/login?error=OAuth%20session%20expired.%20Please%20try%20again.");
  const config = oauthConfig(env, provider);
  if (!config) return redirect("/login?error=OAuth%20is%20not%20configured.");
  const identity = await oauthIdentity(provider, config, code, `${OAUTH_ORIGIN}/api/auth/oauth/${provider}/callback`);
  if (!identity) return redirect("/login?error=Unable%20to%20verify%20that%20social%20account.");

  const email = normalizeEmail(identity.email);
  let user = await env.DB.prepare("SELECT * FROM users WHERE email = ?").bind(email).first();
  const timestamp = nowIso();
  if (!user) {
    const id = crypto.randomUUID();
    await env.DB.prepare(`
      INSERT INTO users (id, email, name, auth_provider, provider_user_id, email_verified, role, profile_complete, created_at, updated_at, last_login_at)
      VALUES (?, ?, ?, ?, ?, 1, ?, 0, ?, ?, ?)
    `).bind(id, email, identity.name, provider, identity.id, ADMIN_EMAILS.has(email) ? "admin" : "user", timestamp, timestamp, timestamp).run();
    user = await env.DB.prepare("SELECT * FROM users WHERE id = ?").bind(id).first();
    await audit(env, id, "user.signup", id, { provider });
  } else {
    if (user.status !== "active") return redirect("/login?error=This%20account%20is%20suspended.");
    await env.DB.prepare(`UPDATE users SET auth_provider = ?, provider_user_id = ?, email_verified = 1, role = ?, last_login_at = ?, updated_at = ? WHERE id = ?`)
      .bind(provider, identity.id, ADMIN_EMAILS.has(email) ? "admin" : user.role, timestamp, timestamp, user.id).run();
  }
  const token = await createSession(env, request, user.id);
  await audit(env, user.id, "user.login", user.id, { provider });
  return redirect(user.profile_complete ? safeReturnTo(state.return_to) : "/complete-profile", sessionCookie(token));
}

async function adminSetupPage(request, env) {
  const url = new URL(request.url);
  const token = url.searchParams.get("token") || "";
  const invite = token
    ? await env.DB.prepare("SELECT email FROM admin_invites WHERE token_hash = ? AND used_at IS NULL AND expires_at > ?")
      .bind(await sha256(token), nowIso()).first()
    : null;
  if (!invite || !INVITE_ONLY_ADMIN_EMAILS.has(normalizeEmail(invite.email))) {
    return page("Admin invitation", `<main class="card auth-card"><h1>Invalid administrator invitation</h1><p class="error">This invitation is invalid, expired, or already used.</p><a class="button secondary" href="/login">Return to login</a></main>`);
  }
  return page("Activate administrator", `<main class="card auth-card">
    <h1>Activate administrator account</h1>
    <p class="muted">Create the private N7 administrator account for ${escapeHtml(invite.email)}.</p>
    <form method="post" action="/api/admin/activate">
      <input type="hidden" name="token" value="${escapeHtml(token)}">
      ${profileFields()}
      <div class="grid" style="margin-top:1rem">
        <label class="full">Password<input type="password" name="password" autocomplete="new-password" minlength="12" maxlength="200" required></label>
        <button class="full" type="submit">Activate administrator</button>
      </div>
    </form>
  </main>`);
}

async function activateAdmin(request, env) {
  if (!assertSameOrigin(request)) return json({ error: "Invalid request origin." }, 403);
  const data = await bodyData(request);
  const tokenHash = await sha256(String(data.token || ""));
  const invite = await env.DB.prepare("SELECT * FROM admin_invites WHERE token_hash = ? AND used_at IS NULL AND expires_at > ?")
    .bind(tokenHash, nowIso()).first();
  const email = normalizeEmail(invite?.email);
  const profile = validateProfile(data);
  const passwordError = validatePassword(data.password);
  if (!invite || !INVITE_ONLY_ADMIN_EMAILS.has(email)) return formError(request.url, "Administrator invitation is invalid or expired.", "/login");
  if (profile.error) return formError(request.url, profile.error, `/admin/setup?token=${encodeURIComponent(data.token)}`);
  if (passwordError) return formError(request.url, passwordError, `/admin/setup?token=${encodeURIComponent(data.token)}`);

  const password = await passwordRecord(String(data.password));
  const existing = await env.DB.prepare("SELECT id FROM users WHERE email = ?").bind(email).first();
  const id = existing?.id || crypto.randomUUID();
  const timestamp = nowIso();
  if (existing) {
    await env.DB.prepare(`UPDATE users SET password_hash = ?, password_salt = ?, name = ?, phone = ?, birthday = ?, occupation = ?, account_type = ?, role = 'admin', status = 'active', profile_complete = 1, updated_at = ? WHERE id = ?`)
      .bind(password.hash, password.salt, profile.name, profile.phone, profile.birthday, profile.occupation, profile.accountType, timestamp, id).run();
  } else {
    await env.DB.prepare(`
      INSERT INTO users (id, email, password_hash, password_salt, name, phone, birthday, occupation, account_type, auth_provider, email_verified, role, status, profile_complete, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 'email', 1, 'admin', 'active', 1, ?, ?)
    `).bind(id, email, password.hash, password.salt, profile.name, profile.phone, profile.birthday, profile.occupation, profile.accountType, timestamp, timestamp).run();
  }
  await env.DB.prepare("UPDATE admin_invites SET used_at = ? WHERE token_hash = ?").bind(timestamp, tokenHash).run();
  const session = await createSession(env, request, id);
  await audit(env, id, "admin.activated", id);
  return redirect("/admin", sessionCookie(session));
}

async function adminPage(request, env) {
  const user = await currentUser(env, request);
  if (!user) return redirect("/login?returnTo=/admin");
  if (user.role !== "admin" || !ADMIN_EMAILS.has(normalizeEmail(user.email))) {
    return page("Forbidden", `<main class="card auth-card"><h1>Administrator access required</h1><p class="error">This account is not authorized for the N7 admin panel.</p><a class="button secondary" href="/account">Return to account</a></main>`, 403);
  }
  const [totals, users, audits] = await Promise.all([
    env.DB.prepare(`SELECT COUNT(*) total, SUM(account_type = 'homeowner') homeowners, SUM(account_type = 'contractor') contractors, SUM(status = 'suspended') suspended FROM users`).first(),
    env.DB.prepare(`SELECT id, email, name, phone, birthday, occupation, account_type, auth_provider, role, status, created_at, last_login_at FROM users ORDER BY created_at DESC LIMIT 200`).all(),
    env.DB.prepare(`SELECT action, details, created_at FROM audit_logs ORDER BY created_at DESC LIMIT 20`).all()
  ]);
  const rows = users.results.map(entry => `<tr>
    <td><strong>${escapeHtml(entry.name || "Incomplete profile")}</strong><br><span class="muted">${escapeHtml(entry.email)}</span></td>
    <td>${escapeHtml(entry.phone || "—")}<br><span class="muted">${escapeHtml(entry.birthday || "—")}</span></td>
    <td>${escapeHtml(entry.occupation || "—")}</td>
    <td><span class="pill">${escapeHtml(entry.account_type || "pending")}</span></td>
    <td>${escapeHtml(entry.auth_provider)}<br><span class="muted">${escapeHtml(entry.role)}</span></td>
    <td><span class="pill ${escapeHtml(entry.status)}">${escapeHtml(entry.status)}</span></td>
    <td>${escapeHtml(new Date(entry.created_at).toLocaleDateString("en-US"))}<br><span class="muted">Last: ${entry.last_login_at ? escapeHtml(new Date(entry.last_login_at).toLocaleDateString("en-US")) : "Never"}</span></td>
    <td><form class="row-form" method="post" action="/api/admin/users/${encodeURIComponent(entry.id)}/status"><select name="status"><option value="active"${entry.status === "active" ? " selected" : ""}>Active</option><option value="suspended"${entry.status === "suspended" ? " selected" : ""}>Suspended</option></select><button type="submit">Save</button></form></td>
  </tr>`).join("");
  const activity = audits.results.map(entry => `<li><strong>${escapeHtml(entry.action)}</strong> <span class="muted">${escapeHtml(new Date(entry.created_at).toLocaleString("en-US"))}</span></li>`).join("");
  return page("Admin", `<main>
    <div class="topbar"><div><h1>N7 administrator panel</h1><p class="muted">Signed in as ${escapeHtml(user.email)}.</p></div><form method="post" action="/api/auth/logout"><button class="secondary">Log out</button></form></div>
    <section class="stats">
      <div class="stat">Total accounts<strong>${Number(totals.total || 0)}</strong></div>
      <div class="stat">Homeowners<strong>${Number(totals.homeowners || 0)}</strong></div>
      <div class="stat">Contractors<strong>${Number(totals.contractors || 0)}</strong></div>
      <div class="stat">Suspended<strong>${Number(totals.suspended || 0)}</strong></div>
    </section>
    <section class="card"><h2>Recent signups and account status</h2><div class="table-wrap"><table><thead><tr><th>User</th><th>Contact</th><th>Occupation</th><th>Type</th><th>Login</th><th>Status</th><th>Dates</th><th>Manage</th></tr></thead><tbody>${rows || '<tr><td colspan="8">No signups yet.</td></tr>'}</tbody></table></div></section>
    <section class="card" style="margin-top:1rem"><h2>Recent activity</h2><ol>${activity || "<li>No activity yet.</li>"}</ol></section>
  </main>`);
}

async function updateUserStatus(request, env, targetId) {
  if (!assertSameOrigin(request)) return json({ error: "Invalid request origin." }, 403);
  const actor = await currentUser(env, request);
  if (!actor || actor.role !== "admin" || !ADMIN_EMAILS.has(normalizeEmail(actor.email))) return json({ error: "Forbidden" }, 403);
  const data = await bodyData(request);
  const status = String(data.status || "");
  if (!["active", "suspended"].includes(status)) return json({ error: "Invalid status" }, 400);
  const target = await env.DB.prepare("SELECT email FROM users WHERE id = ?").bind(targetId).first();
  if (!target) return json({ error: "User not found" }, 404);
  if (ADMIN_EMAILS.has(normalizeEmail(target.email)) && status === "suspended") return redirect("/admin?error=Administrator%20accounts%20cannot%20be%20suspended%20here.");
  await env.DB.prepare("UPDATE users SET status = ?, updated_at = ? WHERE id = ?").bind(status, nowIso(), targetId).run();
  if (status === "suspended") await env.DB.prepare("DELETE FROM sessions WHERE user_id = ?").bind(targetId).run();
  await audit(env, actor.id, "admin.user_status_changed", targetId, { status });
  return redirect("/admin");
}

export async function authRoutes(request, env) {
  const url = new URL(request.url);
  const path = url.pathname;
  const method = request.method;

  if (!env.DB && ["/login", "/signup", "/forgot-password", "/reset-password", "/account", "/complete-profile", "/admin"].includes(path)) {
    return new Response("Account database is unavailable.", { status: 503 });
  }
  if (method === "GET" && path === "/login") return loginPage(request, env);
  if (method === "GET" && path === "/signup") return signupPage(request, env);
  if (method === "GET" && path === "/forgot-password") return forgotPasswordPage(request, env);
  if (method === "GET" && path === "/reset-password") return resetPasswordPage(request, env);
  if (method === "GET" && path === "/verify-admin") return verifyAdmin(request, env);
  if (method === "GET" && path === "/complete-profile") return completeProfilePage(request, env);
  if (method === "GET" && path === "/account") return accountPage(request, env);
  if (method === "GET" && path === "/admin") return adminPage(request, env);
  if (method === "GET" && path === "/admin/setup") return adminSetupPage(request, env);
  if (method === "GET" && path === "/api/auth/me") {
    const user = await currentUser(env, request);
    return json(user ? { authenticated: true, name: user.name, email: user.email, role: user.role } : { authenticated: false });
  }
  if (method === "POST" && path === "/api/auth/signup") return signup(request, env);
  if (method === "POST" && path === "/api/auth/login") return login(request, env);
  if (method === "POST" && path === "/api/auth/forgot-password") return requestPasswordReset(request, env);
  if (method === "POST" && path === "/api/auth/reset-password") return resetPassword(request, env);
  if (method === "POST" && path === "/api/auth/admin-verification") return resendAdminVerification(request, env);
  if (method === "POST" && path === "/api/auth/profile") return updateProfile(request, env);
  if (method === "POST" && path === "/api/auth/logout") return logout(request, env);
  if (method === "POST" && path === "/api/admin/activate") return activateAdmin(request, env);

  const oauthStart = path.match(/^\/api\/auth\/oauth\/(google|github)$/);
  if (method === "GET" && oauthStart) return startOauth(request, env, oauthStart[1]);
  const oauthCallback = path.match(/^\/api\/auth\/oauth\/(google|github)\/callback$/);
  if (method === "GET" && oauthCallback) return finishOauth(request, env, oauthCallback[1]);
  const statusRoute = path.match(/^\/api\/admin\/users\/([^/]+)\/status$/);
  if (method === "POST" && statusRoute) return updateUserStatus(request, env, decodeURIComponent(statusRoute[1]));
  return null;
}
