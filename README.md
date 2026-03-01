# Eventeny Vendor Application Management


**Live site:** https://chris-norman-dev.github.io/eventeny/

---

## Project Overview

This project covers three areas of focus: component architecture, accessible interaction design, and intentional feature thinking. Each decision in the implementation was made with a real user workflow in mind rather than as a purely technical exercise.

---

## Tech Stack

| Concern | Choice |
|---|---|
| Framework | Astro 4 (static output) |
| Styling | Vanilla CSS with custom properties |
| Interactivity | Vanilla TypeScript in Astro script tags |
| CSS processing | Lightning CSS via Vite |
| Font | Plus Jakarta Sans (Google Fonts) |
| Deployment | GitHub Pages via GitHub Actions |

---

## Project Structure

```
src/
  components/
    AppHeader.astro        Navigation bar
    BulkActionBar.astro    Contextual bar shown when rows are selected
    FilterDropdown.astro   Advanced filter panel with status and payment filters
    Pagination.astro       Page controls with live result count
    SearchInput.astro      Debounced search with clear button
    StatusBadge.astro      Colored pill for application and payment status
    VendorTable.astro      Interactive sortable table with mobile card fallback
  data/
    vendors.ts             20 mock vendor records and TypeScript types
  layouts/
    Layout.astro           HTML shell with skip link and font imports
  pages/
    index.astro            Main dashboard
    vendor/[id].astro      Individual applicant profile page
  styles/
    global.css             Import chain entry point
    props.css              All CSS custom properties (design tokens)
    reset.css              Modern reset and root container
    type.css               Typographic scale
    utility.css            Skip link, invisible label, form base
```

---

## Code Conventions

**BEM naming**
All CSS classes follow Block Element Modifier methodology. A component like `VendorTable` owns its child elements as `VendorTable__row`, `VendorTable__th`, and `VendorTable__td`, and state variants as modifier classes such as `VendorTable__row--selected` or `StatusBadge--approved`. This keeps specificity flat and makes the relationship between markup and styles immediately readable without needing to trace a selector chain.

**Design tokens**
Every color, radius, shadow, spacing value, and transition is defined once in `src/styles/props.css` as a CSS custom property and referenced everywhere else by name. Changing the teal brand color, for example, is a single-line edit that propagates across all components automatically.

**Co-located component files**
Each Astro component contains its markup, scoped styles, and client-side script in one file. There is no separate CSS or JS file to track down when debugging a component. The `is:global` style block is used only for styles that need to reach dynamically injected HTML, such as table rows rendered by JavaScript after a sort or filter.

**TypeScript throughout**
The vendor data module exports a typed `Vendor` interface, and all script blocks are typed TypeScript. This catches shape mismatches between the data layer and the rendering functions at build time rather than at runtime.

**Custom event bus**
Components communicate through a `vendor:filter` custom event dispatched on `document`. The search input and filter dropdown fire the event; the table listens for it. This avoids shared mutable state or prop drilling while remaining framework-free.

---

## Key Features

* Search across name, business, email, and tags with 300ms debounce
* Filter by application type, status (5 options), and payment status
* Sort by applicant name or application date, toggles ascending and descending
* Row selection with select-all and indeterminate checkbox state
* Bulk approve and reject with live StatCard updates reflecting the new counts
* Export selected to CSV downloads a file of all checked vendor records
* Applicant profile page with contact info, application details, status history, and quick action buttons that persist across sessions via localStorage
* Status persistence: changes made on the profile page are reflected in the table on return

---

## Responsive Behavior

| Breakpoint | Layout |
|---|---|
| 1440px | Full eight-column table, inline toolbar |
| 768px | Six-column table (actions column hidden), toolbar stacks |
| 375px | Card layout per row replaces the table |

---

## Accessibility

Every interactive element is reachable by keyboard. Screen reader support is provided through `role="search"`, `aria-expanded`, `aria-controls`, `aria-sort`, `aria-live`, and `aria-busy` attributes. Color is never the sole status indicator. The filter panel closes on Escape and traps focus while open on mobile.

HTML output is validated against the W3C Nu HTML Checker with no errors.

---

## Overview of Deliverables

**Objective:**
Build a polished, accessible vendor application management UI that demonstrates component thinking, design fidelity, and attention to real-world organizer workflows.

**Research Tactics:**
Component behavior was informed by common event management patterns and WCAG 2.1 AA guidelines.

**Code Structure:**
Components are scoped by responsibility and co-locate their markup, styles, and behavior in single Astro files. CSS follows BEM naming to keep specificity flat and intent explicit. Cross-component state uses custom DOM events (`vendor:filter`) rather than a framework store, keeping the dependency surface minimal. See the Code Conventions section for a full breakdown of the patterns used.

**Accessibility Strategy:**
ARIA attributes describe live regions, sort state, and panel visibility. Focus management is handled explicitly for the filter drawer. All icon-only controls carry visible labels.

**Testing Strategy:**
Manual testing across three breakpoints in browser DevTools, keyboard-only navigation from search through pagination, and VoiceOver on Safari to verify live region announcements.

**Collaboration Plan:**
The component structure, naming conventions, and design token approach are documented here so another engineer could pick up any file and understand its scope without a separate handoff session.

**Intentional Functionalit:**
Export selected to CSV was added beyond the spec because event organizers routinely need to share application subsets with co-organizers or paste them into approval workflows. It requires no backend and delivers immediate, practical value.

---

## Local Development

```sh
npm install
npm run dev
```

Build for production:

```sh
npm run build
npm run preview
```

---

## Deployment

Pushes to `main` trigger the GitHub Actions workflow in `.github/workflows/deploy.yml`, which builds the site and deploys the `dist/` folder to GitHub Pages automatically.
