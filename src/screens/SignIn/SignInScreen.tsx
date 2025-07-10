import React from 'react';
import {
  View,
  ScrollView,
  Platform,
  KeyboardAvoidingView,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Image,
  Dimensions,
} from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import { useSignin } from './hooks/useSignin'; // Updated import
import { COLORS } from '../../utils/theme';
import CustomRHFTextInput from '../../components/CustomRHFTextInput';
import { CustomText } from '../../components/CustomText';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { AuthStackNavigationType } from '../../utils/types/NavigationTypes';

const { width } = Dimensions.get('window');

const SignInScreen: React.FC = () => {
  const {
    control,
    handleSubmit,
    handleSignin, // Renamed from handleSignup
    isLoading,
    validationRules,
  } = useSignin(); // Use the signin hook

  const navigation = useNavigation<NavigationProp<AuthStackNavigationType>>();

  const navigateToSignUp = () => {
    navigation.navigate('SignUp');
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'} // Adjusted behavior
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : hp(2)}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.header}>
            <View style={styles.logoContainer}>
              <Image
                source={require('../../../assets/images/logo.png')}
                style={styles.logo}
              />
            </View>
          </View>

          <CustomText textType="H2" bold style={styles.title}>
            Welcome Back!
          </CustomText>
          <CustomText textType="BodyRegular" color={COLORS.NeutralGrey60} style={styles.subtitle}>
            Sign in to continue your pet care journey.
          </CustomText>

          {/* Form */}
          <View style={styles.formContainer}>
            <CustomRHFTextInput
              control={control}
              name="email"
              rules={validationRules.email}
              title="Email"
              placeholder="Enter your email"
              type="standard"
              keyboardType="email-address"
              autoCapitalize="none"
              titleTextStyle={styles.fieldTitle}
            />
            <CustomRHFTextInput
              control={control}
              name="password"
              rules={validationRules.password}
              title="Password"
              placeholder="Enter your password"
              type="standard"
              secureTextEntry
              autoCapitalize="none"
              titleTextStyle={styles.fieldTitle}
              containerStyle={styles.fieldSpacing}
            />
          </View>

          <TouchableOpacity style={styles.forgotPasswordButton}>
            <CustomText textType="BodySmallSemiBold" color={COLORS.Primary}>
              Forgot Password?
            </CustomText>
          </TouchableOpacity>

          {/* Login Button */}
          <TouchableOpacity
            style={[styles.loginButton, isLoading && { opacity: 0.6 }]}
            onPress={handleSubmit(handleSignin)} // Use handleSignin
            disabled={isLoading}
          >
            <CustomText
              textType="BodyLargeSemiBold"
              color={COLORS.NeutralGrey0}
              textStyle={styles.loginButtonText}
            >
              {isLoading ? 'Signing In...' : 'Sign In'}
            </CustomText>
          </TouchableOpacity>

          {/* Navigate to Sign Up */}
          <View style={styles.signUpPromptContainer}>
            <CustomText textType="BodyMediumRegular" color={COLORS.NeutralGrey60}>
              Don't have an account?{' '}
            </CustomText>
            <TouchableOpacity onPress={navigateToSignUp}>
              <CustomText textType="BodyMediumSemiBold" color={COLORS.Primary}>
                Sign Up
              </CustomText>
            </TouchableOpacity>
          </View>

          {/* Social Login (Optional - can be added later if needed) */}
          {/*
          <View style={styles.socialSection}>
             <CustomText textType="BodyMediumRegular" color={COLORS.NeutralGrey60} center textStyle={styles.orText}>
               or sign in with
             </CustomText>
             Social buttons here...
          </View>
          */}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.NeutralGrey0,
  },
  scrollContent: {
    paddingHorizontal: wp(6),
    paddingBottom: hp(5),
    flexGrow: 1, // Ensure scrollview can grow
    justifyContent: 'center', // Center content vertically
  },
  header: {
    alignItems: 'center', // Center logo
    paddingTop: hp(4), // Reduced top padding
    paddingBottom: hp(2),
    // Removed fixed height to allow content to flow
  },
  logoContainer: {
    alignItems: 'center',
  },
  logo: {
    width: width * 0.25, // Slightly larger logo
    height: width * 0.25,
    resizeMode: 'contain',
    marginBottom: hp(2),
  },
  title: {
    textAlign: 'center',
    marginBottom: hp(1),
    color: COLORS.TextPrimary,
  },
  subtitle: {
    textAlign: 'center',
    marginBottom: hp(4),
  },
  formContainer: {
    paddingBottom: hp(1),
  },
  fieldTitle: {
    fontSize: RFValue(10),
    fontWeight: '600', // Use string for fontWeight
    color: COLORS.NeutralGrey80, // Example color
  },
  fieldSpacing: {
    marginTop: hp(2), // Increased spacing between fields
  },
  forgotPasswordButton: {
    alignSelf: 'flex-end',
    marginVertical: hp(1.5),
  },
  loginButton: {
    backgroundColor: COLORS.Primary,
    borderRadius: RFValue(12), // Consistent rounding
    height: RFValue(48), // Standard button height
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: hp(3), // Spacing after login button
  },
  loginButtonText: {
    fontSize: RFValue(14), // Adjusted font size
  },
  signUpPromptContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: hp(2), // Spacing before sign up prompt
    marginBottom: hp(4), // Bottom margin
  },
  // Styles for social login (if added later)
  // socialSection: {
  //   marginBottom: hp(2),
  // },
  // orText: {
  //   marginBottom: hp(1),
  //   fontSize: RFValue(11),
  //   textAlign: 'center',
  // },
});

export default SignInScreen;
