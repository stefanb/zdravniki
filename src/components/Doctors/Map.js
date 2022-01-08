import MarkerClusterGroup from 'react-leaflet-markercluster';
import PropTypes from 'prop-types';
import { MAP } from 'const';
import Leaflet from 'components/Shared/Leaflet';
import * as Markers from './Markers';
import MapEvents from './MapEvents';
import 'react-leaflet-markercluster/dist/styles.min.css';
import { withErrorBoundary } from '../Shared/ErrorBoundary';
import { DoctorPropType } from '../../types';

const { GEO_LOCATION } = MAP;

const createClusterCustomIcon = function (cluster) {
  let n;
  let acceptsCnt = 0;
  // eslint-disable-next-line no-restricted-syntax
  for (n in cluster.getAllChildMarkers()) {
    if (Object.prototype.hasOwnProperty.call(cluster.getAllChildMarkers(), n)) {
      acceptsCnt += cluster.getAllChildMarkers()[n].options.accepts === 'y' ? 1 : 0;
    }
  }
  let acceptsPercentage = Math.round(((acceptsCnt / cluster.getChildCount()) * 10) / 2.5) * 25;
  if (acceptsPercentage === 100 && acceptsCnt !== cluster.getChildCount()) {
    acceptsPercentage = 75;
  } else if (acceptsPercentage === 0 && acceptsCnt > 0) {
    acceptsPercentage = 25;
  }

  // eslint-disable-next-line no-undef
  return L.divIcon({
    html: `<div><span>${cluster.getChildCount()}</span></div>`,
    className: `marker-cluster marker-cluster-small marker-cluster-accepts-${acceptsPercentage}`,
    // eslint-disable-next-line no-undef
    iconSize: L.point(40, 40, true),
  });
};

function withLeaflet(Component) {
  const DoctorsMap = function DoctorsMap({
    doctors,
    center = GEO_LOCATION.SL_CENTER,
    zoom = MAP.ZOOM,
    minZoom = MAP.MIN_ZOOM,
    maxZoom = MAP.MAX_ZOOM,
    userLocation = false,
    ...other
  }) {
    const markers = doctors?.map(doctor => <Markers.Doctor key={doctor.key} doctor={doctor} />);
    const injectedProps = {
      center,
      zoom,
      minZoom,
      maxZoom,
      ...other,
    };

    return (
      <Component {...injectedProps}>
        <MarkerClusterGroup iconCreateFunction={createClusterCustomIcon} maxClusterRadius={40}>
          {markers}
        </MarkerClusterGroup>
        {userLocation && <Markers.User />}
        <MapEvents />
      </Component>
    );
  };

  DoctorsMap.propTypes = {
    doctors: PropTypes.arrayOf(DoctorPropType),
    center: PropTypes.arrayOf(PropTypes.number),
    zoom: PropTypes.number,
    minZoom: PropTypes.number,
    maxZoom: PropTypes.number,
    userLocation: PropTypes.bool,
  };

  DoctorsMap.defaultProps = {
    doctors: [],
    center: GEO_LOCATION.SL_CENTER,
    zoom: MAP.ZOOM,
    minZoom: MAP.MIN_ZOOM,
    maxZoom: MAP.MAX_ZOOM,
    userLocation: false,
  };

  return DoctorsMap;
}

export default withErrorBoundary(withLeaflet(Leaflet));
