import { LockIcon, LogInIcon, Mail } from "lucide-react";
import InputGroup from "../../components/input/InputGroup";
import styles from "./Login.module.css";

function Login() {
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

        <form className={styles.form}>
          <InputGroup className={styles.inputGroup}>
            <label htmlFor="email" className={styles.label}>
              Email
            </label>

            <div className={styles.inputWrapper}>
              <Mail size={20} className={styles.inputIcon} />
              <input
                type="email"
                id="email"
                className={styles.input}
                placeholder="Enter your email"
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
              />
            </div>
          </InputGroup>

          <InputGroup className={styles.rememberGroup}>
            <input type="checkbox" id="remember" className={styles.checkbox} />
            <label htmlFor="remember" className={styles.rememberLabel}>
              Remember for 30 days
            </label>
          </InputGroup>

          <button type="submit" className={styles.submitButton}>
            <LogInIcon size={20} />
            Sign In
          </button>
        </form>

        <div className={styles.divider}>
          <span className={styles.dividerText}>OR</span>
        </div>

        <div className={styles.oauthGroup}>
          <button className={styles.oauthButton}>Google</button>
          <button className={styles.oauthButton}>
            {/* <GitHub size={20} /> */}
            GitHub
          </button>
        </div>

        <footer className={styles.footer}>
          Don't have an account?{" "}
          <a href="#" className={styles.signupLink}>
            Sign up
          </a>
        </footer>
      </div>
    </div>
  );
}

export default Login;
