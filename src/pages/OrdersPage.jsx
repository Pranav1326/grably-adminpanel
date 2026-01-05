import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { 
  useReactTable, 
  getCoreRowModel, 
  getPaginationRowModel,
  flexRender 
} from '@tanstack/react-table'
import { Search, Eye } from 'lucide-react'
import { ordersApi } from '../api/orders'
import Card from '../components/ui/Card'
import Button from '../components/ui/Button'
import Badge from '../components/ui/Badge'
import Loader from '../components/ui/Loader'

const OrdersPage = () => {
  const [globalFilter, setGlobalFilter] = useState('')

  const { data: ordersData, isLoading } = useQuery({
    queryKey: ['orders'],
    queryFn: () => ordersApi.getOrders(),
  })

  const columns = [
    {
      accessorKey: 'id',
      header: 'Order ID',
      cell: ({ row }) => <span className="font-mono text-sm">#{row.original.id}</span>,
    },
    {
      accessorKey: 'customer',
      header: 'Customer',
      cell: ({ row }) => (
        <div>
          <p className="font-medium text-secondary-900">{row.original.customerName}</p>
          <p className="text-sm text-secondary-500">{row.original.customerEmail}</p>
        </div>
      ),
    },
    {
      accessorKey: 'shop',
      header: 'Shop',
    },
    {
      accessorKey: 'items',
      header: 'Items',
      cell: ({ row }) => `${row.original.itemCount} items`,
    },
    {
      accessorKey: 'total',
      header: 'Total',
      cell: ({ row }) => `$${row.original.total.toFixed(2)}`,
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }) => {
        const statusVariant = {
          pending: 'warning',
          processing: 'primary',
          completed: 'success',
          cancelled: 'danger',
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
      header: 'Order Date',
      cell: ({ row }) => new Date(row.original.createdAt).toLocaleDateString(),
    },
    {
      id: 'actions',
      header: 'Actions',
      cell: ({ row }) => (
        <button
          className="p-1 text-primary-600 hover:bg-primary-50 rounded"
          title="View Details"
        >
          <Eye size={16} />
        </button>
      ),
    },
  ]

  // Mock data
  const mockOrders = ordersData?.orders || [
    { 
      id: 1001, 
      customerName: 'John Doe',
      customerEmail: 'john@example.com',
      shop: 'Fresh Groceries',
      itemCount: 5,
      total: 89.99,
      status: 'processing',
      createdAt: new Date()
    },
    { 
      id: 1002, 
      customerName: 'Jane Smith',
      customerEmail: 'jane@example.com',
      shop: 'Fashion Hub',
      itemCount: 2,
      total: 149.99,
      status: 'completed',
      createdAt: new Date(Date.now() - 86400000)
    },
    { 
      id: 1003, 
      customerName: 'Bob Johnson',
      customerEmail: 'bob@example.com',
      shop: 'Fresh Groceries',
      itemCount: 8,
      total: 134.50,
      status: 'pending',
      createdAt: new Date()
    },
  ]

  const table = useReactTable({
    data: mockOrders,
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
        <h1 className="text-3xl font-bold text-secondary-900">Orders</h1>
        <p className="text-secondary-600 mt-1">View and manage all orders</p>
      </div>

      <Card>
        <div className="mb-4 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary-400" size={20} />
          <input
            type="text"
            placeholder="Search orders..."
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

export default OrdersPage
