import { useMutation } from '@tanstack/react-query';
import { loginUser } from '@/services/modules/auth.api';
import { useAuth } from '@/providers/AuthProviders';


export const useLogin = () => {
    const { login } = useAuth();

    return useMutation({
        mutationFn: loginUser,
        onMutate: (variables) => {
            console.log('🚀 [useLogin] Sending data to backend:', variables);
        },
        onSuccess: (response) => {
            console.log('✅ [useLogin] Backend responded successfully:', response);
            
            if (response.success && response.data) {
                // <-- Updated to use accessToken
                login(response.data.accessToken, response.data.user);
            }
        },
        onError: (error) => {
            console.error('❌ [useLogin] API Request Failed:', error);
        }
    });
};