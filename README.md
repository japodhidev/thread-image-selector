# Thread Image Selector Extension

A simple, lightweight Firefox extension that allows users to quickly **copy the URL of any image** on supported websites with a single click. Ideal for curators, researchers, and anyone who needs to quickly extract image source links.

## ✨ Features

* **One-Click Copy:** Simply click any image on a supported site to instantly copy its direct URL to your clipboard.
* **Automatic Injection:** The extension only runs on a select list of image-heavy sites, ensuring minimal performance impact elsewhere.
* **Non-Intrusive:** No pop-ups, menus, or extra buttons needed.

---

## 🛠️ Installation (Firefox)

1.  Go to the Firefox **Add-ons** page.
2.  Search for "Thread Image Selector" (or the name you intend to use), or navigate directly to the listing URL.
3.  Click the **"Add to Firefox"** button.
4.  The extension is ready to use!

> **Note:** If you are installing the extension locally from source, open `about:debugging` in Firefox, select **"This Firefox,"** and click **"Load Temporary Add-on."** Navigate to and select your extension's `manifest.json` file.

---

## 💻 Supported Sites

The extension is currently configured to activate on the following domains:

* `boards.4chan.org`
* `vipergirls.to`
* `imx.to`
* `pornpics.com`

---

## 📝 How to Use

Using the Image Link Grabber is extremely simple:

1.  **Navigate** to any supported website (e.g., `pornpics.com/galleries/...`).
2.  **Click** on the image whose URL you want to copy.
3.  A small, temporary confirmation message may appear (depending on your implementation) or you may simply hear the system sound indicating the URL has been successfully copied to your clipboard.
4.  **Paste** the URL wherever you need it (e.g., in a text editor or a new tab).

---

## ⚙️ Development & Contributions

This project is open to contributions!

1.  **Clone** the repository: `git clone [Your Repository URL]`
2.  **Install** dependencies (if any).
3.  Make your changes.
4.  Load the extension locally via `about:debugging`.
5.  Submit a pull request with a clear description of your feature or fix.

---