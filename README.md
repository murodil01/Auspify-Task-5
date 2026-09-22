# E-Commerce Product Interface - Auspify Task 5

A modern, fast, and fully responsive Front-End E-Commerce product catalog built with Vanilla JavaScript, HTML5, and CSS3. This application features real-time search, category and price filtering, a dynamic shopping cart with badge indicators, price calculations, and mobile-optimized navigation.

---

## 🚀 Live Demo & Links

- **Live Demo (Vercel):** [https://auspify-task-5.vercel.app](https://auspify-task-5.vercel.app)
- **GitHub Repository:** [https://github.com/murodil01/Auspify-Task-5.git](https://github.com/murodil01/Auspify-Task-5.git)

---

## ✨ Key Features & Functionality

- **Dynamic Product Catalog:** Interactive grid display of product cards rendered dynamically using JavaScript data objects.
- **Real-Time Search & Filtering:** Instant product search by name/keywords combined with category and price-range filter mechanisms.
- **Interactive Shopping Cart:** Slide-out / modal shopping cart UI allowing users to add items, adjust quantities, remove items, and view total price calculations in real time.
- **Cart Badge & Counter:** Live visual counter reflecting total items currently added to the cart.
- **State Management & Persistence:** Cart item states synchronized with browser `LocalStorage` to persist across page reloads.
- **Responsive UI/UX:** Mobile-first layout using CSS Grid and Flexbox, tailored for desktop, tablet, and mobile screens.

---

## 🛠️ Tech Stack & Advanced Concepts Covered

- **HTML5:** Semantic architecture, accessible button controls, and modal dialog structures.
- **CSS3:** Custom properties (CSS variables), CSS Grid layouts, Flexbox alignment, transition overlays, and responsive media queries.
- **JavaScript (ES6+):**
  - **Component-Like Design:** Modular UI rendering functions and DOM updates.
  - **Array Methods:** Extensive use of `filter()`, `map()`, `reduce()`, and `find()` for state transformations and cart total calculations.
  - **Event Delegation:** Efficient event handling for dynamic elements like cart buttons and product cards.
  - **LocalStorage API:** Persisting cart items as serialized JSON data.

---

## 📂 Project Structure

```text
Auspify-Task-5/
│
├── index.html          # E-commerce layout, search controls, & cart modal
├── style.css           # Product grid styling, filter UI, cart transitions, & mobile layout
├── app.js              # Product state management, filtering logic, & cart DOM interactions
└── README.md           # Project documentation
