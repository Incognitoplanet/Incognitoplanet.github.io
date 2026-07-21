# INCOG Media Drop — GitHub Pages

This static site reads loose images, loose videos, and ZIP archives from the public repository's `incog` folder. ZIP contents are downloaded and unpacked in the visitor's browser.

## Required repository layout

```text
index.html
config.js
.nojekyll
incog/
  photo.jpg
  clip.mp4
  archive.zip
```

The folder name is case-sensitive: use lowercase `incog`.

## GitHub Pages

In **Settings → Pages** use:

- Source: **Deploy from a branch**
- Branch: **main**
- Folder: **/(root)**

The repository must be public unless you add your own authenticated backend.

## ZIP support

A ZIP may contain nested folders. Supported contents include:

- Images: JPG, JPEG, PNG, GIF, WebP, AVIF, SVG, BMP, ICO
- Videos: MP4, WebM, OGV/OGG, MOV, M4V

Browser codec support still matters. MP4 (H.264) and WebM are safest. HEIC, camera RAW and some HEVC MOV files may not display in every browser.

## File-size limits

- GitHub's browser uploader rejects files larger than 25 MiB.
- Files up to 100 MiB can normally be pushed with GitHub Desktop or Git.
- Normal Git repositories reject files larger than 100 MiB.
- A ZIP does not remove these repository limits.

Large ZIPs also make visitors download the whole archive before anything inside it can appear. Several smaller ZIPs are better than one huge ZIP.

## Custom domain

For a custom domain, fill in `config.js`:

```js
window.GALLERY_CONFIG = {
  owner: "YOUR-GITHUB-USERNAME",
  repo: "YOUR-REPOSITORY",
  branch: "main",
  folder: "incog"
};
```
