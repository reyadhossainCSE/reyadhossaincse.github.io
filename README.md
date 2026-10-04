# Md Reyad Hossain — Academic Website

A free personal research website hosted on GitHub Pages.
Your address will be: **https://YOUR-USERNAME.github.io**

---

## What's inside

| File / folder        | What it is                                   | Do you edit it? |
|----------------------|----------------------------------------------|-----------------|
| `data.js`            | ALL your content (bio, papers, projects, links) | **Yes — this is the only file you edit** |
| `assets/cv.pdf`      | Your CV                                      | Replace when your CV changes |
| `assets/img/`        | Your photo and project images                | Add files here |
| `index.html`         | Page structure                               | No |
| `assets/css/style.css` | Design                                     | No |
| `assets/js/main.js`  | Makes everything work                        | No |
| `favicon.svg`        | Small icon in the browser tab                | Optional |

---

## Part A — Put the website online (one time, about 15 minutes)

1. **Create a GitHub account** at https://github.com/signup.
   Pick your username carefully, it becomes your web address
   (for example `reyadhossain` → `https://reyadhossain.github.io`).
2. Click the **+** at the top right → **New repository**.
3. Repository name: type exactly **`YOUR-USERNAME.github.io`**
   (for example `reyadhossain.github.io`). Set it to **Public**. Click **Create repository**.
4. On the new page, click **uploading an existing file**.
5. Unzip `reyad-website.zip` on your computer. Open the `reyad-site` folder,
   select **everything inside it** (not the folder itself) and drag it into the GitHub page.
6. Scroll down and click **Commit changes**.
7. Go to **Settings → Pages**. Under *Build and deployment*, Source = **Deploy from a branch**,
   Branch = **main** and **/(root)**. Click **Save**.
8. Wait 1–2 minutes and open `https://YOUR-USERNAME.github.io`. Your site is live.

---

## Part B — Add your photo

1. Use a clear, square, professional headshot (at least 600×600 pixels).
2. Rename it to **`profile.jpg`**.
3. On GitHub open the `assets/img` folder → **Add file → Upload files** → upload it → **Commit changes**.

Until you add a photo, your initials "RH" are shown.

---

## Part C — Add a new paper, project or link

1. On GitHub, open **`data.js`** and click the **pencil icon** (Edit).
2. Find the section you want and edit the text between the quotes.
3. Click **Commit changes**. The site updates in about a minute.

**Add a publication** — copy this block into the `publications` list (put a comma between blocks):

```js
{
  title: "Your paper title",
  authors: "**M. R. Hossain**, A. Coauthor, B. Supervisor",
  venue: "Journal or conference name",
  year: 2027, type: "journal", status: "published", selected: true,
  doi: "10.xxxx/xxxxx", pdf: "", code: "", slides: "",
  abstract: "Optional short abstract."
},
```

- `type`: `journal`, `conference`, `preprint`, `chapter`, `poster`, `thesis`
- `status`: `published`, `accepted`, `review` (under review), `prep` (in preparation)
- `selected: true` puts the paper in the "Selected" filter
- Put `**` around your name to make it bold and underlined
- To host a paper PDF yourself: upload it to `assets/` and write `pdf: "assets/my-paper.pdf"`

**Add a project** — copy a block inside `projects`, change the text.
Add a picture with `image: "assets/img/my-project.png"` or leave `""` for an automatic cover.

**Add your academic profiles** — paste the full links in the `links` section:
ORCID, Google Scholar, ResearchGate, Scopus, Web of Science, Semantic Scholar,
DBLP, arXiv, GitHub, Kaggle, LinkedIn, X/Twitter, YouTube, blog.
Empty links are hidden automatically.

**Turn sections on/off** — `talks` and `awards` stay hidden until you add an item.

---

## Part D — Create your academic profiles (do these now)

| Profile | Where | Why |
|--------|-------|-----|
| ORCID | https://orcid.org/register | Permanent researcher ID; many journals and PhD forms ask for it |
| Google Scholar | https://scholar.google.com → My profile | Supervisors check your citations here |
| ResearchGate | https://www.researchgate.net/signup | Share papers, get read counts |
| GitHub | https://github.com | Code for your ML projects (very important for AI/ML PhDs) |
| Semantic Scholar | https://www.semanticscholar.org → claim author page | Appears automatically after your papers are indexed |
| Kaggle (optional) | https://www.kaggle.com | Shows data-science skill |

Scopus and Web of Science IDs appear automatically once your papers are indexed.

---

## Part E — Optional extras

- **Contact form**: sign up free at https://formspree.io, create a form, copy its URL
  (looks like `https://formspree.io/f/abcdwxyz`) into `contactForm` in `data.js`.
- **Custom domain** (e.g. `reyadhossain.com`, about USD 10/year from Namecheap, Cloudflare or Porkbun):
  GitHub → Settings → Pages → Custom domain. Follow GitHub's DNS instructions.
- **Get found on Google**: go to https://search.google.com/search-console, add your site and verify it.
- **Link it everywhere**: email signature, LinkedIn "Website" field, ORCID "Websites", Google Scholar
  "Homepage", GitHub profile, CV header, and every cold email to supervisors.

---

## Keep it fresh (5 minutes a month)

- New paper accepted / published → add to `publications`, update `stats` and `news`
- New project or code → add to `projects` with the GitHub link
- New talk, award, certificate → add to the matching list
- Change `footerNote` to the current month
