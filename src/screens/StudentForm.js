import React, {useState, useEffect} from 'react';
import {
  Dimensions,
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import Toast from 'react-native-toast-message';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Icon, Spinner, Form, Picker} from 'native-base';
import EntypoIcon from 'react-native-vector-icons/Feather';
import AntIcon from 'react-native-vector-icons/AntDesign';
import LinearGradient from 'react-native-linear-gradient';
import {CurrentUser, SignupController} from '../controllers';
import {ShowToast} from '../Toast';

const {width, height} = Dimensions.get('window');

function FormPage(props) {
  const [loading, setLoading] = useState(false);
  const [formState, setFormState] = useState({
    education: '',
    location: '',
    modeOfTeaching: 'online',
    charges: '',
    gender: 'male',
    subjects: '',
    contact: '',
    sentRequests: [],
    receivedRequests: [],
    approvedRequests: [],
    rejectedRequests: [],
    description: '',
  });
  const lastPageData = props.route.params.data;
  const handleSignup = () => {
    setLoading(true);
    const {
      email,
      name,
      password,
      confirmPassword,
      type,
      education,
      location,
      modeOfTeaching,
      charges,
      gender,
      subjects,
      contact,
      description,
    } = {...formState, ...lastPageData};
    if (
      !email ||
      !name ||
      !password ||
      !confirmPassword ||
      !type ||
      !education ||
      !location ||
      !modeOfTeaching ||
      !charges ||
      !gender ||
      !subjects ||
      !contact ||
      !description
    ) {
      ShowToast('error', 'Empty input', 'please fill the form');
      setLoading(false);
    } else {
      if (password !== confirmPassword) {
        setLoading(false);
        ShowToast(
          'error',
          'Password not matched',
          'please check password and confirm password',
        );
      } else {
        SignupController({...lastPageData, ...formState}, res => {
          setLoading(false);
          if (res.status === 404) {
            const {message1, message2} = getErrorMessage(res.code);
            ShowToast('error', message1, message2);
          }
        });
      }
    }
  };
  return (
    <KeyboardAwareScrollView>
      <SafeAreaView
        style={{
          flex: 1,
        }}>
        <View
          style={{
            // marginTop: height * 0.01,
            width: width * 1,
            height: height * 0.06,
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
          <View
            style={{
              //  backgroundColor: 'pink',
              width: width * 0.8,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text
              style={{
                textAlign: 'center',
                fontSize: height * 0.03,
                fontWeight: 'bold',
                color: 'gray',
              }}>
              Add Form
            </Text>
          </View>
        </View>
        <ScrollView
          showsVerticalScrollIndicator={false}
           contentContainerStyle={{
            alignItems: 'center',
            alignSelf: 'center',
           }}
          style={{
            width: width,
            height: height * 0.9,
            //   backgroundColor: 'pink',
            // justifyContent: 'space-around',
            //   shadowColor: 'rgba(255, 22, 17, 0.7)',
            shadowColor: 'rgba(255, 224, 178, 0.7)',
            shadowOffset: {width: 7, height: 3},
            elevation: 3,
            shadowOpacity: 5,
          }}>
          <View
            style={{
              width: width * 0.91,
              height: height * 0.093,
              backgroundColor: 'rgba(255, 224, 178, 0.6)',
              alignSelf: 'center',
              marginTop: 5,
              flexDirection: 'row',
              alignItems: 'center',
              borderRadius: 10,
            }}>
            <View
              style={{
                width: width * 0.2,
                height: height * 0.093,
                backgroundColor: '#FFC107',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Image
                style={{
                  width: width * 0.18,
                  height: height * 0.09,
                  alignSelf: 'center',
                }}
                source={require('../assets/pencl.png')}
              />
            </View>
            <AntIcon
              name="caretright"
              style={{
                fontSize: height * 0.025,
                marginLeft: -7,
                color: '#FFC107',
              }}
            />
            <TextInput
              style={{
                width: width * 0.66,
                height: height * 0.082,
                //   backgroundColor: 'pink',
                // textAlign: 'center',
                fontSize: 20,
                borderWidth: 0.2,
                borderRadius: 10,
                borderColor: 'gray',
              }}
              onChangeText={text =>
                setFormState({...formState, education: text})
              }
              value={formState.education}
              placeholder="Education"
              placeholderTextColor="gray"
            />
          </View>

          <View
            style={{
              width: width * 0.91,
              height: height * 0.093,
              backgroundColor: 'rgba(255, 224, 178, 0.6)',
              alignSelf: 'center',
              marginTop: 5,
              flexDirection: 'row',
              alignItems: 'center',
              borderRadius: 10,
            }}>
            <View
              style={{
                width: width * 0.2,
                height: height * 0.093,
                backgroundColor: '#FFC107',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Image
                style={{
                  width: width * 0.18,
                  height: height * 0.09,
                  alignSelf: 'center',
                }}
                source={require('../assets/pencl.png')}
              />
            </View>
            <AntIcon
              name="caretright"
              style={{
                fontSize: height * 0.025,
                marginLeft: -7,
                color: '#FFC107',
              }}
            />
            <TextInput
              style={{
                width: width * 0.66,
                height: height * 0.082,
                //   backgroundColor: 'pink',
                // textAlign: 'center',
                fontSize: 20,
                borderWidth: 0.2,
                borderRadius: 10,
                borderColor: 'gray',
              }}
              placeholder="Location"
              onChangeText={text =>
                setFormState({...formState, location: text})
              }
              value={formState.location}
              placeholderTextColor="gray"
            />
          </View>
          <View
            style={{
              width: width * 0.91,
              height: height * 0.093,
              backgroundColor: 'rgba(255, 224, 178, 0.6)',
              alignSelf: 'center',
              marginTop: 5,
              flexDirection: 'row',
              alignItems: 'center',
              borderRadius: 10,
            }}>
            <View
              style={{
                width: width * 0.2,
                height: height * 0.093,
                backgroundColor: '#FFC107',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Image
                style={{
                  width: width * 0.18,
                  height: height * 0.09,
                  alignSelf: 'center',
                }}
                source={require('../assets/pencl.png')}
              />
            </View>
            <AntIcon
              name="caretright"
              style={{
                fontSize: height * 0.025,
                marginLeft: -7,
                color: '#FFC107',
              }}
            />
            {/* <TextInput
              style={{
                width: width * 0.66,
                height: height * 0.082,
                //   backgroundColor: 'pink',
                // textAlign: 'center',
                fontSize: 20,
                borderWidth: 0.2,
                borderRadius: 10,
                borderColor: 'gray',
              }}
              onChangeText={text =>
                setFormState({...formState, modeOfTeaching: text})
              }
              value={formState.modeOfTeaching}
              placeholder="Mode of studying"
              placeholderTextColor="gray"
            /> */}

            <Form>
              <Picker
                mode="dropdown"
                iosHeader="Select mode of teaching"
                iosIcon={<Icon name="arrow-down" />}
                style={{width: width * 0.66}}
                selectedValue={formState.modeOfTeaching}
                placeholder="Mode of Studying"
                onValueChange={text =>
                  setFormState({...formState, modeOfTeaching: text})
                }>
                <Picker.Item label="Online" value="online" />
                <Picker.Item label="Offline" value="offline" />
              </Picker>
            </Form>
          </View>
          <View
            style={{
              width: width * 0.91,
              height: height * 0.093,
              backgroundColor: 'rgba(255, 224, 178, 0.6)',
              alignSelf: 'center',
              marginTop: 5,
              flexDirection: 'row',
              alignItems: 'center',
              borderRadius: 10,
            }}>
            <View
              style={{
                width: width * 0.2,
                height: height * 0.093,
                backgroundColor: '#FFC107',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Image
                style={{
                  width: width * 0.18,
                  height: height * 0.09,
                  alignSelf: 'center',
                }}
                source={require('../assets/pencl.png')}
              />
            </View>
            <AntIcon
              name="caretright"
              style={{
                fontSize: height * 0.025,
                marginLeft: -7,
                color: '#FFC107',
              }}
            />
            <TextInput
              style={{
                width: width * 0.66,
                height: height * 0.082,
                //   backgroundColor: 'pink',
                // textAlign: 'center',
                fontSize: 20,
                borderWidth: 0.2,
                borderRadius: 10,
                borderColor: 'gray',
              }}
              placeholder="Pay(per hour)"
              onChangeText={text => setFormState({...formState, charges: text})}
              value={formState.charges}
              placeholderTextColor="gray"
            />
          </View>
          <View
            style={{
              width: width * 0.91,
              height: height * 0.093,
              backgroundColor: 'rgba(255, 224, 178, 0.6)',
              alignSelf: 'center',
              marginTop: 5,
              flexDirection: 'row',
              alignItems: 'center',
              borderRadius: 10,
            }}>
            <View
              style={{
                width: width * 0.2,
                height: height * 0.093,
                backgroundColor: '#FFC107',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Image
                style={{
                  width: width * 0.18,
                  height: height * 0.09,
                  alignSelf: 'center',
                }}
                source={require('../assets/pencl.png')}
              />
            </View>
            <AntIcon
              name="caretright"
              style={{
                fontSize: height * 0.025,
                marginLeft: -7,
                color: '#FFC107',
              }}
            />
            <Form>
              <Picker
                mode="dropdown"
                iosHeader="Select your gender"
                iosIcon={<Icon name="arrow-down" />}
                style={{width: width * 0.66}}
                selectedValue={formState.gender}
                placeholder="Gender"
                onValueChange={text =>
                  setFormState({...formState, gender: text})
                }>
                <Picker.Item label="Male" value="male" />
                <Picker.Item label="Female" value="female" />
              </Picker>
            </Form>
            {/* <TextInput
              style={{
                width: width * 0.66,
                height: height * 0.082,
                //   backgroundColor: 'pink',
                // textAlign: 'center',
                fontSize: 20,
                borderWidth: 0.2,
                borderRadius: 10,
                borderColor: 'gray',
              }}
              onChangeText={text => setFormState({...formState, gender: text})}
              value={formState.gender}
              placeholder="Gender"
              placeholderTextColor="gray"
            /> */}
          </View>
          <View
            style={{
              width: width * 0.91,
              height: height * 0.093,
              backgroundColor: 'rgba(255, 224, 178, 0.6)',
              alignSelf: 'center',
              marginTop: 5,
              flexDirection: 'row',
              alignItems: 'center',
              borderRadius: 10,
            }}>
            <View
              style={{
                width: width * 0.2,
                height: height * 0.093,
                backgroundColor: '#FFC107',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Image
                style={{
                  width: width * 0.18,
                  height: height * 0.09,
                  alignSelf: 'center',
                }}
                source={require('../assets/pencl.png')}
              />
            </View>
            <AntIcon
              name="caretright"
              style={{
                fontSize: height * 0.025,
                marginLeft: -7,
                color: '#FFC107',
              }}
            />
            <TextInput
              style={{
                width: width * 0.66,
                height: height * 0.082,
                //   backgroundColor: 'pink',
                // textAlign: 'center',
                fontSize: 20,
                borderWidth: 0.2,
                borderRadius: 10,
                borderColor: 'gray',
              }}
              onChangeText={text =>
                setFormState({...formState, subjects: text})
              }
              value={formState.subjects}
              placeholder="Subjects Required"
              placeholderTextColor="gray"
            />
          </View>
          <View
            style={{
              width: width * 0.91,
              height: height * 0.093,
              backgroundColor: 'rgba(255, 224, 178, 0.6)',
              alignSelf: 'center',
              marginTop: 5,
              flexDirection: 'row',
              alignItems: 'center',
              borderRadius: 10,
            }}>
            <View
              style={{
                width: width * 0.2,
                height: height * 0.093,
                backgroundColor: '#FFC107',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Image
                style={{
                  width: width * 0.18,
                  height: height * 0.09,
                  alignSelf: 'center',
                }}
                source={require('../assets/pencl.png')}
              />
            </View>
            <AntIcon
              name="caretright"
              style={{
                fontSize: height * 0.025,
                marginLeft: -7,
                color: '#FFC107',
              }}
            />
            <TextInput
              style={{
                width: width * 0.66,
                height: height * 0.082,
                //   backgroundColor: 'pink',
                // textAlign: 'center',
                fontSize: 20,
                borderWidth: 0.2,
                borderRadius: 10,
                borderColor: 'gray',
              }}
              onChangeText={text => setFormState({...formState, contact: text})}
              value={formState.contact}
              placeholder="Contact no"
              placeholderTextColor="gray"
            />
          </View>
          {/* Description */}
          <View
            style={{
              width: width * 0.91,
              height: height * 0.193,
              backgroundColor: 'rgba(255, 224, 178, 0.6)',
              alignSelf: 'center',
              marginTop: 5,
              flexDirection: 'row',
              alignItems: 'center',
              borderRadius: 10,
            }}>
            <View
              style={{
                width: width * 0.2,
                height: height * 0.193,
                backgroundColor: '#FFC107',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Image
                style={{
                  width: width * 0.18,
                  height: height * 0.09,
                  alignSelf: 'center',
                }}
                source={require('../assets/pencl.png')}
              />
            </View>
            <AntIcon
              name="caretright"
              style={{
                fontSize: height * 0.025,
                marginLeft: -7,
                color: '#FFC107',
              }}
            />
            <TextInput
              multiline
              numberOfLines={4}
              style={{
                width: width * 0.66,
                height: height * 0.182,

                //   backgroundColor: 'pink',
                // textAlign: 'center',
                fontSize: 20,
                borderWidth: 0.2,
                borderRadius: 10,
                borderColor: 'gray',
              }}
              onChangeText={text =>
                setFormState({...formState, description: text})
              }
              value={formState.description}
              placeholder="Description"
              placeholderTextColor="gray"
            />
          </View>
          <TouchableOpacity onPress={() => handleSignup()}>
            <LinearGradient
              colors={['#FFF176', '#FFC107', '#FF9800']}
              style={{
                marginTop: 10,
                width: width * 0.7,
                height: height * 0.08,
                flexDirection: 'row',
                alignItems: 'center',
                alignContent: 'center',
                justifyContent: 'center',
                alignSelf: 'center',
                borderRadius: 25,
              }}>
              {loading ? (
                <Spinner style={{color: '#fff'}} color="#fff" />
              ) : (
                <Text
                  style={{
                    fontSize: height * 0.035,
                    fontWeight: 'bold',
                    color: 'white',
                  }}>
                  Create your account
                </Text>
              )}
            </LinearGradient>
          </TouchableOpacity>
        </ScrollView>
        <Toast ref={ref => Toast.setRef(ref)} />
      </SafeAreaView>
    </KeyboardAwareScrollView>
  );
}

export default FormPage;
