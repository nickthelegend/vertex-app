import React,{ useState,useEffect }from "react";
import { View, Text, TouchableOpacity,Image } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { ProgressSteps, ProgressStep } from "react-native-progress-steps";
import { SafeAreaView } from "react-native-safe-area-context";
import TextFieldPersonal from "../components/TextFieldPersonalInformation";
import { Picker } from '@react-native-picker/picker';
import VerificationScreen from "./VerificationScreen";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { Camera } from 'expo-camera';
import { updateUserInfo } from "../utils/FireBaseFunctions";

export default function AccountDetails() {

    const [selectedImage, setSelectedImage] = useState(null);
    const [hasCameraPermission, setHasCameraPermission] = useState(null);
    const [hasGalleryPermission, setHasGalleryPermission] = useState(null);
  
    useEffect(() => {
      (async () => {
        const cameraPermission = await Camera.requestCameraPermissionsAsync();
        const galleryPermission = await ImagePicker.requestMediaLibraryPermissionsAsync();
  
        setHasCameraPermission(cameraPermission.status === 'granted');
        setHasGalleryPermission(galleryPermission.status === 'granted');
      })();
    }, []);
    
    const openCamera = async () => {
      if (!hasCameraPermission) {
        alert('Camera permission required!');
        return;
      }
  
      let result = await ImagePicker.launchCameraAsync({ allowsEditing: true,quality:1 });
  
      if (!result.canceled) {
        setSelectedImage(result.assets[0].uri);
      }
    };
  
    const openPicker = async () => {
      if (!hasGalleryPermission) {
        alert('Gallery permission required!');
        return;
      }
  
      let result = await ImagePicker.launchImageLibraryAsync({ allowsEditing: true });
  
      if (!result.canceled) {
        setSelectedImage(result.uri);
      }
    };
  
    useEffect(() => {
      // This effect runs every time selectedImage changes
      console.log(selectedImage);
    }, [selectedImage]);

    const [fullName, setFullName] = useState('');
    const [streetAddress, setStreetAddress] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [postalCode, setPostalCode] = useState('');  
    const [department, setDepartment] = useState('');
    const [course, setCourse] = useState('');
  const [courseType, setCourseType] = useState('');
  const [yearOfStudy, setYearOfStudy] = useState('');
  const [graduationYear, setGraduationYear] = useState('');

  const handleDepartmentChange = (value) => {
    setDepartment(value);
  };
  const handleCourseChange = (value) => {
    setCourse(value);
  };
  const handleCourseTypeChange = (value) => {
    setCourseType(value);
  };

  const handleYearOfStudyChange = (value) => {
    setYearOfStudy(value);
  };

  const handleGraduationYearChange = (value) => {
    setGraduationYear(value);
  };


  const submitData = async()=> {

    const isNotEmpty = (value) => value.trim() !== '';
  const isAlphaNumeric = (value) => /^[a-zA-Z0-9\s]*$/.test(value);

  // if (!isNotEmpty(fullName)) {
  //   console.error('Full Name is required');
  //   return false;
  // }
  // if (!isNotEmpty(streetAddress)) {
  //   console.error('Street Address is required');
  //   return false;
  // }
  // if (!isNotEmpty(city)) {
  //   console.error('City is required');
  //   return false;
  // }
  // if (!isNotEmpty(state)) {
  //   console.error('State is required');
  //   return false;
  // }
  // if (!isNotEmpty(postalCode)) {
  //   console.error('Postal Code is required');
  //   return false;
  // }

  // if (!isAlphaNumeric(department)) {
  //   console.error('Department should be alphanumeric');
  //   return false;
  // }
  // if (!isAlphaNumeric(course)) {
  //   console.error('Course should be alphanumeric');
  //   return false;
  // }
  // if (!isAlphaNumeric(courseType)) {
  //   console.error('Course Type should be alphanumeric');
  //   return false;
  // }
  // if (!isAlphaNumeric(yearOfStudy)) {
  //   console.error('Year of Study should be alphanumeric');
  //   return false;
  // }
  // if (!isAlphaNumeric(graduationYear)) {
  //   console.error('Graduation Year should be alphanumeric');
  //   return false;
  // }

  const userInfo = {
    fullName,
    streetAddress,
    city,
    state,
    postalCode,
    department,
    course,
    courseType,
    yearOfStudy,
    graduationYear,
    // Add other fields as needed
  };

  try {
    // Call the updateUserInfo function to update the user's information in the database
    await updateUserInfo(userInfo);
    console.log('User information updated successfully');
  } catch (error) {
    console.error('Error updating user information:', error);
  }

  }

  const buttonTextStyle = {
    color: "#fff",
  };
  const progressStepsStyle = {
    activeLabelFontSize: 15,
    labelFontSize: 15,
    activeStepIconColor: "#1F41BB",
    activeStepNumColor: "#fff",
    activeStepIconBorderColor: "#2858ff",
    completedProgressBarColor: "#1F41BB",
    completedStepIconColor: "#1F41BB",
    activeLabelColor: "#1F41BB",
    // isComplete: true
  };
    const nextBtnStyle= {
    backgroundColor:'#1e41bc',
    // padding:20,
    paddingHorizontal:50,
    padding: 20,
    borderRadius:20,
    marginRight:-20
    }

    const previousBtnStyle= {
        backgroundColor:'#1e41bc',
        // padding:20,
        paddingHorizontal:50,
        padding: 20,
        borderRadius:20,
        marginLeft:-20
        }

        
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <ProgressSteps {...progressStepsStyle}>
          <ProgressStep
            label="Step 1"
            nextBtnTextStyle={buttonTextStyle}
            previousBtnTextStyle={buttonTextStyle}
            labelFontSize={20}
            nextBtnStyle={nextBtnStyle}
            // Increase font size here
          >
            <View style={{ marginLeft: 20, paddingBottom:10}}>
              {/* <View></View> */}

              <Text style={{ fontSize: 30, fontFamily: "Poppins-SemiBold" }}>
                Personal Information
              </Text>
              <Text>Please provide your accurate information</Text>

              <View style={{ marginTop: 10 }}>

              <TextFieldPersonal text={"Full Name"} onChange={setFullName} />
      <TextFieldPersonal text={"Street Address"} onChange={setStreetAddress} />
      <TextFieldPersonal text={"City"} onChange={setCity} />
      <TextFieldPersonal text={"State"} onChange={setState} />
      <TextFieldPersonal text={"Postal Code"} onChange={setPostalCode} />
            <Text style={{marginTop:20,
                fontStyle:"italic"
            }}>By continuing, you acknowledge that Vertex will handle your information as set out in the <Text style={{textDecorationLine :'underline',color: 'blue',}}>Privacy Policy</Text> including why we collect it, how we use it and your rights.</Text>



              </View>
            </View>
          </ProgressStep>
          <ProgressStep
            label="Step 2"
            nextBtnTextStyle={buttonTextStyle}
            previousBtnTextStyle={buttonTextStyle}
            previousBtnStyle={previousBtnStyle}
            nextBtnStyle={nextBtnStyle}
            labelFontSize={20} // Increase font size here
          >
            <View style={{ marginLeft: 20, paddingBottom: 10 }}>
      <Text style={{ fontSize: 30, fontFamily: "Poppins-SemiBold" }}>
        Education Information
      </Text>
      <Text>Please provide your accurate information</Text>

      <View style={{ marginTop: 10 }}>

      <Text style={styles.subtitle}>Course</Text>
        <Picker
          selectedValue={course}
          onValueChange={(itemValue) => handleCourseChange(itemValue)}
        >
          <Picker.Item label="Select Course" value="" />
          
          <Picker.Item label="B.Tech" value="B.Tech" />
          <Picker.Item label="M.Tech" value="M.Tech" />
          {/* Add more course types as needed */}
          <Picker.Item label="BBA (Bachelor of Business Administration)" value="BBA" />
          <Picker.Item label="MBA (Master of Business Administration)" value="MBA" />
          
        </Picker>
        <Text style={styles.subtitle}>Department</Text>
        <Picker
          selectedValue={department}
          onValueChange={(itemValue) => handleDepartmentChange(itemValue)}
        >
          <Picker.Item label="Select Department" value="" />
          <Picker.Item label="CSE (Computer Science Engineering)" value="CSE (Computer Science Engineering)" />
          <Picker.Item label="CSM (Computer Science Engineering AI/ML)" value="CSM (Computer Science Engineering AI/ML)" />
          <Picker.Item label="CSC (Computer Science Engineering Cyber Security)" value="CSC (Computer Science Engineering Cyber Security)" />
          <Picker.Item label="ECE (Electronics & Communications Engineering)" value="Electrical Engineering" />
          
          <Picker.Item label="EEE (Electrical & Electronics Engineering)" value="EEE" />
          <Picker.Item label="Chemical Engineering" value="Chemical Engineering" />
          <Picker.Item label="Mechanical Engineering" value="Mechanical Engineering" />
          <Picker.Item label="Civil Engineering" value="Civil Engineering" />
          {/* Add more departments as needed */}
        </Picker>

        <Text style={{ marginTop: 10,...styles.subtitle }}>Course Type</Text>
        <Picker
          selectedValue={courseType}
          onValueChange={(itemValue) => handleCourseTypeChange(itemValue)}
        >
          <Picker.Item label="Select Course Type" value="" />
          <Picker.Item label="Regular" value="Regular" />
          <Picker.Item label="IDP/IDMP" value="IDP/IDMP" />
        </Picker>

        {courseType === 'IDP/IDMP' && (
          <View>
            <Text style={{ marginTop: 10,...styles.subtitle }}>Year of Study</Text>
            <Picker
              selectedValue={yearOfStudy}
              onValueChange={(itemValue) => handleYearOfStudyChange(itemValue)}
            >
              <Picker.Item label="Select Year of Study" value="" />
              {[1, 2, 3, 4, 5].map((year) => (
                <Picker.Item key={year} label={`${year} Year`} value={year} />
              ))}
            </Picker>
          </View>
        )}
        {courseType === 'Regular' && (
          <View>
            <Text style={{ marginTop: 10,...styles.subtitle }}>Year of Study</Text>
            <Picker
              selectedValue={yearOfStudy}
              onValueChange={(itemValue) => handleYearOfStudyChange(itemValue)}
            >
              <Picker.Item label="Select Year of Study" value="" />
              {[1, 2, 3, 4].map((year) => (
                <Picker.Item key={year} label={`${year} Year`} value={year} />
              ))}
            </Picker>
          </View>
        )}
        <Text style={{ marginTop: 10,...styles.subtitle }}>Graduation Year</Text>
        <Picker
          selectedValue={graduationYear}
          onValueChange={(itemValue) => handleGraduationYearChange(itemValue)}
        >
          <Picker.Item label="Select Graduation Year" value="" />
          {Array.from({ length: 10 }, (_, i) => 2020 + i).map((year) => (
            <Picker.Item key={year} label={`${year}`} value={year} />
          ))}
        </Picker>

        <Text style={{ marginTop: 20, fontStyle: "italic" }}>
          By continuing, you acknowledge that Vertex will handle your information as set out in the 
          <Text style={{ textDecorationLine: 'underline', color: 'blue' }}> Privacy Policy</Text> including why we collect it, how we use it and your rights.
        </Text>
      </View>
    </View>
          </ProgressStep>
          <ProgressStep
            label="Step 3"
            nextBtnTextStyle={buttonTextStyle}
            previousBtnTextStyle={buttonTextStyle}
            labelFontSize={20} // Increase font size here
            previousBtnStyle={previousBtnStyle}
            nextBtnStyle={nextBtnStyle}
            onSubmit={submitData}
          >
              <View style={{ marginLeft: 20, paddingBottom: 10 }}>
        <Text style={{ fontSize: 30 ,fontFamily: "Poppins-SemiBold"}}>Upload Document</Text>

        <Text>Student ID Card</Text>

        {selectedImage && <View style={{justifyContent:"center",alignItems:"center"}}>
        
        
        <Image source={{ uri: selectedImage }} style={{ width: 300, height: 400, marginTop: 20,resizeMode:"contain" }}
        
        
         />
        </View>
        }
      {!selectedImage && <TouchableOpacity onPress={openCamera}>

      <View style={{
        borderWidth: 1,
borderColor: '#bbbbbb', // Set border color to transparent
borderStyle: 'dashed', // Set border style to dashed
borderRadius: 0, // Set border radius to 0 for sharp edges
padding: 10, // Optional: Set padding
borderWidth:2,
marginRight:20,
marginTop:10,
// paddingHorizontal:30,
paddingHorizontal:30,
paddingVertical:20,
flexDirection:'row',
justifyContent:'space-between'

        }}
        
        
        >

        <Text style={{
          fontSize:20,
          color: '#868686',
          // fontFamily:''
        }}>Clear here to open camera</Text>
        <MaterialCommunityIcons name="upload" size={24} color="#868686" />

        </View>
      </TouchableOpacity>}

      {selectedImage&& <TouchableOpacity onPress={openCamera}>

<View style={{
  borderWidth: 1,
// borderColor: '#bbbbbb', // Set border color to transparent
// borderStyle: 'dashed', // Set border style to dashed
borderRadius: 20, // Set border radius to 0 for sharp edges
// padding: 10, // Optional: Set padding
// borderWidth:2,
marginRight:20,
marginTop:10,
backgroundColor: '#1e41be',
// paddingHorizontal:30,
paddingHorizontal:30,
paddingVertical:20,
// justifyContent:'space-between'

  }}
  
  
  >

  <Text style={{
    fontSize:20,
    color: '#fff',
    // fontFamily:''
    textAlign:'center'
  }}>Retake</Text>
  {/* <MaterialCommunityIcons name="upload" size={24} color="#868686" /> */}

  </View>
</TouchableOpacity>}
       {/* <View>

        <Text style={{
          color:'#0d0d0d'
        }}>

          JPG,
        </Text>
       </View> */}
        {/* {selectedImage && <View>
        
        
        <Image source={{ uri: selectedImage }} style={{ width: 300, height: 400, marginTop: 20,resizeMode:"contain" }}
        
        
         />
        <TouchableOpacity onPress={openCamera} style={{ alignItems:"center",marginTop:20 }}>
          <View style={{ borderRadius: 20, padding: 20, backgroundColor: "#1d40bd" }}>
            <Text style={{ color: "#fff", fontSize: 20 }}>Upload</Text>
          </View>
        </TouchableOpacity>
        </View>
        }
        {!selectedImage && <TouchableOpacity onPress={openCamera} style={{ marginTop: 20 }}>
          <View style={{ borderRadius: 20, padding: 20, backgroundColor: "#1d40bd" }}>
            <Text style={{ color: "#fff", fontSize: 20 }}>Open Camera</Text>
          </View>
        </TouchableOpacity>} */}
      </View>
          </ProgressStep>
        </ProgressSteps>
      </View>
    </SafeAreaView>
  );
}


const styles = {
  title: {
    fontSize: 30,
    fontFamily: "Poppins-SemiBold"
  },
  subtitle: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: 'bold'
  }
};
