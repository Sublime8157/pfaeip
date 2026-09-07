# TanStack Finance & Expense Intelligence Platform

## 1. Project Overview

A full-stack personal finance and expense management platform designed to help users understand where their money goes.

The application allows users to manage income, expenses, accounts, budgets, savings goals, recurring transactions, and financial reports.

The project is intentionally designed to heavily utilize the TanStack ecosystem while providing enough complexity to demonstrate production-level full-stack development skills.

---

# 2. Project Goals

The primary goals are:

* Build a production-grade full-stack React application.
* Learn and utilize the TanStack ecosystem extensively.
* Practice strongly typed routing and server state management.
* Build complex data tables and filtering.
* Implement optimistic updates.
* Build robust financial-domain logic.
* Practice authentication and authorization.
* Implement analytics and reporting.
* Support CSV transaction imports.
* Integrate AI-assisted transaction categorization.
* Create a portfolio-quality application.

---

# 3. Technology Stack

## Frontend

* React
* TypeScript
* TanStack Start
* TanStack Router
* TanStack Query
* TanStack Form
* TanStack Table
* TanStack Virtual
* TanStack Store
* Tailwind CSS

## Backend

* TanStack Start Server Functions
* PostgreSQL
* Prisma ORM
* Redis (optional)

## Validation

* Zod

## Authentication

* Session-based authentication or an authentication provider.

## Charts

Recommended:

* Recharts
* or another React-compatible charting library.

## Infrastructure

* Docker
* GitHub Actions
* Vercel / Railway / Render
* PostgreSQL hosting

---

# 4. TanStack Usage

The project should intentionally use multiple TanStack libraries.

| Library           | Purpose                          |
| ----------------- | -------------------------------- |
| TanStack Start    | Full-stack application framework |
| TanStack Router   | Routing and typed navigation     |
| TanStack Query    | Server state and caching         |
| TanStack Form     | Complex forms                    |
| TanStack Table    | Transaction/data tables          |
| TanStack Virtual  | Large transaction lists          |
| TanStack Store    | Client/application state         |
| TanStack Devtools | Development and debugging        |

---

# 5. Application Modules

The application will contain the following major modules:

```text
Authentication
Dashboard
Transactions
Accounts
Budgets
Savings Goals
Recurring Transactions
Reports
CSV Import
AI Categorization
Notifications
Settings
```

---

# 6. Authentication

## Features

Users should be able to:

* Register
* Login
* Logout
* Reset password
* Change password
* Manage profile
* Manage sessions

## Routes

```text
/register
/login
/forgot-password
/reset-password
```

Authenticated routes:

```text
/dashboard
/transactions
/accounts
/budgets
/goals
/recurring
/reports
/import
/settings
```

---

# 7. Dashboard

The dashboard provides a financial overview.

## Information displayed

### Financial Summary

```text
Net Worth
Total Income
Total Expenses
Total Savings
Savings Rate
```

Example:

```text
Net Worth

₱52,430

Income
₱65,000

Expenses
₱32,450

Savings
₱32,550
```

## Dashboard widgets

* Net worth
* Monthly income
* Monthly expenses
* Monthly savings
* Savings rate
* Spending by category
* Recent transactions
* Upcoming recurring expenses
* Budget progress
* Savings goal progress

---

# 8. Transaction Management

Transactions are the core feature of the application.

## Transaction types

```text
INCOME
EXPENSE
TRANSFER
```

## Transaction fields

```text
id
userId
accountId
categoryId
type
amount
description
date
notes
createdAt
updatedAt
```

## Transaction table

Use TanStack Table.

Example:

```text
Date        Description       Category      Account      Amount
----------------------------------------------------------------
Sep 07      Groceries         Food          BPI         -₱1,250
Sep 06      Salary            Income        BDO        +₱31,000
Sep 05      Grab              Transport     GCash         -₱320
Sep 04      Netflix           Subscription  BPI           -₱549
```

## Table functionality

Implement:

* Sorting
* Filtering
* Pagination
* Global search
* Column visibility
* Row selection
* Bulk operations
* Date filtering
* Category filtering
* Account filtering
* Transaction type filtering
* Amount filtering

---

# 9. URL-Based Transaction Filters

Transaction filters should be synchronized with the URL.

Example:

```text
/transactions?
page=2
&search=grab
&category=transport
&account=gcash
&from=2026-09-01
&to=2026-09-30
&sort=amount
&direction=desc
```

Benefits:

* Shareable URLs
* Browser navigation
* Bookmarkable searches
* Preserved filters
* Better TanStack Router practice

---

# 10. Transaction Forms

Use TanStack Form for:

* Create transaction
* Edit transaction
* Delete transaction
* Transfer money
* Create category
* Edit category

Example:

```text
Add Transaction

Type
○ Expense
○ Income
○ Transfer

Amount
₱ __________

Category
[ Food ▼ ]

Account
[ GCash ▼ ]

Date
[ September 7, 2026 ]

Description
________________________

Notes
________________________

[ Cancel ] [ Save ]
```

---

# 11. Accounts

Users can create multiple financial accounts.

Example:

```text
Accounts

BDO
₱35,000

BPI
₱21,500

GCash
₱4,200

Cash
₱2,500
```

## Account types

```text
BANK
E_WALLET
CASH
CREDIT_CARD
INVESTMENT
OTHER
```

## Account functionality

* Create account
* Edit account
* Archive account
* View balance
* View transactions
* Transfer between accounts

---

# 12. Transfers

Transfers must not be treated as expenses.

Example:

```text
BDO
₱5,000
    ↓
GCash
₱5,000
```

The system should create a linked transaction pair.

```text
Transfer A
BDO
-₱5,000

Transfer B
GCash
+₱5,000
```

The transfer should not affect:

```text
Total Expenses
```

but should affect:

```text
Account Balances
```

---

# 13. Categories

Default categories:

```text
Food
├── Groceries
├── Restaurants
├── Food Delivery
└── Coffee

Transportation
├── Fuel
├── Public Transport
├── Ride Sharing
└── Parking

Housing
├── Rent
├── Electricity
├── Water
└── Internet

Entertainment
├── Streaming
├── Games
└── Events

Shopping

Healthcare

Education

Subscriptions

Other
```

Users can create custom categories.

---

# 14. Budgets

Users can define spending limits.

Example:

```text
September 2026

Food
████████████░░░░
₱8,500 / ₱12,000

Transportation
██████████████░░
₱4,200 / ₱5,000

Entertainment
████████░░░░░░░░
₱1,200 / ₱3,000

Shopping
████████████████
₱6,000 / ₱6,000
```

## Budget functionality

* Monthly budgets
* Category budgets
* Custom date ranges
* Budget alerts
* Remaining budget
* Percentage used
* Over-budget warnings

---

# 15. Savings Goals

Users can create financial goals.

Example:

```text
Emergency Fund

₱45,000 / ₱100,000

█████████░░░░░░░

Remaining
₱55,000

Target Date
December 2026
```

## Goal fields

```text
name
targetAmount
currentAmount
targetDate
description
status
```

## Example goals

```text
Emergency Fund
New Laptop
Vacation
Motorcycle
House
Education
Investment
```

---

# 16. Recurring Transactions

Users can configure recurring financial transactions.

Example:

```text
Netflix

Amount:
₱549

Frequency:
Monthly

Day:
15th

Next occurrence:
October 15, 2026
```

Other examples:

```text
Salary
Rent
Internet
Electricity
Insurance
Netflix
Spotify
Loan Payment
```

## Supported frequencies

```text
DAILY
WEEKLY
BIWEEKLY
MONTHLY
QUARTERLY
YEARLY
```

The backend should generate transactions based on recurring rules.

---

# 17. Reports

The reporting module provides financial analytics.

## Reports

### Monthly Summary

```text
Income
₱65,000

Expenses
₱32,450

Savings
₱32,550

Savings Rate
50.1%
```

### Category Spending

```text
Food              ₱8,500
Transportation    ₱4,200
Shopping          ₱6,000
Entertainment     ₱1,200
Bills             ₱7,550
```

### Reports to implement

* Income vs expenses
* Monthly spending
* Yearly spending
* Category spending
* Account cash flow
* Savings rate
* Net worth
* Recurring expenses
* Largest expenses
* Spending trends

---

# 18. Net Worth

Net worth should be calculated as:

```text
Net Worth =
Assets - Liabilities
```

Example:

```text
Assets

BDO
₱35,000

BPI
₱21,500

GCash
₱4,200

Cash
₱2,500

Total Assets
₱63,200
```

Liabilities:

```text
Credit Card
₱10,770
```

Result:

```text
Net Worth
₱52,430
```

---

# 19. CSV Import

Users should be able to import transactions from banks or other finance applications.

## Workflow

```text
Upload CSV
    ↓
Parse CSV
    ↓
Detect Columns
    ↓
Map Fields
    ↓
Preview
    ↓
Validate
    ↓
Import
    ↓
Complete
```

Example CSV:

```csv
date,description,amount
2026-09-01,SM Supermarket,-1250
2026-09-02,Salary,31000
2026-09-03,Grab,-320
```

## Import validation

Check:

* Invalid dates
* Missing descriptions
* Invalid amounts
* Duplicate transactions
* Unsupported formats
* Invalid accounts
* Invalid categories

---

# 20. AI Transaction Categorization

The application can automatically categorize transactions.

Input:

```text
Grab Food - Makati
```

AI result:

```json
{
  "category": "Food",
  "subcategory": "Food Delivery",
  "confidence": 0.94
}
```

Another example:

```text
Netflix.com
```

Result:

```text
Entertainment
└── Streaming
```

## AI features

* Automatic categorization
* Merchant recognition
* Duplicate detection
* Transaction descriptions
* Spending insights
* Monthly financial summaries

---

# 21. Optimistic Updates

Use TanStack Query mutations with optimistic updates.

Example:

```text
User deletes transaction
        ↓
UI immediately removes transaction
        ↓
Mutation request
        ↓
Backend
        ↓
Database
        ↓
Success → Keep UI change

Failure → Rollback
```

Implement optimistic updates for:

* Delete transaction
* Update transaction
* Change category
* Update budget
* Add savings contribution

---

# 22. Server State

Use TanStack Query for:

```text
Transactions
Accounts
Budgets
Goals
Categories
Reports
Dashboard data
Recurring transactions
```

Example query organization:

```text
queries/
├── transactionQueries
├── accountQueries
├── budgetQueries
├── goalQueries
├── reportQueries
└── dashboardQueries
```

---

# 23. Query Invalidation

Example:

```text
Create Transaction
        ↓
Invalidate:
    transactions
    dashboard
    account
    budget
    reports
```

The system should avoid unnecessary refetches.

---

# 24. Virtualized Transactions

For users with thousands of transactions, use TanStack Virtual.

Example:

```text
100,000 transactions
        ↓
Only render visible rows
        ↓
Better performance
        ↓
Lower DOM overhead
```

This provides an opportunity to demonstrate performance optimization.

---

# 25. Application State

Use TanStack Store where appropriate for client-side state.

Potential state:

```text
Sidebar state
Active filters
UI preferences
Transaction selection
Modal state
Table preferences
```

Do not use client state for data that belongs in TanStack Query.

---

# 26. Database Schema

Suggested entities:

```text
User
Account
Transaction
Category
Budget
BudgetItem
SavingsGoal
RecurringTransaction
Notification
ImportJob
AIClassification
```

Relationships:

```text
User
 │
 ├── Accounts
 │     └── Transactions
 │
 ├── Transactions
 │     └── Categories
 │
 ├── Budgets
 │     └── BudgetItems
 │
 ├── SavingsGoals
 │
 ├── RecurringTransactions
 │
 └── Notifications
```

---

# 27. Suggested Prisma Models

Conceptual structure:

```text
User
- id
- email
- name
- passwordHash
- createdAt
- updatedAt

Account
- id
- userId
- name
- type
- balance
- currency
- isArchived
- createdAt
- updatedAt

Category
- id
- userId
- name
- parentId
- type
- createdAt
- updatedAt

Transaction
- id
- userId
- accountId
- categoryId
- transferId
- type
- amount
- description
- date
- notes
- createdAt
- updatedAt

Budget
- id
- userId
- name
- startDate
- endDate
- createdAt
- updatedAt

BudgetItem
- id
- budgetId
- categoryId
- limitAmount

SavingsGoal
- id
- userId
- name
- targetAmount
- currentAmount
- targetDate
- status

RecurringTransaction
- id
- userId
- accountId
- categoryId
- type
- amount
- frequency
- nextRunAt
- isActive
```

---

# 28. Route Architecture

Suggested TanStack Router structure:

```text
routes/
│
├── __root.tsx
│
├── login.tsx
├── register.tsx
│
└── _authenticated/
    │
    ├── route.tsx
    │
    ├── dashboard/
    │   └── index.tsx
    │
    ├── transactions/
    │   ├── index.tsx
    │   ├── $transactionId.tsx
    │   └── new.tsx
    │
    ├── accounts/
    │   ├── index.tsx
    │   └── $accountId.tsx
    │
    ├── budgets/
    │   ├── index.tsx
    │   └── $budgetId.tsx
    │
    ├── goals/
    │   ├── index.tsx
    │   └── $goalId.tsx
    │
    ├── recurring/
    │   └── index.tsx
    │
    ├── reports/
    │   ├── index.tsx
    │   ├── spending.tsx
    │   ├── income.tsx
    │   └── net-worth.tsx
    │
    ├── import/
    │   └── index.tsx
    │
    └── settings/
        └── index.tsx
```

---

# 29. API / Server Functions

Use TanStack Start server functions for server-side operations.

Example conceptual operations:

```text
transactions.list
transactions.get
transactions.create
transactions.update
transactions.delete

accounts.list
accounts.create
accounts.update
accounts.archive

budgets.list
budgets.create
budgets.update

goals.list
goals.create
goals.contribute

reports.monthly
reports.yearly
reports.category

imports.create
imports.preview
imports.execute
```

---

# 30. Security Requirements

Implement:

* Password hashing
* Session management
* CSRF protection where applicable
* Input validation
* Authorization checks
* Rate limiting
* Secure cookies
* Environment variable protection
* SQL injection protection through Prisma
* File upload validation
* Request size limits
* Audit logging for sensitive operations

Every server-side operation must verify the authenticated user's ownership of the requested resource.

Example:

```text
User A

GET /transactions/123

Transaction 123 belongs to User B

→ 403 Forbidden
```

Never rely exclusively on frontend authorization.

---

# 31. Error Handling

Implement standardized errors.

Example:

```json
{
  "code": "TRANSACTION_NOT_FOUND",
  "message": "Transaction was not found."
}
```

Suggested error codes:

```text
UNAUTHORIZED
FORBIDDEN
VALIDATION_ERROR
NOT_FOUND
CONFLICT
RATE_LIMITED
INTERNAL_ERROR
```

---

# 32. Loading States

Every asynchronous screen should have appropriate loading states.

Examples:

```text
DashboardSkeleton
TransactionTableSkeleton
AccountSkeleton
BudgetSkeleton
ReportSkeleton
```

Avoid blocking the entire application when only one component is loading.

---

# 33. Empty States

Examples:

```text
No transactions yet.

Start tracking your spending by adding
your first transaction.

[ Add Transaction ]
```

Other empty states:

```text
No budgets
No savings goals
No accounts
No recurring transactions
No reports available
```

---

# 34. Responsive Design

The application should be:

```text
Desktop
Tablet
Mobile
```

Primary focus:

```text
Desktop-first
```

but layouts should gracefully adapt to smaller screens.

---

# 35. UI Design Direction

## Design philosophy

```text
Clean
Minimal
Financial
Data-driven
Professional
Modern
```

## Recommended structure

```text
┌───────────────────────────────────────────────┐
│ Logo                         Profile          │
├─────────────┬─────────────────────────────────┤
│             │                                 │
│ Dashboard   │                                 │
│ Transactions│        Main Content             │
│ Accounts    │                                 │
│ Budgets     │                                 │
│ Goals       │                                 │
│ Reports     │                                 │
│             │                                 │
│ Settings    │                                 │
└─────────────┴─────────────────────────────────┘
```

---

# 36. Development Phases

## Phase 1 — Foundation

```text
[ ] Initialize TanStack Start
[ ] Configure TypeScript
[ ] Configure Tailwind
[ ] Configure Prisma
[ ] Configure PostgreSQL
[ ] Setup project structure
[ ] Setup environment variables
```

## Phase 2 — Authentication

```text
[ ] Registration
[ ] Login
[ ] Logout
[ ] Session management
[ ] Protected routes
[ ] User profile
```

## Phase 3 — Accounts

```text
[ ] Account CRUD
[ ] Account balances
[ ] Account details
[ ] Account archive
```

## Phase 4 — Transactions

```text
[ ] Transaction CRUD
[ ] Categories
[ ] Transaction table
[ ] Filtering
[ ] Sorting
[ ] Pagination
[ ] Search
[ ] URL search params
```

## Phase 5 — TanStack Optimization

```text
[ ] TanStack Query
[ ] Query caching
[ ] Query invalidation
[ ] Optimistic updates
[ ] TanStack Virtual
```

## Phase 6 — Budgets

```text
[ ] Create budgets
[ ] Category budgets
[ ] Budget progress
[ ] Budget alerts
```

## Phase 7 — Savings Goals

```text
[ ] Create goals
[ ] Contributions
[ ] Progress tracking
[ ] Target dates
```

## Phase 8 — Recurring Transactions

```text
[ ] Recurring rules
[ ] Frequency handling
[ ] Automatic transaction creation
[ ] Upcoming transactions
```

## Phase 9 — Reports

```text
[ ] Monthly reports
[ ] Yearly reports
[ ] Category reports
[ ] Cash flow
[ ] Net worth
[ ] Savings rate
```

## Phase 10 — CSV Import

```text
[ ] CSV upload
[ ] CSV parsing
[ ] Column mapping
[ ] Validation
[ ] Preview
[ ] Import
```

## Phase 11 — AI

```text
[ ] Merchant detection
[ ] Automatic categorization
[ ] Confidence scores
[ ] AI financial summaries
[ ] User feedback loop
```

## Phase 12 — Production

```text
[ ] Docker
[ ] CI/CD
[ ] Production database
[ ] Error monitoring
[ ] Logging
[ ] Rate limiting
[ ] Security audit
[ ] Performance testing
```

---

# 37. Testing Strategy

## Unit Tests

Test:

```text
Financial calculations
Budget calculations
Savings calculations
Net worth
Recurring transaction dates
Category calculations
```

## Integration Tests

Test:

```text
Authentication
Transactions
Transfers
Budgets
Accounts
CSV imports
```

## E2E Tests

Test critical flows:

```text
Register
    ↓
Create Account
    ↓
Add Income
    ↓
Add Expense
    ↓
Create Budget
    ↓
View Dashboard
    ↓
View Report
```

---

# 38. Performance Goals

Target:

```text
Initial page load < 2 seconds
Interactive UI < 3 seconds
Transaction table supports 100k+ rows
No unnecessary query refetching
Virtualized large datasets
Optimistic user interactions
```

---

# 39. Advanced Features

After the MVP, consider:

### Notifications

```text
Budget is 80% used.

Your Food budget has reached ₱9,600
of ₱12,000.
```

### Financial Insights

```text
Your transportation spending increased
23% compared to last month.
```

### Subscription Detection

Automatically identify:

```text
Netflix
Spotify
Google One
AWS
```

### Duplicate Detection

Detect transactions with similar:

```text
Merchant
Amount
Date
Account
```

### Export

Allow users to export:

```text
CSV
Excel
PDF
```

### Multi-currency

Support:

```text
PHP
USD
EUR
JPY
AUD
```

---

# 40. Portfolio Value

This project demonstrates significantly more than basic CRUD.

It demonstrates:

```text
React
TypeScript
Full-stack development
TanStack ecosystem
Database design
ORM
Authentication
Authorization
Caching
Server state
Optimistic UI
Data virtualization
Complex forms
Data tables
Analytics
Financial domain logic
File processing
AI integration
Performance optimization
Security
Testing
CI/CD
```

---

# 41. MVP Definition

The first production-ready MVP should contain:

```text
Authentication
       ↓
Accounts
       ↓
Transactions
       ↓
Categories
       ↓
Budgets
       ↓
Dashboard
       ↓
Reports
```

Do NOT start with AI, CSV imports, notifications, and every advanced feature.

Build the financial foundation first.

---

# 42. Final Target Architecture

```text
                    ┌─────────────────────┐
                    │      React UI       │
                    └──────────┬──────────┘
                               │
                    ┌──────────▼──────────┐
                    │  TanStack Router    │
                    └──────────┬──────────┘
                               │
              ┌────────────────▼────────────────┐
              │        TanStack Query           │
              │     Server State / Cache        │
              └────────────────┬────────────────┘
                               │
              ┌────────────────▼────────────────┐
              │       TanStack Start            │
              │    Server Functions / SSR       │
              └────────────────┬────────────────┘
                               │
                    ┌──────────▼──────────┐
                    │       Prisma        │
                    └──────────┬──────────┘
                               │
                    ┌──────────▼──────────┐
                    │    PostgreSQL       │
                    └─────────────────────┘

Additional:

TanStack Form    → Forms
TanStack Table   → Transactions
TanStack Virtual → Large datasets
TanStack Store   → Client state
AI               → Categorization / Insights
Redis            → Caching / Jobs (optional)
```

---

# 43. Success Criteria

The project is considered complete when a user can:

1. Create an account.
2. Log in securely.
3. Create multiple financial accounts.
4. Add income and expenses.
5. Transfer money between accounts.
6. Categorize transactions.
7. Filter and search transactions.
8. Create monthly budgets.
9. Track savings goals.
10. Configure recurring transactions.
11. View financial analytics.
12. Calculate net worth.
13. Import transactions from CSV.
14. Automatically categorize transactions using AI.
15. Use the application comfortably on desktop and mobile.
16. Experience fast navigation through TanStack Router.
17. Experience efficient server-state management through TanStack Query.
18. Manage large transaction datasets through TanStack Table and Virtual.
19. Use complex validated forms through TanStack Form.
20. Run the application in a production environment.

---

# 44. Recommended Development Principle

Do not attempt to use every TanStack library simply because it exists.

Use each tool where it solves a real problem.

The architectural separation should generally be:

```text
Server data
    ↓
TanStack Query

URL state
    ↓
TanStack Router

Complex forms
    ↓
TanStack Form

Large datasets
    ↓
TanStack Table + Virtual

Client-only application state
    ↓
TanStack Store

Full-stack execution
    ↓
TanStack Start
```

The objective is not to build a project that says:

> "I used TanStack."

The objective is to build a project where the architecture naturally demonstrates **why each TanStack technology is useful**.
