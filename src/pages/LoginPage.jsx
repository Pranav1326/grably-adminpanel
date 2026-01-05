import { useForm } from 'react-hook-form'
import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { authApi } from '../api/auth'
import { useAuthStore } from '../store/authStore'
import { Input, FormError } from '../components/forms'
import Button from '../components/ui/Button'

const LoginPage = () => {
  const navigate = useNavigate()
  const setAuth = useAuthStore((state) => state.setAuth)
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const loginMutation = useMutation({
    mutationFn: authApi.login,
    onSuccess: (response) => {
      console.log('Login response:', response)
      // Backend returns: { message, user, accessToken, refreshToken }
      const token = response.accessToken || response.token
      const user = response.user
      
      if (token && user) {
        console.log('Setting auth with:', { user, token })
        setAuth(user, token)
        console.log('Navigating to dashboard...')
        navigate('/dashboard', { replace: true })
      } else {
        console.error('Missing token or user in response:', response)
      }
    },
    onError: (error) => {
      console.error('Login error:', error)
    }
  })

  const onSubmit = (data) => {
    loginMutation.mutate(data)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-secondary-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h1 className="text-center text-4xl font-bold text-primary-600">Grably</h1>
          <h2 className="mt-6 text-center text-3xl font-bold text-secondary-900">
            Admin Panel
          </h2>
          <p className="mt-2 text-center text-sm text-secondary-600">
            Sign in to your account
          </p>
        </div>
        
        <form className="mt-8 space-y-6 bg-white p-8 rounded-lg shadow-md" onSubmit={handleSubmit(onSubmit)}>
          {loginMutation.isError && (
            <FormError 
              message={loginMutation.error?.response?.data?.message || 'Invalid credentials'} 
            />
          )}
          
          <div className="space-y-4">
            <Input
              label="Email"
              name="email"
              type="email"
              placeholder="admin@example.com"
              register={register}
              error={errors.email}
              required
            />
            
            <Input
              label="Password"
              name="password"
              type="password"
              placeholder="••••••••"
              register={register}
              error={errors.password}
              required
            />
          </div>

          <Button
            type="submit"
            className="w-full"
            isLoading={loginMutation.isPending}
          >
            Sign in
          </Button>
        </form>
      </div>
    </div>
  )
}

export default LoginPage
