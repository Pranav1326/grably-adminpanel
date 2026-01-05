# Grably Admin Panel

A modern, feature-rich admin panel built with React.js for managing the Grably platform.

## 🚀 Features

- **Authentication**: Secure login system with JWT tokens
- **Dashboard**: Overview of key metrics and recent activity
- **User Management**: Complete CRUD operations for users
- **Shop Management**: Approve/reject shop registrations
- **Order Management**: View and track all orders
- **Notifications**: Send push notifications and emails to users
- **Responsive Design**: Works seamlessly on all devices
- **Modern UI**: Built with Tailwind CSS

## 🛠️ Tech Stack

- **React.js** - UI framework
- **Vite** - Build tool
- **TailwindCSS** - Styling
- **React Hook Form** - Form handling
- **TanStack Query** - Data fetching and caching
- **TanStack Table** - Advanced table functionality
- **Axios** - HTTP client
- **Zustand** - State management
- **React Router** - Routing
- **Lucide React** - Icons

## 📦 Installation

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file in the root directory:
```env
VITE_API_BASE_URL=http://localhost:4000
```

3. Start the development server:
```bash
npm run dev
```

The application will open at `http://localhost:3000`

## 🏗️ Project Structure

```
admin-panel/
├── src/
│   ├── api/              # API service functions
│   ├── components/       # Reusable components
│   │   ├── forms/        # Form components (Input, Select, etc.)
│   │   ├── layout/       # Layout components (Sidebar, Header)
│   │   └── ui/           # UI components (Button, Card, Modal, etc.)
│   ├── layouts/          # Page layouts
│   ├── lib/              # Utilities and configurations
│   ├── pages/            # Page components
│   ├── store/            # State management
│   ├── App.jsx           # Main app component
│   ├── main.jsx          # App entry point
│   └── index.css         # Global styles
├── public/               # Static assets
├── .env                  # Environment variables
├── package.json          # Dependencies
├── tailwind.config.js    # Tailwind configuration
└── vite.config.js        # Vite configuration
```

## 🎨 Reusable Components

### Form Components

All form components are built to work seamlessly with `react-hook-form`:

```jsx
import { useForm } from 'react-hook-form'
import { Input, Select, TextArea, Checkbox, Radio } from '@/components/forms'

function MyForm() {
  const { register, handleSubmit, formState: { errors } } = useForm()
  
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Input
        label="Email"
        name="email"
        type="email"
        register={register}
        error={errors.email}
        required
      />
      
      <Select
        label="Role"
        name="role"
        register={register}
        options={[
          { value: 'user', label: 'User' },
          { value: 'admin', label: 'Admin' }
        ]}
        required
      />
      
      <TextArea
        label="Description"
        name="description"
        register={register}
        rows={4}
      />
      
      <Checkbox
        label="Subscribe to newsletter"
        name="subscribe"
        register={register}
      />
    </form>
  )
}
```

### UI Components

```jsx
import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'
import Modal from '@/components/ui/Modal'
import Badge from '@/components/ui/Badge'
import Loader from '@/components/ui/Loader'

// Button variants
<Button variant="primary">Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="danger">Danger</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>

// Button sizes
<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>

// Card
<Card title="My Card" action={<Button>Action</Button>}>
  Card content
</Card>

// Modal
<Modal isOpen={isOpen} onClose={onClose} title="Modal Title">
  Modal content
</Modal>

// Badge
<Badge variant="success">Active</Badge>
<Badge variant="warning">Pending</Badge>
<Badge variant="danger">Inactive</Badge>

// Loader
<Loader size="md" />
```

## 🔌 API Integration

### Setting up API calls

Create API functions in `src/api/`:

```javascript
import apiClient from '../lib/apiClient'

export const myApi = {
  getItems: async (params) => {
    const response = await apiClient.get('/items', { params })
    return response.data
  },
  
  createItem: async (data) => {
    const response = await apiClient.post('/items', data)
    return response.data
  },
}
```

### Using with TanStack Query

```jsx
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { myApi } from '@/api/myApi'

function MyComponent() {
  const queryClient = useQueryClient()
  
  // Fetch data
  const { data, isLoading, error } = useQuery({
    queryKey: ['items'],
    queryFn: myApi.getItems,
  })
  
  // Mutate data
  const createMutation = useMutation({
    mutationFn: myApi.createItem,
    onSuccess: () => {
      queryClient.invalidateQueries(['items'])
    },
  })
  
  const handleCreate = (formData) => {
    createMutation.mutate(formData)
  }
}
```

## 🎯 Key Features

### Authentication

- Login/logout functionality
- Token-based authentication
- Automatic token refresh
- Protected routes

### Tables

Built with TanStack Table with features:
- Sorting
- Filtering
- Pagination
- Global search

### Forms

All forms use `react-hook-form` for:
- Validation
- Error handling
- Performance optimization

## 🚢 Build for Production

```bash
npm run build
```

The build output will be in the `dist` directory.

## 📝 Environment Variables

Create a `.env` file with the following variables:

```env
VITE_API_BASE_URL=your_api_base_url
```

## 🤝 Integration with Backend

Update the `VITE_API_BASE_URL` in your `.env` file to point to your backend services:

- Auth Service: `http://localhost:4001`
- Shop Service: `http://localhost:4002`
- Notification Service: `http://localhost:4003`

Or use a gateway URL if you have one set up.

## 📄 License

MIT License
# grably-adminpanel
