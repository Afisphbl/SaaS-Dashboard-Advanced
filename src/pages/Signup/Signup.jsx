import { Link } from "react-router-dom";
import { LockIcon, LogInIcon, Mail, Loader } from "lucide-react";
import { signUp } from "../../api/auth";
import InputGroup from "../../components/input/InputGroup";
import styles from "../Login/Login.module.css";
import { useEffect, useRef, useState } from "react";
import { useToast } from "../../context/ToastContext";
import { useNavigate } from "react-router";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cPassword, setCPassword] = useState("");
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
    if (!email || !email.trim().endsWith("@gmail.com")) {
      setError("Please enter a valid Gmail address");
      emailRef.current.focus();
      addToast("Please enter a valid Gmail address", "error");
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

    if (cPassword !== password) {
      setError("Passwords do not match");
      addToast("Passwords do not match", "error");
      return;
    }

    setLoading(true);
    try {
      const { error } = await signUp(email, password);
      if (error) throw new Error(error);
      addToast("Account created successfully", "success");
      navigate("/login");
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      setError(message);
      addToast(`Sign-up failed: ${message}`, "error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <header className={styles.header}>
          <div className={styles.logo}></div>
          <h1 className={styles.title}>Create Account</h1>
          <p className={styles.subtitle}>Sign up to get started</p>
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
            <label htmlFor="password" className={styles.label}>
              Password
            </label>

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

          <InputGroup className={styles.inputGroup}>
            <label htmlFor="cPassword" className={styles.label}>
              Confirm Password
            </label>

            <div className={styles.inputWrapper}>
              <LockIcon size={20} className={styles.inputIcon} />
              <input
                type="password"
                id="cPassword"
                className={styles.input}
                placeholder={`${Array(8).fill("•").join("")}`}
                value={cPassword}
                onChange={(e) => setCPassword(e.target.value)}
              />
            </div>
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
                Sign Up
              </>
            )}
          </button>
        </form>

        <div className={styles.divider}>
          <span className={styles.dividerText}>OR</span>
        </div>

        <footer className={styles.footer}>
          Already have an account?{" "}
          <Link to="/login" className={styles.signupLink}>
            Log in
          </Link>
        </footer>
      </div>
    </div>
  );
}

export default Signup;
