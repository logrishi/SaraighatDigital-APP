//Toast
import {RNToasty} from 'react-native-toasty';

const normalToast = (msg, duration, position) => {
  RNToasty.Normal({
    title: msg,
    duration: duration,
    position: position ? position : 'bottom',
  });
};

const infoToast = (msg, duration, position) => {
  RNToasty.Info({
    title: msg,
    duration: duration,
    position: position ? position : 'bottom',
  });
};

const successToast = (msg, duration, position) => {
  RNToasty.Success({
    title: msg,
    duration: duration,
    position: position ? position : 'bottom',
  });
};

const warnToast = (msg, duration, position) => {
  RNToasty.Warn({
    title: msg,
    duration: duration,
    position: position ? position : 'bottom',
  });
};

const errorToast = (msg, duration, position) => {
  RNToasty.Error({
    title: msg,
    duration: duration,
    position: position ? position : 'bottom',
  });
};

export {normalToast, infoToast, successToast, warnToast, errorToast};
// export { (normalToast, infoToast, successToast, warnToast, errorToast)};
