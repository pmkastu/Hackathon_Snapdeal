# Hackathon_Snapdeal

Project Description: Snapdeal E-Commerce Automation Framework

Overview

This project is an advanced automated testing suite built with Playwright and TypeScript. It utilizes a Page Object Model (POM) to simulate complex user journeys on Snapdeal, including product discovery, data extraction, cart management, and checkout verification. Unlike basic scripts, this framework captures metadata for analysis and handles multi-page interactions (tabs) dynamically.

Key Functional Capabilities

Multi-Category Search & Filter: Automates the search and selection for multiple categories—Headphones, Shoes, Watches, and Bottles. Each category applies unique business logic, such as filtering for 4+ Star Ratings, specific price brackets, and sorting by Popularity, Relevance, Discount, or Price.

Dynamic Data Extraction (JSON Logging): Beyond simple clicks, the framework extracts the Top 5 results (Name and Price) for every search query and exports them into a structured snapdealProducts.json file. It also tracks the specific items added to the cart in snapdealFirstProducts.json.

Advanced Cart & Window Handling: Utilizes Playwright’s window handler to manage new tabs that open when a product is selected. It features a specialized AssertCartSum helper that scrapes the cart, parses currency strings, and mathematically validates that the subtotal matches the sum of individual items.

End-to-End Checkout Flow: Simulates the full checkout journey, including:
Login simulation with configurable delays.

Iframe Interaction: Navigating Snapdeal's secure checkout iframes to fill in shipping addresses and mock payment details.

Negative Testing: Validates error handling for invalid credit card inputs.

Automated Cleanup: Features a sequence to cancel pending checkouts and return the user to the home page to ensure a clean state for subsequent tests.
