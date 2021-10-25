import { useMemo, useState } from 'react';
import { filterContext } from 'context';
import { Grid, Pagination, Loader } from './Shared';
import LeafletMap from './LeafletMap';
import DoctorCard from 'components/DoctorCard';
import { geoLocation } from '../constants';

const Doctors = ({ itemsPerPage = 10 }) => {
  const { doctors } = filterContext.useFilter();
  const [page, setPage] = useState(1);

  const center = geoLocation.SL_CENTER;
  const zoom = 8;

  const count = doctors?.length && Math.floor(doctors.length / itemsPerPage);

  const handleChange = (event, value) => {
    setPage(value);
  };

  const pageDoctors = useMemo(
    () => doctors?.slice(itemsPerPage * page - itemsPerPage, itemsPerPage * page),
    [doctors, itemsPerPage, page],
  );

  const doctorCards = pageDoctors?.map(doctor => <DoctorCard key={doctor.id} doctor={doctor} />);

  return (
    <>
      <LeafletMap doctors={pageDoctors} center={center} zoom={zoom} />
      {doctorCards ? (
        <Grid.Doctors>
          <Pagination.DoctorsSmall count={count} page={page} onChange={handleChange} />
          <Grid.Cards>{doctorCards}</Grid.Cards>
          <Pagination.DoctorsSmall count={count} page={page} onChange={handleChange} />
        </Grid.Doctors>
      ) : (
        <Grid.Loader>
          <Loader />
        </Grid.Loader>
      )}
    </>
  );
};

export default Doctors;
