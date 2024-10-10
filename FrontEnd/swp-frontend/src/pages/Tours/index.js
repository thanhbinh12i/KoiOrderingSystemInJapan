
import SearchTour from '../../components/SearchTour';
import TourList from './TourList';
import './TourTemplate.scss';

function Tour() {
      return (
            <>
                  <SearchTour />
                  <div className='tour-list'>
                        <TourList />
                  </div>
                  <div>
                        Form dat tour mong muon
                  </div>
            </>
      )
}
export default Tour;