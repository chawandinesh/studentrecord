import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  ImageBackground,
  View,
  Dimensions,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
} from 'react-native';
import _ from 'lodash'
import ImagePicker from 'react-native-image-crop-picker';
import AntIcon from 'react-native-vector-icons/AntDesign';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import LinearGradient from 'react-native-linear-gradient';
import {
  CurrentUser,
  ProfileUpdateController,
  signOutController,
  uploadImageController,
} from '../controllers';
import {Icon} from 'native-base';
import Toast from 'react-native-toast-message';
import {ShowToast} from '../Toast';

const {height, width} = Dimensions.get('window');

function ProfilePage(props) {
  const [edit, setEdit] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [originalData, setOriginalData] = useState({});
  useEffect(() => {
    CurrentUser(data => {
      setCurrentUser(data);
      setOriginalData(data);
    });
  }, []);

  useEffect(() => {
    if (!edit) {
      setCurrentUser(originalData);
    }
  }, [edit]);

  const pickImage = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    })
      .then(image => {
        uploadImageController(image, currentUser.id, response => {
          if (response.status === 200) {
            setCurrentUser({...currentUser, image: response.image});
            ShowToast('success', 'Profile image added successfully', '');
          }
          if (response.status === 400) {
            ShowToast('error', 'failed to upload profile image');
          }
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

  const handleUpdate = () => {
    ProfileUpdateController(currentUser, currentUser.id, response => {
      if (response.status === 200) {
        ShowToast('success', 'Successfully updated', '');
        setEdit(false);
      }
      if (response.status === 404) {
        ShowToast('error', 'Failed to update', '');
      }
    });
  };
  return (
    <KeyboardAwareScrollView>
      <View style={{width, height}}>
        <View
          style={{
            marginTop: -20,
            width,
            height: height * 0.45,
            backgroundColor: 'rgba(255, 224, 178, 0.5)',
            borderBottomLeftRadius: 40,
          }}>
          <View
            style={{
              marginTop: height * 0.05,
              width: width * 1,
              height: height * 0.08,
              alignItems: 'center',
              flexDirection: 'row',
              justifyContent:'space-between'
            }}>
            <View>
              <View></View>
              {/* <TouchableOpacity
                style={{justifyContent: 'center', padding: 5}}
                onPress={() => props.navigation.goBack()}>
                <AntIcon
                  name="arrowleft"
                  style={{fontSize: height * 0.05, color: 'black'}}
                />
              </TouchableOpacity> */}
            </View>
            <View
              style={{
                // backgroundColor: 'pink',
                width: width * 0.7,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text
                style={{
                  textAlign: 'center',
                  fontSize: height * 0.03,
                  fontWeight: 'bold',
                  color: 'black',
                }}>
                {_.capitalize(currentUser.type)}
              </Text>
            </View>
            <View>
              {edit ? (
                <TouchableOpacity
                  style={{justifyContent: 'center', padding: 5}}
                  onPress={() => handleUpdate()}>
                  <Icon
                    type="AntDesign"
                    name="checkcircle"
                    style={{fontSize: height * 0.05, color: 'black'}}
                  />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  style={{justifyContent: 'center', padding: 5}}
                  onPress={() => signOutController()}>
                  <AntIcon
                    name="logout"
                    style={{fontSize: height * 0.05, color: 'black'}}
                  />
                </TouchableOpacity>
              )}
            </View>
          </View>
          <View
            style={{
              width: width * 0.95,
              height: height * 0.3,
              //   backgroundColor: 'pink',
              alignSelf: 'center',
              flexDirection: 'column',
            }}>
            {edit ? (
              <TextInput
                onChangeText={text => {
                  setCurrentUser({...currentUser, name: text});
                }}
                value={currentUser.name}
                autoFocus
                style={{
                  marginLeft: 10,
                  // textDecoration: 'underline',
                  width: width * 0.9,
                  height: height * 0.05,
                  justifyContent: 'center',
                  alignItems: 'center',
                  // backgroundColor: 'orange',
                  fontSize: height * 0.025,
                  padding: 4,
                  fontWeight: 'bold',
                }}
              />
            ) : (
              <Text
                style={{
                  marginLeft: 10,
                  width: width * 0.9,
                  height: height * 0.05,
                  // backgroundColor: 'orange',
                  fontSize: height * 0.04,
                  fontWeight: 'bold',
                }}>
                {currentUser.name}
              </Text>
            )}
            <View
              style={{
                // marginTop: -10,
                // marginLeft: 10,
                width: width * 0.37,
                height: height * 0.16,
                alignSelf: 'center',
                borderRadius: 100,
                borderWidth: 4,
                borderColor: 'black',
              }}>
              {edit ? (
                <TouchableOpacity
                 onPress={() => pickImage()}
                  style={{
                    position: 'absolute',
                    bottom: 10,
                    right: 10,
                    zIndex: 10,
                    backgroundColor: '#fff',
                    borderRadius: 50,
                  }}>
                  <Icon type="AntDesign" name="edit" />
                </TouchableOpacity>
              ) : null}
              {currentUser.image ? (
                <Image
                  style={{
                    width: width * 0.37,
                    height: height * 0.16,
                    borderRadius: 100,
                    alignSelf: 'center',
                  }}
                  source={{uri: currentUser.image}}
                />
              ) : (
                <Image
                  style={{
                    width: width * 0.28,
                    height: height * 0.13,
                    alignSelf: 'center',
                  }}
                  source={currentUser.gender === "male" ? require('../assets/prf.png') : require('../assets/fml.png')}
                />
              )}
            </View>
            <View
              style={{
                marginTop: 10,
                width: width * 0.85,
                height: height * 0.06,
                backgroundColor: 'rgba(22,23,23,0.5)',
                borderRadius: 30,
                alignSelf: 'center',
                alignItems: 'center',
                flexDirection: 'row',
              }}>
              <Text
                style={{
                  marginLeft: 10,
                  width: width * 0.48,
                  height: height * 0.035,
                  //   backgroundColor: 'orange',
                  fontSize: 20,
                  textAlign: 'center',
                  color: 'white',
                }}>
                Charges(per hour)
              </Text>
              {edit ? (
                <TextInput
                  placeholder="add charges"
                  onChangeText={text =>
                    setCurrentUser({...currentUser, charges: text})
                  }
                  value={currentUser.charges}
                  style={{
                    marginLeft: 10,
                    backgroundColor: 'rgba(255,255,255,0.4)',
                    width: width * 0.2,
                    // height: height * 0.035,
                    alignItems: 'center',
                    justifyContent: 'center',
                    //   backgroundColor: 'orange',
                    fontSize: 22,
                    textAlign: 'center',
                    color: 'white',
                  }}
                />
              ) : (
                <Text
                  style={{
                    marginLeft: 10,
                    width: width * 0.2,
                    height: height * 0.035,
                    //   backgroundColor: 'orange',
                    fontSize: 22,
                    textAlign: 'center',
                    color: 'white',
                  }}>
                  $ {currentUser.charges}
                </Text>
              )}
            </View>
          </View>
        </View>
        {
          currentUser.type === 'teacher' ?
        <View
          style={{
            marginTop: 10,
            width: width * 0.92,
            height: height * 0.05,
            backgroundColor: 'rgba(22,23,23,0.5)',
            alignSelf: 'flex-end',
            alignItems: 'center',
            flexDirection: 'row',
            borderBottomLeftRadius: 30,
            borderTopLeftRadius: 30,
          }}>
          <Text
            style={{
              marginLeft: 5,
              width: width * 0.45,
              height: height * 0.05,
              // backgroundColor: 'orange',
              fontSize: 30,
              fontWeight: 'bold',
              textAlign: 'center',
              color: 'white',
            }}>
            Experience:
          </Text>
          {edit ? (
            <TextInput
              placeholder="Add experience"
              onChangeText={text =>
                setCurrentUser({...currentUser, experience: text})
              }
              value={currentUser.experience}
              style={{
                marginLeft: 10,
                height: height * 0.05,
                backgroundColor: 'rgba(255,255,255,0.4)',
                width: width * 0.4,
                // height: height * 0.035,
                alignItems: 'center',
                justifyContent: 'center',
                //   backgroundColor: 'orange',
                fontSize: 15,
                textAlign: 'center',
                color: 'white',
              }}
            />
          ) : (
            <Text
              style={{
                marginLeft: 5,
                width: width * 0.4,
                height: height * 0.035,
                // backgroundColor: 'orange',
                fontSize: 22,
                fontWeight: 'bold',
                textAlign: 'center',
                color: 'white',
              }}>
              {currentUser.experience}
            </Text>
          )}
        </View>
          :
          null
        }
         <View
          style={{
            marginTop: 10,
            width: width * 0.92,
            height: height * 0.05,
            backgroundColor: 'rgba(22,23,23,0.5)',
            alignSelf: 'flex-end',
            alignItems: 'center',
            flexDirection: 'row',
            borderBottomLeftRadius: 30,
            borderTopLeftRadius: 30,
          }}>
          <Text
            style={{
              marginLeft: 5,
              width: width * 0.4,
              height: height * 0.05,
              // backgroundColor: 'orange',
              fontSize: 30,
              fontWeight: 'bold',
              textAlign: 'center',
              color: 'white',
            }}>
            Description:
          </Text>
          {edit ? (
            <TextInput
              placeholder="Add Description"
              onChangeText={text =>
                setCurrentUser({...currentUser, description: text})
              }
              value={currentUser.description}
              style={{
                marginLeft: 10,
                backgroundColor: 'rgba(255,255,255,0.4)',
                width: 'auto',
                height: height * 0.05,
                // height: height * 0.035,
                alignItems: 'center',
                justifyContent: 'center',
                //   backgroundColor: 'orange',
                fontSize: 15,
                textAlign: 'center',
                color: 'white',
              }}
            />
          ) : (
            <Text
              style={{
                marginLeft: 1,
                width: width * 0.5,
                height: height * 0.035,
                // backgroundColor: 'orange',
                fontSize: 22,
                fontWeight: 'bold',
                textAlign: 'center',
                color: 'white',
              }}>
              {currentUser.description}
            </Text>
          )}
        </View>
        <View
          style={{
            marginTop: 10,
            width: width * 0.92,
            height: height * 0.05,
            backgroundColor: 'rgba(22,23,23,0.5)',
            alignSelf: 'flex-end',
            alignItems: 'center',
            flexDirection: 'row',
            borderBottomLeftRadius: 30,
            borderTopLeftRadius: 30,
          }}>
          <Text
            style={{
              marginLeft: 5,
              width: width * 0.4,
              height: height * 0.05,
              // backgroundColor: 'orange',
              fontSize: 30,
              fontWeight: 'bold',
              textAlign: 'center',
              color: 'white',
            }}>
            Location:
          </Text>
          {edit ? (
            <TextInput
              placeholder="Add location"
              onChangeText={text =>
                setCurrentUser({...currentUser, location: text})
              }
              value={currentUser.location}
              style={{
                marginLeft: 10,
                backgroundColor: 'rgba(255,255,255,0.4)',
                width: 'auto',
                height: height * 0.05,
                // height: height * 0.035,
                alignItems: 'center',
                justifyContent: 'center',
                //   backgroundColor: 'orange',
                fontSize: 15,
                textAlign: 'center',
                color: 'white',
              }}
            />
          ) : (
            <Text
              style={{
                marginLeft: 1,
                width: width * 0.5,
                height: height * 0.035,
                // backgroundColor: 'orange',
                fontSize: 22,
                fontWeight: 'bold',
                textAlign: 'center',
                color: 'white',
              }}>
              {currentUser.location}
            </Text>
          )}
        </View>

        {/* //lk */}

        <View
          style={{
            marginTop: 10,
            width: width * 0.92,
            height: height * 0.05,
            backgroundColor: 'rgba(22,23,23,0.5)',
            alignSelf: 'flex-end',
            alignItems: 'center',
            flexDirection: 'row',
            borderBottomLeftRadius: 30,
            borderTopLeftRadius: 30,
          }}>
          <Text
            style={{
              marginLeft: 5,
              width: width * 0.4,
              height: height * 0.05,
              // backgroundColor: 'orange',
              fontSize: 30,
              fontWeight: 'bold',
              textAlign: 'center',
              color: 'white',
            }}>
            Contact:
          </Text>
          {edit ? (
            <TextInput
              placeholder="Add contact"
              onChangeText={text =>
                setCurrentUser({...currentUser, contact: text})
              }
              value={currentUser.contact}
              style={{
                marginLeft: 10,
                backgroundColor: 'rgba(255,255,255,0.4)',
                width: 'auto',
                height: height * 0.05,
                // height: height * 0.035,
                alignItems: 'center',
                justifyContent: 'center',
                //   backgroundColor: 'orange',
                fontSize: 15,
                textAlign: 'center',
                color: 'white',
              }}
            />
          ) : (
            <Text
              style={{
                marginLeft: 1,
                width: width * 0.5,
                height: height * 0.035,
                // backgroundColor: 'orange',
                fontSize: 22,
                fontWeight: 'bold',
                textAlign: 'center',
                color: 'white',
              }}>
              {currentUser.contact}
            </Text>
          )}
        </View>

        {/* kjh */}
        <View
          style={{
            marginTop: 10,
            width,
            height: height * 0.1,
            //   backgroundColor: 'rgba(22,23,23,0.5)',
            alignSelf: 'center',
            alignItems: 'center',
            flexDirection: 'row',
          }}>
          <View
            style={{
              marginLeft: 10,
              width: width * 0.45,
              height: height * 0.09,
              backgroundColor: 'rgba(255, 224, 178, 0.5)',
              flexDirection: 'column',
              shadowColor: 'rgba(22,23,23,0.5)',
              shadowOffset: {width: 7, height: 7},
              elevation: 3,
              shadowOpacity: 5,
            }}>
            <Text
              style={{
                marginTop: 2,
                width: width * 0.4,
                height: height * 0.04,
                //   backgroundColor: 'orange',
                textAlign: 'center',
                fontWeight: 'bold',
                fontSize: 25,
                alignSelf: 'center',
              }}>
              Gender:
            </Text>
            {edit ? (
              <TextInput
                placeholder="add gender"
                onChangeText={text =>
                  setCurrentUser({...currentUser, gender: text})
                }
                value={currentUser.gender}
                style={{
                  alignSelf: 'center',
                  marginLeft: 10,
                  // backgroundColor: 'rgba(255,255,255,0.4)',
                  width: width * 0.44,
                  marginTop: -10,
                  fontWeight: 'bold',
                  // height: height * 0.035,
                  alignItems: 'center',
                  justifyContent: 'center',
                  //   backgroundColor: 'orange',
                  fontSize: 22,
                  textAlign: 'center',
                  color: '#000',
                }}
              />
            ) : (
              <Text
                style={{
                  marginTop: 3,
                  width: width * 0.4,
                  height: height * 0.04,
                  //   backgroundColor: 'orange',
                  textAlign: 'center',
                  fontWeight: 'bold',
                  fontSize: 25,
                  alignSelf: 'center',
                }}>
                {currentUser.gender}
              </Text>
            )}
          </View>
          <View
            style={{
              marginLeft: 10,
              width: width * 0.45,
              height: height * 0.09,
              backgroundColor: 'rgba(255, 224, 178, 0.5)',
              flexDirection: 'column',
              shadowColor: 'rgba(22,23,23,0.5)',
              shadowOffset: {width: 7, height: 7},
              elevation: 3,
              shadowOpacity: 5,
            }}>
            <Text
              style={{
                marginTop: 2,
                width: width * 0.4,
                height: height * 0.04,
                //   backgroundColor: 'orange',
                textAlign: 'center',
                fontWeight: 'bold',
                fontSize: 25,
                alignSelf: 'center',
              }}>
              Subjects:
            </Text>
            {edit ? (
              <TextInput
                placeholder="add subjects"
                onChangeText={text =>
                  setCurrentUser({...currentUser, subjects: text})
                }
                value={currentUser.subjects}
                style={{
                  alignSelf: 'center',
                  marginLeft: 10,
                  // backgroundColor: 'rgba(255,255,255,0.4)',
                  width: width * 0.44,
                  marginTop: -10,
                  fontWeight: 'bold',
                  // height: height * 0.035,
                  alignItems: 'center',
                  justifyContent: 'center',
                  //   backgroundColor: 'orange',
                  fontSize: 22,
                  textAlign: 'center',
                  color: '#000',
                }}
              />
            ) : (
              <Text
                style={{
                  padding: 6,
                  marginTop: 1,
                  width: width * 0.45,
                  height: height * 0.044,
                  //   backgroundColor: 'orange',
                  textAlign: 'center',
                  fontWeight: 'bold',
                  fontSize: 18,
                  alignSelf: 'center',
                }}>
                {currentUser.subjects}
              </Text>
            )}
          </View>
        </View>
        <View
          style={{
            marginTop: 5,
            width,
            height: height * 0.22,
            //   backgroundColor: 'pink',
            alignSelf: 'center',
            flexDirection: 'column',
          }}>
          <Text
            style={{
              width: width * 0.5,
              height: height * 0.05,
              // backgroundColor: 'white',
              textAlign: 'center',
              fontSize: 30,
              fontWeight: 'bold',
            }}>
            Education :
          </Text>

          {edit ? (
            <TextInput
              style={{
                width: width * 0.98,
                height: height * 0.09,
                // backgroundColor: 'white',
                textAlign: 'center',
                fontSize: 20,
                fontWeight: 'normal',
                alignSelf: 'center',
              }}
              value={currentUser.education}
              onChangeText={text =>
                setCurrentUser({...currentUser, education: text})
              }
            />
          ) : (
            <Text
              style={{
                width: width * 0.98,
                height: height * 0.09,
                // backgroundColor: 'white',
                textAlign: 'center',
                fontSize: 20,
                fontWeight: 'normal',
                alignSelf: 'center',
              }}>
              {currentUser.education}
            </Text>
          )}

          <TouchableOpacity onPress={() => setEdit(!edit)}>
            <LinearGradient
              colors={['#FFF176', '#FFC107', '#FF9800']}
              style={{
                // marginTop: 10,
                width: width * 0.7,
                height: height * 0.06,
                flexDirection: 'row',
                alignItems: 'center',
                alignContent: 'center',
                justifyContent: 'center',
                alignSelf: 'center',
                borderRadius: 25,
              }}>
              <Text
                style={{
                  fontSize: height * 0.035,
                  fontWeight: 'bold',
                  color: 'white',
                }}>
                {edit ? 'CANCEL' : 'EDIT'}
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
        <Toast ref={ref => Toast.setRef(ref)} />
      </View>
    </KeyboardAwareScrollView>
  );
}

export default ProfilePage;
