
import SearchTour from '../../components/SearchTour';
import TourList from './TourList';

function Tour() {
      return (
            <>
                  <h1>Tim kiem Tour</h1>
                  <SearchTour />


                  <div>
                        <TourList />
                  </div>
                  <div>
                        Form dat tour mong muon
                  </div>
            </>
      )
}
export default Tour;