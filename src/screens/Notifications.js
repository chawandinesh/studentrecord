import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {
  List,
  ListItem,
  Thumbnail,
  Left,
  Right,
  Button,
  Body,
  Icon,
} from 'native-base';
import Popover from 'react-native-popover-view';
import {CurrentUser, getAllUsersController} from '../controllers';

const {height, width} = Dimensions.get('window');
export default function Notifications(props) {
  const [allUsers, setAllUsers] = useState([]);
  const [specificUserData, setSpecificUserData] = useState([])
  const [showPopover, setShowPopover] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState('Received');
  const [currentUser, setCurrentUsers] = useState({});
  useEffect(() => {
    getAllUsersController(response => {
      setAllUsers(response);
    });
    CurrentUser(dataRes => {
      setCurrentUsers(dataRes);
    });
  }, []);

  const getAvatar = item => {
    if (item.image) {
      return {uri: item.image};
    } else {
      if (item.gender === 'male') {
        return require('../assets/prf.png');
      } else {
        return require('../assets/fml.png');
      }
    }
  };

  const getSpecificUsers = () => {
    if (selectedStatus === 'Received') {
      return currentUser.hasOwnProperty('receivedRequests') ? allUsers.filter(e => currentUser.receivedRequests.includes(e.id)) : []
    }
    if (selectedStatus === 'Approved') {
      return allUsers.filter(e => currentUser.approvedRequests.includes(e.id));
    }
    if (selectedStatus === 'Rejected') {
      return allUsers.filter(e => currentUser.rejectedRequests.includes(e.id));
    }else{
        return allUsers
    }
  };

  console.log( getSpecificUsers(), selectedStatus)


  const renderData = ({item, index}) => {
    return (
      <List>
        <ListItem thumbnail>
          <Left>
            <Thumbnail square source={getAvatar(item)} />
          </Left>
          <Body>
            <Text>{item.name}</Text>
            <Text note numberOfLines={1}>
              {item.education}
            </Text>
          </Body>
          <Right>
            <Button
              transparent
              onPress={() =>
                props.navigation.navigate('ShowReceived', {
                  data: item,
                  currentUser: currentUser,
                })
              }>
              <Text>View</Text>
            </Button>
          </Right>
        </ListItem>
      </List>
    );
  };

  const getColor = (item) => {
     if(item === selectedStatus){
         return true
     }else{
         return false
     }
  }
  const Header = () => {
    return (
      <View style={styles.header}>
        <View>
        <TouchableOpacity style={styles.headerBtnContainer} onPress={() => setSelectedStatus('Received')}>
              <Text style={styles.headerBtnText}>Received</Text>
          </TouchableOpacity>
        </View>
        <View>
        <TouchableOpacity style={styles.headerBtnContainer} onPress={() => setSelectedStatus('Approved')}>
              <Text style={styles.headerBtnText}>Approved</Text>
          </TouchableOpacity>
        </View>
        <View>
        <TouchableOpacity style={styles.headerBtnContainer} onPress={() => setSelectedStatus('Rejected')}>
              <Text style={styles.headerBtnText}>Rejected</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.requestsListContainer}>
        {getSpecificUsers().length ? (
          <FlatList
            data={getSpecificUsers()}
            keyExtractor={(item, index) => index.toString()}
            renderItem={renderData}
          />
        ) : (
          <View style={styles.noData}>
            <View style={styles.noDataBox}>
              <Text style={styles.noDataText}>No data</Text>
            </View>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: height * 0.1,
    backgroundColor: '#fff',
    alignItems: 'flex-end',
  },
  receivedContacts: {
    fontSize: height * 0.025,
    fontWeight: 'bold',
  },
  bodyContainer: {
    height: height * 0.8,
    width: width,
  },
  container: {
    height: height * 0.9,
    backgroundColor: '#fff',
  },
  noData: {
    height: height * 0.8,
    alignItems: 'center',
    justifyContent: 'center',
    width: width,
  },
  noDataText: {
    fontWeight: 'bold',
    fontSize: height * 0.04,
    color: '#245',
  },
  requestsListContainer: {
    height: height * 0.9,
    backgroundColor: '#fff',
  },
  popoverContainer: {
    height: height * 0.1,
    width: width * 0.3,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  headerBtnContainer: {
      height: height * 0.06,
      width: width * 0.3,
      alignItems:'center',
      justifyContent:'center',
      backgroundColor:'#021',
  },
  headerBtnText: {
      fontWeight:'bold',
      color:'#fff',
      fontSize: height * 0.023,
  }
});
