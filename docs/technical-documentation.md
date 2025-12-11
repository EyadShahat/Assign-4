# Technical Documentation – Assignment 4

## 📌 Overview
Assignment 4 is the final and polished version of my portfolio web application.  
It incorporates all previous features (Assignments 1–3) plus new refinements, optimizations, design improvements, and complete documentation.

---

## 🧱 System Architecture

### **Frontend**
- HTML5 for structure  
- CSS3 for styling, layout, animations  
- JavaScript (ES6+) for dynamic features  

### **API Layer**
- GitHub REST API  
  - Fetches latest repositories  
  - Supports sorting & filtering  
  - Includes full error handling and retry logic  

### **State Management**
Implemented using `localStorage`:
- Theme (dark/light)  
- Username greeting  
- Login simulation  
- Project visibility state  

---

## 🌟 Major Features

### 1. GitHub Repository Integration
- Fetches repositories dynamically  
- Displays key repo metadata  
- Sorting modes:
  - Recently Updated  
  - Stars  
  - Alphabetical  
- Filters by language  
- Live search  
- Loading, error, retry, and empty states  

### 2. Projects Section
- Categorized as *Beginner* or *Advanced*  
- Collapsible project descriptions  
- Show/Hide entire section  
- State preserved across visits  

### 3. Contact Form
- Inline validation  
- Custom error messages  
- Email format validation  
- Success message animation  

### 4. Performance
- Lazy-load images  
- Efficient DOM handling  
- IntersectionObserver reveals  
- Reduced repaint/reflow operations  

---

## 📂 File Structure
```text
assignment-4/
├── index.html
├── css/styles.css
├── js/script.js
├── assets/images/
├── docs/
│   ├── ai-usage-report.md
│   └── technical-documentation.md
└── presentation/
    ├── slides.pdf
    └── demo-video.mp4
