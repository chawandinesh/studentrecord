import firebaseAuth from '@react-native-firebase/auth';
import firebaseFireStore from '@react-native-firebase/firestore';
import firebaseStorage from '@react-native-firebase/storage';
const userCreateController = async signupData => {
  await firebaseFireStore()
    .collection('users')
    .doc(firebaseAuth().currentUser.uid)
    .set({...signupData, id: firebaseAuth().currentUser.uid, image: ''})
    .then(res => {
      return res;
    })
    .catch(err => {
      return err;
    });
};

const SignupController = async (signupData, callback) => {
  const {email, password} = signupData;
  await firebaseAuth()
    .createUserWithEmailAndPassword(email, password)
    .then(res => {
      userCreateController(signupData)
        .then(res => callback({status: 200, code: null, data: res}))
        .catch(err => callback({status: 404, code: err.code, data: err}));
    })
    .catch(err => {
      callback({status: 404, code: err.code, data: err});
    });
};

const LoginController = async ({email, password}, callback) => {
  await firebaseAuth()
    .signInWithEmailAndPassword(email, password)
    .then(res => {
      callback({status: 200, code: '', data: res});
    })
    .catch(err => {
      callback({status: 404, code: err.code, data: err});
    })
    .finally(e => console.log('executed'));
};

const CurrentUser = async callback => {
  await firebaseFireStore()
    .collection('users')
    .doc(firebaseAuth().currentUser.uid)
    .onSnapshot(docSnap => {
      callback({...docSnap.data(), id: docSnap.id});
    });
};

const GetUserByIdController = (id, callback) => {
  firebaseFireStore()
    .collection('users')
    .doc(id)
    .onSnapshot(docSnap => {
      callback(docSnap.data());
    });
};

const signOutController = async () => {
  await firebaseAuth().signOut();
};

const uploadImageController = async (uri, currentUserId, callback) => {
  const uploadUri = uri.path;
  const response = await fetch(uploadUri);
  const childPath = `profile/${currentUserId}/image`;
  const blob = await response.blob();
  // const task = firebaseStorage().ref().child(childPath).delete()
  const task = firebaseStorage().ref().child(childPath).put(blob);
  const taskProgress = snapshot => {};
  const taskCompleted = () => {
    task.snapshot.ref.getDownloadURL().then(resSnap => {
      callback({status: 200, image: resSnap});
      // setProfileInfo({...profileInfo, image: resSnap});
      // setImage(resSnap);
    });
  };

  const taskError = snapshot => {
    callback({status: 400, error: 'failed to update'});
  };
  task.on('state_changed', taskProgress, taskError, taskCompleted);
};

const ProfileUpdateController = async (data, currentUserId, callback) => {
  await firebaseFireStore()
    .collection('users')
    .doc(currentUserId)
    .update(data)
    .then(res => {
      callback({status: 200, result: res});
    })
    .catch(err => {
      callback({status: 404, error: err});
    });
};

const getAllUsersController = async callback => {
  await firebaseFireStore()
    .collection('users')
    .onSnapshot(querySnap => {
      let allUsers = [];
      querySnap.forEach(e => {
        allUsers.push(e.data());
      });
      callback(allUsers);
    });
};

const sendRequestController = async (currentUser, destUser, callback) => {
  const Receive = () => {
    firebaseFireStore()
      .collection('users')
      .doc(destUser.id)
      .update({
        ...destUser,
        receivedRequests: [...destUser.receivedRequests, currentUser.id],
      });
  };
  const Send = () => {
    firebaseFireStore()
      .collection('users')
      .doc(currentUser.id)
      .update({
        ...currentUser,
        sentRequests: [...currentUser.sentRequests, destUser.id],
      });
  };
  // console.log(GetUserByIdController(currentUser.id), 'userbyid')

  if (
    currentUser.sentRequests.includes(destUser.id) &&
    destUser.receivedRequests.includes(currentUser.id)
  ) {
    console.log('already sent');
    callback({status: 300, message: 'Request sent Already'});
  } else {
    await Promise.all([Send(), Receive()])
      .then(res => {
        callback({status: 200, message: 'Request sent Successfully'});
      })
      .catch(err => {
        callback({status: 400, message: 'Something went wrong'});
      });
  }
};

const cancelRequestController = async (currentUser, destUser, callback) => {
  if (
    currentUser.sentRequests.includes(destUser.id) ||
    destUser.receivedRequests.includes(currentUser.id)
  ) {
    const removeSentReq = firebaseFireStore()
      .collection('users')
      .doc(currentUser.id)
      .update({
        ...currentUser,
        sentRequests: currentUser.sentRequests.filter(e => e !== destUser.id),
      });

    const removeReceivedReq = firebaseFireStore()
      .collection('users')
      .doc(destUser.id)
      .update({
        ...destUser,
        receivedRequests: destUser.receivedRequests.filter(
          e => e !== currentUser.id,
        ),
      });

    await Promise.all([removeSentReq, removeReceivedReq])
      .then(res => {
        callback({status: 200, message: 'Request status updated successfully'});
      })
      .catch(err => {
        callback({status: 400, message: 'Something went wrong'});
      });
  } else {
    callback({status: 300, message: 'No requst found'});
  }
};

const acceptRequestController = async(currentUser, destUser) => {
  if (currentUser.receivedRequests.includes(destUser.id)) {
    const approveAtTeacher = firebaseFireStore()
      .collection('users')
      .doc(currentUser.id)
      .update({
        ...currentUser,
        approvedRequests: [...currentUser.approvedRequests, destUser.id],
        receivedRequests: currentUser.receivedRequests.filter(
          e => e !== destUser.id,
        ),
      });
    const approveAtStudent = firebaseFireStore()
      .collection('users')
      .doc(destUser.id)
      .update({
        ...destUser,
        approvedRequests: [...destUser.approvedRequests, currentUser.id],
        sentRequests: destUser.sentRequests.filter(e => e !== currentUser.id),
      });
    await Promise.all([approveAtStudent, approveAtTeacher])
      .then(res => {
        console.log('approved success');
      })
      .catch(err => {
        console.log('rejected success');
      });
  } else {
    console.log('no request received');
  }
};

const rejectRequestController = async(currentUser, destUser) => {
  if (currentUser.receivedRequests.includes(destUser.id)) {
    const rejectAtTeacher = firebaseFireStore()
      .collection('users')
      .doc(currentUser.id)
      .update({
        ...currentUser,
        rejectedRequests: [...currentUser.rejectedRequests, destUser.id],
        receivedRequests: currentUser.receivedRequests.filter(
          e => e !== destUser.id,
        ),
      });
    const rejectAtStudent = firebaseFireStore()
      .collection('users')
      .doc(destUser.id)
      .update({
        ...destUser,
        rejectedRequests: [...destUser.rejectedRequests, currentUser.id],
        sentRequests: destUser.sentRequests.filter(e => e !== currentUser.id),
      });
    await Promise.all([rejectAtStudent, rejectAtTeacher])
      .then(res => {
        console.log('approved success');
      })
      .catch(err => {
        console.log('rejected success');
      });
  } else {
    console.log('no request received');
  }
};

export {
  SignupController,
  signOutController,
  LoginController,
  CurrentUser,
  ProfileUpdateController,
  uploadImageController,
  getAllUsersController,
  sendRequestController,
  cancelRequestController,
  GetUserByIdController,
  acceptRequestController,
  rejectRequestController,
};
// export const fetchAllUsers = ()
