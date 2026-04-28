# 🔍 FairTrace

> **Forensic ML Bias Attribution — trace *where* bias was born, not just that it exists.**

---

## 🧬 What is FairTrace?

Most fairness tools tell you **if** your model is biased. FairTrace tells you **where** bias entered the pipeline.

FairTrace is a forensic, end-to-end ML bias attribution engine that performs stage-level diagnosis across four critical pipeline stages:

| Stage | What FairTrace Audits |
|---|---|
| 📦 **Data Collection** | Representation gaps, demographic imbalances in the raw dataset |
| ⚙️ **Preprocessing** | Encoding choices, imputation strategies, feature scaling disparities |
| 🧠 **Model Training** | Objective function bias, threshold decisions, regularization effects |
| 🎯 **Inference** | Deployment-time drift, disparate impact in live predictions |

Unlike Fairlearn, AIF360, or the What-If Tool — which flag aggregate bias scores — FairTrace **attributes bias to its origin stage**, enabling targeted remediation instead of guesswork.

---

## 🎯 Who Is This For?

- **ML Engineers** who want to debug fairness issues systematically
- **Data Scientists** auditing models before deployment
- **AI Ethics Auditors** producing stage-level bias reports
- **Hackathon teams** building responsible AI products fast

---

## ✨ Key Features

- **Stage-Level Attribution** — pinpoint which pipeline stage introduced bias
- **Demographic Parity Difference** — quantify prediction rate gaps across sensitive groups
- **False Positive Rate Disparity** — measure differential error rates by group
- **Interactive Dashboard** — visualize bias scores across stages in real time
- **REST API** — plug FairTrace into any existing ML pipeline via FastAPI endpoints
- **Upload & Analyze** — drop in your dataset and model outputs, get a full bias autopsy

---

## 🏗️ Architecture

```
FairTrace/
├── FairTrace-frontend/       # React + Vite dashboard
│   ├── src/
│   │   ├── components/       # Stage cards, metric charts, upload UI
│   │   └── pages/            # Dashboard, Report, Upload views
│   └── package.json
│
├── FairTrace-backend/        # Node.js / Express API layer
│   ├── routes/
│   └── server.js
│
├── main.py                   # FastAPI entry point — bias pipeline orchestration
├── fairness.py               # Core fairness metrics (DPD, FPR disparity)
└── README.md
```

**Tech Stack:**
- **Frontend:** React + Vite, Axios
- **Backend API:** Node.js + Express (orchestration), FastAPI + Python (ML layer)
- **ML / Fairness:** scikit-learn, NumPy, SHAP
- **Database:** MongoDB

---

## 🚀 Getting Started

### Prerequisites

- Python 3.9+
- Node.js 18+
- MongoDB running locally or a Atlas URI

### 1. Clone the repo

```bash
git clone https://github.com/gargi-dixitt/FairTrace.git
cd FairTrace
```

### 2. Start the Python / FastAPI ML layer

```bash
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```

### 3. Start the Node.js backend

```bash
cd FairTrace-backend
npm install
npm run dev
```

### 4. Start the React frontend

```bash
cd FairTrace-frontend
npm install
npm run dev
```

Frontend runs at `http://localhost:5173` by default.

---

## 🔬 How It Works

1. **Upload** your dataset (CSV) and model predictions
2. FairTrace runs a **multi-stage audit** — each stage is analyzed independently
3. A **bias attribution score** is computed per stage
4. The dashboard surfaces which stage is the **primary bias source**
5. Stage-specific **remediation hints** are returned alongside each score


---

## 🤝 Contributing

Pull requests are welcome! To contribute:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -m 'Add your feature'`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Open a Pull Request


---

## 📄 License

This project is licensed under the MIT License.
