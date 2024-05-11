import React,{ useState }from "react";
import { View, Text  } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { ProgressSteps, ProgressStep } from "react-native-progress-steps";
import { SafeAreaView } from "react-native-safe-area-context";
import TextFieldPersonal from "../components/TextFieldPersonalInformation";
import { Picker } from '@react-native-picker/picker';

export default function AccountDetails() {


    const [department, setDepartment] = useState('');
  const [courseType, setCourseType] = useState('');
  const [yearOfStudy, setYearOfStudy] = useState('');
  const [graduationYear, setGraduationYear] = useState('');

  const handleDepartmentChange = (value) => {
    setDepartment(value);
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

              <TextFieldPersonal text={"Full Name"}/ >
              <TextFieldPersonal text={"Street Address"}/ >
              <TextFieldPersonal text={"City"}/ >
              <TextFieldPersonal text={"State"}/ >
              <TextFieldPersonal text={"Postal Code"}/ >
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

      <Text style={styles.subtitle}>Course Type</Text>
        <Picker
          selectedValue={courseType}
          onValueChange={(itemValue) => handleCourseTypeChange(itemValue)}
        >
          <Picker.Item label="Select Course Type" value="" />
          
          <Picker.Item label="B.Tech" value="B.Tech" />
          <Picker.Item label="M.Tech" value="M.Tech" />
          {/* Add more course types as needed */}
          <Picker.Item label="BBA (Bachelor of Business Administration)" value="BBA" />
          <Picker.Item label="MBA (Master of Business Administration)" value="MBA" />
          
        </Picker>
        <Text>Department</Text>
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

        <Text style={{ marginTop: 10 }}>Course Type</Text>
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
            <Text style={{ marginTop: 10 }}>Years of Study</Text>
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
            <Text style={{ marginTop: 10 }}>Years of Study</Text>
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
        <Text style={{ marginTop: 10 }}>Graduation Year</Text>
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
          >
            <View style={{ alignItems: "center" }}>
              <Text>This is the content within step 3!</Text>
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
