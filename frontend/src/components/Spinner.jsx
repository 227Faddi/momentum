import ScaleLoader from 'react-spinners/ScaleLoader';

const override = {
  display: 'block',
  margin: '100px auto',
};

const Spinner = ({ loading }) => {
  return (
    <ScaleLoader
      loading={loading}
      cssOverride={override}
    />
  );
};
export default Spinner;