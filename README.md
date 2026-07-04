# 📊 AlgoMetrics

> A Full-Stack Competitive Programming Analytics Dashboard to aggregate, visualize, and track problem-solving performance across coding platforms.

*⚠️ Note: This project is currently under active development.*

## 💡 The Vision
Tracking competitive programming progress across multiple platforms (LeetCode, CodeChef, Codeforces) is often fragmented. AlgoMetrics solves this by providing a single, unified dashboard that fetches real-time performance data, processes it via a custom RESTful backend, and visualizes historical trends to help developers track their growth and target weak areas.

## 🚀 Tech Stack

**Frontend (Client)**
* **React.js (Vite):** For a lightning-fast, reactive user interface.
* **Tailwind CSS:** For modern, responsive utility-first styling.
* **Recharts:** For rendering interactive historical performance graphs.

**Backend (Server)**
* **Node.js & Express.js:** To handle API routing and external data fetching.
* **node-cache:** Implemented to cache external API responses, preventing rate-limiting issues and dropping dashboard load times.
* **REST APIs:** Structured communication between the client and server.

## ✨ Core Features (In Progress)
- [x] **Monorepo Architecture:** Clean separation of frontend and backend environments.
- [ ] **Unified Developer Profile:** Aggregating stats from LeetCode and CodeChef into one seamless view.
- [ ] **Performance Visualizations:** Interactive charts displaying rating history and daily problem-solving trends.
- [ ] **Custom Rate-Limiting Engine:** Backend middleware designed to fetch, cache, and serve external API data efficiently.

## 🛠️ Local Installation & Setup

If you want to run this project locally, follow these steps:

**1. Clone the repository**
```bash
git clone [https://github.com/KundanBand/AlgoMetrics.git](https://github.com/KundanBand/AlgoMetrics.git)
cd AlgoMetrics