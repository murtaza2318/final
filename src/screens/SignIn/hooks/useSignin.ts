import { useNavigation, NavigationProp } from '@react-navigation/native';
import { FieldValues, useForm } from 'react-hook-form';
import { useLoginMutation } from '../../../redux/apis/auth.api';
import { setUserDetails } from '../../../redux/reducers/userSlice';
import { useAppDispatch } from '../../../redux/store';
// import { handlePostRequest } from '../../../utils/helpers'; // Assuming this helper exists and is set up
import { AuthStackNavigationType, RootStackNavigationType } from '../../../utils/types/NavigationTypes'; // Adjusted import

export interface SigninFormData {
  email: string;
  password: string;
}

export const useSignin = () => {
  const navigation = useNavigation<NavigationProp<AuthStackNavigationType | RootStackNavigationType>>(); // Combined types
  const dispatch = useAppDispatch();

  const { control, handleSubmit, reset, formState: { errors, isValid } } = useForm<SigninFormData>({
    mode: 'onChange',
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const [login, { isLoading }] = useLoginMutation();

  const validationRules = {
    email: {
      required: 'Email is required',
      pattern: {
        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
        message: 'Invalid email format',
      },
    },
    password: {
      required: 'Password is required',
      // minLength: { value: 8, message: 'Minimum 8 characters' }, // Add if needed
    },
  };

  const handleSignin = async (data: SigninFormData) => {
    try {
      // const response = await handlePostRequest({ // Use if handlePostRequest is preferred
      //   requestFunction: login,
      //   requestBody: {
      //     email: data.email.toLowerCase().trim(),
      //     password: data.password,
      //   },
      // });

      const response = await login({
        email: data.email.toLowerCase().trim(),
        password: data.password,
      }).unwrap();


      if (response && response.success && response.data && response.data.user) {
        dispatch(setUserDetails({
          id: response.data.user.id,
          email: response.data.user.email,
          fullName: `${response.data.user.firstName} ${response.data.user.lastName}`, // Assuming firstName, lastName are present
          token: response.data.token,
          role: response.data.user.role, // Store the role
          // profileComplete: response.data.user.profileComplete, // Add if available
          // avatarUrl: response.data.user.avatarUrl, // Add if available
        }));
        reset();
        // Navigate to the main app stack, e.g., 'MainTabs' or a role-specific dashboard
        // For now, let's assume a general 'Boarding' screen or similar post-login screen
        // This navigation might need to be more sophisticated based on role later.
        navigation.navigate('Boarding');
      } else {
        // Handle login failure (e.g., show a toast message)
        console.error('Login failed:', response?.message || 'Unknown error');
        // Example: Toast.show({ type: 'error', text1: 'Login Failed', text2: response?.message });
      }
    } catch (error: any) {
      console.error('Signin error:', error);
      // Example: Toast.show({ type: 'error', text1: 'Login Error', text2: error.message || 'An unexpected error occurred' });
      // Handle specific error structures if your API returns them, e.g., error.data.message
    }
  };

  return {
    control,
    handleSubmit,
    handleSignin,
    isLoading,
    errors,
    isValid,
    validationRules,
  };
};
