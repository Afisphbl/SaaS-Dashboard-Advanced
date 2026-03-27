import { Link } from "react-router-dom";
import { LockIcon, LogInIcon, Mail, Loader } from "lucide-react";
import { login, googleSignIn, githubSignIn } from "../../api/auth";
import InputGroup from "../../components/input/InputGroup";
import styles from "./Login.module.css";
import { useEffect, useRef, useState } from "react";
import { useToast } from "../../context/ToastContext";
import { useNavigate } from "react-router";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const emailRef = useRef(null);
  const navigate = useNavigate();

  const { addToast } = useToast();

  useEffect(() => {
    let timer;
    if (error) {
      timer = setTimeout(() => {
        setError(null);
      }, 3000);
    }
    return () => clearTimeout(timer);
  }, [error]);

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    if (!email) {
      setError("Email is required");
      emailRef.current.focus();
      addToast("Email is required", "error");
      return;
    }

    if (!password || password.length < 6) {
      setError("Password is required and must be at least 6 characters long");
      addToast(
        "Password is required and must be at least 6 characters long",
        "error",
      );
      return;
    }

    setLoading(true);
    try {
      const { error } = await login(email, password);
      if (error) throw new Error(error);
      addToast("Logged in successfully", "success");
      navigate("/");
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      setError(message);
      addToast(`Login failed: ${message}`, "error");
    } finally {
      setLoading(false);
    }
  }

  async function handleGoogleSignIn() {
    const { error } = await googleSignIn();
    if (error) {
      addToast(`Google sign-in failed: ${error.message}`, "error");
    }
  }

  async function handleGitHubSignIn() {
    const { error } = await githubSignIn();
    if (error) {
      addToast(`GitHub sign-in failed: ${error.message}`, "error");
    }
  }
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <header className={styles.header}>
          <div className={styles.logo}></div>
          <h1 className={styles.title}>Welcome Back</h1>
          <p className={styles.subtitle}>
            Enter your details to access your account
          </p>
        </header>

        <form className={styles.form} onSubmit={handleSubmit}>
          <InputGroup className={styles.inputGroup}>
            <label htmlFor="email" className={styles.label}>
              Email
            </label>

            <div className={styles.inputWrapper}>
              <Mail size={20} className={styles.inputIcon} />
              <input
                ref={emailRef}
                type="email"
                id="email"
                className={styles.input}
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </InputGroup>

          <InputGroup className={styles.inputGroup}>
            <div className={styles.passwordHeader}>
              <label htmlFor="password" className={styles.label}>
                Password
              </label>

              <a href="#" className={styles.forgotLink}>
                Forgot Password?
              </a>
            </div>

            <div className={styles.inputWrapper}>
              <LockIcon size={20} className={styles.inputIcon} />
              <input
                type="password"
                id="password"
                className={styles.input}
                placeholder={`${Array(8).fill("•").join("")}`}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </InputGroup>

          <InputGroup className={styles.rememberGroup}>
            <input type="checkbox" id="remember" className={styles.checkbox} />
            <label htmlFor="remember" className={styles.rememberLabel}>
              Remember for 30 days
            </label>
          </InputGroup>

          {error && <div className={styles.error}>{error}</div>}

          <button
            type="submit"
            className={styles.submitButton}
            disabled={loading}
          >
            {loading ? (
              <Loader size={20} className={styles.loader} />
            ) : (
              <>
                <LogInIcon size={20} />
                Sign In
              </>
            )}
          </button>
        </form>

        <div className={styles.divider}>
          <span className={styles.dividerText}>OR</span>
        </div>

        <div className={styles.oauthGroup}>
          <button className={styles.oauthButton} onClick={handleGoogleSignIn}>
            Google
          </button>
          <button className={styles.oauthButton} onClick={handleGitHubSignIn}>
            {/* <GitHub size={20} /> */}
            GitHub
          </button>
        </div>

        <footer className={styles.footer}>
          Don't have an account?{" "}
          <Link to="/signup" className={styles.signupLink}>
            Sign up
          </Link>
        </footer>
      </div>
    </div>
  );
}

export default Login;
