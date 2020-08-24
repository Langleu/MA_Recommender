import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import Health from './Health';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="content has-text-centered">
        <nav className="level">
          <div className="level-item has-text-centered">
            <div>
              <p className="heading">
                <Health />
              </p>
            </div>
          </div>
          <div className="level-item has-text-centered">
            <a
              href="https://github.com/langleu"
              target="_blank"
              rel="noreferrer"
              style={{ color: 'black' }}
            >
              <div>
                <p className="heading">
                  <FontAwesomeIcon icon={faGithub} size="5x" />
                </p>
              </div>
            </a>
          </div>
        </nav>
      </div>
    </footer>
  );
}
