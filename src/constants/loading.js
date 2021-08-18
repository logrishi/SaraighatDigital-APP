import {
  Bounce,
  Chase,
  Circle,
  CircleFade,
  Flow,
  Fold,
  Grid,
  Plane,
  Pulse,
  Swing,
  Wander,
  Wave,
} from 'react-native-animated-spinkit';
import {Modal, View} from 'react-native';

import Colors from 'constants/colors';
import React from 'react';
import {scale} from 'react-native-size-matters';
import styles from './loadingStyles';

//style

//colors

const showSwing = val => (
  // <View style={styles.loading}>
  //   <Swing size={48} color="red" />
  // </View>

  <Modal animationType="fade" transparent={true} visible={true}>
    <View style={styles.centeredView}>
      <View style={styles.loading}>
        <Swing size={scale(val)} color={Colors.richDarkCyan} />
      </View>
    </View>
  </Modal>
);

const showBounceModal = val => (
  <Modal animationType="fade" transparent={true} visible={true}>
    <View style={styles.centeredView}>
      <View style={styles.loading}>
        <Bounce size={scale(val)} color={Colors.richDarkCyan} />
      </View>
    </View>
  </Modal>
);

const showBounce = val => (
  // <View style={styles.loading}>
  //   <Bounce size={scale(val)} color={Colors.richDarkCyan} />
  // </View>
  <Modal animationType="fade" transparent={true} visible={true}>
    <View style={styles.centeredView}>
      <View style={styles.loading}>
        <Bounce size={scale(val)} color={Colors.richDarkCyan} />
      </View>
    </View>
  </Modal>
);
const showPulse = val => (
  // <View style={styles.loading}>
  //   <Pulse size={scale(val)} color={Colors.richDarkCyan} />
  // </View>
  <Modal animationType="fade" transparent={true} visible={true}>
    <View style={styles.centeredView}>
      <View style={styles.loading}>
        <Pulse size={scale(val)} color={Colors.richDarkCyan} />
      </View>
    </View>
  </Modal>
);

const showFold = val => (
  <Modal animationType="fade" transparent={true} visible={true}>
    <View style={styles.centeredView}>
      <View style={styles.loading}>
        <Fold size={scale(val)} color={Colors.richDarkCyan} />
      </View>
    </View>
  </Modal>
);

const showPlane = val => (
  // <View style={styles.loading}>
  //   <Plane size={48} color="red" />
  // </View>
  <Modal animationType="fade" transparent={true} visible={true}>
    <View style={styles.centeredView}>
      <View style={styles.loading}>
        <Plane size={scale(val)} color={Colors.richDarkCyan} />
      </View>
    </View>
  </Modal>
);
const showChase = val => (
  <View style={styles.loading}>
    <Chase size={scale(val)} color={Colors.richDarkCyan} />
  </View>
  // <Modal
  //   animationType="fade"
  //   transparent={true}
  //   visible={true}
  //   statusBarTranslucent>
  //   <View style={styles.centeredView}>
  //     <View style={styles.loading}>
  //       <Chase size={scale(val)} color={Colors.richDarkCyan} />
  //     </View>
  //   </View>
  // </Modal>
);
const showChaseModal = val => (
  <Modal
    animationType="fade"
    transparent={true}
    visible={true}
    statusBarTranslucent>
    <View style={styles.centeredView}>
      <View style={styles.loading}>
        <Chase size={scale(val)} color={Colors.richDarkCyan} />
      </View>
    </View>
  </Modal>
);
const showWave = (
  <View style={styles.loading}>
    <Wave size={48} color="red" />
  </View>
);
// const showPulse = (
//   <View style={styles.loading}>
//     <Pulse size={48} color="red" />
//   </View>
// );
const showFlow = (
  <View style={styles.loading}>
    <Flow size={48} color="red" />
  </View>
);

const showCircle = (
  <View style={styles.loading}>
    <Circle size={48} color="red" />
  </View>
);
const showFade = (
  <View style={styles.loading}>
    <CircleFade size={48} color="red" />
  </View>
);
const showGrid = (
  <View style={styles.loading}>
    <Grid size={48} color="red" />
  </View>
);

const showWander = (
  <View style={styles.loading}>
    <Wander size={48} color="red" />
  </View>
);

export {
  showSwing,
  showPlane,
  showChase,
  showBounce,
  showBounceModal,
  showWave,
  showPulse,
  showFlow,
  showCircle,
  showFade,
  showGrid,
  showFold,
  showWander,
  showChaseModal,
};
