import React from 'react';
import { Link } from 'react-router-dom';

import ContactIcons from '../Contact/ContactIcons';

const { PUBLIC_URL } = process.env; // set automatically from package.json:homepage

const SideBar = () => (
  <section id="sidebar">
    <section id="intro">
      <Link to="/" className="logo">
        <img src={`${PUBLIC_URL}/images/me.jpg`} alt="" />
      </Link>
      <header>
        <h2>John Hentrich</h2>
        <p><a href="mailto:john.hentrich@gmail.com">john.hentrich@gmail.com</a></p>
      </header>
    </section>

    <section className="blurb">
      <h2>About</h2>
      <p>Hi, I&apos;m John. Welcome to my personal website.
        I am a recent <a href="https://gradadm.seas.upenn.edu/masters/computer-and-information-technology-mcit/">Penn MCIT</a> graduate
        and currently work for <a href="https://ford.com">Ford</a> where I am helping launch new digital safety and security-focused connected services for Ford owners.
      </p>
      <ul className="actions">
        <li>
          {!window.location.pathname.includes('/resume') ? <Link to="/resume" className="button">Learn More</Link> : <Link to="/about" className="button">About Me</Link>}
        </li>
      </ul>
    </section>
    <section id="footer">
      <ContactIcons />
      <p className="mod"><a href="https://github.com/mldangelo/personal-site/">Modified</a> with ❤️ and 🍵, hosted on GitHub 🤖</p>
      <p className="copyright">&copy; John Hentrich <Link to="/">johnhentrich.com</Link></p>
    </section>
  </section>
);

export default SideBar;
