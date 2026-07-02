import React from "react";
import { Container } from "../../components/container/Container";
import { Logo } from "../../components/Logo";
import { LogoutBtn } from "../../components/Header/LogoutBtn";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";

/**
 * Header — masthead style instead of a generic SaaS navbar: paper
 * background, a single hairline rule underneath, and understated text
 * links instead of pill buttons. Auth logic, navItems list, and the
 * conditional LogoutBtn render are all untouched.
 */
function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { name: "Home", slug: "/", active: true },
    { name: "Login", slug: "/login", active: !authStatus },
    { name: "Signup", slug: "/signup", active: !authStatus },
    { name: "All Posts", slug: "/all-posts", active: authStatus },
    { name: "Add Post", slug: "/add-post", active: authStatus },
  ];

  return (
    <header className="sticky top-0 z-30 bg-paper/90 backdrop-blur-sm border-b border-rule">
      <Container>
        <nav className="flex items-center justify-between py-4">
          <Link to="/" className="shrink-0">
            <Logo width="120px" />
          </Link>

          <ul className="flex items-center gap-1">
            {navItems.map((item) => {
              if (!item.active) return null;
              const isCurrent = location.pathname === item.slug;
              return (
                <li key={item.name}>
                  <button
                    type="button"
                    onClick={() => navigate(item.slug)}
                    aria-current={isCurrent ? "page" : undefined}
                    className={`
                      px-3.5 py-2 text-sm font-medium rounded-md
                      transition-colors duration-150
                      ${
                        isCurrent
                          ? "text-terracotta"
                          : "text-ink-soft hover:text-ink"
                      }
                    `}
                  >
                    {item.name}
                  </button>
                </li>
              );
            })}
            {authStatus && (
              <li className="ml-2">
                <LogoutBtn />
              </li>
            )}
          </ul>
        </nav>
      </Container>
    </header>
  );
}

export default Header;
