import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, Dimensions, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from 'expo-image-picker';

const screenWidth = Dimensions.get('window').width;

export default function CreateSellAd() {
  const navigation = useNavigation();
  const [step, setStep] = useState(1);
  const [category, setCategory] = useState(null);
  const [year, setYear] = useState(null);
  const [branch, setBranch] = useState(null);
  const [productName, setProductName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [giveaway, setGiveaway] = useState(false);
  const [condition, setCondition] = useState('');
  const [images, setImages] = useState([]);
  const [userName, setUserName] = useState('');
  const [hostel, setHostel] = useState('');

  const handleNext = () => {
    if (step === 1 && category) {
      setStep(2);
    } else if (step === 2 && productName && description && (price || giveaway) && condition) {
      setStep(3);
    } else if (step === 3 && userName && hostel) {
      // Submit the form
      console.log('Form Submitted', { category, year, branch, productName, description, price, giveaway, condition, images, userName, hostel });
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    } else {
      navigation.goBack();
    }
  };

  const handleYearClick = (selectedYear) => {
    setYear(selectedYear);
  };

  const handleBranchClick = (branch) => {
    setBranch(branch);
  };

  const handleImagePick = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      quality: 1,
    });

    if (!result.canceled) {
      setImages([...images, ...result.assets.slice(0, 3 - images.length)]);
    }
  };

  const handleCategoryClick = (selectedCategory) => {
    if (selectedCategory === 'Resources') {
      setCategory('Books'); // Set category to 'Books' for 'Resources'
    } else {
      setCategory(selectedCategory);
    }
  };

  const isNextDisabled = () => {
    if (step === 1) {
      if (category === 'Misc' || category === 'Gadgets') {
        return !category;
      }
      return !(category && year && branch);
    }
    if (step === 2) {
      return !(productName && description && (price || giveaway) && condition);
    }
    if (step === 3) {
      return !(userName && hostel);
    }
    return false;
  };

  const departments = ['Civil', 'Computer Science', 'Electrical', 'Electronics & Communications', 'Mechanical'];
  const hostels = [
    'Kinnera Hostel', 'Manjeera Hostel', 'Gowthami Hostel', 'International Students Hostel', 'Kamala Nehru Hostel', 'Gayathri Girls Hostel'
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <Ionicons name="arrow-back" size={30} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Create an Ad</Text>
        <View></View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        {step === 1 && (
          <>
            <Text style={styles.stepTitle}>Step 1: Product Category</Text>

            <View style={styles.categoryContainer}>
              {['Books', 'Gadgets', 'Resources', 'Misc'].map((cat) => (
                <TouchableOpacity
                  key={cat}
                  style={[styles.categoryButton, category === cat && styles.selectedCategoryButton]}
                  onPress={() => setCategory(cat)}
                >
                  <Text style={styles.categoryText}>{cat}</Text>
                </TouchableOpacity>
              ))}
            </View>

            {["Books", "Resources"].includes(category) && (
              <>
                <Text style={styles.sectionTitle}>Select Year</Text>
                <View style={styles.yearContainer}>
                  {[1, 2, 3, 4, 5].map((selectedYear) => (
                    <TouchableOpacity
                      key={selectedYear}
                      style={[styles.yearButton, year === selectedYear && styles.selectedYearButton]}
                      onPress={() => handleYearClick(selectedYear)}
                    >
                      <Text style={styles.yearText}>{`${selectedYear} Year`}</Text>
                    </TouchableOpacity>
                  ))}
                </View>

                <Text style={styles.sectionTitle}>Select Branch</Text>
                <View style={styles.branchContainer}>
                  {departments.map((dept) => (
                    <TouchableOpacity
                      key={dept}
                      style={[styles.branchButton, branch === dept && styles.selectedBranchButton]}
                      onPress={() => handleBranchClick(dept)}
                    >
                      <Text style={styles.branchText}>{dept}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </>
            )}

            {["Gadgets",'Misc'].includes(category) && (
              <Text style={styles.sectionTitle}>No additional options required for {category} category</Text>
            )}
          </>
        )}

        {step === 2 && (
          <>
            <Text style={styles.stepTitle}>Step 2: Product Details</Text>

            <TextInput
              style={styles.input}
              placeholder="Product Name"
              value={productName}
              onChangeText={setProductName}
            />

            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Description"
              value={description}
              onChangeText={setDescription}
              multiline
            />

            <View style={styles.priceContainer}>
              <TextInput
                style={[styles.input, { flex: 1 }]}
                placeholder="Price (₹)"
                value={price}
                onChangeText={setPrice}
                keyboardType="numeric"
                editable={!giveaway}
              />
              <TouchableOpacity onPress={() => setGiveaway(!giveaway)} style={styles.checkboxContainer}>
                <Ionicons name={giveaway ? "checkbox" : "square-outline"} size={24} color="#000" />
                <Text style={styles.checkboxText}>Give away for Free</Text>
              </TouchableOpacity>
            </View>

            <Text style={styles.sectionTitle}>Product Condition</Text>
            <View style={styles.conditionContainer}>
              {['Poor', 'Okay', 'Good', 'Like New'].map((cond) => (
                <TouchableOpacity
                  key={cond}
                  style={[styles.conditionButton, condition === cond && styles.selectedConditionButton]}
                  onPress={() => setCondition(cond)}
                >
                  <Text style={styles.conditionText}>{cond}</Text>
                </TouchableOpacity>
              ))}
            </View>

            <Text style={styles.sectionTitle}>Product Images</Text>
            <View style={styles.imagesContainer}>
              {images.map((image, index) => (
                <Image key={index} source={{ uri: image.uri }} style={styles.image} />
              ))}
              {images.length < 3 && (
                <TouchableOpacity onPress={handleImagePick} style={styles.addImageButton}>
                  <Ionicons name="add" size={24} color="#000" />
                </TouchableOpacity>
              )}
            </View>
          </>
        )}

        {step === 3 && (
          <>
            <Text style={styles.stepTitle}>Step 3: Your Details</Text>

            <TextInput
              style={styles.input}
              placeholder="Your Name"
              value={userName}
              onChangeText={setUserName}
            />

            <Text style={styles.sectionTitle}>Select Hostel</Text>
            <View style={styles.branchContainer}>
              {hostels.map((hostelName) => (
                <TouchableOpacity
                  key={hostelName}
                  style={[styles.branchButton, hostel === hostelName && styles.selectedBranchButton]}
                  onPress={() => setHostel(hostelName)}
                >
                  <Text style={styles.branchText}>{hostelName}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </>
        )}
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity onPress={handleBack} style={styles.smallBackButton}>
          <Ionicons name="arrow-back" size={30} color="white" />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.nextButton, isNextDisabled() && styles.disabledButton]}
          onPress={handleNext}
          disabled={isNextDisabled()}
        >
          <Text style={styles.nextButtonText}>{step === 3 ? 'Submit' : 'Next: Product Details'}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#dddddd',
    justifyContent: 'space-between',
  },
  backButton: {
    marginRight: 10,
  },
  headerText: {
    fontSize: 25,
    fontFamily: 'ComfortaaBold',
  },
  scrollViewContainer: {
    flexGrow: 1,
    padding: 20,
  },
  stepTitle: {
    fontSize: 22,
    fontFamily: 'ComfortaaBold',
    marginBottom: 20,
  },
  categoryContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  categoryButton: {
    width: '48%',
    backgroundColor: '#e0e0e0',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 15,
  },
  selectedCategoryButton: {
    backgroundColor: '#1c40bd',
  },
  categoryText: {
    fontSize: 18,
    color: '#000',
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: 'ComfortaaBold',
    marginBottom: 10,
  },
  yearContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  yearButton: {
    width: '48%',
    backgroundColor: '#e0e0e0',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 15,
  },
  selectedYearButton: {
    backgroundColor: '#1c40bd',
  },
  yearText: {
    fontSize: 18,
    color: '#000',
  },
  branchContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  branchButton: {
    width: '48%',
    backgroundColor: '#e0e0e0',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 15,
  },
  selectedBranchButton: {
    backgroundColor: '#1c40bd',
  },
  branchText: {
    fontSize: 18,
    color: '#000',
  },
  input: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ddd',
    fontSize: 16,
    fontFamily: "ComfortaaBold",
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 15,
  },
  checkboxText: {
    fontSize: 18,
    color: '#000',
    marginLeft: 5,
  },
  conditionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  conditionButton: {
    width: '23%',
    backgroundColor: '#e0e0e0',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  selectedConditionButton: {
    backgroundColor: '#1c40bd',
  },
  conditionText: {
    fontSize: 14,
  },
  imagesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  image: {
    width: screenWidth / 3 - 20,
    height: screenWidth / 3 - 20,
    borderRadius: 10,
    marginBottom: 10,
  },
  addImageButton: {
    width: screenWidth / 3 - 20,
    height: screenWidth / 3 - 20,
    borderRadius: 10,
    backgroundColor: '#e0e0e0',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
  smallBackButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#1c40bd',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  nextButton: {
    flex: 1,
    backgroundColor: '#1c40bd',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  nextButtonText: {
    fontSize: 18,
    color: '#fff',
    fontFamily: "ComfortaaBold",
  },
  disabledButton: {
    backgroundColor: '#ddd',
  },
});
