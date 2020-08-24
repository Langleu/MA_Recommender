import React from 'react';
import Link from 'next/link';
import Head from 'next/head';

export default function Header() {
  return (
    <div>
      <Head>
        <title>Reco</title>
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      </Head>
      <nav
        className="navbar"
        style={{ backgroundColor: '#fafafa' }}
        role="navigation"
        aria-label="main navigation"
      >
        <div className="navbar-brand">
          <Link href="/">
            <a className="navbar-item" href="/">
              <h1 className="title">RECO</h1>
            </a>
          </Link>
        </div>
      </nav>
    </div>
  );
}
