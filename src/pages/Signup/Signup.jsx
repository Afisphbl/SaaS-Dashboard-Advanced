import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Mail, Lock, UserPlus } from "lucide-react";
import { signupWithEmail } from "../../api/authApi";
import { useToast } from "../../context/ToastContext";
import styles from "../Login/Login.module.css"; // Reusing login styles since structures match

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const { addToast } = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password || !confirmPassword) {
      addToast("Please fill in all fields", "error");
      return;
    }
    if (password !== confirmPassword) {
      addToast("Passwords do not match", "error");
      return;
    }
    if (password.length < 6) {
      addToast("Password must be at least 6 characters", "error");
      return;
    }

    setIsLoading(true);
    try {
      await signupWithEmail(email, password);
      addToast("Account created! You can now log in.", "success");
      navigate("/login");
    } catch (error) {
      addToast(error.message, "error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.header}>
          <div className={styles.logo}></div>
          <h1 className={styles.title}>Create an account</h1>
          <p className={styles.subtitle}>Sign up to get started</p>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.inputGroup}>
            <label htmlFor="email" className={styles.label}>
              Email
            </label>
            <div className={styles.inputWrapper}>
              <Mail size={18} className={styles.inputIcon} />
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={styles.input}
                placeholder="you@example.com"
                required
              />
            </div>
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="password" className={styles.label}>
              Password
            </label>
            <div className={styles.inputWrapper}>
              <Lock size={18} className={styles.inputIcon} />
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={styles.input}
                placeholder="••••••••"
                required
              />
            </div>
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="confirmPassword" className={styles.label}>
              Confirm Password
            </label>
            <div className={styles.inputWrapper}>
              <Lock size={18} className={styles.inputIcon} />
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className={styles.input}
                placeholder="••••••••"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className={styles.submitButton}
            disabled={isLoading}
          >
            {isLoading ? (
              <span className={styles.loader}></span>
            ) : (
              <>
                <UserPlus size={18} />
                Sign up
              </>
            )}
          </button>
        </form>

        <p className={styles.footer}>
          Already have an account?{" "}
          <Link to="/login" className={styles.signupLink}>
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}
