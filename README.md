# Simple Multipage Website (No Frameworks)

A clean, responsive three-page website (Home, About, Contact) built using only HTML5, CSS3, and vanilla JavaScript. Includes a lightweight image slider, mobile navigation toggle, and client-side form validation.

## Structure

- `index.html`: Home with hero and image slider
- `about.html`: Goals and approach
- `contact.html`: Contact form with validation + success message
- `css/styles.css`: Styles, responsive layout, and components
- `js/main.js`: Mobile nav, slider, and form logic
- `assets/images/slide{1..3}.svg`: Placeholder images for the slider
- `.nojekyll`: Ensures GitHub Pages serves files as-is

## Local Preview

Open `index.html` directly in a browser, or serve with a local HTTP server:

- Python: `python -m http.server 8080`
- Node: `npx serve .` (if you have `serve` installed)

Then visit `http://localhost:8080`.

## Deployment

You can deploy this site on GitHub Pages, Netlify, or Vercel in minutes.

### Option A: GitHub Pages

1. Create a new GitHub repository and push this folder’s contents.
2. Add `.nojekyll` at the project root (already included).
3. On GitHub, go to Settings → Pages → Deploy from branch → `main` and `/ (root)`.
4. Save. Your site will be available at `https://<username>.github.io/<repo>/`.

Tip: If the site uses relative paths (it does), it works under project subpaths.

### Option B: Netlify

1. Create a new site from Git in Netlify and pick your repository.
2. Build command: none
3. Publish directory: `/` (root)
4. Deploy. Netlify will give you a live URL you can rename.

### Option C: Vercel

1. Import the repo into Vercel.
2. Framework preset: Other (no build step)
3. Output directory: `/` (root)
4. Deploy to get your live URL.

## Customization

- Update colors in `css/styles.css` under `:root`.
- Replace `assets/images/*.svg` with your own images.
- Edit the slider captions in `index.html`.
- Adjust form validation rules in `js/main.js`.

## Accessibility

- Landmarks and labels for header, nav, and slider.
- Keyboard support for the image slider (Left/Right arrows).
- Visible focus styles and ARIA live regions for form feedback.

## License

For educational use. Replace or remove this section per your needs.
