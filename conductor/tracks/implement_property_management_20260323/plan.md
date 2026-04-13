# Implementation Plan: Implement Property Management (Add/Edit Property)

This plan outlines the steps to implement the property addition and editing features for the LuxeEstate platform.

---

## Phase 0: UI Infrastructure & Assets [checkpoint: 25c67fc]

### Tasks

- [x] Task: Install new shadcn/ui components: `select`, `textarea`, `checkbox`, `badge`, `breadcrumb`. [f827cf9]
- [x] Task: Create or source a rich text editor component compatible with Next.js 16/React 19. [61cf2a6]
- [x] Task: Set up the map integration infrastructure (e.g., Google Maps API or Leaflet). [924fa96]
- [ ] Task: Conductor - User Manual Verification 'Property UI Infrastructure'

## Phase 1: Database Setup [checkpoint: eb56627]

### Tasks

- [x] Task: Design the `properties` table schema (id, title, price, status, type, description, address, area, year_built, bedrooms, bathrooms, parking, amenities_json, images_json, owner_id). [f2e3a1d]
- [x] Task: Create a database migration for the `properties` table. [b751d95]
- [x] Task: Set up API endpoints for creating, retrieving, and updating property listings. [a08e5e0]
- [ ] Task: Conductor - User Manual Verification 'Property Backend Setup'

---

## Phase 2: Form UI Construction (Left Column)

### Tasks

- [ ] Task: Build the "Basic Information" section with validation logic for title and price.
- [ ] Task: Implement the "Description" section with the rich text editor and character counter.
- [ ] Task: Build the "Gallery" section with drag-and-drop support and image previews.
- [ ] Task: Conductor - User Manual Verification 'Property Form UI Left'

---

## Phase 3: Form UI Construction (Right Column)

### Tasks

- [ ] Task: Implement the "Location" section with address input and map preview.
- [ ] Task: Build the "Details" section with area, year built, and the stepper controls (bedrooms, bathrooms, parking).
- [ ] Task: Build the "Amenities" section with the checkbox list.
- [ ] Task: Conductor - User Manual Verification 'Property Form UI Right'

---

## Phase 4: Form Logic & Integration

### Tasks

- [ ] Task: Implement form validation using `react-hook-form` and `zod`.
- [ ] Task: Write failing tests for property creation and validation.
- [ ] Task: Implement the "Save Property" and "Save Draft" functionality, connecting to the backend API.
- [ ] Task: Add success/error notifications using `sonner`.
- [ ] Task: Conductor - User Manual Verification 'Property Logic & Integration'

---

## Phase 5: Verification & Refinement

### Tasks

- [ ] Task: Verify the entire flow matches the mockup `PRD/resources/add_edit_property_form/screen.png`.
- [ ] Task: Test with different property types and edge cases (e.g., invalid image formats).
- [ ] Task: Ensure accessibility and responsiveness.
- [ ] Task: Conductor - User Manual Verification 'Property Refinement'
