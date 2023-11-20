import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  headerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    backgroundColor: '#f8f8f8',
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 15,
  },
  headerTextContainer: {
    position: 'absolute',
    width: '80%',
    alignItems: 'center',
    paddingBottom: 10
  },
  headerModelTextContainer: {
    flex: 1,
    flexDirection: 'row',
    gap: 8
  },
  headerText: {
    fontSize: 18,
    color: '#333',
    textAlign: 'center',
  },
  hederSubText: {
    color: '#828483'
  },
  backIcon: {
    transform: [{rotate: '180deg'}],
    width: 25,
    height: 25,
    marginBottom: 10
  },
  backButton: {
    position: 'absolute',
    left: 10,
  },
})