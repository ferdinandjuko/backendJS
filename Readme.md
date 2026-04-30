# Backend JS Collection
> A curated collection of Node.js backend frameworks and starter projects

## 📖 Description

This repository contains multiple backend projects demonstrating different Node.js frameworks and patterns. Each project is self-contained and ready to use.

## 📦 Available Projects

| Project | Description |
|---------|-------------|
| **express-init** | Express.js setup with middleware, routes, and error handling |
| **sell-thing** | CRUD application for managing items, Node.js, Vanilla JS, mongodb |
| **with-react** | User authentication system with registration, login, and logout functionality |

## 🚀 Getting Started

### Option 1: Clone Entire Repository

```bash
# Clone the repository
git clone https://github.com/ferdinandjuko/backendJS.git

# Navigate to your chosen project
cd backendJS/<project-name>

# Install dependencies
npm install

# Run development server
npm run dev
```

### Option 2: Clone Only a Specific Project (Recommended)

If you only need one project, use sparse checkout to save time and space:

```bash
# 1. Clone with sparse checkout enabled
git clone --no-checkout --depth=1 --filter=blob:none https://github.com/ferdinandjuko/backendJS.git my-project

# 2. Navigate to the cloned directory
cd my-project

# 3. Enable sparse checkout
git sparse-checkout init --cone

# 4. Specify which folder you want (e.g., express-init)
git sparse-checkout set express-init

# 5. Checkout the files
git checkout

# 6. Navigate to the project and install dependencies
cd express-init
npm install

# 7. Run the project
npm run dev
```

## ✅ Prerequisites

- Node.js v14+
- npm
- Git

## 📖 Why Sparse Checkout?

| Full Clone | Sparse Checkout |
|------------|-----------------|
| All projects | Single project only |
| Larger download | Minimal download |
| Use for exploration | Use for focused work |

## 📚 Resources

- [Express.js Docs](https://expressjs.com/)
- [Git Sparse Checkout Guide](https://git-scm.com/docs/git-sparse-checkout)

---

**Author:** Ferdinand Juko