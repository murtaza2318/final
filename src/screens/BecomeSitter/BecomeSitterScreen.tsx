import React from 'react';
import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native'; // Added ActivityIndicator
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { RFValue } from 'react-native-responsive-fontsize';
import { COLORS, FONT_POPPINS } from '../../utils/theme';
import { CustomIcon } from '../../components/CustomIcon';
import { useBecomeSitterMutation } from '../../redux/apis/user.api'; // Import the mutation
import { useAppDispatch, useAppSelector } from '../../redux/store'; // Import dispatch and selector
import { setUserDetails } from '../../redux/reducers/userSlice'; // Import action to update user details
import { useNavigation, NavigationProp } from '@react-navigation/native'; // Import navigation
import { RootStackNavigationType } from '../../utils/types/NavigationTypes'; // Or your specific navigation type

const BecomeSitterScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackNavigationType>>(); // Initialize navigation
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector(state => state.user); // Get current user from Redux state

  const [becomeSitter, { isLoading, error }] = useBecomeSitterMutation();

  const handleBecomeSitter = async () => {
    if (currentUser.role === 'Sitter') {
      // Optionally, show a message that user is already a sitter
      console.log('User is already a sitter.');
      // navigation.navigate('SitterDashboard'); // Or appropriate screen
      return;
    }

    try {
      const response = await becomeSitter().unwrap(); // Call the mutation
      if (response.success) {
        // Update user role in Redux state
        // Option 1: If API returns the new role in response.data.role
        // dispatch(setUserDetails({ ...currentUser, role: response.data?.role || 'Sitter' }));

        // Option 2: More robustly, rely on invalidatesTags and let useGetCurrentUser refetch.
        // For now, let's optimistically update if the API response is simple.
        // If the API returns the full updated user object, that's even better.
        dispatch(setUserDetails({ ...currentUser, role: 'Sitter' })); // Optimistic update or use response.data.role

        console.log('Successfully became a sitter!');
        // Navigate to sitter onboarding or dashboard
        navigation.navigate('More'); // Placeholder navigation
        // Example: navigation.navigate('SitterOnboarding');
      } else {
        console.error('Failed to become a sitter:', response.message);
        // Show error toast: response.message
      }
    } catch (err) {
      console.error('Error becoming a sitter:', err);
      // Show error toast from err
    }
  };

  const handleClose = () => {
    navigation.goBack();
  };

  // The reload button functionality can be decided later (e.g., refetch screen data if any)
  // For now, it does nothing.

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.headerIcon} onPress={handleClose}>
          <CustomIcon icon="close" type="AntDesign" size={RFValue(24)} color={COLORS.TextPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Become a Sitter</Text>
        <TouchableOpacity style={styles.headerIcon} /* onPress={handleReload} */>
          <CustomIcon icon="reload1" type="AntDesign" size={RFValue(22)} color={COLORS.TextPrimary} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <Image source={require('../../../assets/images/human11.png')} style={styles.heroImage} resizeMode="cover" />

        {/* Intro Card */}
        <View style={styles.card}>
          <Text style={styles.bigTitle}>Get paid to play with pets</Text>
          <Text style={styles.introText}>
            velvet leash co makes it easy and promotes you to the nation's largest network of pet owners. Earn money doing something you love.
          </Text>
          <TouchableOpacity
            style={[styles.getStartedBtn, isLoading && styles.disabledButton]}
            onPress={handleBecomeSitter}
            disabled={isLoading || currentUser.role === 'Sitter'} // Disable if loading or already a sitter
          >
            {isLoading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.getStartedBtnText}>
                {currentUser.role === 'Sitter' ? 'You are a Sitter' : 'Get started'}
              </Text>
            )}
          </TouchableOpacity>
          {error && <Text style={styles.errorText}>Error: {JSON.stringify(error)}</Text>}
          <Text style={styles.flexTitle}>Flexibility puts you in control</Text>
          <View style={styles.bulletGroup}>
            <Text style={styles.flexItem}>✔ Set your own schedules and prices</Text>
            <Text style={styles.flexItem}>✔ Offer any combination of pet care services</Text>
            <Text style={styles.flexItem}>✔ Set size, age, and other pet preferences that work for you</Text>
          </View>
        </View>

        {/* Testimonial 1 */}
        <View style={styles.imageWithCard}>
          <Image source={require('../../../assets/images/human10.png')} style={styles.testimonialImage} />
          <View style={styles.testimonialCardOverlay}>
            <Text style={styles.testimonialText}>it’s easy. I go to the calender and mark myself as available when i want to be.</Text>
            <Text style={styles.testimonialAuthor}>Cari C., Plano TX</Text>
          </View>
        </View>

        {/* Tools Card */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>The tools to succeed</Text>
          <View style={styles.bulletGroup}>
            <Text style={styles.checkItem}>✔ The Velvet Guarantee which includes up to $25,000 in vet care reimbursement</Text>
            <Text style={styles.checkItem}>✔ Manage your pet sitting schedule and more with the velvet app</Text>
            <Text style={styles.checkItem}>✔ 24/7 support, including vet assistance</Text>
          </View>
        </View>

        {/* Testimonial 2 */}
        <View style={styles.imageWithCard}>
          <Image source={require('../../../assets/images/human10.png')} style={styles.testimonialImage} />
          <View style={styles.testimonialCardOverlay}>
            <Text style={styles.testimonialText}>Thanks to the Velvet App, I know about my business requests immediately and I’m quick to respond!</Text>
            <Text style={styles.testimonialAuthor}>Carol U., Atlanta GA</Text>
          </View>
        </View>

        {/* How it works */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>How it works</Text>
          {[1, 2, 3].map((step, index) => (
            <View key={index} style={styles.howItWorksStep}>
              <View style={styles.howItWorksCircle}>
                <Text style={styles.howItWorksCircleText}>{step}</Text>
              </View>
              <View style={styles.howItWorksContent}>
                <Text style={styles.stepText}>
                  {step === 1 ? 'Create your profile' : step === 2 ? 'Accept requests' : 'Get paid'}
                </Text>
                <Text style={styles.stepDesc}>
                  {step === 1
                    ? 'We guide you through building a profile that showcases information pet owners care about.'
                    : step === 2
                    ? 'Tell us the types of pets you want to care for and the dates that work for you. You make your own schedule.'
                    : 'Payments are ready for withdrawal two days after you have completed a service.'}
                </Text>
              </View>
            </View>
          ))}
          <TouchableOpacity style={styles.getStartedBtn}>
            <Text style={styles.getStartedBtnText}>Get started</Text>
          </TouchableOpacity>
        </View>

        {/* Services with Icons */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Services</Text>
          {[
            { icon: { uri: 'https://img.icons8.com/ios-filled/50/dog-house.png' }, title: 'Boarding', desc: 'Care for a dog or cat overnight in your home. Sitters who offer boarding can make up to 2x more than sitters who don’t.' },
            { icon: { uri: 'https://img.icons8.com/ios-filled/50/dog-walking.png' }, title: 'Dog walking', desc: 'Pick up dog walks that fit your schedule.' },
            { icon: { uri: 'https://img.icons8.com/ios-filled/50/dog-training.png' }, title: 'Doggy Day care', desc: 'Ideal for work from home dog lovers.' },
            { icon: { uri: 'https://img.icons8.com/ios-filled/50/visit.png' }, title: 'House Sitting Drop-in visits', desc: '—' },
            { icon: { uri: 'https://img.icons8.com/ios-filled/50/dog-training-collar.png' }, title: 'Dog Training', desc: 'Private training in your client’s home or neighborhood. Available to credentialed trainers.' },
            
          ].map((service, idx) => (
            <View key={idx} style={{ flexDirection: 'row', marginVertical: 8 }}>
              <Image source={service.icon} style={{ width: 30, height: 30, marginRight: 10 }} />
              <View style={{ flex: 1 }}>
                <Text style={styles.serviceItem}>{service.title}</Text>
                <Text style={styles.serviceDesc}>{service.desc}</Text>
              </View>
            </View>
          ))}

          <Text style={styles.sectionTitle}>Safety first. Always.</Text>
          <View style={styles.bulletGroup}>
            <Text style={styles.checkItem}>✔ Every service you offer on velvet leash backed by velvet leash Guarantee.</Text>
            <Text style={styles.checkItem}>✔ Safe, secured, and convenient online payments.</Text>
            <Text style={styles.checkItem}>✔ A top tier support team available 24/7.</Text>
            <Text style={styles.checkItem}>✔ Ongoing pet care education for pet sitters.</Text>
          </View>

          <Text style={styles.connectText}>Connect with pet owners once your profile is approved</Text>
          <TouchableOpacity style={styles.getStartedBtn}>
            <Text style={styles.getStartedBtnText}>Start creating your profile</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: wp('4%'),
  },
  headerIcon: { padding: 6 },
  headerTitle: {
    marginTop: 40,
    fontFamily: FONT_POPPINS.semiBoldFont,
    fontSize: RFValue(20),
    color: COLORS.TextPrimary,
  },
  scrollContent: { paddingBottom: hp('4%') },
  heroImage: {
    width: '100%',
    height: hp('25%'),
  },
  card: {
    backgroundColor: '#fff',
    marginHorizontal: wp('4%'),
    marginBottom: hp('2%'),
    padding: wp('4%'),
    borderRadius: 12,
    elevation: 1,
  },
  bigTitle: {
    fontFamily: FONT_POPPINS.boldFont,
    fontSize: RFValue(24),
    textAlign: 'center',
    color: COLORS.TextPrimary,
    marginBottom: 10,
  },
  introText: {
    fontFamily: FONT_POPPINS.regularFont,
    fontSize: RFValue(14),
    textAlign: 'center',
    color: COLORS.TextPrimary,
    marginBottom: 12,
  },
  getStartedBtn: {
    backgroundColor: '#aab98f',
    borderRadius: 30,
    paddingVertical: 12,
    paddingHorizontal: 32,
    alignSelf: 'center',
    marginVertical: 10,
  },
  getStartedBtnText: {
    fontFamily: FONT_POPPINS.semiBoldFont,
    fontSize: RFValue(16),
    color: '#fff',
  },
  flexTitle: {
    fontFamily: FONT_POPPINS.semiBoldFont,
    fontSize: RFValue(16),
    color: COLORS.TextPrimary,
    marginTop: 8,
  },
  flexItem: {
    fontFamily: FONT_POPPINS.regularFont,
    fontSize: RFValue(13),
    color: COLORS.TextPrimary,
    marginVertical: 2,
  },
  testimonialImage: {
    width: '100%',
    height: hp('25%'),
  },
  imageWithCard: { marginBottom: hp('2%') },
  testimonialCardOverlay: {
    backgroundColor: '#f6f6f7',
    marginHorizontal: wp('4%'),
    padding: wp('4%'),
    borderRadius: 12,
    marginTop: -hp('4%'),
    zIndex: 10,
    elevation: 3,
  },
  testimonialText: {
    fontFamily: FONT_POPPINS.regularFont,
    fontSize: RFValue(14),
    color: COLORS.TextPrimary,
    marginBottom: 4,
  },
  testimonialAuthor: {
    fontFamily: FONT_POPPINS.semiBoldFont,
    fontSize: RFValue(13),
    textAlign: 'right',
    color: COLORS.TextPrimary,
  },
  sectionTitle: {
    fontFamily: FONT_POPPINS.semiBoldFont,
    fontSize: RFValue(16),
    color: COLORS.TextPrimary,
    marginBottom: 6,
  },
  checkItem: {
    fontFamily: FONT_POPPINS.regularFont,
    fontSize: RFValue(13),
    marginBottom: 3,
    color: COLORS.TextPrimary,
  },
  bulletGroup: { marginTop: 4 },
  howItWorksStep: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: 12,
  },
  howItWorksCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#aab98f',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  howItWorksCircleText: {
    fontFamily: FONT_POPPINS.semiBoldFont,
    color: '#fff',
    fontSize: RFValue(15),
  },
  howItWorksContent: {
    flex: 1,
  },
  stepText: {
    fontFamily: FONT_POPPINS.semiBoldFont,
    fontSize: RFValue(15),
    color: COLORS.TextPrimary,
  },
  stepDesc: {
    fontFamily: FONT_POPPINS.regularFont,
    fontSize: RFValue(13),
    color: COLORS.TextPrimary,
    marginTop: 4,
  },
  serviceItem: {
    fontFamily: FONT_POPPINS.semiBoldFont,
    fontSize: RFValue(14),
    color: COLORS.TextPrimary,
  },
  serviceDesc: {
    fontFamily: FONT_POPPINS.regularFont,
    fontSize: RFValue(13),
    color: COLORS.TextPrimary,
  },
  connectText: {
    fontFamily: FONT_POPPINS.regularFont,
    fontSize: RFValue(13),
    textAlign: 'center',
    color: COLORS.TextPrimary,
    marginTop: 12,
    marginBottom: 8,
  },
  disabledButton: {
    backgroundColor: COLORS.NeutralGrey60, // Example disabled color
  },
  errorText: {
    fontFamily: FONT_POPPINS.regularFont,
    fontSize: RFValue(12),
    color: COLORS.SemanticError, // Ensure this color is defined in your theme
    textAlign: 'center',
    marginTop: hp(1),
  },
});

export default BecomeSitterScreen;
