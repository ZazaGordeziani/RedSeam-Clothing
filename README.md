# RedSeam Clothing

## Project Overview

RedSeam Clothing is an online shopping store that allows users to:

- Filter products by price.
- Sort products by three categories: newest first, price low to high, and price high to low.
- Add chosen products (based on size and color) to the cart and complete purchases (authorized users only).
- navigate through the pages.

## Features

- User registration and login (token stored in local storage).
- Successful registration automatically logs the user in.
- Avatar upload during registration; if none is provided, the first letter of the username is displayed.
- Add, update, and remove items from the cart.
- Filter and sort products based on user preference.
- Pagination on the products page.
- Modal for successful purchase (Congrats modal).
- Loading states before displaying page content.
- On checkout, the e-mail field is pre-filled from localStorage.

## Tech Stack

- Frontend: React, TypeScript, TailwindCSS
- State Management: Jotai, React Hook Form
- Validation: Zod, React Hook Form
- Routing: React Router DOM
- API Calls: Axios (`httpClient`)
- Optimized for 1920x1080 screen resolution
- husky installed so the following orders run after commit, to avoid chaotic code
    - yarn ts-check
    - yarn lint
    - yarn prettier

## How to Use

1. Clone the repository:

    git clone https://github.com/ZazaGordeziani/RedSeam-Clothing

    install yarn by just typing yarn in terminal and hit enter

    create .env file and set VITE_API_BASE_URL based on the following endpoint
    https://api.redseam.redberryinternship.ge/api

    yarn dev - to start the project

Vercel link to see the completed project - https://red-seam-clothing-eight.vercel.app/
