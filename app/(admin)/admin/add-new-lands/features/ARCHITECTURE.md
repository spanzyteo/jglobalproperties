# Add New Land - Clean Architecture Implementation

## 📁 Folder Structure

```
add-new-lands/
├── features/
│   ├── store/
│   │   └── index.ts                    # Redux store configuration
│   ├── components/
│   │   ├── index.ts                    # Components barrel export
│   │   ├── BasicInformationSection.tsx # Basic form fields
│   │   ├── OverviewSection.tsx         # Markdown editor section
│   │   ├── ImagesSection.tsx           # Image upload & management
│   │   └── UnitsSection.tsx            # Units/specifications
│   ├── types.ts                        # TypeScript interfaces
│   ├── constants.ts                    # Constants & API endpoints
│   ├── addNewLandSlice.ts             # Redux slice for state management
│   ├── landApi.ts                      # API service functions
│   ├── formUtils.ts                    # Form validation & helpers
│   ├── hooks.ts                        # Custom React hooks
│   ├── AddNewLandForm.tsx             # Main form container
│   └── PAGE_EXAMPLE.tsx               # Example page.tsx implementation
└── page.tsx                            # Your actual page component
```

## 🎯 Key Principles

### 1. **Separation of Concerns**

- **API Logic**: All API calls are in `landApi.ts`
- **Form Logic**: Form validation and data building in `formUtils.ts`
- **State Management**: Redux slice handles all state mutations
- **UI Components**: Components focus only on rendering

### 2. **Clean State Management**

- All form state lives in Redux (`addNewLandSlice.ts`)
- Custom hooks provide easy access to state and actions
- Reduces prop drilling and component complexity

### 3. **Reusable Components**

- Each form section is an independent component
- Can be reused in edit forms or other pages
- Clear responsibility boundaries

### 4. **Type Safety**

- All types are centralized in `types.ts`
- API responses, form data, etc. are typed

## 📝 Usage Example

### In Your Page Component:

```tsx
"use client";

import React from "react";
import { Provider } from "react-redux";
import { AddNewLandForm } from "./features/AddNewLandForm";
import { store } from "./features/store";

export default function AddNewLandPage() {
  return (
    <Provider store={store}>
      <div className="bg-white flex flex-col pb-12">
        <AddNewLandForm />
      </div>
    </Provider>
  );
}
```

## 🔧 File Descriptions

### `types.ts`

Defines all TypeScript interfaces:

- `ImageDetail` - Image metadata
- `Unit` - Land unit specifications
- `LandFormData` - Complete form data
- `LandApiResponse` - API response structure

### `constants.ts`

Centralized constants:

- Status options dropdown
- Unit type options
- Default values
- API endpoints (using `.env`)

### `addNewLandSlice.ts`

Redux state management:

- Initial state for all form fields
- Action creators for each field
- Reducers for state mutations
- Separate actions for images, units, and basic info

### `landApi.ts`

API service layer:

- `createLand()` - POST new land
- `updateLand()` - PUT land updates
- `getLands()` - GET all lands
- `getLandById()` - GET specific land
- `deleteLand()` - DELETE land

### `formUtils.ts`

Helper functions:

- `buildFormData()` - Converts form data to FormData object
- `validateLandForm()` - Validates all fields before submission
- `handleImageFiles()` - Processes file input

### `hooks.ts`

Custom React hooks:

- `useAddNewLandState()` - Access form state
- `useAddNewLandActions()` - Access form actions

### Components

Each component manages a form section:

- Uses the custom hooks
- No internal state (uses Redux)
- Dispatches actions on input changes

### `AddNewLandForm.tsx`

Main container component:

- Combines all form sections
- Handles form submission
- Validates and calls API
- Shows toast notifications

## 🚀 How to Use

### 1. **Access Form State**

```tsx
import { useAddNewLandState } from "./features/hooks";

const state = useAddNewLandState();
console.log(state.title); // Get title
```

### 2. **Dispatch Actions**

```tsx
import { useAddNewLandActions } from "./features/hooks";

const actions = useAddNewLandActions();
actions.setTitle("My Land"); // Update title
```

### 3. **Call API**

```tsx
import { landApi } from "./features/landApi";

const response = await landApi.createLand(formData);
if (response.success) {
  // Handle success
}
```

### 4. **Add New Form Section**

If you want to add more fields, create a new component:

```tsx
// components/LocationMapSection.tsx
"use client";
import { useAddNewLandState, useAddNewLandActions } from "../hooks";

export const LocationMapSection: React.FC = () => {
  const state = useAddNewLandState();
  const actions = useAddNewLandActions();

  return (
    // Your component JSX
  );
};
```

## ✅ Benefits of This Architecture

1. **Maintainability** - Easy to find and modify code
2. **Scalability** - Simple to add new fields or sections
3. **Reusability** - Components can be used in edit pages
4. **Type Safety** - TypeScript catches errors early
5. **Testing** - Each piece can be tested independently
6. **Performance** - Redux prevents unnecessary re-renders
7. **Debugging** - Redux DevTools can be integrated

## 🔄 Example: Adding a New Field

### 1. Add type (if needed)

```tsx
// types.ts
export interface LandFormData {
  // ... existing fields
  acreage?: number;
}
```

### 2. Add action to Redux slice

```tsx
// addNewLandSlice.ts
setAcreage: (state, action: PayloadAction<number>) => {
  state.acreage = action.payload;
};
```

### 3. Export action and create hook

```tsx
// hooks.ts
setAcreage: useCallback((acreage: number) =>
  dispatch(setAcreage(acreage)), [dispatch]
),
```

### 4. Create component or add to existing

```tsx
// components/BasicInformationSection.tsx
const { setAcreage } = useAddNewLandActions();
// Add input field with onChange handler
```

## 📊 Data Flow

```
User Input
    ↓
Component Handler
    ↓
Redux Action (setTitle, etc.)
    ↓
Redux Reducer
    ↓
State Update
    ↓
Component Re-render
    ↓
User sees changes
```

Submit Flow:

```
Form Submit
    ↓
Validation
    ↓
buildFormData()
    ↓
landApi.createLand()
    ↓
API Response
    ↓
Toast Notification
    ↓
Navigate to /admin/lands
```

## 🎨 Styling Notes

All components use Tailwind CSS with your existing utility classes:

- `lg:w-[539px]` - Responsive widths
- `bg-[#F2F2F2]` - Custom background colors
- Follows your existing design system

## 📝 Notes

- Each component is self-contained
- Redux store is local to this feature (can be moved to global if needed)
- API uses the new `NEXT_PUBLIC_BACKEND_URL` from `.env`
- All API errors show toast notifications
- Form resets after successful submission
