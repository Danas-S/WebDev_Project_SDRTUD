# Lucas Snow's Adventures

A four page website for Lucas Snow, a fictional, visually impaired snowboarder who offers snowboarding trips around the world. It was built by a team of three first year students for the Web Development 1 module at Technological University Dublin (TU Dublin) in 2024.

**Live site:** https://danas-s.github.io/WebDev_Project_SDRTUD/

## Pages

| Page | File | Content |
|---|---|---|
| Home | `index.html` | Introduction to Lucas and his snowboarding trips |
| About | `pages/about.html` | Lucas's background and his passion for winter sports |
| Contact | `pages/contact.html` | Contact form with name, email, phone and message fields, checked in the browser before submission |
| Trips | `pages/trips.html` | Ten destinations, including Whistler, Niseko, Laax and Chamonix, each with highlights and a link to more information |

All four pages share the same header, navigation, footer and search popup, and switch to a mobile layout with a menu button on small screens.

## Accessibility focus

Because the client is visually impaired, the brief emphasised accessibility. Each destination photo on the Trips page has alternative text naming the place, and every contact form field has a visible label. The client update emails in `docs/` describe the accessibility features the team planned and added.

## Built with

- HTML5 and CSS3 (Flexbox, media queries and keyframe animations)
- Vanilla JavaScript (`js/scripts.js`) for the mobile menu, the search popup and contact form validation
- [Google Fonts](https://fonts.google.com/) (Roboto) and [Font Awesome](https://fontawesome.com/) icons
- WebP images, and GitHub Pages for hosting

There is no build step, framework or package manager.

## Project structure

```
index.html         Home page
pages/             About, Contact and Trips pages
css/               main.css (shared styles) and one stylesheet per page
js/scripts.js      Mobile menu, search popup and form validation
img/               Site images
favicon/           Favicon set
docs/              Homepage prototype and client update emails
```

## Running it locally

Clone the repository:

```
git clone https://github.com/Danas-S/WebDev_Project_SDRTUD.git
cd WebDev_Project_SDRTUD
```

Then either open `index.html` in a browser, or run a local web server from the project folder:

```
python -m http.server 8000
```

and visit http://localhost:8000 in your browser. On Windows, use `py -m http.server 8000` if `python` isn't recognised. The VS Code Live Server extension also works.

The font and icons load from Google Fonts and Font Awesome, so they need an internet connection. Offline, the site falls back to a system font and the icons don't appear.

## Known limitations

- The search popup is a visual prototype: it doesn't search the site.
- The contact form checks the entries and shows a confirmation message, but it doesn't send them anywhere, because there is no back end.
- The background images carry a placeholder credit ("Photo by Jane Doe on Unsplash"). The original photographers aren't recorded in the repository.

## Team

- Danas Savickas ([@Danas-S](https://github.com/Danas-S))
- Stepan Tulay ([@St2lay](https://github.com/St2lay))
- Ruslan Rohovskyi
