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
import { useSignup } from './hooks/useSignup';
import { COLORS } from '../../utils/theme';
import CustomRHFTextInput from '../../components/CustomRHFTextInput';
import { CustomText } from '../../components/CustomText';
import SocialSignupButton from './components/SocialSignupButton';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { AuthStackNavigationType } from '../../utils/types/NavigationTypes';

const { width } = Dimensions.get('window');

const SignupScreen: React.FC = () => {
  const {
    control,
    handleSubmit,
    handleSignup,
    isLoading,
    validationRules,
    handleFacebookSignup,
    handleGoogleSignup,
    setValue, // Destructure setValue
    watch, // Destructure watch to observe role value for styling
  } = useSignup();

  const navigation = useNavigation<NavigationProp<AuthStackNavigationType>>();
  const currentRole = watch('role'); // Watch the current role

  // const onSubmit = (data: any) => { // This onSubmit seems unused as handleSignup is directly passed to handleSubmit
  //   console.log('Form Data Submitted: ', data);
  //   navigation.navigate('Boarding');
  // };

  const handleCancel = () => {
    navigation.navigate('SignIn');
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
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
            <TouchableOpacity onPress={handleCancel} style={styles.cancelButton}>
              <CustomText textType="BodyLargeSemiBold" color={COLORS.NeutralGrey100}>
                Cancel
              </CustomText>
            </TouchableOpacity>
          </View>

          {/* Form */}
          <View style={styles.formContainer}>
            <CustomRHFTextInput
              control={control}
              name="firstName"
              rules={validationRules.firstName}
              title="First Name"
              placeholder="e.g Alex"
              type="standard"
              autoCapitalize="words"
              titleTextStyle={styles.fieldTitle}
            />
            <CustomRHFTextInput
              control={control}
              name="lastName"
              rules={validationRules.lastName}
              title="Last Name"
              placeholder="e.g John"
              type="standard"
              autoCapitalize="words"
              titleTextStyle={styles.fieldTitle}
              containerStyle={styles.fieldSpacing}
            />
            <CustomRHFTextInput
              control={control}
              name="zipCode"
              rules={validationRules.zipCode}
              title="Zip Code"
              placeholder=""
              type="standard"
              keyboardType="numeric"
              maxLength={10}
              titleTextStyle={styles.fieldTitle}
              containerStyle={styles.fieldSpacing}
            />
            <CustomRHFTextInput
              control={control}
              name="email"
              rules={validationRules.email}
              title="Email"
              placeholder=""
              type="standard"
              keyboardType="email-address"
              autoCapitalize="none"
              titleTextStyle={styles.fieldTitle}
              containerStyle={styles.fieldSpacing}
            />
            <CustomRHFTextInput
              control={control}
              name="password"
              rules={validationRules.password}
              title="Password"
              placeholder=""
              type="standard"
              secureTextEntry
              autoCapitalize="none"
              titleTextStyle={styles.fieldTitle}
              containerStyle={styles.fieldSpacing}
            />
            <CustomRHFTextInput
              control={control}
              name="howDidYouHear"
              rules={validationRules.howDidYouHear}
              title="How did you hear about us?"
              placeholder=""
              type="standard"
              multiline
              numberOfLines={2}
              titleTextStyle={styles.fieldTitle}
              containerStyle={styles.fieldSpacing}
            />

            {/* Role Selection */}
            <View style={[styles.fieldSpacing, styles.roleSelectionContainer]}>
              <CustomText textType="BodyMediumSemiBold" style={styles.fieldTitle}>
                I am a:
              </CustomText>
              <View style={styles.roleOptionsContainer}>
                <TouchableOpacity
                  style={[
                    styles.roleButton,
                    currentRole === 'Booker' && styles.roleButtonSelected,
                  ]}
                  onPress={() => setValue('role', 'Booker', { shouldValidate: true })}
                >
                  <CustomText
                    textType="BodyMediumRegular"
                    color={currentRole === 'Booker' ? COLORS.StaticWhite : COLORS.TextPrimary}
                  >
                    Booker
                  </CustomText>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.roleButton,
                    currentRole === 'Sitter' && styles.roleButtonSelected,
                  ]}
                  onPress={() => setValue('role', 'Sitter', { shouldValidate: true })}
                >
                  <CustomText
                    textType="BodyMediumRegular"
                    color={currentRole === 'Sitter' ? COLORS.StaticWhite : COLORS.TextPrimary}
                  >
                    Sitter
                  </CustomText>
                </TouchableOpacity>
              </View>
              {/* Display error for role if any */}
              {/* This requires control and errors from useForm to be passed to a CustomRHFErrorMessage component or handled manually */}
            </View>
          </View>

          {/* Save Button */}
          <TouchableOpacity
            style={[styles.saveButton, isLoading && { opacity: 0.6 }]}
            onPress={handleSubmit(handleSignup)}
            disabled={isLoading}
          >
            <CustomText
              textType="BodyLargeSemiBold"
              color={COLORS.NeutralGrey0}
              textStyle={styles.saveButtonText}
            >
              {isLoading ? 'Saving...' : 'Save'}
            </CustomText>
          </TouchableOpacity>

          {/* Social Login */}
          <View style={styles.socialSection}>
            <CustomText
              textType="BodyMediumRegular"
              color={COLORS.NeutralGrey60}
              center
              textStyle={styles.orText}
            >
              or login with
            </CustomText>

            <SocialSignupButton
              type="facebook"
              onPress={handleFacebookSignup}
              text="Continue with Facebook"
              textColor={COLORS.TextPrimary} // Fixed
              iconColor={COLORS.TextPrimary} // Fixed
            />

            <SocialSignupButton
              type="google"
              onPress={handleGoogleSignup}
              text="Continue with Google"
              textColor={COLORS.StaticWhite}
              iconColor={COLORS.StaticWhite}
            />
          </View>
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
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: hp(4),
    paddingBottom: hp(2),
    height: hp(10),
  },
  logoContainer: {
    alignItems: 'center',
  },
  logo: {
    width: width * 0.2,
    height: width * 0.2,
    resizeMode: 'contain',
  },
  cancelButton: {
    paddingVertical: RFValue(2),
  },
  formContainer: {
    paddingBottom: hp(1),
  },
  fieldTitle: {
    fontSize: RFValue(10),
    fontWeight: '600',
  },
  fieldSpacing: {
    marginTop: hp(1),
  },
  saveButton: {
    backgroundColor: COLORS.Primary,
    borderRadius: RFValue(20),
    height: RFValue(36),
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: hp(2),
  },
  saveButtonText: {
    fontSize: RFValue(13),
  },
  socialSection: {
    marginBottom: hp(2),
  },
  orText: {
    marginBottom: hp(1),
    fontSize: RFValue(11),
  },
  // Styles for Role Selection
  roleSelectionContainer: {
    // marginTop: hp(1), // Already part of fieldSpacing
  },
  roleOptionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: hp(1),
  },
  roleButton: {
    flex: 1, // Make buttons take equal width
    paddingVertical: hp(1.5),
    paddingHorizontal: wp(2),
    borderRadius: RFValue(10),
    borderWidth: 1,
    borderColor: COLORS.NeutralGrey40,
    alignItems: 'center',
    marginHorizontal: wp(1), // Add some space between buttons
  },
  roleButtonSelected: {
    backgroundColor: COLORS.Primary,
    borderColor: COLORS.Primary,
  },
});

export default SignupScreen;
