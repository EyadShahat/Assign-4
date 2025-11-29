# Technical Documentation – Assignment 3

## 📌 Project Overview
This project is an advanced version of my personal portfolio site, originally built in Assignments 1 and 2.  
Assignment 3 adds **complex JavaScript features**, **API integration**, **state management**, and **performance optimization**.

The result is a feature-rich, responsive portfolio that demonstrates professional-level web development skills.

---

## 📦 Features Implemented

### 1. GitHub API Integration
- Fetches repositories from the GitHub API  
- Supports:
  - Sorting (recently updated, stars, alphabetical)
  - Filtering by programming language
  - Username input
  - Loading, empty, and error states
  - Retry button when API fails  
- Displays repository cards with stars, language, and update date

---

### 2. Complex Logic
The project uses multi-step logic for advanced functionality:

#### Project Logic
- Beginner / Advanced filter  
- Show/Hide project section  
- Collapsible project details  

#### Repo Logic
- Search + sort + filter combined  
- Language dropdown populated dynamically from API response  
- UI updates without refreshing the page

#### Contact Form
- Validates:
  - Name
  - Email format
  - Message length  
- Shows inline errors and success messages  
- Prevents form submission until all checks pass  

---

### 3. State Management
State is stored using `localStorage`:

| Feature | Saved? | Description |
|--------|--------|-------------|
| Theme (dark/light) | ✅ | Persists permanently until changed |
| Username | ✅ | Used in greeting in hero section |
| Login simulation | ✅ | Toggles “Logged in / Logged out” status |
| Show/Hide projects | ⚠️ (optional) | Simple UI state toggle |

This ensures the site feels consistent every time the user returns.

---

### 4. Performance Enhancements
- **Lazy-loaded images** (`loading="lazy"`)  
- Reduced layout shifts  
- IntersectionObserver for reveal animations  
- Organized DOM access for efficiency  
- Removed unused code from Assignment 2  

---

### 5. Animations & Transitions
- Smooth section reveal on scroll  
- Collapsible project details animation  
- Button hover/active transitions  
- Animated success/error messages  

All animations are lightweight and avoid performance-heavy loops.

---

## 🧱 File Structure
