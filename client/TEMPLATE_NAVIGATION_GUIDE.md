# Template Navigation System - Usage Guide

This guide shows how to implement template selection and navigation in your React web app.

## Components Created

### 1. TemplateSelector.jsx
A comprehensive template selector component with categories, search, and navigation.

### 2. TemplateGrid.jsx  
A reusable grid component for displaying templates with different layouts.

### 3. TemplatesPage.jsx
A dedicated page for browsing all templates.

## Integration Examples

### Adding Templates Tab to Dashboard

The templates tab has been added to your Dashboard component (`DashboardNew.jsx`):

```jsx
// Import the component
import TemplateSelector from './TemplateSelector';

// Add to tabs array
const tabs = [
  // ... existing tabs
  { id: 'templates', label: 'Templates', icon: '🎨' }
];

// Add render function
const renderTemplatesTab = () => (
  <div className="space-y-8">
    <TemplateSelector />
  </div>
);

// Add to tab content rendering
{activeTab === 'templates' && renderTemplatesTab()}
```

### Using TemplateGrid Component

```jsx
import TemplateGrid from '../components/TemplateGrid';

// Full featured grid with categories
<TemplateGrid showCategories={true} />

// Compact grid with limited templates
<TemplateGrid 
  compact={true} 
  maxTemplates={6} 
  showCategories={false} 
/>

// Custom title
<TemplateGrid 
  title="Healthcare Templates" 
  showCategories={true} 
/>
```

### Creating a Simple Template List

```jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const SimpleTemplateList = () => {
  const navigate = useNavigate();

  const templates = [
    { id: 1, name: 'Medical Doctor', route: '/templates/healthcare/medical-doctor' },
    { id: 2, name: 'Software Developer', route: '/templates/developer/fullstack' },
    { id: 3, name: 'Business Consultant', route: '/templates/business/consultant' }
  ];

  const handleTemplateClick = (route) => {
    navigate(route);
  };

  return (
    <div className="space-y-4">
      {templates.map(template => (
        <button
          key={template.id}
          onClick={() => handleTemplateClick(template.route)}
          className="w-full p-4 text-left bg-white rounded-lg shadow hover:shadow-lg transition-shadow"
        >
          {template.name}
        </button>
      ))}
    </div>
  );
};
```

### Navigation Implementation

The navigation uses React Router's `useNavigate` hook:

```jsx
import { useNavigate } from 'react-router-dom';

const navigate = useNavigate();

// Navigate to template
const handleTemplateSelect = (template) => {
  if (template.route) {
    navigate(template.route);
  }
};

// Navigate with state (optional)
const handleTemplateSelectWithState = (template) => {
  navigate(template.route, { 
    state: { templateData: template } 
  });
};
```

### Adding New Templates

To add new templates, update the templates array in any component:

```jsx
const templates = [
  // ... existing templates
  {
    id: 15,
    name: 'New Template',
    category: 'new-category',
    description: 'Description of the new template',
    features: ['Feature 1', 'Feature 2', 'Feature 3'],
    premium: false,
    route: '/templates/new-category/new-template',
    color: 'blue'
  }
];
```

### Routing Setup

Your existing routes in `Routes.jsx` already handle template navigation:

```jsx
// Healthcare Template Routes
<Route path="/templates/healthcare/gynecologist" element={<GynecologistTemplate />} />
<Route path="/templates/healthcare/medical-doctor" element={<MedicalDoctorTemplate />} />
// ... more routes

// Add new routes as needed
<Route path="/templates/developer/fullstack" element={<FullStackTemplate />} />
<Route path="/templates/business/consultant" element={<BusinessTemplate />} />
```

## Features Included

### Template Selection
- ✅ Category filtering
- ✅ Template cards with previews
- ✅ Click-to-navigate functionality
- ✅ Premium template indicators
- ✅ Responsive design

### Navigation
- ✅ React Router integration
- ✅ Route-based navigation
- ✅ State management for active selections
- ✅ Back/forward browser support

### Styling
- ✅ Tailwind CSS styling
- ✅ Gradient backgrounds
- ✅ Hover effects and animations
- ✅ Responsive layouts
- ✅ Professional design

### Components
- ✅ Reusable TemplateGrid component
- ✅ Compact and full layouts
- ✅ Search functionality ready
- ✅ Category-based filtering

## Next Steps

1. **Add More Templates**: Create more template components and add routes
2. **Enhanced Search**: Implement search functionality in TemplatesPage
3. **Template Previews**: Add preview modals or pages
4. **User Preferences**: Save user's preferred templates
5. **Template Customization**: Allow users to customize templates before use

## File Structure

```
src/
├── components/
│   ├── TemplateSelector.jsx     # Main template selector
│   ├── TemplateGrid.jsx         # Reusable grid component
│   └── DashboardNew.jsx         # Updated with templates tab
├── pages/
│   ├── TemplatesPage.jsx        # Dedicated templates page
│   └── templates/
│       ├── healthcare/
│       ├── developer/
│       └── business/
```

This system provides a complete template selection and navigation solution that's easy to extend and customize.
