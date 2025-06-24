import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-brand">
          <h1 className="footer-logo">AnimeSuki</h1>
          <p className="footer-subtitle">
            Animesuki is a simple and lightweight anime browsing website powered
            by the Jikan API. It allows users to explore anime information such
            as titles, genres, synopses, ratings, and more. Animesuki offers a
            clean and user-friendly interface for discovering and learning about
            your favorite anime.
          </p>
        </div>

        <div className="flex gap-x-4">
          <div className="footer-col">
            <h3 className="font-semibold mb-2">Source</h3>
            <ul className="space-y-1">
              <li>
                <a href="https://docs.api.jikan.moe/">Documentation</a>
              </li>
              <li>
                <a href="https://github.com/jikan-me">Github</a>
              </li>
              <li>
                <a href="https://jikan.moe/">Terms</a>
              </li>
            </ul>
          </div>

          <div className="footer-col">
            <h3 className="font-semibold mb-2">Developers</h3>
            <ul className="space-y-1">
              <li>
                <a href="https://github.com/Sora-Aizawaa">GitHub</a>
              </li>
              <li>
                <a href="https://instagram.com/skytea12">Instagram</a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>
          2025 Created By -
          <a href="https://github.com/Sora-Aizawaa"> Sora Aizawaa + Chat GPT</a>
        </p>
      </div>
    </footer>
  );
}
