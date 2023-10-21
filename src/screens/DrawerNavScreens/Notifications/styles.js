import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  notificationItem: {
    marginVertical: 8,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  notificationText: {
    flex: 1,
    color: '#000',
  },
  deleteIcon: {
    marginLeft: 8,
  },
  notificationTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
  notificationBody: {
    fontSize: 14,
    color: '#000',
  },
});
