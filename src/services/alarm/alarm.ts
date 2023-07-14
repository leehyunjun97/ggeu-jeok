import axios from 'axios';

const getAlarmApi = async () => {
  try {
    const getComplet = await axios.get('http://localhost:4000/alarm');
    return getComplet.data;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export { getAlarmApi };
