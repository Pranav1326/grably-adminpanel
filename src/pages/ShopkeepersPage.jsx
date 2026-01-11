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
import { Search, Plus, Edit, Trash2, Ban, CheckCircle, BadgeIndianRupee } from 'lucide-react'
import toast from 'react-hot-toast'
import { shopkeepersApi } from '../api/users'
import Card from '../components/ui/Card'
import Button from '../components/ui/Button'
import Badge from '../components/ui/Badge'
import Loader from '../components/ui/Loader'
import Modal from '../components/ui/Modal'
import { Input } from '../components/forms'
import { useForm } from 'react-hook-form'

const ShopkeepersPage = () => {
  const queryClient = useQueryClient()
  const [globalFilter, setGlobalFilter] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedShopkeeper, setSelectedShopkeeper] = useState(null)

  const { data: usersData, isLoading } = useQuery({
    queryKey: ['shopkeepers'],
    queryFn: () => shopkeepersApi.getShopkeepers(),
  })

  const toggleStatusMutation = useMutation({
    mutationFn: shopkeepersApi.toggleShopkeeperStatus,
    onSuccess: () => {
      queryClient.invalidateQueries(['shopkeepers'])
      toast.success('Shopkeeper status updated successfully')
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to update shopkeeper status')
    },
  })

  const deleteShopkeeperMutation = useMutation({
    mutationFn: shopkeepersApi.deleteShopkeeper,
    onSuccess: () => {
      queryClient.invalidateQueries(['shopkeepers'])
      toast.success('Shopkeeper deleted successfully')
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to delete shopkeeper')
    },
  })

  const columns = [
    {
      accessorKey: 'id',
      header: 'ID',
      cell: ({ row }) => <span className="font-mono text-sm">{row.index + 1}</span>,
    },
    {
      accessorKey: 'name',
      header: 'Name',
      cell: ({ row }) => (
        <div>
          <p className="font-medium text-secondary-900">{row.original.name}</p>
          <p className="text-xs text-secondary-500">{row.original.email}</p>
        </div>
      ),
    },
    {
      accessorKey: 'phone',
      header: 'Phone',
    },
    {
      accessorKey: 'isActive',
      header: 'Active',
      cell: ({ row }) => (
        <Badge variant={row.original.isActive ? 'success' : 'danger'}>
          {row.original.isActive ? 'Active' : 'Inactive'}
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
              setSelectedShopkeeper(row.original)
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
              if (window.confirm('Are you sure you want to delete this shopkeeper?')) {
                deleteShopkeeperMutation.mutate(row.original.id)
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

  const table = useReactTable({
    data: usersData?.shopkeepers || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      globalFilter,
    },
    onGlobalFilterChange: setGlobalFilter,
  })

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className='flex items-start justify-start gap-3'>
          <BadgeIndianRupee size={32} className="text-primary-600" />
          <h1 className="text-3xl font-bold text-secondary-900">Shopkeepers</h1>
        </div>
        <Button onClick={() => {
          setSelectedShopkeeper(null)
          setIsModalOpen(true)
        }}>
          <Plus size={20} />
          Add Shopkeeper
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

      {/* Add/Edit Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false)
          setSelectedShopkeeper(null)
        }}
        title={selectedShopkeeper ? 'Edit Shopkeeper' : 'Add Shopkeeper'}
      >
        <ShopkeeperForm
          shopkeeper={selectedShopkeeper}
          onClose={() => {
            setIsModalOpen(false)
            setSelectedShopkeeper(null)
          }}
        />
      </Modal>
    </div>
  )
}

const ShopkeeperForm = ({ shopkeeper, onClose }) => {
  const queryClient = useQueryClient()
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: shopkeeper || {}
  })

  const mutation = useMutation({
    mutationFn: (data) => {
      if (shopkeeper) {
        return shopkeepersApi.updateShopkeeper(shopkeeper.id, { ...data })
      }
      return shopkeepersApi.createShopkeeper({ ...data })
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['shopkeepers'])
      toast.success(shopkeeper ? 'Shopkeeper updated successfully' : 'Shopkeeper created successfully')
      onClose()
    },
    onError: (error) => {
      toast.error(error.message || `Failed to ${shopkeeper ? 'update' : 'create'} shopkeeper`)
    },
  })

  const onSubmit = (data) => {
    mutation.mutate(data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Input
        label="Name"
        {...register('name', { required: 'Name is required' })}
        error={errors.name?.message}
      />
      <Input
        label="Email"
        type="email"
        {...register('email', { required: 'Email is required' })}
        error={errors.email?.message}
      />
      {!shopkeeper &&
        <Input
          label="Password"
          type="password"
          {...register('password', { required: shopkeeper ? false : 'Password is required' })}
          error={errors.password?.message}
        />
      }
      <Input
        label="Phone"
        {...register('phone', { required: 'Phone is required' })}
        error={errors.phone?.message}
      />
      <div className="flex justify-end gap-2 pt-4">
        <Button type="button" variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button type="submit" disabled={mutation.isPending}>
          {mutation.isPending ? 'Saving...' : 'Save'}
        </Button>
      </div>
    </form>
  )
}

export default ShopkeepersPage
