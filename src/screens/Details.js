import React, {useState, useEffect} from 'react';
import {
  Dimensions,
  SafeAreaView,
  View,
  Share,
  Linking,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Image,
} from 'react-native';
import _ from 'lodash';
import EntypoIcon from 'react-native-vector-icons/Feather';
import SharedIcon from 'react-native-vector-icons/Entypo';
import AntIcon from 'react-native-vector-icons/AntDesign';
import LinearGradient from 'react-native-linear-gradient';
import {CurrentUser, getAllUsersController} from '../controllers';
import {Icon} from 'native-base';

const {width, height} = Dimensions.get('window');

const Details = props => {
  const [users, setUsers] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [currentUser, setCurrentUser] = useState({});
  useEffect(() => {
    getAllUsersController(result => {
      setUsers(result);
    });
    CurrentUser(result => {
      console.log(result,'result')
      setCurrentUser(result);
    });
  }, []);

  const getFilterConfirm = filterName => {
    if (filterName === selectedFilter) {
      return true;
    } else {
      return false;
    }
  };

  const filteredUsers = users => {
    if (currentUser.type === 'teacher') {
      const allStudents = _.filter(users, e => e.type !== 'teacher');
      return allStudents;
    }
    if (currentUser.type === 'student') {
      const allTeachers = _.filter(users, e => e.type !== 'student');
      return allTeachers;
    }
  };

  const getContactedUsers = () => {
    // const presentUser = users.find((e) => e.id === currentUser.id)
    // console.log(presentUser,'present user')
    return users.filter(e => currentUser.sentRequests.includes(e.id));
  };

  const filteredUsersData = users => {
    switch (selectedFilter) {
      case 'all':
        return filteredUsers(users);
      case 'new':
        return filteredUsers(_.take(users, 5).reverse());
      case 'contacted':
        return getContactedUsers()
      // return _.filter(users, (e) => e.)
      default:
        return []
    }
  };

  const Data = ({item, index}) => {
    return (
      <View
      // onPress={() => props.navigation.navigate('ProfilePage')}
      >
        <View style={styles.item}>
          <View style={styles.upView}>
            {item.image ? (
              <Image
                style={{height: 50, width: 50, marginLeft: 20}}
                source={{uri: item.image}}
              />
            ) : item.gender === 'male' ? (
              <Image
                style={{height: 50, width: 50, marginLeft: 20}}
                source={require('../assets/prf.png')}
              />
            ) : (
              <Image
                style={{height: 50, width: 50, marginLeft: 20}}
                source={require('../assets/fml.png')}
              />
            )}

            <View styles={styles.nameView}>
              <Text style={styles.nameTextStyle}>{item.name}</Text>
            </View>
            <TouchableOpacity
              onPress={() =>
                props.navigation.navigate('ShowDetails', {
                  data: item,
                  currentUser: currentUser,
                })
              }
              style={{
                position: 'absolute',
                top: height * 0.02,
                right: width * 0.05,
              }}>
              <Icon type="Entypo" name="arrow-right" />
            </TouchableOpacity>
          </View>

          <View style={styles.viewType}>
            <View style={styles.leftView}>
              <Text style={styles.rateTextStyle}>Rate</Text>
              <Text style={styles.rateTextStyle}>Info</Text>
              <Text style={styles.rateTextStyle}>{item.gender}</Text>
              <Text style={styles.chrgeTextStyle}>$ {item.charges}/hr</Text>
            </View>
            <View style={styles.rightView}>
              <View style={styles.rightIcon}>
                <Text style={styles.info}>{item.subjects}</Text>
                {/* <TouchableOpacity >
                  <SharedIcon
                    name="check"
                    style={{
                      marginLeft: 5,
                      fontSize: height * 0.03,
                      color: 'black',
                    }}
                  />
                </TouchableOpacity> */}
              </View>
              <View style={styles.rightIcon}>
                <Text style={styles.QualifInfo}>Qualification:</Text>
                <Text style={styles.QualificationText}>{item.education}</Text>
              </View>
              <View style={styles.rightIcon}>
                <Text style={styles.QualifInfo}>Study Mode:</Text>
                <Text style={styles.QualificationText}>
                  {item.modeOfTeaching}
                </Text>
              </View>
              <View style={styles.shareIcon}>
                <Text style={styles.info}></Text>
                {/* <TouchableOpacity>
                  <EntypoIcon
                    name="share"
                    style={{
                      marginLeft: 5,
                      fontSize: height * 0.04,
                      color: 'black',
                    }}
                  />
                </TouchableOpacity> */}
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  };
  console.log(filteredUsersData(users), 'filtered users')
  return (
    <View>
      <View
        style={{
          marginTop: height * 0.04,
          width: width * 1,
          height: height * 0.06,
          alignItems: 'center',
          flexDirection: 'row',
          justifyContent: 'space-between',
          //   backgroundColor: 'pink',
        }}>
        <View>
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
            All Details
          </Text>
        </View>
        <View></View>
      </View>
      <View
        style={{
          height: height * 0.05,
          width: width * 0.95,
          alignSelf: 'center',
          backgroundColor: 'gray',
          justifyContent: 'space-around',
          flexDirection: 'row',
        }}>
        <TouchableOpacity
          onPress={() => setSelectedFilter('all')}
          style={{height: height * 0.05, justifyContent: 'center'}}>
          <Text
            style={{
              textAlign: 'center',
              fontWeight: 'bold',
              color: getFilterConfirm('all') ? '#FFC107' : '#fff',
              fontSize: height * 0.024,
            }}>
            All
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setSelectedFilter('new')}
          style={{height: height * 0.05, justifyContent: 'center'}}>
          <Text
            style={{
              textAlign: 'center',
              fontWeight: 'bold',
              color: getFilterConfirm('new') ? '#FFC107' : '#fff',
              fontSize: height * 0.024,
            }}>
            New
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setSelectedFilter('contacted')}
          style={{height: height * 0.05, justifyContent: 'center'}}>
          <Text
            style={{
              textAlign: 'center',
              fontWeight: 'bold',
              color: getFilterConfirm('contacted') ? '#FFC107' : '#fff',
              fontSize: height * 0.024,
            }}>
            Contacted
          </Text>
        </TouchableOpacity>
      </View>

      <View style={{height: height * 0.75}}>
        {
          _.size(filteredUsers(users)) ?

          <FlatList
            data={filteredUsersData(users)}
            renderItem={Data}
            keyExtractor={(item, index) => index.toString()}
          />
          :
          <View style={{height: height * 0.8, width: width, alignItems:'center', justifyContent:'center'}}>
              <Text style={{fontWeight:'bold', fontSize: height * 0.04}}> No Data </Text>
          </View>

        }
      </View>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    height: height,
    width: width,
  },
  upView: {
    marginTop: -5,
    width: width * 0.923,
    height: height * 0.07,
    backgroundColor: '#FFC107',
    alignSelf: 'center',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },

  nameView: {
    width: width * 0.55,
    height: height * 0.1,
    backgroundColor: 'white',
    alignItems: 'center',
    // alignSelf: 'center',
  },
  nameTextStyle: {
    fontWeight: 'bold',
    // backgroundColor: 'green',
    textAlign: 'center',
    fontSize: 25,
    color: 'white',
  },

  item: {
    height: height * 0.25,
    backgroundColor: 'rgba(255, 224, 178, 0.7)',
    padding: 5,
    marginVertical: 10,
    marginHorizontal: 15,
    // flexDirection: 'column',
    alignItems: 'center',
    borderRadius: 20,
  },
  title: {
    backgroundColor: 'pink',
    width: width * 0.55,
    height: height * 0.04,
  },
  viewType: {
    // backgroundColor: 'yellow',
    width: width * 0.925,
    height: height * 0.18,
    flexDirection: 'row',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  leftView: {
    width: width * 0.2,
    height: height * 0.18,
    backgroundColor: '#FF9800',
    borderBottomLeftRadius: 20,
    flexDirection: 'column',
    // alignItems:'center'
  },

  rateTextStyle: {
    marginTop: 5,
    width: width * 0.17,
    height: height * 0.037,
    // backgroundColor: 'yellow',
    alignSelf: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 2,
    // borderRadius: 5,
    borderWidth: 1,
  },

  chrgeTextStyle: {
    marginTop: 8,
    width: width * 0.17,
    height: height * 0.037,
    // backgroundColor: 'yellow',
    alignSelf: 'center',
    fontSize: 20,
    fontWeight: 'normal',
    textAlign: 'center',
    padding: 1,
  },

  rightView: {
    width: width * 0.725,
    height: height * 0.18,
    // backgroundColor: 'white',
    borderBottomRightRadius: 20,
    flexDirection: 'column',
  },

  rightIcon: {
    marginTop: 2,
    marginLeft: 5,
    width: width * 0.7,
    height: height * 0.046,
    // backgroundColor: 'yellow',
    alignItems: 'center',
    flexDirection: 'row',
  },

  shareIcon: {
    marginTop: -13,
    marginLeft: 5,
    width: width * 0.68,
    height: height * 0.046,
    // backgroundColor: 'yellow',
    alignItems: 'center',
    flexDirection: 'row',
  },

  info: {
    fontSize: 22,
    fontWeight: 'bold',
    // backgroundColor:'pink',
    color: 'red',
    width: width * 0.58,
  },

  QualifInfo: {
    fontSize: 18,
    fontWeight: 'bold',
    //  backgroundColor:'pink',
    color: 'red',
    width: width * 0.37,
  },

  QualificationText: {
    fontWeight: 'bold',
    fontSize: 20,
  },

  ageType: {
    marginTop: 1,
    backgroundColor: 'pink',
    width: width * 0.56,
    height: height * 0.04,
    fontSize: 22,
    textAlign: 'center',
  },
});

export default Details;
