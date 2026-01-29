# Tumor Scan Portal

Tumor Scan Portal is a web-based application designed to assist in **uploading, analyzing, and visualizing medical scan images** for tumor detection. The system provides a simple interface for users to upload scans and view AI-assisted analysis results, making it suitable for academic, research, and demo purposes.

> ⚠️ Disclaimer: This project is for **educational and research use only**. It is not a certified medical diagnostic tool.

---

## 🚀 Features

* Upload tumor scan images (MRI / CT / X-ray)
* Image preview before processing
* AI-assisted tumor detection
* Visual result display
* Clean, minimal, and responsive UI
* Fast processing workflow

---

## 🧠 Application Flow

1. User uploads a scan image
2. Image is validated and preprocessed
3. AI model analyzes the scan
4. Detected regions are highlighted
5. Result is displayed to the user

---

## 🛠 Tech Stack

### Frontend

* React (Vite)
* TypeScript
* Tailwind CSS
* Modern component-based architecture

### Backend / Processing

* Python (ML inference)
* OpenCV (image preprocessing)
* REST API for model communication

---

## 📁 Project Structure

```
tumor-scan-portal-main/
│
├── public/                # Static assets
├── src/                   # Frontend source code
│   ├── components/        # UI components
│   ├── pages/             # Page views
│   ├── services/          # API calls
│   └── utils/             # Helper functions
│
├── backend/               # ML & API backend
│   ├── model/             # Trained model files
│   ├── preprocessing/     # Image preprocessing logic
│   └── app.py             # Backend server
│
├── index.html
├── package.json
└── README.md
```

---

## ⚙️ Installation & Local Setup

### 1. Clone the repository

```bash
git clone <YOUR_GIT_URL>
cd tumor-scan-portal-main
```

### 2. Install frontend dependencies

```bash
npm install
```

### 3. Run frontend

```bash
npm run dev
```

Frontend will run at:

```
http://localhost:5173
```

### 4. Run backend (if included)

```bash
cd backend
pip install -r requirements.txt
python app.py
```

---

## 📦 Build for Production

```bash
npm run build
```

Output:

```
dist/
```

---

## 🎯 Use Cases

* College mini / final year project
* Medical image processing demos
* AI healthcare research
* Portfolio project for ML / Fullstack roles

---

## ⚠️ Disclaimer

This application does **not provide medical diagnosis**. Always consult certified medical professionals for clinical decisions.

---

## 🤝 Contributing

1. Fork the repository
2. Create a new branch
3. Commit your changes
4. Open a pull request

---

## 📄 License

MIT License

---

## 👤 Author

**Gokul Prasanth**

If you find this project useful, give it a ⭐ on GitHub.
