import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { 
  useReactTable, 
  getCoreRowModel, 
  getPaginationRowModel,
  flexRender 
} from '@tanstack/react-table'
import { Search, CheckCircle, XCircle } from 'lucide-react'
import { shopsApi } from '../api/shops'
import Card from '../components/ui/Card'
import Button from '../components/ui/Button'
import Badge from '../components/ui/Badge'
import Loader from '../components/ui/Loader'

const ShopsPage = () => {
  const queryClient = useQueryClient()
  const [globalFilter, setGlobalFilter] = useState('')

  const { data: shopsData, isLoading } = useQuery({
    queryKey: ['shops'],
    queryFn: () => shopsApi.getShops(),
  })

  const approveMutation = useMutation({
    mutationFn: shopsApi.approveShop,
    onSuccess: () => {
      queryClient.invalidateQueries(['shops'])
    },
  })

  const rejectMutation = useMutation({
    mutationFn: (id) => shopsApi.rejectShop(id, 'Does not meet requirements'),
    onSuccess: () => {
      queryClient.invalidateQueries(['shops'])
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
      header: 'Shop Name',
      cell: ({ row }) => (
        <div>
          <p className="font-medium text-secondary-900">{row.original.name}</p>
          <p className="text-sm text-secondary-500">{row.original.category}</p>
        </div>
      ),
    },
    {
      accessorKey: 'owner',
      header: 'Owner',
      cell: ({ row }) => (
        <div>
          <p className="font-medium text-secondary-900">{row.original.ownerName}</p>
          <p className="text-sm text-secondary-500">{row.original.ownerEmail}</p>
        </div>
      ),
    },
    {
      accessorKey: 'location',
      header: 'Location',
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }) => {
        const statusVariant = {
          approved: 'success',
          pending: 'warning',
          rejected: 'danger',
        }
        return (
          <Badge variant={statusVariant[row.original.status]}>
            {row.original.status}
          </Badge>
        )
      },
    },
    {
      accessorKey: 'createdAt',
      header: 'Applied On',
      cell: ({ row }) => new Date(row.original.createdAt).toLocaleDateString(),
    },
    {
      id: 'actions',
      header: 'Actions',
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          {row.original.status === 'pending' && (
            <>
              <button
                onClick={() => approveMutation.mutate(row.original.id)}
                className="p-1 text-green-600 hover:bg-green-50 rounded"
                title="Approve"
              >
                <CheckCircle size={16} />
              </button>
              <button
                onClick={() => {
                  if (confirm('Are you sure you want to reject this shop?')) {
                    rejectMutation.mutate(row.original.id)
                  }
                }}
                className="p-1 text-red-600 hover:bg-red-50 rounded"
                title="Reject"
              >
                <XCircle size={16} />
              </button>
            </>
          )}
        </div>
      ),
    },
  ]

  // Mock data
  const mockShops = shopsData?.shops || [
    { 
      id: 1, 
      name: 'Fresh Groceries', 
      category: 'Grocery',
      ownerName: 'John Doe',
      ownerEmail: 'john@example.com',
      location: 'New York, NY',
      status: 'pending',
      createdAt: new Date()
    },
    { 
      id: 2, 
      name: 'Fashion Hub', 
      category: 'Fashion',
      ownerName: 'Jane Smith',
      ownerEmail: 'jane@example.com',
      location: 'Los Angeles, CA',
      status: 'approved',
      createdAt: new Date()
    },
  ]

  const table = useReactTable({
    data: mockShops,
    columns,
    state: {
      globalFilter,
    },
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
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
      <div>
        <h1 className="text-3xl font-bold text-secondary-900">Shops</h1>
        <p className="text-secondary-600 mt-1">Manage shop registrations and approvals</p>
      </div>

      <Card>
        <div className="mb-4 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary-400" size={20} />
          <input
            type="text"
            placeholder="Search shops..."
            value={globalFilter ?? ''}
            onChange={(e) => setGlobalFilter(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-secondary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-secondary-50 border-b border-secondary-200">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      className="px-6 py-3 text-left text-xs font-medium text-secondary-700 uppercase tracking-wider"
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
    </div>
  )
}

export default ShopsPage
