import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { 
  useReactTable, 
  getCoreRowModel, 
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  flexRender 
} from '@tanstack/react-table'
import { Search, Plus, Edit, Trash2, Ban, CheckCircle } from 'lucide-react'
import { usersApi } from '../api/users'
import Card from '../components/ui/Card'
import Button from '../components/ui/Button'
import Badge from '../components/ui/Badge'
import Loader from '../components/ui/Loader'
import Modal from '../components/ui/Modal'
import { Input } from '../components/forms'
import { useForm } from 'react-hook-form'

const UsersPage = () => {
  const queryClient = useQueryClient()
  const [globalFilter, setGlobalFilter] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedUser, setSelectedUser] = useState(null)

  const { data: usersData, isLoading } = useQuery({
    queryKey: ['users'],
    queryFn: () => usersApi.getUsers(),
  })

  const toggleStatusMutation = useMutation({
    mutationFn: usersApi.toggleUserStatus,
    onSuccess: () => {
      queryClient.invalidateQueries(['users'])
    },
  })

  const deleteUserMutation = useMutation({
    mutationFn: usersApi.deleteUser,
    onSuccess: () => {
      queryClient.invalidateQueries(['users'])
    },
  })

  const columns = [
    {
      accessorKey: 'id',
      header: 'ID',
      cell: ({ row }) => <span className="font-mono text-sm">#{row.original.id}</span>,
    },
    {
      accessorKey: 'name',
      header: 'Name',
      cell: ({ row }) => (
        <div>
          <p className="font-medium text-secondary-900">{row.original.name}</p>
          <p className="text-sm text-secondary-500">{row.original.email}</p>
        </div>
      ),
    },
    {
      accessorKey: 'phone',
      header: 'Phone',
    },
    {
      accessorKey: 'role',
      header: 'Role',
      cell: ({ row }) => (
        <Badge variant={row.original.role === 'admin' ? 'primary' : 'default'}>
          {row.original.role}
        </Badge>
      ),
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }) => (
        <Badge variant={row.original.status === 'active' ? 'success' : 'danger'}>
          {row.original.status}
        </Badge>
      ),
    },
    {
      accessorKey: 'createdAt',
      header: 'Joined',
      cell: ({ row }) => new Date(row.original.createdAt).toLocaleDateString(),
    },
    {
      id: 'actions',
      header: 'Actions',
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              setSelectedUser(row.original)
              setIsModalOpen(true)
            }}
            className="p-1 text-primary-600 hover:bg-primary-50 rounded"
          >
            <Edit size={16} />
          </button>
          <button
            onClick={() => toggleStatusMutation.mutate(row.original.id)}
            className="p-1 text-yellow-600 hover:bg-yellow-50 rounded"
          >
            {row.original.status === 'active' ? <Ban size={16} /> : <CheckCircle size={16} />}
          </button>
          <button
            onClick={() => {
              if (confirm('Are you sure you want to delete this user?')) {
                deleteUserMutation.mutate(row.original.id)
              }
            }}
            className="p-1 text-red-600 hover:bg-red-50 rounded"
          >
            <Trash2 size={16} />
          </button>
        </div>
      ),
    },
  ]

  // Mock data for demonstration
  const mockUsers = usersData?.users || [
    { id: 1, name: 'John Doe', email: 'john@example.com', phone: '+1234567890', role: 'user', status: 'active', createdAt: new Date() },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', phone: '+1234567891', role: 'user', status: 'active', createdAt: new Date() },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com', phone: '+1234567892', role: 'admin', status: 'inactive', createdAt: new Date() },
  ]

  const table = useReactTable({
    data: mockUsers,
    columns,
    state: {
      globalFilter,
    },
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    initialState: {
      pagination: {
        pageSize: 10,
      },
    },
  })

  if (isLoading) {
    return <Loader className="h-64" />
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-secondary-900">Users</h1>
          <p className="text-secondary-600 mt-1">Manage all registered users</p>
        </div>
        <Button onClick={() => setIsModalOpen(true)}>
          <Plus size={20} className="mr-2" />
          Add User
        </Button>
      </div>

      <Card>
        {/* Search */}
        <div className="mb-4 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary-400" size={20} />
          <input
            type="text"
            placeholder="Search users..."
            value={globalFilter ?? ''}
            onChange={(e) => setGlobalFilter(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-secondary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-secondary-50 border-b border-secondary-200">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      className="px-6 py-3 text-left text-xs font-medium text-secondary-700 uppercase tracking-wider cursor-pointer hover:bg-secondary-100"
                      onClick={header.column.getToggleSortingHandler()}
                    >
                      {flexRender(header.column.columnDef.header, header.getContext())}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody className="bg-white divide-y divide-secondary-200">
              {table.getRowModel().rows.map((row) => (
                <tr key={row.id} className="hover:bg-secondary-50">
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="px-6 py-4 whitespace-nowrap text-sm">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="mt-4 flex items-center justify-between">
          <div className="text-sm text-secondary-600">
            Showing {table.getState().pagination.pageIndex * table.getState().pagination.pageSize + 1} to{' '}
            {Math.min(
              (table.getState().pagination.pageIndex + 1) * table.getState().pagination.pageSize,
              table.getFilteredRowModel().rows.length
            )}{' '}
            of {table.getFilteredRowModel().rows.length} results
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              Previous
            </Button>
            <Button
              variant="secondary"
              size="sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              Next
            </Button>
          </div>
        </div>
      </Card>

      {/* User Form Modal */}
      <UserFormModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false)
          setSelectedUser(null)
        }}
        user={selectedUser}
      />
    </div>
  )
}

// User Form Modal Component
const UserFormModal = ({ isOpen, onClose, user }) => {
  const queryClient = useQueryClient()
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: user || {},
  })

  const createMutation = useMutation({
    mutationFn: usersApi.createUser,
    onSuccess: () => {
      queryClient.invalidateQueries(['users'])
      onClose()
      reset()
    },
  })

  const updateMutation = useMutation({
    mutationFn: (data) => usersApi.updateUser(user.id, data),
    onSuccess: () => {
      queryClient.invalidateQueries(['users'])
      onClose()
      reset()
    },
  })

  const onSubmit = (data) => {
    if (user) {
      updateMutation.mutate(data)
    } else {
      createMutation.mutate(data)
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={user ? 'Edit User' : 'Add New User'}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input
          label="Name"
          name="name"
          register={register}
          error={errors.name}
          required
        />
        <Input
          label="Email"
          name="email"
          type="email"
          register={register}
          error={errors.email}
          required
        />
        <Input
          label="Phone"
          name="phone"
          register={register}
          error={errors.phone}
        />
        {!user && (
          <Input
            label="Password"
            name="password"
            type="password"
            register={register}
            error={errors.password}
            required
          />
        )}
        <div className="flex justify-end gap-3 mt-6">
          <Button type="button" variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" isLoading={createMutation.isPending || updateMutation.isPending}>
            {user ? 'Update' : 'Create'}
          </Button>
        </div>
      </form>
    </Modal>
  )
}

export default UsersPage
