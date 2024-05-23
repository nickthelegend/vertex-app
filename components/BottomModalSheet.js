// CreatePostModal.js
import React, { useState, useRef, useEffect } from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  Animated,
  StyleSheet,
  Dimensions
} from 'react-native';

const { height } = Dimensions.get('window');

const CreatePostModal = ({ visible, onClose }) => {
  const [showModal, setShowModal] = useState(visible);
  const slideAnim = useRef(new Animated.Value(height)).current;

  useEffect(() => {
    if (visible) {
      setShowModal(true);
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(slideAnim, {
        toValue: height,
        duration: 300,
        useNativeDriver: true,
      }).start(() => setShowModal(false));
    }
  }, [visible, slideAnim]);

  return (
    <Modal
      transparent
      visible={showModal}
      animationType="none"
      onRequestClose={onClose}
    >
      <TouchableOpacity
        style={styles.modalOverlay}
        activeOpacity={1}
        onPress={onClose}
      >
        <Animated.View style={[styles.modalContainer, { transform: [{ translateY: slideAnim }] }]}>
          <Text style={styles.modalText}>Create Post</Text>
          <TouchableOpacity onPress={() => { onClose(); /* Navigate to Create Post Publicly screen */ }} style={styles.optionButton}>
            <Text style={styles.optionButtonText}>Publicly</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => { onClose(); /* Navigate to Create Post in Community screen */ }} style={styles.optionButton}>
            <Text style={styles.optionButtonText}>Inside a Community</Text>
          </TouchableOpacity>
        </Animated.View>
      </TouchableOpacity>
    </Modal>
  );
};


const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    minHeight: 200,
  },
  modalText: {
    fontSize: 18,
    marginBottom: 10,
  },
  optionButton: {
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#1d40bd',
    marginVertical: 5,
  },
  optionButtonText: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
  },
  closeButton: {
    alignSelf: 'flex-end',
    padding: 10,
  },
  closeButtonText: {
    fontSize: 16,
    color: 'white',
  },
});

export default CreatePostModal;
