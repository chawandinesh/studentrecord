import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Dimensions,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {Icon, Form, Picker} from 'native-base';
import Popover from 'react-native-popover-view';
import {acceptRequestController, rejectRequestController} from '../controllers';
import Toast from 'react-native-toast-message';
import {ShowToast} from '../Toast';

const {height, width} = Dimensions.get('window');
export default function ShowReceived(props) {
  //   console.log(props.route.params);

  const currentUser = props.route.params.currentUser;
  const data = props.route.params.data;

  const acceptRequest = () => {
    acceptRequestController(currentUser, data);
  };
  const rejectRequest = () => {
    rejectRequestController(currentUser, data);
  };

  const getImage = () => {
    if (data.image) {
      return <Image source={{uri: data.image}} style={styles.profileImage} />;
    } else {
      if (data.gender === 'male') {
        return (
          <Image
            source={require('../assets/prf.png')}
            style={styles.profileImage}
          />
        );
      } else {
        return (
          <Image
            source={require('../assets/fml.png')}
            style={styles.profileImage}
          />
        );
      }
    }
  };

  const Header = () => (
    <View style={styles.header}>
      <TouchableOpacity
        onPress={() => props.navigation.goBack()}
        style={styles.headerLeft}>
        <Icon name="arrow-left" type="Feather" />
      </TouchableOpacity>
      <View style={styles.headerMiddle}>
        <Text style={styles.headerMiddleText}>Details</Text>
      </View>
      <View style={styles.headerRight}>
        {/* <Popover
          from={
            <TouchableOpacity>
              <Icon type="Feather" name="more-vertical" />
            </TouchableOpacity>
          }>
          <View style={styles.popoverContainer}>
            <TouchableOpacity>
              <Text>Contact</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text>Email</Text>
            </TouchableOpacity>
          </View>
        </Popover> */}
      </View>
    </View>
  );
  const Body = () => (
    <View style={styles.bodyContainer}>
      <View style={styles.profileImageContainer}>
        <View style={styles.profileImage}>{getImage()}</View>
      </View>
      <View style={styles.profileNameContainer}>
        <Text style={styles.profileNameText}>{data.name}</Text>
      </View>
      <View style={styles.infoContainer}>
        <View style={styles.infoContainerLeft}>
          <Text style={styles.bodyText}>Qualification: {data.education}</Text>
          <Text style={styles.bodyText}>Subjects: {data.subjects}</Text>
          <Text style={styles.bodyText}>Study Mode: {data.modeOfTeaching}</Text>
        </View>
        <View style={styles.infoContainerRight}>
          <Text style={styles.bodyText}>Rate: $ {data.charges}/hr</Text>
          <Text style={styles.bodyText}>Info: Value</Text>
          <Text style={styles.bodyText}>Gender: {data.gender}</Text>
        </View>
      </View>
    </View>
  );
  const Footer = () => (
    <View style={styles.footerContainer}>
      <TouchableOpacity style={styles.leftFooter} onPress={acceptRequest}>
        <Text style={styles.reqText}>Accept</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.rightFooter} onPress={rejectRequest}>
        <Text style={styles.reqText}>Reject</Text>
      </TouchableOpacity>
    </View>
  );
  return (
    <View style={styles.container}>
      <Header />
      <Body />
      <Footer />
      <Toast ref={ref => Toast.setRef(ref)} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: height,
    width: width,
    backgroundColor: '#fff',
  },
  header: {
    width: width,
    marginTop: height * 0.04,
    height: height * 0.06,
    flexDirection: 'row',
    backgroundColor: '#fff',
  },
  headerLeft: {
    width: width * 0.2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerMiddle: {
    width: width * 0.6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerRight: {
    width: width * 0.2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerMiddleText: {
    fontSize: height * 0.025,
    textAlign: 'center',
  },

  //end headerStyles...
  //start bodyStyles...
  bodyContainer: {
    height: height * 0.75,
    width: width,
    backgroundColor: '#eee',
  },
  bodyText: {
    color: '#fff',
    fontSize: height * 0.032,
  },
  bodyTextOtherValue: {
    fontSize: height * 0.02,
    fontWeight: 'bold',
  },
  profileImageContainer: {
    height: height * 0.2,
    width: width,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileImage: {
    height: height * 0.17,
    borderWidth: 1,
    width: height * 0.17,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: height * 0.17,
    // backgroundColor: '#fff',
  },
  profileNameContainer: {
    height: height * 0.1,
    justifyContent: 'center',
    width: width,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  profileNameText: {
    fontSize: height * 0.035,
    fontWeight: 'bold',
    color: '#FFC107',
  },
  infoContainer: {
    backgroundColor: '#FFC107',
    width: width,
    height: height * 0.4,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  infoContainerLeft: {
    width: width * 0.5,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  infoContainerRight: {
    width: width * 0.5,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  othersContainer: {
    height: height * 0.05,
    backgroundColor: '#fff',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  othersLeft: {
    width: width * 0.5,
    alignItems: 'center',
  },
  othersRight: {
    alignItems: 'center',
    width: width * 0.5,
  },
  //end BodyStyles...
  //start footerStyles...

  footerContainer: {
    height: height * 0.1,
    width: width,
    justifyContent: 'space-around',
    flexDirection: 'row',
    backgroundColor: '#eee',
  },
  leftFooter: {
    alignItems: 'center',
    backgroundColor: 'green',
    borderRadius: height * 0.02,
    justifyContent: 'center',
    width: width * 0.4,
  },
  rightFooter: {
    alignItems: 'center',
    backgroundColor: 'darkred',
    borderRadius: height * 0.02,
    justifyContent: 'center',
    width: width * 0.4,
  },
  reqText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: height * 0.03,
  },
  popoverContainer: {
    height: height * 0.1,
    width: width * 0.3,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
});
