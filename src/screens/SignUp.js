import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import EntypoIcon from 'react-native-vector-icons/Feather';
import AntIcon from 'react-native-vector-icons/AntDesign';
import LinearGradient from 'react-native-linear-gradient';
import Toast from 'react-native-toast-message';
import firebaseAuth from '@react-native-firebase/auth';
import firebaseFireStore from '@react-native-firebase/firestore';
import {SignupController} from '../controllers';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
const {width, height} = Dimensions.get('window');
import {ShowToast} from '../Toast';
import {Spinner} from 'native-base';

function Signup(props) {
  const [loading, setLoading] = useState(false);
  const [signupState, setSignupState] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    type: 'student',
  });

  const getErrorMessage = code => {
    switch (code) {
      case 'auth/invalid-email':
        return {
          message1: 'Invalid Email',
          message2: 'please enter valid email address',
        };

      case 'auth/weak-password':
        return {
          message1: 'Weak Password',
          message2: 'please enter a good secure password',
        };

      case 'auth/email-already-in-use':
        return {
          message1: 'Email already registered',
          message2: 'please enter different email address',
        };
    }
  };

  const handleGo = () => {
    const {email, name, password, confirmPassword, type} = signupState;

    if (!email || !name || !password || !confirmPassword || !type) {
      ShowToast('error', 'Empty input', 'please fill the form');
      setLoading(false);
    } else {
      if (password !== confirmPassword) {
        ShowToast(
          'error',
          'Password not matched',
          'please check password and confirm password',
        );
      } else {
        signupState.type === 'teacher'
          ? props.navigation.navigate('TeacherForm', {data: signupState})
          : props.navigation.navigate('StudentForm', {data: signupState})
      }
    }
  };

  useEffect(() => {
    return () => {
      setLoading(false);
    };
  }, []);
  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}>
      <KeyboardAwareScrollView>
        <View
          style={{
            // marginTop: height * 0.01,
            width: width * 1,
            height: height * 0.08,
            alignItems: 'center',
            flexDirection: 'row',
            // backgroundColor:'pink'
          }}>
          <View>
            <TouchableOpacity
              style={{justifyContent: 'center', padding: 5}}
              onPress={() => props.navigation.goBack()}>
              <AntIcon
                name="arrowleft"
                style={{fontSize: height * 0.05, color: 'gray'}}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{
            marginTop: height * 0.02,
            width,
            height: height * 0.08,
            //  backgroundColor: 'pink',
            alignItems: 'center',
            alignSelf: 'center',
            flexDirection: 'row',
          }}>
          <Text
            style={{
              padding: 5,
              color: 'black',
              // alignSelf: 'flex-start',
              textAlign: 'left',
              fontWeight: 'bold',
              fontSize: 40,
              color: 'black',
              // backgroundColor:'pink'
            }}>
            Create Account
          </Text>
        </View>
        <View
          style={{
            marginTop: height * 0.02,
            width: width * 0.9,
            height: height * 0.45,
            // backgroundColor: 'pink',
            alignSelf: 'center',
            // justifyContent: 'center',
          }}>
          <View
            style={{
              width: width * 0.85,
              height: height * 0.08,
              // backgroundColor: 'yellow',
              alignSelf: 'center',
              justifyContent: 'center',
              alignItems: 'center',
              borderBottomWidth: 2,
              borderBottomColor: 'gray',
              flexDirection: 'row',
            }}>
            <AntIcon name="user" size={30} color="gray" />
            <TextInput
              style={{
                marginTop: 1,
                marginLeft: 5,
                alignSelf: 'center',
                width: width * 0.75,
                height: height * 0.07,
                //  backgroundColor: 'pink',
              }}
              onChangeText={text =>
                setSignupState({...signupState, name: text})
              }
              value={signupState.name}
              placeholder="USER NAME"
              placeholderTextColor="black"
            />
          </View>
          <View
            style={{
              marginTop: 10,
              width: width * 0.85,
              height: height * 0.08,
              // backgroundColor: 'yellow',
              alignSelf: 'center',
              justifyContent: 'center',
              alignItems: 'center',
              borderBottomWidth: 2,
              borderBottomColor: 'gray',
              flexDirection: 'row',
            }}>
            <EntypoIcon name="mail" size={30} color="gray" />
            <TextInput
              style={{
                marginTop: 1,
                marginLeft: 5,
                alignSelf: 'center',
                width: width * 0.75,
                height: height * 0.07,
              }}
              onChangeText={text =>
                setSignupState({...signupState, email: text})
              }
              value={signupState.email}
              placeholder="EMAIL"
              placeholderTextColor="black"
            />
          </View>
          <View
            style={{
              marginTop: 10,
              width: width * 0.85,
              height: height * 0.08,
              // backgroundColor: 'yellow',
              alignSelf: 'center',
              justifyContent: 'center',
              alignItems: 'center',
              borderBottomWidth: 2,
              borderBottomColor: 'gray',
              flexDirection: 'row',
            }}>
            <EntypoIcon name="lock" size={30} color="gray" />
            <TextInput
              style={{
                marginTop: 1,
                marginLeft: 5,
                alignSelf: 'center',
                width: width * 0.75,
                height: height * 0.07,
                //  backgroundColor: 'pink',
              }}
              onChangeText={text =>
                setSignupState({...signupState, password: text})
              }
              value={signupState.password}
              placeholder="PASSWORD"
              placeholderTextColor="black"
            />
          </View>
          <View
            style={{
              marginTop: 10,
              width: width * 0.85,
              height: height * 0.08,
              // backgroundColor: 'yellow',
              alignSelf: 'center',
              justifyContent: 'center',
              alignItems: 'center',
              borderBottomWidth: 2,
              borderBottomColor: 'gray',
              flexDirection: 'row',
            }}>
            <EntypoIcon name="lock" size={30} color="gray" />
            <TextInput
              style={{
                marginTop: 1,
                marginLeft: 5,
                alignSelf: 'center',
                width: width * 0.75,
                height: height * 0.07,
              }}
              onChangeText={text =>
                setSignupState({...signupState, confirmPassword: text})
              }
              value={signupState.confirmPassword}
              placeholder="CONFIRM PASSWORD"
              placeholderTextColor="black"
            />
          </View>
          <View
            style={{
              // marginTop: 0,
              width: width * 0.85,
              height: height * 0.1,
              // backgroundColor: 'white',
              alignSelf: 'center',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'row',
            }}>
            <Text
              style={{
                // padding: 5,
                marginLeft: -5,
                width: width * 0.29,
                height: height * 0.04,
                textAlign: 'center',
                justifyContent: 'center',
                color: 'black',
                fontWeight: 'bold',
                fontSize: 25,
                // backgroundColor:'yellow'
              }}>
              Student
            </Text>
            <TouchableOpacity
              onPress={() => setSignupState({...signupState, type: 'student'})}
              style={{
                marginLeft: 5,
                width: width * 0.08,
                height: height * 0.04,
                borderRadius: 20,
                alignItems: 'center',
                justifyContent: 'center',
                borderWidth: 2,
                alignSelf: 'center',
              }}>
              {signupState.type === 'student' ? (
                <View
                  style={{
                    color: '#000',
                    backgroundColor: '#000',
                    borderWidth: 2,
                    borderRadius: 20,
                    height: height * 0.03,
                    width: width * 0.06,
                  }}></View>
              ) : null}
            </TouchableOpacity>
            <Text
              style={{
                marginLeft: 15,
                // padding: 10,
                width: width * 0.29,
                height: height * 0.04,
                // backgroundColor: 'white',
                textAlign: 'center',
                justifyContent: 'center',
                color: 'black',
                fontWeight: 'bold',
                fontSize: 25,
              }}>
              Teacher
            </Text>
            <TouchableOpacity
              onPress={() => setSignupState({...signupState, type: 'teacher'})}
              style={{
                marginLeft: 5,
                width: width * 0.08,
                height: height * 0.04,
                // backgroundColor: 'yellow',
                borderRadius: 20,
                borderWidth: 2,
                alignItems: 'center',
                justifyContent: 'center',
                alignSelf: 'center',
              }}>
              {signupState.type === 'teacher' ? (
                <View
                  style={{
                    color: '#000',
                    backgroundColor: '#000',
                    borderWidth: 2,
                    borderRadius: 20,
                    height: height * 0.03,
                    width: width * 0.06,
                  }}></View>
              ) : null}
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{
            marginTop: height * 0.03,
            width,
            height: height * 0.1,
            //  backgroundColor: 'pink',
            alignSelf: 'center',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <TouchableOpacity
            // onPress={() => handleSignup()}
            onPress={handleGo}
            // onPress={() => signupState.type === "teacher" ? props.navigation.navigate('Form', {data: signupState}) : alert('You are not a teacher')}
            style={{
              width,
              height: height * 0.1,
              alignItems: 'center',
              justifyContent: 'center',
              shadowColor: 'rgba(255, 224, 178, 0.7)',
              shadowOffset: {width: 7, height: 7},
              elevation: 3,
              shadowOpacity: 5,
              flexDirection: 'row',
            }}>
            <LinearGradient
              colors={['#FFF176', '#FFC107', '#FF9800']}
              style={{
                width: width * 0.45,
                height: height * 0.08,
                flexDirection: 'row',
                alignItems: 'center',
                alignContent: 'center',
                justifyContent: 'center',
                marginLeft: width * 0.3,
                borderRadius: 30,
              }}>
              {loading ? (
                <Spinner style={{color: '#fff'}} />
              ) : (
                <Text
                  style={{
                    fontSize: height * 0.03,
                    fontWeight: 'bold',
                    color: 'white',
                  }}>
                  NEXT
                </Text>
              )}
              <AntIcon
                name="arrowright"
                style={{
                  marginLeft: 10,
                  fontSize: height * 0.05,
                  color: 'white',
                }}
              />
            </LinearGradient>
          </TouchableOpacity>
        </View>
        <View>
          <View
            style={{
              marginTop: height * 0.09,
              width: width * 0.97,
              height: height * 0.09,
              //  backgroundColor: 'yellow',
              alignSelf: 'center',
              justifyContent: 'center',
              flexDirection: 'row',
            }}>
            <Text
              style={{
                color: 'black',
                alignSelf: 'center',
                textAlign: 'left',
                fontWeight: 'bold',
                fontSize: 20,
                color: 'gray',
              }}>
              Already have an account?
            </Text>
            <TouchableOpacity
              onPress={() => props.navigation.navigate('Login')}>
              <Text
                style={{
                  marginLeft: 7,
                  color: 'black',
                  alignSelf: 'center',
                  textAlign: 'right',
                  fontWeight: 'bold',
                  fontSize: 26,
                  color: '#e91e',

                  padding: 10,
                  // textDecorationLine: 'underline',
                }}>
                Sign in
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <Toast ref={ref => Toast.setRef(ref)} />
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}
export default Signup;
