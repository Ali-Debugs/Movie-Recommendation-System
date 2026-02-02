# 🎬 Movie Recommendation System — Machine Learning Focused

A **content-based movie recommendation system** built with **Machine Learning (TF-IDF + Cosine Similarity)** and a modern **React (Vite)** frontend.  
This project emphasizes **ML implementation, feature engineering, and similarity-based learning**, not just UI.

---

## 🚀 Project Overview

This system recommends movies based on **semantic similarity** between movie descriptions rather than user ratings.  
It analyzes **movie overviews, genres, and keywords** to suggest similar movies using classical NLP-based machine learning techniques.

👉 Fully interpretable ML — no black-box deep learning.

---

## 🧠 Machine Learning Approach

### 🔹 Problem Type
**Content-Based Recommendation System**
- No user history required
- Solves cold-start problem
- Uses movie metadata only

---

### 🔹 Feature Engineering

Each movie is represented using:
- Overview (plot summary)
- Genres
- Keywords

All features are merged into a single text field called `tags`.

Preprocessing includes:
- Lowercasing text
- Removing stop words
- Cleaning spaces in genre/keyword names
- Removing missing values

---

### 🔹 Vectorization: TF-IDF

Text is converted into numerical vectors using **TF-IDF (Term Frequency–Inverse Document Frequency)**.

Why TF-IDF?
- Penalizes common words
- Highlights meaningful terms
- Efficient for medium datasets
- Standard NLP technique

```python
TfidfVectorizer(
    stop_words='english',
    max_features=5000
)
```

---

### 🔹 Similarity Metric: Cosine Similarity

Similarity between movies is measured using **cosine similarity**, which computes the angle between vector representations.

Why cosine similarity?
- Scale-independent
- Captures semantic closeness
- Ideal for text-based ML problems

---

### 🔹 Recommendation Strategy

1. Compute similarity between all movies
2. Rank movies by similarity score
3. Select **Top-N recommendations**
4. Store results in JSON format

To optimize performance:
- Similarity is **precomputed**
- Only **top 6 recommendations** per movie are stored

---

## 📦 Dataset

- **TMDB 5000 Movies Dataset**
- Fields used:
  - Title
  - Overview
  - Genres
  - Keywords

Used for educational purposes only.

---

## 🏗 Architecture

```
Raw Movie Data (CSV)
        ↓
Text Preprocessing
        ↓
TF-IDF Vectorization
        ↓
Cosine Similarity Matrix
        ↓
Top-N Recommendations
        ↓
JSON Output
        ↓
React Frontend
```

---

## 🛠 Tech Stack

### Machine Learning
- Python 3
- Pandas
- NumPy
- Scikit-learn

### Frontend
- React 18
- Vite
- Tailwind CSS
- Framer Motion

---

## 📁 Project Structure

```
movie-recommender-system-ml/
│
├── src/
│   ├── components/
│   ├── data/
│   │   ├── tmdb_5000_movies.csv
│   │   ├── movie_data.json
│   │   └── recommendations.json
│
├── content_based_recommender.py
├── package.json
├── .gitignore
└── README.md
```

---

## 🧪 Run the ML Pipeline

```bash
pip install pandas numpy scikit-learn
python content_based_recommender.py
```

---

## 🌐 Run the Frontend

```bash
npm install
npm run dev
```

Open:
```
http://localhost:5173
```

---

## 🎥 Demo Video

(Add YouTube demo link here – highly recommended)

---

## ⚖️ Design Decisions

- Content-based approach chosen for interpretability
- Precomputed similarity for fast frontend performance
- No backend required

---

## 🔮 Future Improvements

- Collaborative filtering
- Hybrid recommender system
- Backend API (Flask/FastAPI)
- User personalization
- Evaluation metrics (precision@k)

---

## 👨‍💻 Author

**Ali Jabbar**  
GitHub: https://github.com/Ali-Debugs

---

⭐ If you find this project useful, please give it a star!
