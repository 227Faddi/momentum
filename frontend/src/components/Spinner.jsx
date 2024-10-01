import ScaleLoader from 'react-spinners/ScaleLoader';

const override = {
  display: 'block',
  margin: '100px auto',
};

const Spinner = ({ loading }) => {
  return (
    <ScaleLoader
      color='#FFF'
      loading={loading}
      cssOverride={override}
      size={450}
    />
  );
};
export default Spinner;