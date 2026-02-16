# Kidjustin-k
A powerful, multi-feature WhatsApp bot built using Node.js and Baileys. This bot includes capabilities such as handling multimedia, games, and more.

---

## Features
- 📁 **Media Download**: Optimized YouTube video/audio downloads via `yt-dlp`.
- 🎮 **Games**: Built-in interactive quiz game.
- 🔧 **Automation**: Automated WhatsApp responses for groups and individuals.
- 📊 **Multi-version**: Supports Node.js `18.x`, `20.x`.

---

## Prerequisites
- **Node.js**: Ensure Node.js ≥ 18 is installed.
- **FFmpeg**: Install FFmpeg for media processing.
- **yt-dlp**: Manage YouTube download processing:
  ```bash
  pip install yt-dlp
  ```
- **Environment Variables**: Add a `.env` file with necessary credentials:
  ```
  OWNER_NUMBER=263777426534
  BOT_NAME=Kidjustin-k
  ```

---

## Installation

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/tinotendadurani55/effective-octo-waffle.git
   cd effective-octo-waffle
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Run the Bot**:
   ```bash
   node index.js
   ```

---

## Deployment on Koyeb (Optional)
Follow the [Koyeb deployment guide](https://www.koyeb.com/docs/) for hosting.

1. Setup the Dockerfile:
   Your repository includes a `Dockerfile` optimized for deployment.

2. Deploy directly:
   - Push the repo to Koyeb via their GitHub integrator.

---

## File Structure
```plaintext
effective-octo-waffle/
├── index.js          # Main entry file
├── package.json      # Dependencies and scripts
├── Dockerfile        # Docker configuration
├── .env              # Environment variables (ignored)
├── downloads/        # Temporary downloaded files
```

---

## Contributing
Contributions are welcome! Please fork the repo and submit a Pull Request.

---

## License
MIT License