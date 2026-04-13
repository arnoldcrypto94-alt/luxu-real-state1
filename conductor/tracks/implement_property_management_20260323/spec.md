# Specification: Implement Property Management (Add/Edit Property)

This document outlines the requirements for implementing the "Add New Property" and "Edit Property" features for the LuxeEstate platform, based on the `add_edit_property_form` mockup.

## 1. User Stories

*   As a Senior Agent, I want to be able to add a new property listing with detailed information (Basic info, description, gallery, location, and details) so that it can be marketed on the platform.
*   As an Agent, I want to see a clear, organized form that guides me through the listing process.
*   As a user, I want to see mandatory fields clearly marked so I don't miss essential information.

## 2. Functional Requirements

### 2.1. Basic Information
*   **Property Title:** (Mandatory) Text input for the listing's title.
*   **Price:** (Mandatory) Numeric input with currency formatting ($).
*   **Status:** (Select) Options: "For Sale", "For Rent", "Pending", etc. (Default: "For Sale").
*   **Property Type:** (Select) Options: "Apartment", "House", "Villa", "Penthouse", etc.

### 2.2. Description
*   **Rich Text Editor:** A text area supporting basic formatting (Bold, Italic, Bulleted List).
*   **Character Counter:** Display a limit (e.g., 2000 characters).

### 2.3. Gallery
*   **Drag & Drop Area:** Support for JPG, PNG, WEBP files (Max 5MB per image).
*   **Image Previews:** Display uploaded images in a grid.
*   **Main Image:** Allow designating one image as the primary/main image with a "MAIN" badge.
*   **Add More:** A placeholder/button to trigger the file picker.

### 2.4. Location
*   **Address:** Text input for the full property address.
*   **Map Preview:** A static or interactive map display based on the provided address.
*   **Preview Button:** A button to update the map preview or open a full-screen map.

### 2.5. Details & Amenities
*   **Area (m²):** Numeric input for the total size.
*   **Year Built:** Numeric input (YYYY format).
*   **Counters (Steppers):** Incremental/decremental controls for Bedrooms, Bathrooms, and Parking.
*   **Amenities:** A list of checkboxes (e.g., Swimming Pool, Garden, Air Conditioning, Smart Home).

### 2.6. Actions
*   **Save Draft:** Button to save the current progress without publishing.
*   **Save Property:** Primary action to validate and publish the listing.

## 3. UI Components (shadcn/ui)

The following components must be installed and used for the property management implementation:
*   `Button`, `Input`, `Label`, `Card`, `Breadcrumb`: Base UI structure.
*   `Select`: For Status and Property Type.
*   `Textarea`: For the property description (enhanced with rich text logic).
*   `Checkbox`: For Amenities.
*   `Badge`: For the "MAIN" label on gallery images.
*   `Separator`: To divide sections within cards if needed.
*   `Sonner`: For success/error feedback notifications.

## 4. Non-Functional Requirements

*   **Responsiveness:** The form must be usable on tablet and desktop.
*   **Accessibility:** Proper labeling and keyboard navigation support.
*   **Performance:** Fast image upload and preview generation.
